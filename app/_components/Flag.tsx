import Image from "next/image";

type FlagProps = {
  src: string;
  alt: string;
};

export function Flag({ src, alt }: FlagProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={20}
      height={20}
      className="block rounded-sm border border-gray-100 dark:border-gray-800"
    />
  );
}
