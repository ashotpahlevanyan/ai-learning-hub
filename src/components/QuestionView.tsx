import type { Question } from '../lib/types';
import { letter } from '../lib/quiz';
import Md from './Md';

interface Props {
  q: Question;
  /** display order: order[pos] = original option index */
  order: number[];
  picked: number[];
  reveal: boolean;
  onPick?: (originalIndex: number) => void;
}

export default function QuestionView({ q, order, picked, reveal, onPick }: Props) {
  const multi = q.answer.length > 1;
  return (
    <div>
      {q.scenario && <div className="q-scenario">{q.scenario}</div>}
      <div className="q-stem"><Md>{q.stem}</Md></div>
      {multi && <div className="tag warn choose">Choose {q.answer.length}</div>}
      <div className="options" role={multi ? 'group' : 'radiogroup'}>
        {order.map((oi, pos) => {
          let cls = picked.includes(oi) ? 'selected' : '';
          if (reveal) cls = q.answer.includes(oi) ? 'correct' : picked.includes(oi) ? 'wrong' : '';
          return (
            <button key={oi} className={`opt ${cls}`} disabled={reveal} onClick={() => onPick?.(oi)}
              role={multi ? 'checkbox' : 'radio'} aria-checked={picked.includes(oi)}>
              <span className="key">{letter(pos)}</span>
              <span>
                <Md inline>{q.options[oi]}</Md>
                {reveal && q.rationales && <span className="rationale"><Md inline>{q.rationales[oi]}</Md></span>}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
