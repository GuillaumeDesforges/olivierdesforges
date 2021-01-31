import { useEffect } from "react";
import { useRouter } from "next/router";
import GalleryPage from "./gallery";

const HomePage = () => {
  const router = useRouter();

  // return to gallery
  useEffect(() => {
    router.push("/gallery");
  });

  // preview gallery
  return GalleryPage;
};

export default HomePage;
