import { Navbar } from "@/components/navbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar admin />
      {children}
    </div>
  );
}
