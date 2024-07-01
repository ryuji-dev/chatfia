import { HomeProps } from "@/app/types/home";
import Image from "next/image";

const ImageWithTextLeft: React.FC<HomeProps> = ({ title, text, img }) => {
  return (
    <div className="flex items-center justify-center space-x-32 pb-20 pt-20 font-bold">
      <div>
        <div className="mb-4 text-4xl">{title}</div>
        <div className="text-lg">{text}</div>
      </div>
      <Image
        src={img}
        alt="마피아게임"
        width={600}
        height={300}
        priority={true}
      />
    </div>
  );
};

export default ImageWithTextLeft;
