import { ArkGridResult } from '@/types/ark_grid';
import { ArkPassiveResult } from '@/types/ark_passive';
import { SkillResult } from '@/types/skill';
import ArkGrid from '../ark_grid/ArkGrid';
import ArkPassive from '../ark_passive/ArkPassive';
import SkillList from '../skill/SkillList';

type UIResult = ArkGridResult | SkillResult | ArkPassiveResult;

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
          default:
            return null;
        }
      })()}
    </div>
  );
}
