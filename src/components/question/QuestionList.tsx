import { QuestionType } from '@/types/question';
import QuestionItem from './QuestionItem';

const QUESTION_ITEMS: QuestionType[] = [
  {
    title: '첫번째 도구 스킬을 보여줘',
    content: "'첫번째도구' 캐릭터의 스킬 정보를 가져왔습니다",
    selected: true,
  },
  {
    title: '최신 패치노트',
    content: '최신 패치노트를 가져옵니다. 20261232323',
  },
  {
    title: '앞으로 운명의 파괴강석 시세가 어떻게 될 거 같아?',
    content: '6개월 간의 운명의 파괴강석 시세를 가져왔습니다.',
  },
];

export default function QuestionList() {
  return (
    <ul className="mt-3 flex flex-col gap-3">
      {QUESTION_ITEMS.map((item, idx) => (
        <QuestionItem
          key={idx}
          title={item.title}
          content={item.content}
          selected={item.selected}
        />
      ))}
    </ul>
  );
}
