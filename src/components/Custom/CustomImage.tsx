"use client";
import Image, { ImageProps } from "next/image";

type CustomImageProps = ImageProps & {
  className?: string;
  alt?: string;
};

const CustomImage = ({ alt, className, ...props }: CustomImageProps) => {
  return <Image alt={alt} {...props} className={className} />;
};

export default CustomImage;