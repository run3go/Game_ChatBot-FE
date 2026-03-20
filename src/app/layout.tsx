import Header from '@/components/common/Header';
import Sidebar from '@/components/common/Sidebar';
import '../assets/styles/globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="h-full" lang="en">
      <body className="flex h-full flex-col">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <div className="flex w-full justify-center bg-gray-50">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
