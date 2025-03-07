"use client";

import { useState } from "react";
import { AuthForm } from "@/components/auth/auth-form";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [mode, setMode] = useState<"signin" | "signup">(
    "signin"
  );
  const router = useRouter();

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <AuthForm
          mode={mode}
          setMode={setMode}
          onAuthSuccess={() => router.push("/")}
        />
      </div>
    </div>
  );
}
