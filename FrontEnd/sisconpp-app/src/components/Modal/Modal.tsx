import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-neutral-surface p-6 rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-[#757871] hover:text-[#454841]"
                    aria-label="Fechar"
                >
                    <X size={20} />
                </button>
                {children}
            </div>
        </div>
    );
}