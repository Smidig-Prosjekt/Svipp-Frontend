import { AuthSessionProvider } from "../components/authContext";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthSessionProvider>
        {children}
    </AuthSessionProvider>
  );
}
