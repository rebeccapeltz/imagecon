import Script from 'next/script';
import { useState } from 'react';
import CloudinaryTransformator from '../components/CloudinaryTransformator';
import Placeholder from '../components/Placeholder';
import UploadWidget from '../components/UploadWidget';

export default function UploadWidgetDemo() {
  const [publicId, setPublicId] = useState('');
  const [isImageLoading, setIsImageLoading] = useState(false);

  /*
  Exercise 1: Add the Upload Widget drop-in script via the Next.js <Script> component
  Import the UploadWidget from the components folder
  */
  return (
    <>
      <Script src="https://upload-widget.cloudinary.com/global/all.js" />

      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          {publicId ? (
            <CloudinaryTransformator publicId={publicId} />
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
