export default function AuthLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto">
      <div className="flex items-start justify-center min-h-screen">
        <div className="mt-20">{children}</div>
      </div>
    </div>
  )
}
