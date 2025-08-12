"use client";
import Image, { ImageProps } from "next/image";

type CustomImageProps = ImageProps & {
  className?: string;
  alt?: string;
  src: string;
};

const CustomImage = ({ src, alt, className, ...props }: CustomImageProps) => {
  return <Image src={src} alt={alt} {...props} className={className} />;
};

export default CustomImage;