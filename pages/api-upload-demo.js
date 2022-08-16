import { useState } from 'react';
import CloudinaryTransformator from '../components/CloudinaryTransformator';
import Placeholder from '../components/Placeholder';

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
    try {
      const response = await (
        await fetch('/api/upload', {
          method: 'POST',
          body,
        })
      ).json();
      setPublicId(response.public_id);
      setIsImageLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          {publicId ? (
            <CloudinaryTransformator publicId={publicId} />
          ) : (
            <Placeholder loading={isImageLoading} />
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
