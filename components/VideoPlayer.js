import { useEffect, useState } from 'react';
import 'cloudinary-video-player/dist/cld-video-player.min.css';

export default function VideoPlayer({ source }) {
  const [jsLoaded, setJSLoaded] = useState(false);
  useEffect(() => {
    if (!jsLoaded) {
      const script = document.createElement('script');
      script.src = '_next/static/chunks/cld-video-player.min.js';
      script.async = true;
      script.addEventListener('load', () => setJSLoaded(true));
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [jsLoaded]);

  useEffect(() => {
    if (!jsLoaded) return;
    const demoplayer = window.cloudinary.videoPlayer('video-player', {
      cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME,
    });
    demoplayer.source(source);
  }, [jsLoaded, source]);

  return (
    <>
      {/* The below will hopefully work one day */}
      {/* import Script from 'next/script'; */}
      {/* <Script
        src="_next/static/chunks/cld-video-player.min.js"
        onLoad={() => {
          const demoplayer = window.cloudinary.videoPlayer('video-player', {
            cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME,
          });
          demoplayer.source(source);
        }}
      /> */}
      <div style={{ maxWidth: '800px' }}>
        <video
          id="video-player"
          controls
          muted
          className="cld-video-player cld-fluid"
        ></video>
      </div>
    </>
  );
}
