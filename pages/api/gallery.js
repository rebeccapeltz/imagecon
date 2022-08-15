import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
export default async function handler(req, res) {
  const url = cloudinary.url('coffee.json', {
    type: 'list',
  });
  const { resources: results } = await (await fetch(url)).json();
  res.json({
    results,
  });
}
