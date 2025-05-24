import { Asidebar, Header } from "~/components/shared/main";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";
import { AuthProvider } from "~/lib/context/auth-provider";


export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <SidebarProvider>
        <Asidebar />
        <SidebarInset>
          <main className="w-full">
            <Header />
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </AuthProvider>
  );
}
