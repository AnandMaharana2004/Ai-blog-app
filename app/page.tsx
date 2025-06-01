
import { Nav } from "@/components/nav";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="mx-auto flex items-center w-screen">
      <Nav />
    </div>
  );
}
