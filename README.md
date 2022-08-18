# Get Started

## Pre-requisites

- Please make sure to run the latest available [Node LTS](https://nodejs.org/en/download/) (`v16.x.x`).
- Install the project dependencies by executing `npm i ` in your terminal.

## Gather your environment variables

Please login to your [Cloudinary](https://cloudinary.com/users/login) account and note your `CLOUD_NAME`, `API_KEY` and `API_SECRET` values.

## Add your environment variables

- Create the following two files:

  - `setup/.env`
  - `./.env.local`

- Add the following content to `setup/.env` replacing `...` with the values collected in the previous step.

```
CLOUD_NAME=...
API_KEY=...
API_SECRET=...
```

- Add the following content to `.env.local` replacing `...` with the values collected in the previous step.

```
NEXT_PUBLIC_CLOUD_NAME=...
API_KEY=...
API_SECRET=...
```

## Run the setup script

_Please make sure that you DO NOT have a folder `imagecon` already under your account. If you do, please contact an instructor first before running the below setup script._

Once the environment variables have been set, please run `npm run setup` from the root of the project. This will setup all the necessary assets under your Cloudinary profile, into a folder called `imagecon`.
