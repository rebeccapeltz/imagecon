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
  options = {
    ...options,
    resource_type: 'video',
    use_filename: true,
    unique_filename: false,
  };
  const path = `${__dirname}/${pathToVideoFiles}/${file}`;
  try {
    const results = await cloudinary.uploader.upload(path, options);
    return results;
  } catch (error) {
    console.error(error);
  }
};

// const uploadToCloudinary = async (file, ...params) => {
//   const [param] = params;
//   const { resource_type, category } = param;
//   let uploadOptions = {
//     overwrite: true,
//   };
//   category !== 'ui' ? counter++ : '';
//   if (resource_type === 'image') {
//     uploadOptions = {
//       ...uploadOptions,
//       resource_type: 'image',
//     };
//   } else {
//     uploadOptions = {
//       ...uploadOptions,
//       resource_type: resource_type,
//     };
//   }

//   if (category !== 'ui') {
//     uploadOptions = {
//       ...uploadOptions,
//       public_id: `imagecon/coffee-${counter}`,
//       tags: ['coffee'],
//     };
//   } else {
//     uploadOptions = {
//       ...uploadOptions,
//       folder: 'imagecon',
//       use_filename: true,
//       unique_filename: false,
//     };
//   }
//   let finalPath;
//   if (category === 'ui') {
//     finalPath = `${__dirname}/${pathToUIFiles}`;
//   } else {
//     finalPath = `${__dirname}/${pathToImageFiles}`;
//   }

//   if (resource_type === 'video') {
//     finalPath = `${__dirname}/${pathToVideoFiles}`;
//   }

// };

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
