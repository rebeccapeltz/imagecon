# ✍️ Lesson 00: The Baseline Next.js Project

We are not going to cover the basic setup for Next.js but we thought to add this small Readme to explain all the things that you receive out of the box for this workshop.

We are using [Next.js](https://nextjs.org), a popular React framework created by [Vercel](https://vercel.com). In their own words:

> Next.js gives you the best developer experience with all the features you need for production: hybrid static & server rendering, TypeScript support, smart bundling, route pre-fetching, and more. No config needed.

The basic setup also includes [TailwindCSS](https://tailwindcss.com) and we have set it up to [work with Next.js](https://tailwindcss.com/docs/guides/nextjs). Again, in their own words, TailwindCSS is:

> A utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup.

We have also setup [DaisyUI](https://daisyui.com) with the project which is "The most popular, free and open-source Tailwind CSS component library".

# Create the basic application

In this section we'll walk you through how we have created the baseline application, things that we have configured and setup.

To create a Next.js application you can use `create-next-app` (note below we are configuring the `cli` to use `npm`. The other option is to use `yarn`):

```
npx create-next-app@latest --use-npm
```

You'll be presented with a prompt, and the only thing you need to specify is the name of the project. All the necessary dependencies will be then installed.

## Installing Cloudinary specific libraries

As we are displaying a few images already (such as an image on the `404` page) we need to install and configure Cloudinary libraries. The two that we use now are `@cloudinary/react` and `@cloudinary/url-gen`. We'll dvelve deeper into what these packages do and how they work at a later point in time. For now just understand that they are required for us to display images in the starter template. You can install both at the same time: `npm i @cloudinary/react @cloudinary/url-gen`.

## TailwindCSS and DaisyUI

As mentioned earlier, we are using TailwindCSS with DaisyUI for styling purposes. You can follow the tutorials from the previous section to setup and configure both of these libraries. The only thing that is required is to enable DaisyUI for the project, so we have modified `tailwind.config.js` to look like this:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
};
```

> Note the `plugins: [require('daisyui')],` part.

## Layout and Components

While there are many ways to architect a Next.js application there are a couple of industry best practices. We have created a `components` folder where we have added three files:

- `Layout.js`
- `Navigation.js`
- `Footer.js`

### Layout.js

Layout.js is an important file as that allows us to apply an [overall styling and layout](https://nextjs.org/docs/basic-features/layouts) to the entire project.

> Please note that this is different from creating a [Custom `App` in Next.js](https://nextjs.org/docs/advanced-features/custom-app).

We also had to update `_app.js` - which is a special file in Next.js - to utilise the custom layout:

```js
import Layout from '../components/Layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
```

### Navigation.js and Footer.js

Since we wanted to have a global navbar and a footer, we created these as components as well. This is how the final `Layout.js` file looks like:

```js
import Footer from '../components/Footer';
import Navigation from './Navigation';
export default function Layout({ children }) {
  return (
    <>
      <div className="flex flex-col h-screen justify-between">
        <Navigation />
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </>
  );
}
```

> `children` is a special prop that will be replaced with essentially the content which can be components or anything else really.

# Pages and routing

Next.js utilises [file based routing](https://nextjs.org/docs/routing/introduction) and as such for us to create a new route means that we can just create a new file. All such files should be added to the `pages` folder. We have added all the required files already, although they are missing content, which we'll add together.
