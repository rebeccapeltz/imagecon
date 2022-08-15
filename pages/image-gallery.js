import CloudinaryImage from '../components/CloudinaryImage';
import { Cloudinary } from '@cloudinary/url-gen';

import useSWR from 'swr';
import Loading from '../components/Loading';
const fetcher = (...args) => fetch(...args).then((res) => res.json());
export default function ImageGallery() {
  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.NEXT_PUBLIC_CLOUD_NAME,
    },
  });

  const { data, error } = useSWR('/api/gallery', fetcher);
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
              <CloudinaryImage publicId={result.public_id} gallery={true} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
