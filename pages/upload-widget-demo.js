import CloudinaryImage from '../components/CloudinaryImage';
import Script from 'next/script';
import { useState } from 'react';
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
            <CloudinaryImage publicId={publicId} />
          ) : (
            <div className="max-w-sm rounded-lg shadow-2xl">
              <div className={`${isImageLoading ? 'animate-pulse' : ''} flex`}>
                <div className="rounded-lg bg-blue-400 h-56 w-56 dtext-blue-500 items-center justify-center"></div>
              </div>
            </div>
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
