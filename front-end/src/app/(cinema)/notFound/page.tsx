import Link from 'next/link';
import { FaceFrownIcon } from '@heroicons/react/24/outline';

export default function Page() {
  return (
    <main className="flex h-full flex-col mt-44 items-center justify-center gap-2">
      <FaceFrownIcon className="w-10 text-white" />
      <h2 className="text-xl text-white font-semibold">404 Not Found</h2>
      <p>Could not find this page.</p>
      <Link
        href="/movies"
        className="py-2.5 px-5 me-2 mb-2 text-sm font-medium  focus:outline-none  rounded-lg border focus:z-10 focus:ring-4  focus:ring-gray-700 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700"
      >
        Go Back
      </Link>
    </main>
  );
}