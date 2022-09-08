import useSWR from 'swr';
import CldImage from '../components/CldImage';
import DisplayError from '../components/DisplayError';
import Loading from '../components/Loading';

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

export default function ImageGallery() {
  const { data, error } = useSWR('/api/gallery', fetcher);
  if (error) return <DisplayError error={error.info} />;
  if (!data) return <Loading />;

  return (
    <div className="mx-auto p-8">
      <div className="flex flex-row flex-wrap -mx-2">
        {data.results.map((result, i) => {
          return (
            <div
              className="xl:w-1/3 lg:w-1/2 md:w-1/2 sm:w-1/2 xs:w-full sm:w-full w-full mb-4 sm:mb-4 px-2"
              key={i}
            >
              <CldImage publicId={result.public_id} gallery={true} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
