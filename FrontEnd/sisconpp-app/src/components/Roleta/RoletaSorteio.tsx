import { useState } from "react";
import { Wheel } from "react-custom-roulette";
import { Danca, SorteioDanca, DancaSalaoTradicional } from "../../types/SorteioDanca"; 
import { realizarSorteio } from "../../services/api";
import { toast } from "react-toastify";
import pointerImg from '../../assets/poniter.png';

interface RoletaProps {
  candidatoId: number;
  usuarioId: number;
  tipoDanca: DancaSalaoTradicional;
  dancas: Danca[]; // 🔑 lista de danças
  onFinish: (resultado: Danca) => void;
}

interface SorteioResponse {
  message: string;
  sorteio: SorteioDanca;
  dancaSorteada: Danca; 
}

export default function RoletaSorteio({
  candidatoId,
  usuarioId,
  tipoDanca,
  dancas,
  onFinish,
}: RoletaProps) {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const data = dancas.map((d) => ({ option: d.nomeDanca }));

  const sortear = async () => {
    if (!candidatoId || !tipoDanca) {
      toast.error("Selecione candidato e tipo de dança antes de sortear.");
      return;
    }

    try {
      const payload = { candidatoId, usuarioId, tipoDanca };
      const response = await realizarSorteio(payload);

      const sorteioResponse = response.data as SorteioResponse;
      const { dancaSorteada } = sorteioResponse;

      if (!dancaSorteada) {
        toast.warn(sorteioResponse.message || "Sorteio já realizado para este candidato.");
        return;
      }

      if (dancaSorteada) {
        const index = dancas.findIndex((danca) => danca.idDanca === dancaSorteada.idDanca);

        console.log("Dança Sorteada:", dancaSorteada);

        if (index >= 0) {
          setPrizeNumber(index);
          setMustSpin(true);
        } else {
          toast.error("Dança sorteada não encontrada na lista.");
        }
      } else {
        toast.error("Backend não retornou dança sorteada.");
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
          const resultado = dancas[prizeNumber];
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