import { useState } from "react";
import SideNavBar from "../components/SideNavBar/SideNavBar";
import AuxiliaresList from "../components/Lists/AuxiliaresList";
import Modal from "../components/Modal/Modal";
import AuxiliarForm from "../components/Forms/AuxiliarForm";
import { Usuario } from "../types/Usuario";

export default function AuxiliaresPage(){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [refreshList, setRefreshList] = useState(false);
    const [auxiliarToEdit, setAuxiliarToEdit] = useState<Usuario | undefined>(undefined);

    const openModal = () => {
        setAuxiliarToEdit(undefined);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setAuxiliarToEdit(undefined);
        setRefreshList(prev => !prev);
    };

    const handleEdit = (auxiliar: Usuario) => {
        setAuxiliarToEdit(auxiliar);
        setIsModalOpen(true);
    };

    const handleVisualizar = (auxiliar: Usuario) => {
        console.log('Visualizar:', auxiliar);
    };

    const handleCredenciar = (auxiliar: Usuario) => {
        console.log('Credenciar:', auxiliar);
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
                        Adicionar Auxiliar
                    </button>
                </div>

                <div className="w-full max-w-6xl h-full bg-secondary-light p-8 rounded-2xl shadow-lg">
                    <AuxiliaresList
                        key={refreshList.toString()}
                        onEdit={handleEdit}
                        onVisualizar={handleVisualizar}
                        onCredenciar={handleCredenciar}
                    />
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <AuxiliarForm onClose={closeModal} auxiliarToEdit={auxiliarToEdit} />
            </Modal>
        </div>
    );
}