import { openUploadWidget } from '../utils/CloudinaryService';
const UploadWidget = ({ callback }) => {
  const configureAndOpenWidget = () => {
    const myUploaDWidget = openUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUD_NAME,
        uploadPreset: 'imagecon-uw',
        sources: ['local'],
      },
      callback
    );
    myUploaDWidget.open();
  };
  return (
    <button
      id="upload_widget"
      className="cloudinary-button btn btn-primary"
      onClick={configureAndOpenWidget}
    >
      Upload files
    </button>
  );
};
export default UploadWidget;
