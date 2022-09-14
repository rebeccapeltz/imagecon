# ✍️ Lesson 03: Create an image gallery

At this point we know how to upload images to Cloudinary using the Upload Widget as well as via an API endpoint in a Next.js application. It's time to discuss how to display images.

## Cloudinary and Image Delivery

Cloudinary can not only store your media assets but we also help you to deliver them. Let's talk a little bit about what's going on behind the scenes. Once you upload an image you are given an access URL to access that image, for example: [`https://res.cloudinary.com/demo/image/upload/woman`](https://res.cloudinary.com/demo/image/upload/woman). Let's dissect the URL:

- `https://res.cloudinary.com` is the default, shared CDN distribution. Cloudinary is a [multi-vendor CDN solution](https://demo.cloudinary.com/multi-cdn).
- `demo` is the Cloudinary username.
- `image/upload` really means that we are requesting an image that was uploaded. Other options include [fetch](https://cloudinary.com/documentation/fetch_remote_images) for example.
- `woman` is what we refer to as the [public id](https://cloudinary.com/documentation/upload_images#public_id). In other words this is what uniquely idenifies the asset in Cloudinary.

Now that the basics are out of the way, let's discuss how we can deliver this image in a more optimal way. Cloudinary offers two super easy ways to optimise images via the [`q_auto`](https://cloudinary.com/documentation/image_optimization#automatic_quality_selection_q_auto) and [`f_auto`](https://cloudinary.com/documentation/image_optimization#automatic_format_selection_f_auto) flags. `q_auto` will reduce the quality in a way that it'll be inpercible for humans and `f_auto` will always serve the best image format based on a few factors such as the browser that is being used to display the image.

If you open this image now, you will see that the image size has been reduced (when compared to the "original" version of the image). Opening the image in Chrome will render a `webp` version while opening it in Safari will create a `JPEG 2000` version.

[`https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/woman`](https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/woman)

So that's the basics out of the way. Cloudinary can do a lot more including changing the dimensons of the image, add over and underlays and many many other things. And the good news? We can do all of this programatically.

# `@cloudinary/react` and `@cloudinary/url-gen`

Using the combination of these packages allows you to display, transform and optimise any image (and video). The `@cloudinary/react` package exposes a component which can be used to display an image from Cloudinary while the `@cloudinary/url-gen` package can apply any transformation to media assets.

We have created a component called `CldImage.js` which you can find in the `components` folder to create an abstraction over these libraries. Lets take a look at how images for the gallery will be displayed:

```js
const myImage = cld
  .image(publicId)
  .resize(thumbnail().width(400).height(400))
  .overlay(
    source(
      image('imagecon/cloudinary-blue').transformation(
        new Transformation().resize(scale(50)).adjust(opacity(90))
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
    style={{ maxWidth: '100%' }}
    plugins={[responsive(), placeholder()]}
    className="max-w-sm rounded-lg shadow-2xl"
  />
```

This may look complex but in reality it's nothing to worry about. First off, the `@cloudinary/url-gen` package makes use of [tree shaking](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking) to reduce the final JavaScript bundle size.

we create a `myImage` variable that has a number of transformations. The image dimensions are reduced to `400x400`. Then we add a new overlay to the image - we place the cloudinary logo (identified by `imagecon/cloudinary-blue`) as a watermark to the `south_east` corner, 5px aligned from the bottom right corner. The final image also benefits from `f_auto` and `q_auto` via ` .delivery(format('auto')).delivery(quality('auto'));`

The `CldImage` component returns `<AdvancedImage>` which is the aforementioned component exposed by the `@cloudinary/react` package. We also add the `responsive()` and `placeholder()` plugins to that component along with the `myImage` component as the `cldImg` `prop` creating a responsive image component.

All that's left is to use this `CldImage` component. But the question is, how do we gather the images? Astute readers may have noticed that the `CldImage` component also has capabilities to work with images outside the gallery (determined by the `gallery` `prop`). In fact, when you first opened the starter, the images (including the image on the `404` page makes use the `CldImage` component. Don't believe us? Check out the implementation of `404.js` and seee it in action here: [localhost:3000/does-not-exist](localhost:3000/does-not-exist).)

# Serverless function to the rescue

We would like to demonstrate another cool Cloudinary feature. When you run the setup script, we have automatically assigned the 'coffee' tag to a few images. Wouldn't it be nice if you could [list all the images sharing the same tag](https://support.cloudinary.com/hc/en-us/articles/203189031-How-to-retrieve-a-list-of-all-resources-sharing-the-same-tag-)? Based on what we've learned before we can achieve this via a serverless function. Notice that we have a file in the `pages/api` folder called `gallery.js`. This function does the following:

- Calls `cloudinary.url('coffee.json')` which returns an actual URL that will have a list of images sharing the same tag (in this case `coffee`)
- We take that URL and make a Fetch API request to return all the images tagged as coffee.

# SWR (Stale While Revalidate)

SWR is not a new concept (it was first discussed in 2010), however it got very popular recently due to its [implementation on the Vercel platform](https://swr.vercel.app). The concept is simple - first we return data from the cache (stale), and in the background we make a request to a resource (revalidate) and update the dataset. What's amazing about this approach is that it works pretty much out of the box using Vercel and Next.js. (Do note that you need to install it separately via `npm i swr`).

The process is simple. Open the application in two separate windows. In one, open the image gallery, on the second one, open the Upload Widget, _make sure to select the upload widget 'tag-as-coffee' preset PRIOR to selecting the image to upload_. Once the image has finished uploading, it'll also be added to the coffee collection. Without having to refresh the gallery, the new image should appear after a few seconds.
