import Title from '@/components/title';
export default function PageTitle({ center, children }: { center?: boolean; children: React.ReactNode }) {
  return <Title className={`page-title font-light uppercase ${center ? 'text-center' : ''}`}>{children}</Title>;
};

