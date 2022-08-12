{
  /* eslint-disable @next/next/no-img-element */
}
import { Cloudinary } from '@cloudinary/url-gen';
import { thumbnail } from '@cloudinary/url-gen/actions/resize';
import { focusOn } from '@cloudinary/url-gen/qualifiers/gravity';
import { face } from '@cloudinary/url-gen/qualifiers/focusOn';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';

const CloudinaryImage = ({ publicId }) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.NEXT_PUBLIC_CLOUD_NAME,
    },
  });
  const myImage = cld
    .image(publicId)
    .resize(
      thumbnail().width(250).height(250).zoom(0.75).gravity(focusOn(face()))
    )
    .delivery(format('auto'))
    .delivery(quality('auto'));
  const myURL = myImage.toURL();
  return (
    <img
      className="max-w-sm rounded-lg shadow-2xl"
      src={myURL}
      alt="Cloudinary Sample Image"
    />
  );
};
export default CloudinaryImage;
