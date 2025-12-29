import { ProvaAccordionDTO } from "../../types/Avaliacao";
import ProvaAccordion from "./ProvaAccordion";

interface Props {
  provas: ProvaAccordionDTO[]
  notas: Record<number, number>
  onChangeNota: (subQuesitoId: number, nota: number) => void
}

export default function AvaliacaoAccordion({ provas, notas, onChangeNota }: Props) {
  return (
    <div className="space-y-4">
      {provas.map((prova) => (
        <ProvaAccordion
          key={prova.idProvaPratica}
          prova={prova}
          notas={notas}
          onChangeNota={onChangeNota}
        />
      ))}
    </div>
  )
}
