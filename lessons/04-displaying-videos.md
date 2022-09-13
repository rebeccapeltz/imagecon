# ✍️ Lesson 04: Displaying Videos

We've covered a fair bit about working with images. However, videos are also becoming more prominent on the internet. Cloudinary has the right capabilities to store, optimise, transform and deliver video assets as well.

In this section of the workshop we'll take a look at how to work with videos. Luckily for us, the `@cloudinary/react` package does not only expose an `<AdvancedImage>` component but also an `<AdvancedVideo>`. This means that we can apply optimisation and transformations to any video that has been uploaded to our Cloudinary account and - similarly with images - pass it as a prop to the `<AdvancedVideo>` component:

```js
const myVideo = cld.video('imagecon/ship');
myVideo
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

The `autoGravity()` method is new. As you can see we are reducing the dimensions of the video to `500x500`. That alone would just create a crop, which, in the case of a video may not be the right crop. In fact, in our example, we have a video of a ship. With a normal crop, we are missing out on the action because we are not always seeing the ship. With `autoGravity()` we can crop the video and follow the action. We call this [content aware cropping](https://cloudinary.com/blog/automatically_crop_videos_without_losing_focus).
