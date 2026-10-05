import { create } from 'zustand';

interface InboxModalStore {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

const useInboxModal = create<InboxModalStore>((set) => ({
    isOpen: false,

    open: () => set({ isOpen: true }),

    close: () => set({ isOpen: false }),
}));

export default useInboxModal;