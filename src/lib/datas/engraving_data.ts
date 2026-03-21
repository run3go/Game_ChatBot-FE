import { EngravingResult } from '@/types/engraving';

export const DUMMY_ENGRAVING: { result: EngravingResult } = {
  result: {
    ui_type: 'ENGRAVING',
    data: {
      armory_engravings_tb: [
        {
          character_name: '첫번째도구',
          name: '각성',
          grade: '유물',
          level: 2,
          ability_stone_level: 2,
          description:
            '각성기의 재사용 대기시간이 54.50% 감소하고, 사용 제한 횟수가 5회 증가한다.',
        },
        {
          character_name: '첫번째도구',
          name: '전문의',
          grade: '영웅',
          level: 3,
          ability_stone_level: null,
          description:
            '자신 및 파티원에게 사용하는 실드 및 생명력 회복 효과가 27.00% 증가하고, 대상의 생명력이 50.00% 이하인 경우 해당 효과가 추가로 8.00% 증가한다.',
        },
        {
          character_name: '첫번째도구',
          name: '구슬동자',
          grade: '전설',
          level: 4,
          ability_stone_level: 3,
          description:
            '적을 타격 시 일정 확률로 자신의 8m 이내에 자신만 획득 가능한 37.00% 강화된 에테르 1개와 파티원만 획득 가능한 37.00% 강화된 에테르 1개를 생성한다. (발동 재사용 대기시간 10.0초)',
        },
        {
          character_name: '첫번째도구',
          name: '마나의 흐름',
          grade: '희귀',
          level: 4,
          ability_stone_level: null,
          description:
            '이동기 및 기본공격을 제외한 스킬 사용 시 10초 동안 마나 회복 속도가 2.00% 증가하며 (최대 10중첩) 해당 효과가 최대 중첩 도달 시 스킬 재사용 대기시간이 추가로 10.00% 감소한다. 해당 효과는 스킬 취소에 따른 재사용 대기시간 감소가 적용되는 경우, 스킬 종료 후 적용된다.',
        },
        {
          character_name: '첫번째도구',
          name: '급소 타격',
          grade: '고급',
          level: 4,
          ability_stone_level: null,
          description: '무력화 공격 시 주는 무력화 수치가 37.00% 증가한다.',
        },
      ],
    },
  },
};
