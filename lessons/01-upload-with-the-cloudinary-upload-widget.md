# ✍️ Lesson 01: Upload with the Cloudinary Upload Widget

Cloudinary's [Upload widget](https://cloudinary.com/documentation/upload_widget) is a complete, interactive user interface that enables your users to upload files from a variety of sources to your website or application. The widget, requiring just a couple lines of code to integrate, eliminates the need to develop in-house interactive media upload capabilities.

Simply put, it is a highly configurable, drop-in upload tool that you can integrate with any application - including our Next.js app as well.

# `upload-widget-demo.js`

In this page we are showing how to integrate the Upload Widget with Next.js. For abstraction we will also add a component called `UploadWidget` which will, in turn, use a service. The purpose of these is to smoothly integrate the upload widget.


There are multiple [methods exposed via the upload widget JavaScript library](https://cloudinary.com/documentation/upload_widget_reference#initialization_methods). The one that we are using here is `openUploadWidget` which creates a widget and then opens it. It also accepts a list of options where we can [apply customisations](https://cloudinary.com/documentation/upload_widget) to the upload widget.

Let's take a look at the relevant section to see what exact customisations we have added:

```js
const configureAndOpenWidget = () => {
  const presets = ['tag-as-coffee'];
  const getUploadPresets = (callback) => callback(presets);
  const myUploadWidget = openUploadWidget(
    {
      cloudName: process.env.NEXT_PUBLIC_CLOUD_NAME,
      uploadPreset: 'imagecon-uw',
      sources: ['local'],
      showAdvancedOptions: true,
      getUploadPresets,
    },
    callback
  );
  myUploadWidget.open();
};
```

- `cloudName` is the cloudname where all the images will be uploaded
- `uploadPreset` is the default upload preset used for all the uploads
- `sources` is an array of sources, currently set to local. Other options can include url, or camera and even third party services such as Dropbox, Facebook, Image Search, Instagram and many others.
- `showAdvancedOptions` enables the advanced feature selection to display the last option, which is:
- `getUploadPresets`. This option lists additional presets (in our case `tag-as-coffee`) allowing users doing the upload to select from a list of presets.

All images uploaded via the Upload Widget will go to the Cloudinary account specified using the `cloudName` parameter.

## `utils/CloudinaryService.js`

<I would explain what this service does. I moved out from under UploadWidget so you might want to reference from there>

# Next lesson

[Lesson 02: Upload via a serverless function](./02-upload-via-a-serverless-function.md)
