import { useState } from "react";
import { Wheel } from "react-custom-roulette";
import { Quesito, SorteioDanca, DancaSalaoTradicional } from "../../types/SorteioDanca";
import { realizarSorteio } from "../../services/api";
import { toast } from "react-toastify";

interface RoletaProps {
  candidatoId: number;
  usuarioId: number;
  tipoDanca: DancaSalaoTradicional;
  quesitos: Quesito[];
  onFinish: (resultado: Quesito) => void;
}

// Tipagem correta para o retorno do backend
interface SorteioResponse {
  message: string;
  sorteio: SorteioDanca;
  quesitoSorteado: Quesito;
}

export default function RoletaSorteio({
  candidatoId,
  usuarioId,
  tipoDanca,
  quesitos,
  onFinish,
}: RoletaProps) {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  // transforma os quesitos em dados para a roleta
  const data = quesitos.map((q) => ({ option: q.nomeQuesito }));

  const sortear = async () => {
    if (!candidatoId || !tipoDanca) {
      toast.error("Selecione candidato e tipo de dança antes de sortear.");
      return;
    }

    try {
      const payload = { candidatoId, usuarioId, tipoDanca };
      const response = await realizarSorteio(payload);

      console.log(payload);

      // Faz cast para SorteioResponse
      const sorteioResponse = response.data as SorteioResponse;
      const { quesitoSorteado } = sorteioResponse;

      if (quesitoSorteado) {
        const index = quesitos.findIndex(
          (q) => q.idQuesito === quesitoSorteado.idQuesito
        );

        if (index >= 0) {
          setPrizeNumber(index);
          setMustSpin(true); // 🚀 inicia o giro
        } else {
          toast.error("Quesito sorteado não encontrado na lista.");
        }
      } else {
        toast.error("Backend não retornou quesito sorteado.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao realizar sorteio.");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        backgroundColors={["#FFB2BC", "#3A6A00"]} // cores alternadas dos segmentos
        textColors={["#AD2549", "#9ED768"]}       // cores do texto
        pointerProps={{
          style: { borderColor: "transparent transparent #2563EB transparent" }, // ponteiro azul
        }}
        onStopSpinning={() => {
          setMustSpin(false);
          const resultado = quesitos[prizeNumber];
          toast.success(`Resultado: ${resultado.nomeQuesito}`);
          onFinish(resultado);
        }}
      />

      <button
        onClick={sortear}
        disabled={mustSpin}
        className="mt-4 px-6 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary-dark transition"
      >
        {mustSpin ? "Girando..." : "Sortear"}
      </button>
    </div>
  );
}