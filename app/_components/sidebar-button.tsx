"use client"

import { ReactNode } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarButtonProps {
  href: string;
  children: ReactNode;
}

const SidebarButton = ({ href, children }: SidebarButtonProps) => {
  const usepath = usePathname();

  return (
    <Button
      variant={`${usepath === href ? "secondary" : "ghost"}`}
      className="justify-start"
      asChild
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};

export default SidebarButton;
