import { ArkGridResult } from '@/types/ark_grid';
import { ArkPassiveResult } from '@/types/ark_passive';
import { AvatarResult } from '@/types/avatar';
import { CollectibleResult } from '@/types/collectible';
import { EngravingResult } from '@/types/engraving';
import { ExpeditionResult } from '@/types/expedition';
import { SkillResult } from '@/types/skill';
import ArkGrid from '../ark_grid/ArkGrid';
import ArkPassive from '../ark_passive/ArkPassive';
import AvatarList from '../avatar/AvatarList';
import Collectible from '../collectible/Collectible';
import EngravingList from '../engraving/EngravingList';
import Expedition from '../expedition/Expedition';
import SkillList from '../skill/SkillList';

type UIResult = ArkGridResult | SkillResult | ArkPassiveResult | CollectibleResult | EngravingResult | ExpeditionResult | AvatarResult;

export default function UIContainer({ result }: { result: UIResult }) {
  const { ui_type, data } = result;
  return (
    <div>
      {(() => {
        switch (ui_type) {
          case 'SKILL':
            return <SkillList data={data} />;
          case 'ARK_GRID':
            return <ArkGrid data={data} />;
          case 'ARK_PASSIVE':
            return <ArkPassive data={data} />;
          case 'COLLECTIBLE':
            return <Collectible data={data} />;
          case 'ENGRAVING':
            return <EngravingList data={data} />;
          case 'EXPEDITION':
            return <Expedition data={data} />;
          case 'AVATAR':
            return <AvatarList data={data} />;
          default:
            return null;
        }
      })()}
    </div>
  );
}
