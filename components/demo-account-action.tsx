"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, LogOut } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { setDemoAccount, useDemoAccount } from "@/lib/demo-account";

export function DemoAccountAction({ mode }: { mode: "login" | "logout" }) {
  const active = useDemoAccount();
  const router = useRouter();
  const isLogin = mode === "login";

  function handleClick() {
    if (!setDemoAccount(isLogin)) {
      toast.error("Penyimpanan tab tidak dapat diakses. Periksa pengaturan browser dan coba lagi.");
      return;
    }

    router.replace(isLogin ? "/akun" : "/login");
  }

  if (isLogin && active) {
    return (
      <Button asChild size="lg" className="w-full">
        <Link href="/akun">Buka akun saya <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
      </Button>
    );
  }

  return (
    <Button
      type="button"
      size="lg"
      variant={isLogin ? "primary" : "outline"}
      className={isLogin ? "w-full" : "w-full sm:w-auto"}
      disabled={active === null}
      onClick={handleClick}
    >
      {isLogin ? <ArrowRight className="h-4 w-4" aria-hidden="true" /> : <LogOut className="h-4 w-4" aria-hidden="true" />}
      {isLogin ? "Masuk dengan akun demo" : "Keluar dari akun demo"}
    </Button>
  );
}