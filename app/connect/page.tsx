"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ConnectPage() {
  const [partnerEmail, setPartnerEmail] = useState("");

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder: send invite
    console.log("connect", partnerEmail);
  };

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative flex flex-col">
      <div className="px-6 pt-12">
        <h1 className="text-3xl font-extrabold mb-6">Connect with your partner</h1>

        <form onSubmit={handleConnect} className="space-y-6">
          <Input
            placeholder="Partner's Email Address"
            value={partnerEmail}
            onChange={(e) => setPartnerEmail(e.target.value)}
          />

          <Button type="submit" className="w-full bg-destructive text-white py-4 text-lg font-medium rounded-lg">Connect</Button>

          <Link href="/" className="block text-center mt-2">
            <Button className="w-full bg-muted text-foreground py-4 text-lg font-medium rounded-lg">Not Now</Button>
          </Link>
        </form>
      </div>

      <div className="mt-auto">
        <div className="h-24" />
      </div>
    </div>
  );
}