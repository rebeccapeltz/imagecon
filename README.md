# 🧑‍💻 Developing Applications with Next.js and Cloudinary's APIs

This workshop will teach you how to utilise Cloudinary's powerful media APIs in a Next.js application to create media rich and performant websites.

Demo: https://imagecon.vercel.app

- [Workshop Overview](#-workshop-overview)
- [Before the Workshop](#-before-the-workshop)
- [Setup](#-setup)
- [The Workshop](#-the-workshop)
- [Support](#-support)
- [Your Instructors](#-instructors)

# 🤝 Workshop Overview

During the workshop we'll discuss the following topics:

- Integrating the Cloudinary Upload Widget to a Next.js Application
- Utilising Next.js's API endpoints / serverless functions to upload images to Cloudinary
- Display images in a responsive image gallery
- Apply transformation and optimisation to images
- Display optimised and intelligently transformed videos in a Next.js app

# 😊 Before the workshop

To have a smooth experience during the workshop, please make sure that you follow a few simple suggestions. Please make sure that your environment is setup with the appropriate version of Node.js installed (more details in the [Setup](#-setup) section).

Please also make sure to have installed the following:

- [git](https://git-scm.com/)

And have an account with the following providers:

- [GitHub](https://github.com)
- [Cloudinary](https://cloudinary.com)
- [Vercel](https://vercel.com)

On top of these please have your favourite code editor and terminal ready.

# 🧮 Setup

## Pre-requisites

- Please make sure to run the latest available [Node LTS](https://nodejs.org/en/download/) (`v16.x.x`). (Use `node -v` to see the currently installed version)
- Install the project dependencies by executing `npm i` in your terminal.

## Gather your environment variables

Please login to your [Cloudinary](https://cloudinary.com/users/login) account and note your `CLOUD_NAME`, and copy the `CLOUDINARY_URL` (API Environment variable) string.

## Clone the starter template from GitHub

We have created a starter template, which you can grab from GitHub by running the following command: `npx create-next-app@latest --use-npm --example https://github.com/!!!!!! XOXOXOXOX`

## Add your environment variables

- Create the following file at the root of the project:

  - `.env.local`

- Add the following content to `.env.local` replacing `...` with the values collected in the previous step. (Note that the value for `NEXT_PUBLIC_CLOUD_NAME` should be your Cloudinary cloud name. Please also note that if copied automatically from the Cloudinary UI, the `CLOUDINARY_URL` prefix will also be copied, there's no need to add that twice)

```
NEXT_PUBLIC_CLOUD_NAME=...
CLOUDINARY_URL=...
```

## Run the setup script

**⚠️Please make sure that you DO NOT have a folder `imagecon` already under your account. If you do, please contact an instructor first before running the below setup script.⚠️**

Once the environment variables have been set, please run `npm run setup` from the root of the project. This will setup all the necessary assets under your Cloudinary profile, into a folder called `imagecon`.

## Configure your Cloudinary account

Navigate to your Cloudinary account and find Settings -> Security.
Find the Resource List selector and uncheck the `restricted media types` checkbox.

## Create upload presets

Navigate to Settings -> Upload and find the upload preset section.

Create the following two presets:

```
preset name: imagecon-uw
signing mode: unsigned
folder: imagecon
```

Make sure to hit save after your edits.

Then, duplicate the `imagecon-uw` preset, rename the duplicate to `tag-as-coffee`. Edit its settings, find `Media Analysis and AI` and under `Tags` add `coffee`. Make sure to hit save after your edits.

## Starting the project

To start the project in development mode, please run `npm run dev` from the CLI.

# ✨ The Workshop

Please find the lesson plan for the workshop below.

- [00 - The Baseline Next.js Project](lessons/00-the-baseline-nextjs-project.md)
- [01 - Upload with the Cloudinary Upload Widget](lessons/01-upload-with-the-cloudinary-upload-widget.md)
- [02 - Upload via a serverless function](lessons/02-upload-via-a-serverless-function.md)
- [03 - Create an image gallery](lessons/03-create-an-image-gallery.md)
- [04 - Displaying videos](lessons/04-displaying-videos.md)
- [05 - Cloudinary Video Player](lessons/05-cloudinary-video-player.md)

# ℹ️ Support

During the workshop we'll be using [Discord]() to communicate and share code and potentially files. Since you'll be joining the Cloudinary Community Discord, you can get support at the various channels even after the event!

# 👋 Your Instructors

- Rebecca Peltz [LinkedIn](https://www.linkedin.com/in/rebeccapeltz)
- Colby Fayock [LinkedIn](https://www.linkedin.com/in/colbyfayock)
- Tamas Piros [LinkedIn](https://linkedin.com/in/tpiros)
