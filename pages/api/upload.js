import { v2 as cloudinary } from 'cloudinary';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const postHandler = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async function (err, fields, files) {
    console.log('files.file', files.file);
    const response = await uploadToCloudinary(files.file);
    return res.status(201).send(response);
  });
};

const uploadToCloudinary = async (file) => {
  console.log('file.path', file.filepath);
  console.log('imageData', file.filepath);
  const results = await cloudinary.uploader.upload(file.filepath);
  await fs.unlinkSync(file.filepath);
  return results;
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    postHandler(req, res);
  }
  // console.log('hitting', req);
  // const { image } = JSON.parse(req.body);
  // console.log(req.body);

  // try {

  //   return res.status(200).json(results);
  // } catch (err) {
  //   return res.status(500).json({
  //     message: `Failed to upload image: ${JSON.stringify(err)}`,
  //   });
  // }
}
