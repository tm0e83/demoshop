import Image from 'next/image';

type ImagePlaceholder = {
  width?: number;
  height?: number;
  label?: string;
}

export default function ImagePlaceholder({ width = 300, height = 225, label = 'No Image'}) {
  return (
    <Image
      src={`https://placehold.co/${width}x${height}/f1f5f9/1e293b?text=${label.replace(' ', '+')}`}
      alt={label}
      width={width}
      height={height}
      className="h-auto"
    />
  );
};