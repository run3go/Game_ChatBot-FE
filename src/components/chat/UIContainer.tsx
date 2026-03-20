import { DUMMY_GEMS, DUMMY_SKILLS } from '@/lib/datas/skilldata';
import ArkGrid from '../ark_grid/ArkGrid';
import SkillList from '../skill/SkillList';

export default function UIContainer({ ui_type }: { ui_type?: string }) {
  return (
    <div>
      {(() => {
        switch (ui_type) {
          case 'SKILL':
            return <SkillList skills={DUMMY_SKILLS} gems={DUMMY_GEMS} />;
          case 'ARK_GRID':
            return <ArkGrid />;
          default:
            return null;
        }
      })()}
    </div>
  );
}
