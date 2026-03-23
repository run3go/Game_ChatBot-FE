import { ArkPassiveData, ArkPassiveName } from '@/types/ark_passive';
import PassiveItem from './PassiveItem';

const ARK_PASSIVE_NAMES: ArkPassiveName[] = ['진화', '깨달음', '도약'];

export default function ArkPassive({ data }: { data: ArkPassiveData }) {
  const effects = data.ark_passive_effects_tb;
  const points = data.ark_passive_points_tb;
  return (
    <ul className="flex">
      {ARK_PASSIVE_NAMES.map((name) => (
        <PassiveItem key={name} name={name} effects={effects} points={points} />
      ))}
    </ul>
  );
}
