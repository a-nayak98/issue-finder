import { Heading } from "@radix-ui/themes";
import Image from "next/image";
import imagePath from "./assets/images/bug-img1.png";

export default function Home() {
  return (
    <>
      <section className="w-full h-full flex flex-col">
        <div className="top border-b h-[60vh] w-full flex">
          {/* welcome text  */}
          <div>
          <h2>Hi there </h2>
          <Heading as="h2" size="6"> The quick brown fox jumps over the lazy dog</Heading>
          </div>
          <div className="w-[50%] h-full object-cover">
            <Image src={imagePath} alt="banner-img" />
          </div>
          {/* image for left side */}
        </div>
        <div className="bottom">
          <h3 className="text-3xl text-gray-600 font-bold">Go to Dashboard Page to see the alloted bugs</h3>
        </div>
      </section>
    </>
  );
}
