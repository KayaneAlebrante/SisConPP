import SideNavBar from '../SideNavBar/SideNavBar';

export default function RTForm() {
    return (
        <>
            <div className="flex flex-row h-screen w-full bg-neutral-background overflow-hidden">
                <SideNavBar />
                <div className="flex-grow p-4 bg-neutral-background flex justify-center">
                    <div className="w-full max-w-4xl m-20 bg-surface-containerHigh p-8 rounded-lg shadow-lg aling-center">
                        <h1 className="text-2xl font-bold text-neutral-onBackground mb-6">Cadastrar CTG - Centro de Tradições Gaúchas</h1>
                        <form>
                            <div className="flex flex-col py-2">
                                <label className="text-sm font-medium text-neutral-onBackground">Nome do CTG - Centro de Tradições Gaúchas</label>
                                <input
                                    type="text"
                                    className="rounded-lg mt-1 p-2 bg-surface-containerHigh focus:outline-none focus:ring-2 focus:ring-primary border border-outline text-neutral-onBackground"
                                    placeholder="CTG Henraça do Pago"
                                />
                            </div>

                            <div className="flex flex-col py-2">
                                <label className="text-sm font-medium text-neutral-onBackground">Região Tradicionalista</label>
                                <input
                                    type="number"
                                    className="rounded-lg mt-1 p-2 bg-surface-containerHigh focus:outline-none focus:ring-2 focus:ring-primary border border-outline text-neutral-onBackground"
                                />
                            </div>

                            <button
                                className="w-full mt-4 py-2 bg-secondary text-secondary-on font-medium rounded-lg hover:bg-secondary-dark transition duration-200"
                                type="submit"
                            > Cadastrar Região Tradicionalista!</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}