import ErrorBoundary from '@/components/common/ErrorBoundary';
import Header from '@/components/common/Header';
import Sidebar from '@/components/common/Sidebar';
import type { Metadata } from 'next';
import '../assets/styles/globals.css';

export const metadata: Metadata = {
  title: '무물봇',
  description: '나에게 특화된 게임 챗봇',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="h-full" lang="ko">
      <body className="flex h-full flex-col">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <div className="flex w-full justify-center bg-gray-50">
            <ErrorBoundary>{children}</ErrorBoundary>
          </div>
        </div>
      </body>
    </html>
  );
}
