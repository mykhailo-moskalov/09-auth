"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ClientRedirect() {
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => router.push("/"), 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return null;
}
