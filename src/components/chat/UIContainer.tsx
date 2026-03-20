import { DUMMY_GEMS, DUMMY_SKILLS } from '@/lib/datas/skilldata';
import SkillList from '../skill/SkillList';

export default function UIContainer({ ui_type }: { ui_type?: string }) {
  return (
    <div>
      {(() => {
        switch (ui_type) {
          case 'SKILL':
            return <SkillList skills={DUMMY_SKILLS} gems={DUMMY_GEMS} />;
          default:
            return null;
        }
      })()}
    </div>
  );
}
