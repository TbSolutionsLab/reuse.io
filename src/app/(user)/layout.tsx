import { Navbar } from "~/components/pages/user/navbar";
import { ThemeToggle } from "~/components/shared/theme-toggle";


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col items-center justify-start w-full h-dvh">
      <Navbar user={false}/>
      <div className="flex w-full h-full">{children}</div>

      <ThemeToggle className="fixed bottom-4 right-4" />
    </main>
  );
}