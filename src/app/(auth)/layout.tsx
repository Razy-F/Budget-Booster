import Logo from "@/components/Logo";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex-center bg-no-repeat flex-col bg-primary-50  min-h-screen w-full bg-dotted-pattern bg-cover bg-fixed bg-center">
      <Logo />
      {children}
    </div>
  );
}
