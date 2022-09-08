/*
For completing this exercise, please make sure that you've created an upload preset (as per the README)

Navigate to Settings -> Upload and find the upload preset section.

Create the following two presets:

```
preset name: imagecon-uw
signing mode: unsigned
folder: imagecon
```

Make sure to hit save after your edits.
*/
import { v2 as cloudinary } from 'cloudinary';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};
cloudinary.config(true);

const promisifyFormParser = (req) => {
  const form = new formidable.IncomingForm();
  return new Promise((resolve, reject) => {
    form.parse(req, (error, fields, files) => {
      if (error) {
        reject(error);
      } else {
        resolve({ files });
      }
    });
  });
};

const postHandler = async (req, res) => {
  const { files } = await promisifyFormParser(req);
  const response = await uploadToCloudinary(files.file);
  return res.status(201).send(response);
};

const uploadToCloudinary = async (file) => {
  try {
    const results = await cloudinary.uploader.upload(file.filepath, {
      upload_preset: 'imagecon-uw',
    });
    await fs.unlinkSync(file.filepath);
    return results;
  } catch (error) {
    console.error(error);
  }
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    return postHandler(req, res);
  }
}
