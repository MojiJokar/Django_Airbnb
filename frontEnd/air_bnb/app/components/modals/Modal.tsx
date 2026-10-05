"use client";

import { ReactNode } from "react";

interface ModalProps {
    isOpen: boolean;
    close: () => void;
    label: string;
    content: ReactNode;
}

const Modal = ({
    isOpen,
    close,
    label,
    content,
}: ModalProps) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="relative w-[90%] max-w-[500px] rounded-xl bg-white p-6 shadow-xl">

                {/* Close button */}
                <button
                    onClick={close}
                    className="absolute right-4 top-4 text-xl"
                    type="button"
                >
                    ×
                </button>

                {/* Modal title */}
                <h2 className="mb-6 text-2xl font-semibold">
                    {label}
                </h2>

                {/* Modal content */}
                <div>
                    {content}
                </div>

            </div>
        </div>
    );
};

export default Modal;