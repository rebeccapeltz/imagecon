import { AdvancedVideo } from '@cloudinary/react';
import { Cloudinary, Transformation } from '@cloudinary/url-gen';
import { scale } from '@cloudinary/url-gen/actions/resize';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { Gravity } from '@cloudinary/url-gen/qualifiers';
import { source } from '@cloudinary/url-gen/actions/overlay';
import { image } from '@cloudinary/url-gen/qualifiers/source';
import { Position } from '@cloudinary/url-gen/qualifiers';
import { compass } from '@cloudinary/url-gen/qualifiers/gravity';

export default function AdvancedVideoDemo() {
  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.NEXT_PUBLIC_CLOUD_NAME,
    },
  });
  const myVideo = cld.video('imagecon/ship');
  myVideo
    .resize(fill().width(500).height(500).gravity(Gravity.autoGravity()))
    // .resize(fill().width(500).height(500))
    .overlay(
      source(
        image('imagecon/cloudinary-blue').transformation(
          new Transformation().resize(scale(90))
        )
      ).position(
        new Position().gravity(compass('north_east')).offsetX(5).offsetY(5)
      )
    );

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div>
            <h1 className="text-5xl font-bold p-10">
              Advanced Video component
            </h1>
            <div className="m-10">
              <a
                className="link"
                href="https://res.cloudinary.com/tamas-demo/video/upload/imagecon/ship.mp4"
              >
                Original version
              </a>
            </div>
            <AdvancedVideo
              className="mx-auto"
              cldVid={myVideo}
              id="zero"
              controls
              autoPlay
              loop
              muted
            />
          </div>
        </div>
      </div>
    </>
  );
}
