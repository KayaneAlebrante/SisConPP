import { useState } from "react";
import { Wheel } from "react-custom-roulette";
import { Quesito, SorteioDanca, DancaSalaoTradicional } from "../../types/SorteioDanca";
import { realizarSorteio } from "../../services/api";
import { toast } from "react-toastify";
import pointerImg from '../../assets/poniter.png';

interface RoletaProps {
  candidatoId: number;
  usuarioId: number;
  tipoDanca: DancaSalaoTradicional;
  quesitos: Quesito[];
  onFinish: (resultado: Quesito) => void;
}

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

  const data = quesitos.map((q) => ({ option: q.nomeQuesito }));

  const sortear = async () => {
    if (!candidatoId || !tipoDanca) {
      toast.error("Selecione candidato e tipo de dança antes de sortear.");
      return;
    }

    try {
      const payload = { candidatoId, usuarioId, tipoDanca };
      const response = await realizarSorteio(payload);

      const sorteioResponse = response.data as SorteioResponse;
      const { quesitoSorteado } = sorteioResponse;

      if (!sorteioResponse.quesitoSorteado) {
        toast.warn(sorteioResponse.message || "Sorteio já realizado para este candidato.");
        return;
      }

      if (quesitoSorteado) {
        const index = quesitos.findIndex((quesito) => quesito.idQuesito === quesitoSorteado.idQuesito);

        console.log("Quesito Sorteado:", quesitoSorteado);

        if (index >= 0) {
          setPrizeNumber(index);
          setMustSpin(true);
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
        backgroundColors={['#9ED768', '#FFB2BC', '#FFB0C9']}
        textColors={['#2A5000', '#AD2549', '#924561']}
        outerBorderColor='#2A5000'
        outerBorderWidth={3}
        innerBorderColor='#2A5000'
        innerBorderWidth={2}
        radiusLineColor='#2A5000'
        radiusLineWidth={2}
        fontSize={16}

        pointerProps={{
          src: pointerImg,
        }}
        onStopSpinning={() => {
          setMustSpin(false);
          const resultado = quesitos[prizeNumber];
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