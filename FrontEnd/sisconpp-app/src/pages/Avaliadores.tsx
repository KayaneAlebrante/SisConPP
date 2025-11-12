import { useState } from 'react';
import SideNavBar from '../components/SideNavBar/SideNavBar';
import AvaliadorList from '../../src/components/Lists/AvaliadoresList';
import Modal from '../../src/components/Modal/Modal';
import AvaliadorForm from '../../src/components/Forms/AvaliadoresForm';
import type { Usuario } from '../../src/types/Usuario';

export default function AvaliadoresPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [refreshList, setRefreshList] = useState(false);
    const [avaliadorToEdit, setAvaliadorToEdit] = useState<Usuario | undefined>(undefined);

    const openModal = () => {
        setAvaliadorToEdit(undefined);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setAvaliadorToEdit(undefined);
        setRefreshList(prev => !prev);
    };

    const handleEdit = (avaliador: Usuario) => {
        setAvaliadorToEdit(avaliador);
        setIsModalOpen(true);
    };

    const handleVisualizar = (avaliador: Usuario) => {
        console.log('Visualizar:', avaliador);
    };

    const handleCredenciar = (avaliador: Usuario) => {
        console.log('Credenciar:', avaliador);
    };

    return (
        <div className="flex flex-row min-h-screen w-full bg-neutral-background">
            <SideNavBar />

            <div className="flex-1 p-4 bg-neutral-background flex flex-col items-center overflow-y-auto">
                <div className="w-full max-w-5xl mt-10 mb-6 px-2 flex justify-end">
                    <button
                        onClick={openModal}
                        className="bg-secondary-container text-white font-bold py-2 px-4 rounded-lg hover:bg-secondary-dark transition duration-300 ease-in-out"
                    >
                        Adicionar Avaliador
                    </button>
                </div>

                <div className="w-full max-w-6xl h-full bg-secondary-light p-8 rounded-2xl shadow-lg">
                    <AvaliadorList
                        key={refreshList.toString()}
                        onEdit={handleEdit}
                        onVisualizar={handleVisualizar}
                        onCredenciar={handleCredenciar}
                    />
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <AvaliadorForm onClose={closeModal} avaliadorToEdit={avaliadorToEdit} />
            </Modal>
        </div>
    );
}