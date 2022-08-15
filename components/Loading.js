const Loading = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <p className="py-6">
            <progress className="40" max="100"></progress>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
