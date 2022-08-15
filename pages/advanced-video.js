import { AdvancedVideo } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { Gravity } from '@cloudinary/url-gen/qualifiers';

export default function AdvancedVideoDemo() {
  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.NEXT_PUBLIC_CLOUD_NAME,
    },
  });

  const myVideo = cld.video('colombia');
  myVideo.resize(fill().width(250).height(250).gravity(Gravity.autoGravity()));

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div>
            <h1 className="text-5xl font-bold p-10">
              Advanced Video component
            </h1>
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
