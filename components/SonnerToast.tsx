'use client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Heart, Trash2 } from 'lucide-react';

export const wishlistToast = {
  add: (name: string) =>
    toast.success('Saved to wishlist!', {
      description: name,
      icon: <Heart className="w-5 h-5 text-red-500" fill="currentColor" />,
      action: {
        label: 'View',
        onClick: () => (window.location.href = '/wishlist'),
      },
    }),
  remove: (name: string) =>
    toast.success('Removed', {
      description: name,
      icon: <Trash2 className="w-5 h-5 text-red-500" />,
      action: {
        label: 'Undo',
        onClick: () => toast('Restored!', { duration: 1000 }),
      },
    }),
};