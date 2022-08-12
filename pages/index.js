{
  /* eslint-disable @next/next/no-img-element */
}
export default function Home() {
  return (
    <div className="hero">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">ImageCon 2022</h1>
          <p className="py-6">
            <img
              src="https://res.cloudinary.com/tamas-demo/image/upload/f_auto,q_auto,dpr_2.0/w_250/imagecon/cloudinary-blue"
              alt="Cloudinary logo"
            />
            <span style={{ fontSize: '75px' }}>❤️</span>
            <img
              src="https://res.cloudinary.com/tamas-demo/image/upload/f_auto,q_auto/w_250,dpr_2.0/imagecon/nextjs-light"
              alt="Next.js logo"
            />
          </p>
        </div>
      </div>
    </div>
  );
}
