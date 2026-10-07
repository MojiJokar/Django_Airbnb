'use client';

import Modal from "./Modal";
import useInboxModal from "@/app/hooks/useInboxModal";

const InboxModal = () => {
    const inboxModal = useInboxModal();

    const content = (
        <div className="space-y-4">
            <div className="p-4 border rounded-xl">
                <p className="font-medium">No messages yet</p>
                <p className="text-gray-500 text-sm">
                    Your messages will appear here.
                </p>
            </div>
        </div>
    );

    return (
        <Modal
            isOpen={inboxModal.isOpen}
            close={inboxModal.close}
            label="Inbox"
            content={content}
        />
    );
};

export default InboxModal;