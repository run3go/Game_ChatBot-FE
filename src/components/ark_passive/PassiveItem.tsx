import {
  ArkPassiveEffectItem,
  ArkPassiveName,
  ArkPassivePointItem,
} from '@/types/ark_passive';
import Image from 'next/image';

const PASSIVE_STYLE: Record<string, { background: string; text: string }> = {
  진화: { background: 'bg-[#d6b76f]', text: 'text-[#d6b76f]' },
  깨달음: { background: 'bg-[#6ccce2]', text: 'text-[#6ccce2]' },
  도약: { background: 'bg-[#a4c44d]', text: 'text-[#a4c44d]' },
};

export default function PassiveItem({
  name,
  effects,
  points,
}: {
  name: ArkPassiveName;
  effects: ArkPassiveEffectItem[];
  points: ArkPassivePointItem[];
}) {
  const filteredPoint = points.filter((point) => point.name === name)[0];
  const filteredEffects = effects.filter((effect) => effect.name === name);
  const style = PASSIVE_STYLE[name];
  return (
    <div className="flex-1 border-r border-gray-300 px-4 last:border-r-0">
      <div className="mb-6 flex items-center text-sm font-bold">
        <div className={`${style.background} mr-3 px-1 text-white`}>
          {filteredPoint.name}
        </div>
        <span className={`${style.text}`}>{filteredPoint.description}</span>
        <span className="ml-auto text-gray-500">{filteredPoint.value}</span>
      </div>
      <ul className="flex flex-col gap-3 text-sm">
        {filteredEffects.map((item) => (
          <div key={item.effect_name} className="flex items-center gap-2">
            <Image
              alt={item.effect_name}
              src={item.icon}
              width={20}
              height={20}
              className="shrink-0"
            />
            <span className="w-10 shrink-0 whitespace-nowrap">{item.tier}</span>
            <span className={`${style.text} font-bold`}>
              {item.effect_name} Lv.{item.level}
            </span>
          </div>
        ))}
      </ul>
    </div>
  );
}
