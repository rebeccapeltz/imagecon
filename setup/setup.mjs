import dotenv from 'dotenv';
import path from 'path';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: `${__dirname}/.env` });
import chalk from 'chalk';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { exit } from 'process';

const log = console.log;

const config = cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

if (Object.values(config).includes(undefined)) {
  log(
    chalk.red(
      'Please setup your environment variable with CLOUD_NAME, API_KEY and API_SECRET'
    )
  );
  exit(1);
}

const listFilesToUpload = (path) => {
  const files = fs.readdirSync(`${__dirname}/${path}`);
  const filesToUpload = files.filter((file) => {
    // skipping one photo as that'll be uploaded later using the Upload Widget
    // to also demonstrate the capabilities of SWR
    if (!file.includes('clay')) {
      return (
        file.endsWith('jpg') ||
        file.endsWith('png') ||
        file.endsWith('mov') ||
        file.endsWith('mp4')
      );
    }
  });
  return filesToUpload;
};

const pathToImageFiles = 'assets/images';
const pathToUIFiles = 'assets/ui';
const pathToVideoFiles = 'assets/videos';

const imageFilesToUpload = listFilesToUpload(pathToImageFiles);
const uiFilesToUpload = listFilesToUpload(pathToUIFiles);
const videoFilesToUpload = listFilesToUpload(pathToVideoFiles);

const uploadOptions = {
  overwrite: true,
  folder: 'imagecon',
};

const uploadUIAssets = async (file, options = {}) => {
  options = {
    ...options,
    use_filename: true,
    unique_filename: false,
  };
  const path = `${__dirname}/${pathToUIFiles}/${file}`;
  try {
    const results = await cloudinary.uploader.upload(path, options);
    return results;
  } catch (error) {
    console.error(error);
  }
};

let counter = 0;
const uploadImageAssets = async (file, options = {}) => {
  counter++;
  options = {
    ...options,
    tags: ['coffee'],
    public_id: `coffee-${counter}`,
  };
  const path = `${__dirname}/${pathToImageFiles}/${file}`;
  try {
    const results = await cloudinary.uploader.upload(path, options);
    return results;
  } catch (error) {
    console.error(error);
  }
};

const uploadVideoAssets = async (file, options = {}) => {
  if (file.includes('puntacana')) {
    options = {
      ...options,
      resource_type: 'video',
      use_filename: true,
      unique_filename: false,
      eager: [
        {
          fetch_format: 'webm',
          video_codec: 'vp9',
          width: 800,
          height: 450,
        },
        { fetch_format: 'mp4', video_codec: 'h265', width: 800, height: 450 },
        { fetch_format: 'mp4', video_codec: 'h264', width: 800, height: 450 },
      ],
      eager_async: true,
      // eager_notification_url: use webhook.site
    };
  } else {
    options = {
      ...options,
      resource_type: 'video',
      use_filename: true,
      unique_filename: false,
    };
  }
  const path = `${__dirname}/${pathToVideoFiles}/${file}`;
  try {
    const results = await cloudinary.uploader.upload(path, options);
    return results;
  } catch (error) {
    console.error(error);
  }
};

imageFilesToUpload.forEach(async (file) => {
  const response = await uploadImageAssets(file, uploadOptions);
  log(
    `${chalk.rgb(139, 69, 19)('Image Asset')} - ${chalk.green(
      'Successfully uploaded'
    )} ${chalk.yellow(response.public_id)}, access it at: ${chalk.cyan(
      response.secure_url
    )}`
  );
});

uiFilesToUpload.forEach(async (file) => {
  const response = await uploadUIAssets(file, uploadOptions);
  log(
    `${chalk.rgb(255, 215, 0)('UI Asset')} - ${chalk.green(
      'Successfully uploaded'
    )} ${chalk.yellow(response.public_id)}, access it at: ${chalk.cyan(
      response.secure_url
    )}`
  );
});

videoFilesToUpload.forEach(async (file) => {
  const response = await uploadVideoAssets(file, uploadOptions);
  log(
    `${chalk.blue('Video Asset')} - ${chalk.green(
      'Successfully uploaded'
    )} ${chalk.yellow(response.public_id)}, access it at: ${chalk.cyan(
      response.secure_url
    )}`
  );
});
