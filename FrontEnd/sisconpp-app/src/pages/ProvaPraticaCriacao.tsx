import BlocoProvaForm from '../components/Forms/AvaliaçãoForms/blocoProvaForm';
import QuesitoForm from '../components/Forms/AvaliaçãoForms/quesitosForm';
import SubQuesitosForm from '../components/Forms/AvaliaçãoForms/subQuesitosForm';

export default function ProvaPraticaCriacaoPage() {
    return (
        <div className="p-6">         
            <h1 className="text-xl font-bold mb-4">Prova Prática Criação Page</h1>
            <BlocoProvaForm onClose={() => console.log("Modal fechou")} />
            <QuesitoForm onClose={() => console.log("Modal fechou")} />
            <SubQuesitosForm onClose={() => console.log("Modal fechou")} />
        </div>
    );
}