import Image from "next/image";

export function BrandLogo() {
  return (
    <span className="relative grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-xl bg-white ring-1 ring-slate-200">
      <Image src="/logo-beyond.png" alt="" width={56} height={56} className="absolute h-14 w-14 max-w-none" />
    </span>
  );
}