import Image from "next/image";
import Header from "./ui/header/header";
import { redirect } from 'next/navigation'

export default function Page() {
  redirect(`/movies/`)
  return (
    <>
    <h1>later</h1>
    </>
  );
}
