import { ArmoryEquipment } from '@/types/profile';
import EquipmentItemInfo from './EquipmentItemInfo';
import EquipmentItemTooltip from './EquipmentItemTooltip';

export default function EquipmentItem({ item }: { item: ArmoryEquipment }) {
  return (
    <div className="group relative flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-gray-50">
      <EquipmentItemInfo item={item} />
      <EquipmentItemTooltip item={item} />
    </div>
  );
}
