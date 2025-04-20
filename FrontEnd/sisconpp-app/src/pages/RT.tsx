import SideNavBar from '../components/SideNavBar/SideNavBar';
import RTList from '../../src/components/Lists/RTLists';

function RT() {
  return (
    <div className="flex flex-row h-screen w-full bg-neutral-background overflow-hidden">
      <SideNavBar />

      <div className="flex-grow p-4 bg-neutral-background flex flex-col items-center">
        
        <div className="w-full max-w-5xl mt-10 mb-6 px-2 flex justify-end">
          <button className="bg-secondary-container text-white font-bold py-2 px-4 rounded-lg hover:bg-secondary-dark transition duration-300 ease-in-out">
            Adicionar RT
          </button>
        </div>

        <div className="w-full max-w-6xl h-full bg-secondary-light p-8 rounded-2xl shadow-lg">
          <RTList />
        </div>
        
      </div>
    </div>
  );
}

export default RT;