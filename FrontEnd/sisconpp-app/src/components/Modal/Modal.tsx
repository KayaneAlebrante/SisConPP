import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-neutral-surface p-6 rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative">
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