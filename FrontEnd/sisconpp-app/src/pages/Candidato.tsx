import { useState } from 'react';
import SideNavBar from '../components/SideNavBar/SideNavBar';
import Modal from '../../src/components/Modal/Modal';
import { type Candidato } from '../types/Candidato';
import CandidatoList from '../components/Lists/CandidatoList';
import CandidatoForm from '../components/Forms/CandidatoForm';

export default function CandidatoPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [refreshList, setRefreshList] = useState(false);
    const [candidatoToEdit, setCandidatoToEdit] = useState<Candidato | undefined>(undefined);

    const openModal = () => {
        setCandidatoToEdit(undefined);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCandidatoToEdit(undefined);
        setRefreshList(prev => !prev);
    };

    const handleEdit = (candidato: Candidato) => {
        setCandidatoToEdit(candidato);
        setIsModalOpen(true);
    };

    const handleVisualizar = (candidato: Candidato) => {
        console.log('Visualizar:', candidato);
    };

    const handleCredenciar = (candidato: Candidato) => {
        console.log('Credenciar:', candidato);
    };

    return (
        <div className="flex flex-row min-h-screen w-full bg-neutral-background">
            <SideNavBar />

            <div className="flex-1 p-6 bg-neutral-background flex flex-col items-center overflow-y-auto">
                <div className="w-full max-w-full mt-10 mb-6 px-2 flex justify-end">
                    <button
                        onClick={openModal}
                        className="bg-secondary-container text-white font-bold py-2 px-4 rounded-lg hover:bg-secondary-dark transition duration-300 ease-in-out"
                    >
                        Adicionar candidato
                    </button>
                </div>

                <div className="w-full max-w-full h-full bg-secondary-light p-8 rounded-2xl shadow-lg">
                    <CandidatoList
                        key={refreshList.toString()}
                        onEdit={handleEdit}
                        onVisualizar={handleVisualizar}
                        onCredenciar={handleCredenciar}
                    />
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <CandidatoForm onClose={closeModal} candidatoToEdit={candidatoToEdit} />
            </Modal>
        </div>
    );
}