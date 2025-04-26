import { useState } from 'react';
import SideNavBar from '../components/SideNavBar/SideNavBar';
import CTGList from '../../src/components/Lists/CTGList';
import Modal from '../../src/components/Modal/Modal';
import CTGForm from '../../src/components/Forms/CTGForm';
import type { CTG } from '../../src/types/CTG';

export default function CTG() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshList, setRefreshList] = useState(false);
  const [ctgToEdit, setCtgToEdit] = useState<CTG | undefined>(undefined);

  const openModal = () => {
    setCtgToEdit(undefined);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCtgToEdit(undefined);
    setRefreshList(prev => !prev);
  };

  const handleEdit = (ctg: CTG) => {
    setCtgToEdit(ctg);
    setIsModalOpen(true);
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
            Adicionar CTG
          </button>
        </div>

        <div className="w-full max-w-6xl h-full bg-secondary-light p-8 rounded-2xl shadow-lg">
          <CTGList key={refreshList.toString()} onEdit={handleEdit} />
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <CTGForm onClose={closeModal} ctgToEdit={ctgToEdit} />
      </Modal>
    </div>
  );
}
