import { v2 as cloudinary, config } from 'cloudinary';
config(true);
config({ secure: true });
export default async function handler(req, res) {
  try {
    const url = cloudinary.url('coffee.json', {
      type: 'list',
      version: Date.now(),
    });
    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
    });
    const { resources: results } = await response.json();

    return res.status(200).json({
      results,
    });
  } catch (error) {
    return res
      .status(500)
      .json(
        'Cannot generate image gallery. Make sure that images tagged as "coffee" are available in your Media Library.'
      );
  }
}
