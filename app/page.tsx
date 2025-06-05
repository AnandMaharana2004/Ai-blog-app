
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Homepage from "@/pages/home";
import { signOut } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Homepage />
    </>
  );
}
