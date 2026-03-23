import { SkillData } from '@/types/skill';
import SkillRow from './SkillRow';

export default function SkillList({ data }: { data: SkillData }) {
  const skills = data.armory_skills_tb;
  const gems = data.armory_gem_tb;
  console.log(skills, gems);
  return (
    <div className="flex flex-col gap-4 pb-4">
      {/* 스킬 목록 */}
      <div className="flex flex-col gap-2">
        {skills.map((skill, i) => (
          <SkillRow
            key={i}
            skill={skill}
            gems={gems.filter((g) => g.skill_name === skill.skill_name)}
            tooltipUp={i >= Math.ceil(skills.length / 2)}
          />
        ))}
      </div>
    </div>
  );
}
