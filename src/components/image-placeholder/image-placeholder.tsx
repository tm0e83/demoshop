import styles from './image-placeholder.module.css';
import Image from 'next/image';

type ImagePlaceholder = {
  width?: number;
  height?: number;
  label?: string;
  round?: boolean;
}

export default function ImagePlaceholder({ width = 300, height = 300, label = 'No image', round = false }: ImagePlaceholder) {
  return (
    <Image
    

      src={`https://images.placeholders.dev/?width=${width}&height=${height}&text=${label.replace(' ', '+')}&bgColor=%23ebf4f3&textColor=%23a9d0cb&fontWeight=300&fontSize=16&format=png`}
      // src={`https://placehold.co/${width}x${height}/f1f5f9/1e293b?text=${label.replace(' ', '+')}`}
      alt={label}
      width={width}
      height={height}
      className={`${styles.image} ${round ? styles.rounded : ''}`}
    />
  );
};