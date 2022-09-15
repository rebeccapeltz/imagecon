# ✍️ Lesson 05: Cloudinary Video Player

Continuing our discussion on the subject of videos, we will take a look at the [Cloudinary Video Player](https://cloudinary.com/documentation/cloudinary_video_player). The difference between the `<AdvancedVideo>` component and the video player is that while both can display video, the video player supports things such as playlists and streaming.

The Cloudinary Video Player is a JavaScript-based HTML5 video player bundled with many valuable customization and integration capabilities, and is monetization and analytics-ready. The player is fully responsive for use in any device or screen size, and is integrated with Cloudinary's video delivery and transformation solution.

Integrating the video player with our Next.js application can be done in a variety of ways. Generally, you have two options. One is to install the video player using `npm i cloudinary-video-player` and the other is to include it via a CDN. Both approaches are good, however, since we only want to use it on a single page, we'll take a look at how to do the integration via the installed version.

First, we'll create a component (`VideoPlayer.js`) that will accept the source video as a `prop`. This component will be responsible for adding the Cloudinary Video Player specific CSS and JavaScript to the page programmatically.

```js
import 'cloudinary-video-player/dist/cld-video-player.min.css';
import { useEffect, useState } from 'react';

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
  const videoplayer = window.cloudinary.videoPlayer('video-player', {
    cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME,
  });
  videoplayer.source(source, {
    transformation: { width: 800, fetch_format: 'auto', quality: 'auto' },
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
```
<I think you got around SSR errors during build because you wrapped the window reference in a useEffect function, but it still might be worth mentioning [Dynamic Import](https://nextjs.org/docs/advanced-features/dynamic-import) as I know a lot people use this for their front code in Next.js.

I don't really know much about accessing chunked data from the CDN. I found this https://nextjs.org/docs/api-reference/next.config.js/cdn-support-with-asset-prefix. You might want to explain this type of access and why you like it. >

There's a lot to unpack here. There are two `useEffect()` hooks, the first one is dynamically adding a `<script>` element to the page. Also note that the `src` is pointing to a local `_next` folder. We'll get back to this line in a little while. Simply put we load the JavaScript that's responsible for adding the functionality to the Cloudinary Video Player.

The second `useEffect()` bootstraps the video player - which is added to the `DOM` via the `<video>` element identified with `id="video-player"`. Using `videoplayer.source()` we can specify a video to play and also provide it with a set of transformations via the `transformation` property.

# Changing `next.config.js`

Above we saw that the video player specific JavaScript gets loaded from `_next/static/chunks/cld-video-player.min.js`. The Cloudinary Video Player's JavaScript, when installed locally, needs to be programmatically copied over to
the `static` folder using Webpack's copy plugin in order for Next.js to be able to read it. Therefore we need to install `copy-webpack-plugin` via `npm i copy-webpack-plugin`. Once it's installed we need to configure it to make the actual copy:

```js
/** @type {import('next').NextConfig} */
const CopyPlugin = require('copy-webpack-plugin');
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  webpack: function (config) {
    config.experiments = { ...config.experiments };
    config.plugins = [
      ...config.plugins,
      new CopyPlugin({
        patterns: [
          {
            from: './node_modules/cloudinary-video-player/dist/cld-video-player.min.js',
            to: './static/chunks/',
          },
        ],
      }),
    ];
    return config;
  },
};

module.exports = nextConfig;
```
