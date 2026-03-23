import type { JSX } from 'react';
type TitleProps = {
  level?: number;
  children?: React.ReactNode;
  className?: string;
};
export default function Title({ level = 1, children, className }: TitleProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return <Tag className={`${className}`}>{children}</Tag>;
};

