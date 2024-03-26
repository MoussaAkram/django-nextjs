import ListMovie from '@/app/ui/movie/listMovie';
import '../../globals.css'
import Carousels from '../../ui/carousel/carousels'

export default function Page() {
  return (
    <>
      <div className="">
        <Carousels />
        <div className='pb-40'>
        <ListMovie />
        </div>
      </div>
    </>
  );
}