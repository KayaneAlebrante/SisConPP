import { useState } from "react";
import SideNavBar from "../components/SideNavBar/SideNavBar";
import ComissaoList from "../components/Lists/ComissaoList";
import Modal from "../components/Modal/Modal";
import ComissaoForm from "../components/Forms/ComissaoForm";
import { Comissao } from "../types/Comissao";

export default function ComissaoPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshList, setRefreshList] = useState(false);
  const [comissaoToEdit, setComissaoToEdit] = useState<Comissao | undefined>(undefined);

  const openModal = () => {
    setComissaoToEdit(undefined);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setRefreshList(prev => !prev); 
    setComissaoToEdit(undefined);
  };

  const handleEdit = (comissao: Comissao) => {
    setComissaoToEdit(comissao);
    setIsModalOpen(true);
  }

  return (
    <div className="flex flex-row min-h-screen w-full bg-neutral-background">
      <SideNavBar />

      <div className="flex-1 p-4 bg-neutral-background flex flex-col items-center overflow-y-auto">
        <div className="w-full max-w-5xl mt-10 mb-6 px-2 flex justify-end">
          <button
            onClick={openModal}
            className="bg-secondary-container text-white font-bold py-2 px-4 rounded-lg hover:bg-secondary-dark transition duration-300 ease-in-out"
          >
            Adicionar Comissão
          </button>
        </div>

        <div className="w-full max-w-6xl h-full bg-secondary-light p-8 rounded-2xl shadow-lg">
          <ComissaoList 
            key={refreshList.toString()} 
            onEdit={handleEdit}
          />
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ComissaoForm onClose={closeModal} comissaoToEdit={comissaoToEdit}/>
      </Modal>
    </div>
  );
}