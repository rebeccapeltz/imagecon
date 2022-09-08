import chalk from 'chalk';
import { v2 as cloudinary, config } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { exit } from 'process';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const log = console.log;
config(true);
if (!process.env.CLOUDINARY_URL) {
  log(chalk.red('Please setup your environment variable using CLOUDINARY_URL'));
  exit(1);
}
// this methid lists the files that we are uploading
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
// path to images, UI images and video files
const pathToImageFiles = 'assets/images';
const pathToUIFiles = 'assets/ui';
const pathToVideoFiles = 'assets/videos';

// listing the appropriate files
const imageFilesToUpload = listFilesToUpload(pathToImageFiles);
const uiFilesToUpload = listFilesToUpload(pathToUIFiles);
const videoFilesToUpload = listFilesToUpload(pathToVideoFiles);

// generic upload options
const uploadOptions = {
  overwrite: true,
  folder: 'imagecon',
};
// uploading UI assets with appended upload options
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

// uploading image assets with appended upload options
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

// uploading video assets with appended upload options
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
// calling the upload for all image files
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
// calling the upload for all UI image files
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
// calling the upload for all video files
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
