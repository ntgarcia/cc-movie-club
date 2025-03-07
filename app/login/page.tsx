"use client";

import { useRouter } from "next/navigation";
import { AuthForm } from "@/components/auth/auth-form";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <AuthForm onAuthSuccess={() => router.push("/")} />
      </div>
    </div>
  );
}
