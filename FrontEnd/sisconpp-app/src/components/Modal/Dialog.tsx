import { X, CircleAlert} from 'lucide-react';

interface DialogPropos {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    menssage: string;
}

export default function Dialog({ isOpen, onClose, onConfirm, menssage }: DialogPropos) {
    if (isOpen) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative">
                    <div className="flex flex-col items-center justify-center">
                        <CircleAlert size={40} color='#93000A'/>
                        <p className="font-medium text-center mt-2">{menssage}</p>
                        <div className="mt-4 flex justify-center space-x-2">
                            <button
                                onClick={onConfirm}
                                className="bg-error-onContainer text-error-on px-4 py-2 rounded hover:bg-red-950"
                            >
                                Confirmar
                            </button>
                            <button
                                onClick={onClose}
                                className="bg-surface-bright text-secondary-onFixed px-4 py-2 rounded hover:bg-surface-containerHigh"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        aria-label="Fechar"
                    >
                        <X size={20} color='#000'/>
                    </button>
                </div>
            </div>

        );
    } else {
        return null
    }
}