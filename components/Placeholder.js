const Placeholder = ({ loading }) => {
  return (
    <div className="max-w-sm rounded-lg shadow-2xl">
      <div className={`${loading ? 'animate-pulse' : ''} flex`}>
        <div className="rounded-lg bg-blue-400 h-56 w-56 dtext-blue-500 items-center justify-center"></div>
      </div>
    </div>
  );
};

export default Placeholder;
