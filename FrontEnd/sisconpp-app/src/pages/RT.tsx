import { useState } from 'react';
import SideNavBar from '../components/SideNavBar/SideNavBar';
import RTList from '../../src/components/Lists/RTLists';
import Modal from '../../src/components/Modal/Modal';
import FormRT from '../../src/components/Forms/RTForm';
import type { RT } from '../../src/types/RT';

function RTPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshList, setRefreshList] = useState(false);
  const [rtToEdit, setRtToEdit] = useState<RT | undefined>(undefined);

  const openModal = () => {
    setRtToEdit(undefined);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setRtToEdit(undefined);
    setRefreshList(prev => !prev);
  };

  const handleEdit = (rt: RT) => {
    setRtToEdit(rt);
    setIsModalOpen(true);
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
            Adicionar RT
          </button>
        </div>

        <div className="w-full max-w-full bg-secondary-light p-8 rounded-2xl shadow-lg mb-4">
          <RTList key={refreshList.toString()} onEdit={handleEdit} />
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <FormRT onClose={closeModal} rtToEdit={rtToEdit} />
      </Modal>
    </div>
  );
}

export default RTPage;