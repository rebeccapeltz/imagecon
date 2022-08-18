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
    demoplayer.source(source, {
      transformation: { width: 800, fetch_format: 'auto' },
    });
  }, [jsLoaded, source]);

  return (
    <>
      <div style={{ width: '800px' }}>
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
