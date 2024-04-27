import Image from "next/image";
import { Inter } from "next/font/google";
import HotelsPage from "./HotelsPage/index";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <HotelsPage />
    </>
  );
}
