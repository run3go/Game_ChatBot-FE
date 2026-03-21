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
    ['목걸이', '귀걸이', '반지', '어빌리티 스톤', '팔찌'].includes(e.type),
  );

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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
    </div>
  );
}
