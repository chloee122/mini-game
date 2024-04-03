import { StageProvider } from '@/providers/stage';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <StageProvider>{children}</StageProvider>;
}
