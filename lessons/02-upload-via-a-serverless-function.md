# ✍️ Lesson 02: Upload via a serverless function

In this exercise we'll take a look at how to create server-side uploads using serverless functions. Using the combination of Next.js and Vercel we can write [servless (lambda) functions](https://vercel.com/docs/concepts/functions/serverless-functions) with ease.

Such functions are useful because they are executed on a server and therefore we can created signed uploads to Cloudinary because this time we can not only specify a cloud name but we can safely add the Cloudinary API key and secret as well. There are many languages that you can write a serverless function in, we'll be utilising JavaScript and leverage [Cloudinary's Node.js SDK](https://cloudinary.com/documentation/node_integration).

There are two steps that we need to complete. The first one is to create the serverless function, the second is to create a page to invoke that function.

You may have noticed that there's an `api` folder in the `pages` folder in our project. Any JavaScript file that you add to the `pages/api` folder will be treated a lambda function.

There's quite a lot going on, so let's unpack it.

Every API route has access to a special `config` object which can [change the default configuration](https://nextjs.org/docs/api-routes/request-helpers).

Because we are sending the file in a raw format, we don't need to rely on the built-in bode parser parsing, so we are disabling it:

```js
export const config = {
  api: {
    bodyParser: false,
  },
};
```

We are also using a package called `formidable` (`npm i formidable`) which is a module that helps us with form data parsing for file uploads. Unfortunately at the time of creating this workshop `formidable` [(the `parse()` method)still doesn't support promises natively](https://github.com/node-formidable/formidable/issues/685). This means that we need to create a `Promise()` wrapper around it:

```js
const promisifyFormParser = (req) => {
  const form = new formidable.IncomingForm();
  return new Promise((resolve, reject) => {
    form.parse(req, (error, fields, files) => {
      if (error) {
        reject(error);
      } else {
        resolve({ files });
      }
    });
  });
};
```

The `uploadToCloudinary` function is where the main logic happens. We take the file sent via the upload form, and upload it to cloudinary. Because we have a `.env.local` file with a `CLOUDINARY_URL` environment variable, we don't need to configure anything and all files will be uploaded to the account specified in that variable. Do note that we are also doing some cleanup to avoid cluttering the filesystem henceforth we call `fs.unlinkSync` there which removes the file from the temporarily location when the file is successfully uploaded.

Every API route (lambda function) must have a `handler` function which is going to get executed when someone accesses the API route. In our case we make sure that this only happens when someone is using the POST HTTP method:

```js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    return postHandler(req, res);
  }
}
```
