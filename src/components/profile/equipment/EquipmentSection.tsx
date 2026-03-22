'use client';

import { ArmoryEquipment } from '@/types/profile';
import EquipmentItem from './EquipmentItem';

export default function EquipmentSection({
  equipment,
}: {
  equipment: ArmoryEquipment[];
}) {
  const armor = equipment.filter((e) =>
    ['무기', '투구', '상의', '하의', '장갑', '어깨'].includes(e.type),
  );
  const accessories = equipment.filter((e) =>
    ['목걸이', '귀걸이', '반지', '팔찌'].includes(e.type),
  );
  const abilityStone = equipment.filter((e) => e.type === '어빌리티 스톤');
  const bojeong = equipment.filter((e) => e.type === '보주');

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-[5fr_7fr]">
      <div className="flex flex-col gap-3">
        <div className="rounded-2xl bg-white p-3 shadow-sm">
          <p className="mb-2 text-sm font-bold tracking-wide text-gray-400 uppercase">
            방어구
          </p>
          <div className="flex flex-col gap-0.5">
            {armor.map((item, i) => (
              <EquipmentItem key={i} item={item} />
            ))}
          </div>
        </div>

        {bojeong.length > 0 && (
          <div className="rounded-2xl bg-white p-3 shadow-sm">
            <p className="mb-2 text-sm font-bold tracking-wide text-gray-400 uppercase">
              보주
            </p>
            <div className="flex flex-col gap-0.5">
              {bojeong.map((item, i) => (
                <EquipmentItem key={i} item={item} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <div className="rounded-2xl bg-white p-3 shadow-sm">
          <p className="mb-2 text-sm font-bold tracking-wide text-gray-400 uppercase">
            장신구
          </p>
          <div className="flex flex-col gap-0.5">
            {accessories.map((item, i) => (
              <EquipmentItem key={i} item={item} />
            ))}
          </div>
        </div>

        {abilityStone.length > 0 && (
          <div className="rounded-2xl bg-white p-3 shadow-sm">
            <p className="mb-2 text-sm font-bold tracking-wide text-gray-400 uppercase">
              어빌리티 스톤
            </p>
            <div className="flex flex-col gap-0.5">
              {abilityStone.map((item, i) => (
                <EquipmentItem key={i} item={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
