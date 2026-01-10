import { useState } from "react";
import { Concurso } from "../types/Concurso";
import SideNavBar from '../components/SideNavBar/SideNavBar';
import Modal from '../../src/components/Modal/Modal';
import ConcursoList from "../components/Lists/ConcursoList";
import ConcursoForm from "../components/Forms/ConcursoForm";


export default function ConcursoPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [refreshList, setRefreshList] = useState(false);
    const [concursoToEdit, setConcursoToEdit] = useState < Concurso | undefined> (undefined);

    const openModal = () => {
        setConcursoToEdit(undefined);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setConcursoToEdit(undefined);
        setRefreshList(prev => !prev);
    };

    const handleEdit = (concurso: Concurso) => {
        setConcursoToEdit(concurso);
        setIsModalOpen(true);
    };

    const handleVisualizar = (concurso: Concurso) => {
        console.log('Visualizar', concurso);
    };

    const handleCredenciar = (concurso: Concurso) => {
        console.log('Credenciar', concurso);
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
                        Adicionar Concurso
                    </button>
                </div>

                <div className="w-full max-w-full h-full bg-secondary-light p-8 rounded-2xl shadow-lg">
                    <ConcursoList
                        key={refreshList.toString()}
                        onEdit={handleEdit}
                        onVisualizar={handleVisualizar}
                        onCredenciar={handleCredenciar}
                    />
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <ConcursoForm onClose={closeModal} concursoToEdit={concursoToEdit} />
            </Modal>
        </div>
    );
}