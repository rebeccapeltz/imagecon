import { Cloudinary, Transformation } from '@cloudinary/url-gen';
import { thumbnail, scale } from '@cloudinary/url-gen/actions/resize';
import { focusOn } from '@cloudinary/url-gen/qualifiers/gravity';
import { face } from '@cloudinary/url-gen/qualifiers/focusOn';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import { source } from '@cloudinary/url-gen/actions/overlay';
import { Position } from '@cloudinary/url-gen/qualifiers';
import { image } from '@cloudinary/url-gen/qualifiers/source';
import { opacity, brightness } from '@cloudinary/url-gen/actions/adjust';
import { compass } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';

const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUD_NAME,
  },
});

const CloudinaryTransformator = ({ publicId, gallery = false }) => {
  if (gallery) {
    const myImage = cld
      .image(publicId)
      .resize(thumbnail().width(400).height(400))
      .overlay(
        source(
          image('imagecon/cloudinary-blue').transformation(
            new Transformation()
              .resize(scale(70))
              .adjust(opacity(80))
              .adjust(brightness(500))
          )
        ).position(
          new Position().gravity(compass('south_east')).offsetX(5).offsetY(5)
        )
      )
      .delivery(format('auto'))
      .delivery(quality('auto'));
    return (
      <AdvancedImage
        cldImg={myImage}
        className="max-w-sm rounded-lg shadow-2xl"
      />
    );
  }

  const myImage = cld
    .image(publicId)
    .resize(
      thumbnail().width(250).height(250).zoom(0.75).gravity(focusOn(face()))
    )
    .delivery(format('auto'))
    .delivery(quality('auto'));
  return (
    <AdvancedImage
      cldImg={myImage}
      className="max-w-sm rounded-lg shadow-2xl"
    />
  );
};
export default CloudinaryTransformator;
