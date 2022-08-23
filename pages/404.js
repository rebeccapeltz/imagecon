import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';

import Link from 'next/link';
const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUD_NAME,
  },
});
export default function FourOhFour() {
  const fourOhFourImage = cld
    .image('imagecon/404')
    .delivery(format('auto'))
    .delivery(quality('auto'));
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <AdvancedImage cldImg={fourOhFourImage} />
        <div>
          <h1 className="text-5xl font-bold">404</h1>
          <p className="py-6">This is not the page you are looking for.</p>
          <Link href="/">Go back to Home 👈</Link>
        </div>
      </div>
    </div>
  );
}
