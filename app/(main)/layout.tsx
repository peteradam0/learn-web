import MainHeader from "@/navigation/ui-adapter/main-navigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <MainHeader isAdmin={false} />
      <div>{children}</div>
    </div>
  );
}
