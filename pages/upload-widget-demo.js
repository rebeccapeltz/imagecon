import Script from 'next/script';
import { useState } from 'react';
import CldImage from '../components/CldImage';
import Placeholder from '../components/Placeholder';
import UploadWidget from '../components/UploadWidget';

export default function UploadWidgetDemo() {
  const [publicId, setPublicId] = useState('');
  const [isImageLoading, setIsImageLoading] = useState(false);

  return (
    <>
      <Script src="https://upload-widget.cloudinary.com/global/all.js" />

      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          {publicId ? (
            <CldImage publicId={publicId} />
          ) : (
            <Placeholder loading={isImageLoading} />
          )}
          <div>
            <h1 className="text-5xl font-bold">Cloudinary Upload Widget</h1>
            <p className="py-6">
              Click the button below to upload an image to your Cloudinary
              account. It will appear on the left, optimised after upload.
            </p>
            <UploadWidget
              callback={(error, result) => {
                if (!error && result && result.event === 'success') {
                  setIsImageLoading(true);
                  setPublicId(result.info.public_id);
                  setIsImageLoading(false);
                }
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
