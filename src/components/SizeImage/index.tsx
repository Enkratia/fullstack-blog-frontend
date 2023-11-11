import Image from "next/image";
import React from "react";

type RemoteImageProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  style?: Record<string, string>;
};

export const SizeImage: React.FC<RemoteImageProps> = ({ ...props }) => {
  const getImageDimensions = (src: string) => {
    const lastDotIdx = src.lastIndexOf(".");
    const lastDefisIdx = src.lastIndexOf("-");

    const dimensions = src
      .slice(lastDefisIdx + 1, lastDotIdx)
      .split("x")
      .map((s) => Number(s));

    return dimensions;
  };

  const [width, height] = getImageDimensions(props.src);

  return (
    <Image
      src={props.src}
      alt={props.alt}
      width={width}
      height={height}
      sizes={props.sizes}
      style={props.style}
      className={props.className}
    />
  );
};
