import { ArmoryGem, ArmorySkill } from '@/types/skill';
import SkillRow from './SkillRow';

export default function SkillList({
  skills,
  gems,
}: {
  skills: ArmorySkill[];
  gems: ArmoryGem[];
}) {
  return (
    <div className="flex flex-col gap-4 py-5">
      {/* 스킬 목록 */}
      <div className="flex flex-col gap-2 pt-4">
        {skills.map((skill, i) => (
          <SkillRow
            key={i}
            skill={skill}
            gems={gems.filter((g) => g.skill_name === skill.skill_name)}
          />
        ))}
      </div>
    </div>
  );
}
