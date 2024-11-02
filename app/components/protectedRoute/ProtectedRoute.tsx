"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/utils/authHelpers";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/login");
    }
  }, [router]);

  return isAuthenticated() ? <>{children}</> : null;
}
