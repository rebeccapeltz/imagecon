# Get Started

## Pre-requisites

- Please make sure to run the latest available [Node LTS](https://nodejs.org/en/download/) (`v16.x.x`). (Use `node -v` to see the currently installed version)
- Install the project dependencies by executing `npm i` in your terminal.

## Gather your environment variables

Please login to your [Cloudinary](https://cloudinary.com/users/login) account and note your `CLOUD_NAME`, and copy `CLOUDINARY_URL` string.

## Add your environment variables

- Create the following file:

  - `./.env.local`

- Add the following content to `./.env.local` replacing `...` with the values collected in the previous step. (Note that the value for NEXT_PUBLIC_CLOUD_NAME should be your Cloudinary cloud name.)

```
NEXT_PUBLIC_CLOUD_NAME=...
CLOUDINARY_URL=...
```

## Run the setup script

**⚠️Please make sure that you DO NOT have a folder `imagecon` already under your account. If you do, please contact an instructor first before running the below setup script.⚠️**

Once the environment variables have been set, please run `npm run setup` from the root of the project. This will setup all the necessary assets under your Cloudinary profile, into a folder called `imagecon`.

# Configure your Cloudinary account

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

# Start the project

To start the project in development mode, please run `npm run dev` from the CLI.

## Deployment

There are many ways to deploy a Next.js project and the [Next.js documentation](https://nextjs.org/docs/deployment) provides some options. To create a production build and serve it up locally for testing you can first run `npm run build` and then `npm start` from the CLI.
