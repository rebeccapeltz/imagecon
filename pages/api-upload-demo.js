import { useState } from 'react';
import CloudinaryImage from '../components/CloudinaryImage';

export default function UploadWidgetDemo() {
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [publicId, setPublicId] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(false);

  function uploadToClient(event) {
    if (event.target.files && event.target.files[0]) {
      setIsImageLoading(true);
      const img = event.target.files[0];
      setImage(img);
      setCreateObjectURL(URL.createObjectURL(img));
    }
  }

  async function uploadToServer(event) {
    event.preventDefault();
    const body = new FormData();
    body.append('file', image);
    const response = await (
      await fetch('/api/upload', {
        method: 'POST',
        body,
      })
    ).json();
    setPublicId(response.public_id);
    setIsImageLoading(false);
  }

  return (
    <>
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
            <h1 className="text-5xl font-bold">Cloudinary API Upload</h1>
            <p className="py-6">
              Click the button below to upload an image to your Cloudinary
              account. It will appear on the left, optimised after upload.
            </p>

            <form
              method="post"
              onChange={uploadToClient}
              onSubmit={uploadToServer}
            >
              <p>
                <input
                  className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-focus"
                  type="file"
                  name="file"
                />
                <button className="btn btn-primary btn-sm">Upload Files</button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
