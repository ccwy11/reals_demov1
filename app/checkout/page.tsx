"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import BottomNavigation from "@/components/Bottomnav";
import BookingSummary from "@/components/BookingSummary";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const sampleItem = {
  id: 1,
  title: "Tung Hing Glass & Pottery - Evening Workshop",
  date: "2025/11/12",
  location: "Wan Chai",
  price: "$250",
  image: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=1200&h=700&fit=crop"
};

export default function CheckoutPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [email, setEmail] = useState("");
  const [processing, setProcessing] = useState(false);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    // Simulate payment processing
    await new Promise((r) => setTimeout(r, 1000));
    const reference = "BK" + Math.random().toString(36).slice(2, 9).toUpperCase();
    router.push(`/confirm-booking?ref=${reference}`);
  };

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative">
      <AppHeader title="Checkout" showSearch={false} />

      <div className="px-4 pb-28 pt-4 space-y-4">
        <BookingSummary item={sampleItem} />

        <div className="bg-card rounded-lg p-4 shadow-sm border border-border">
          <h3 className="text-lg font-semibold mb-3">Payment details</h3>
          <form onSubmit={handlePay} className="space-y-3">
            <Input placeholder="Name on card" value={name} onChange={(e) => setName(e.target.value)} />
            <Input placeholder="Card number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="MM/YY" value={expiry} onChange={(e) => setExpiry(e.target.value)} />
              <Input placeholder="CVC" value={cvc} onChange={(e) => setCvc(e.target.value)} />
            </div>
            <Input placeholder="Billing email" value={email} onChange={(e) => setEmail(e.target.value)} />

            <Button type="submit" className="w-full bg-primary text-white py-4 text-lg font-medium rounded-lg" disabled={processing}>
              {processing ? "Processing…" : "Pay $250"}
            </Button>
          </form>
        </div>

        <div className="text-sm text-muted-foreground">By completing this payment you agree to our terms and conditions.</div>
      </div>

      <BottomNavigation />
    </div>
  );
}