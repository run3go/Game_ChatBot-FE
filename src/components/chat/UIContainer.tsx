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

type ConfirmCollectResult = {
  ui_type: 'CONFIRM_COLLECT';
  nickname: string;
  message: string;
};

type UIResult =
  | ArkGridResult
  | SkillResult
  | ArkPassiveResult
  | CollectibleResult
  | EngravingResult
  | ExpeditionResult
  | AvatarResult
  | ProfileResult
  | TotalInfoResult
  | ConfirmCollectResult;

export type { ConfirmCollectResult, UIResult };

export default function UIContainer({
  result,
  onConfirmCollect,
}: {
  result?: UIResult;
  onConfirmCollect?: (nickname: string) => void;
}) {
  if (!result) return null;
  return (
    <div className="pb-4 pl-4">
      {(() => {
        switch (result.ui_type) {
          case 'CONFIRM_COLLECT':
            return (
              <div className="flex flex-col gap-3">
                <p className="text-sm text-gray-700">{result.message}</p>
                <button
                  onClick={() => onConfirmCollect?.(result.nickname)}
                  className="w-fit rounded-xl bg-linear-to-r from-indigo-500 to-violet-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90"
                >
                  네, 수집할게요
                </button>
              </div>
            );
          case 'SKILL':
            return <SkillList data={result.data} />;
          case 'ARK_GRID':
            return <ArkGrid data={result.data} />;
          case 'ARK_PASSIVE':
            return <ArkPassive data={result.data} />;
          case 'COLLECTIBLE':
            return <Collectible data={result.data} />;
          case 'ENGRAVING':
            return <EngravingList data={result.data} />;
          case 'EXPEDITION':
            return <Expedition data={result.data} />;
          case 'AVATAR':
            return <AvatarList data={result.data} />;
          case 'PROFILE':
            return <Profile data={result.data} />;
          case 'TOTAL_INFO':
            return <TotalInfo data={result.data} />;
          default:
            return null;
        }
      })()}
    </div>
  );
}
