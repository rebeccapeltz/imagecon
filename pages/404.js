{
  /* eslint-disable @next/next/no-img-element */
}
import Link from 'next/link';

export default function FourOhFour() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          src="https://res.cloudinary.com/tamas-demo/image/upload/v1659687906/imagecon/404.jpg"
          alt="Page not found"
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-5xl font-bold">404</h1>
          <p className="py-6">This is not the page you are looking for.</p>
          <Link href="/">Go back to Home 👈</Link>
        </div>
      </div>
    </div>
  );
}
