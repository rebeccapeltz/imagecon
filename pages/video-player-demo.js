import VideoPlayer from '../components/VideoPlayer';

export default function VideoPlayerDemo() {
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div>
            <h1 className="text-5xl font-bold p-10">Cloudinary Video Player</h1>
            <VideoPlayer source="imagecon/puntacana" />
          </div>
        </div>
      </div>
    </>
  );
}
