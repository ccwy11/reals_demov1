// lib/stores/useWishlistStore.ts
import { create } from 'zustand';
import { removeFromWishlist, addToWishlist, getUserWishlist, getWishlistIds } from '@/server/wishlist';
import { toast } from 'sonner';

interface WishListStore {
    savedEventIds: Set<string>;
    isSaved: (eventId: string) => boolean;
    addEvent: (eventId: string) => void;
    removeEvent: (eventId: string) => void;
    toggleEvent: (eventId: string) => Promise<void>;
    hydrate: () => Promise<void>;
    isHydrated: boolean;
}

const useWishlistStore = create<WishListStore>((set, get) => ({
    savedEventIds: new Set<string>(),
    isHydrated: false,

    isSaved: (eventId: string) => {
        return get().savedEventIds.has(eventId);
    },

    addEvent: (eventId: string) => {
        set((state) => {
            const newSet = new Set(state.savedEventIds);
            newSet.add(eventId);
            return { savedEventIds: newSet };
        });
    },

    removeEvent: (eventId: string) => {
        set((state) => {
            const newSet = new Set(state.savedEventIds);
            newSet.delete(eventId);
            return { savedEventIds: newSet };
        });
    },

    toggleEvent: async (eventId: string) => {
        const { isSaved, addEvent, removeEvent } = get();
        const wasSaved = isSaved(eventId);

        try {
            const formData = new FormData();
            formData.append('eventId', eventId);

            if (wasSaved) {
                await removeFromWishlist(formData);
                removeEvent(eventId);
                toast.success('Removed from wishlist', {
                    description: 'You can add it back anytime.',
                    action: {
                        label: 'Undo',
                        onClick: () => addEvent(eventId),
                    },
                });
            } else {
                await addToWishlist(formData);
                addEvent(eventId);
                toast.success('Added to wishlist!', {
                    description: 'Event is saved.',
                });
            }
        } catch (error) {
            console.error('Error toggling wishlist event:', error);
            toast.error('Could not update wishlist');
        }
    },

    hydrate: async () => {
        const { isHydrated } = get();
        if (isHydrated) return;

        try {
       const ids = await getWishlistIds(); // ← Lightweight, fast
            if (Array.isArray(ids)) {
                set({
                    savedEventIds: new Set(ids.map(String)),
                    isHydrated: true,
                });
            } else {
                set({ isHydrated: true }); // Still prevent retry loop
            }
        } catch (error) {
            console.error('Error hydrating wishlist store:', error);
            set({ isHydrated: true }); // Still mark as hydrated to avoid retry loop
        }
    },
}));

export default useWishlistStore;