import { openUploadWidget } from '../utils/CloudinaryService';
const UploadWidget = ({ callback }) => {
  const configureAndOpenWidget = () => {
    const presets = ['tag-as-coffee'];
    const getUploadPresets = (callback) => callback(presets);
    const myUploadWidget = openUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUD_NAME,
        uploadPreset: 'imagecon-uw',
        sources: ['local', 'url', 'camera'],
        showAdvancedOptions: true,
        getUploadPresets,
      },
      callback
    );
    myUploadWidget.open();
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
