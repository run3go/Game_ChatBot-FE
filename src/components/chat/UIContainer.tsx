import { ArkGridResult } from '@/types/ark_grid';
import { ArkPassiveResult } from '@/types/ark_passive';
import { AvatarResult } from '@/types/avatar';
import { CollectibleResult } from '@/types/collectible';
import { EngravingResult } from '@/types/engraving';
import { ExpeditionResult } from '@/types/expedition';
import { ProfileResult } from '@/types/profile';
import { SkillResult } from '@/types/skill';
import { TotalInfoResult } from '@/types/total_info';
import ArkGrid from '../ark_grid/ArkGrid';
import ArkPassive from '../ark_passive/ArkPassive';
import AvatarList from '../avatar/AvatarList';
import Collectible from '../collectible/Collectible';
import EngravingList from '../engraving/EngravingList';
import Expedition from '../expedition/Expedition';
import Profile from '../profile/Profile';
import SkillList from '../skill/SkillList';
import TotalInfo from '../total_info/TotalInfo';

type UIResult =
  | ArkGridResult
  | SkillResult
  | ArkPassiveResult
  | CollectibleResult
  | EngravingResult
  | ExpeditionResult
  | AvatarResult
  | ProfileResult
  | TotalInfoResult;

export type { UIResult };

export default function UIContainer({ result }: { result?: UIResult }) {
  if (!result) return null;
  const { ui_type, data } = result;
  console.log(ui_type, data);
  return (
    <div className="mt-4">
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
          case 'PROFILE':
            return <Profile data={data} />;
          case 'TOTAL_INFO':
            return <TotalInfo data={data} />;
          default:
            return null;
        }
      })()}
    </div>
  );
}
