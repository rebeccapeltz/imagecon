# ✍️ Lesson 04: Displaying Videos

We've covered a fair bit about working with images. However, videos are also becoming more [prominent on the internet](https://almanac.httparchive.org/en/2021/media#video). Cloudinary has the all the capabilities to store, optimise, transform and deliver video assets as well.

In this section of the workshop we'll take a look at how to work with videos. Luckily for us, the `@cloudinary/react` package does not only expose an `<AdvancedImage>` component but xalso an `<AdvancedVideo>` one. This means that we can apply optimisation and transformations to any video that has been uploaded to our Cloudinary account and - similarly with images - pass it as a `prop` to the `<AdvancedVideo>` component:

```js
const myVideo = cld.video('imagecon/ship');
myVideo
  .delivery(quality('auto'))
  .delivery(format('auto'))
  .resize(fill().width(500).height(500).gravity(Gravity.autoGravity()))
  .overlay(
    source(
      image('imagecon/cloudinary-blue').transformation(
        new Transformation().resize(scale(90))
      )
    ).position(
      new Position().gravity(compass('north_east')).offsetX(5).offsetY(5)
    )
  );
```

The `autoGravity()` method is a new one that we haven't see before. Let's look at what is going on here. As you can see we are reducing the dimensions of the video to `500x500` (`resize(fill().width(500).height(500))`). That alone just crops the video, which may not actually capture the content that we want to see. In fact, in our example, we have a video of a ship. With a normal crop, we are missing out on the action because we are not always seeing the ship. With `autoGravity()` we can crop the video and the crop will always be around the most important part of the video. We call this [content aware cropping](https://cloudinary.com/blog/automatically_crop_videos_without_losing_focus).

# Video formats and quality

Furthermore, it is also possible to pick different formats for videos, automatically using Cloudinary.

The `f_auto` option (`delivery(format('auto')`) can be used to perform automatic format and codec selection based on the requesting browser. For example, with the automatic format feature, in most cases Chrome users would receive a VP9-encoded WebM file, while Safari users would receive an HEVC-encoded MP4 file. If a browser does not support either of these formats then the video is delivered as an H.264-encoded MP4 file (which is supported by almost every browser).

Last but not least, with `.delivery(format('auto'))` we can also reduce the quality of the video in a way that it won't be visible to us, humans but it will lead to us saving many many kilobytes.
