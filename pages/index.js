import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { fit } from '@cloudinary/url-gen/actions/resize';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
export default function Home() {
  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.NEXT_PUBLIC_CLOUD_NAME,
    },
  });
  const cloudinaryLogo = cld
    .image('imagecon/cloudinary-blue')
    .resize(fit().width(450))
    .delivery(format('auto'))
    .delivery(quality('auto'));
  const nextjsLogo = cld
    .image('imagecon/nextjs-light')
    .resize(fit().width(450))
    .delivery(format('auto'))
    .delivery(quality('auto'));
  return (
    <div className="hero">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">ImageCon 2022</h1>
          <p className="py-6">
            <AdvancedImage cldImg={cloudinaryLogo} />
            <span style={{ fontSize: '55px' }}>❤️</span>
            <AdvancedImage cldImg={nextjsLogo} />
          </p>
        </div>
      </div>
    </div>
  );
}
