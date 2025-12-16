import SubQuesitosForm from '../components/Forms/AvaliaçãoForms/subQuesitosForm';

export default function ProvaPraticaCriacaoPage() {
    return (
        <div className="p-6"> 
            <h1 className="text-xl font-bold mb-4">Prova Prática Criação Page</h1>
            <SubQuesitosForm onClose={() => console.log("Modal fechou")} />
        </div>
    );
}