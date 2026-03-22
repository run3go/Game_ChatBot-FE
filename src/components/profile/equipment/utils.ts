export type OptionTier = '하' | '중' | '상';

export const ARMOR_TYPES = new Set([
  '투구', '상의', '하의', '장갑', '어깨', '무기', '보주',
]);
export const ACCESSORY_TYPES = new Set(['목걸이', '귀걸이', '반지']);
export const STONE_TYPE = '어빌리티 스톤';

export const TIER_RULES: Array<{
  stat: string;
  pct: boolean | null;
  중: number;
  상: number;
}> = [
  { stat: '공격력', pct: true, 중: 0.95, 상: 1.55 },
  { stat: '공격력', pct: false, 중: 195, 상: 390 },
  { stat: '낙인력', pct: true, 중: 4.8, 상: 8 },
  { stat: '무기 공격력', pct: true, 중: 1.8, 상: 3 },
  { stat: '무기 공격력', pct: false, 중: 480, 상: 960 },
  { stat: '심태이상 공격 지속시간', pct: true, 중: 0.5, 상: 1 },
  { stat: '세레나데, 신앙', pct: true, 중: 3.6, 상: 6 },
  { stat: '아군 공격력 강화 효과', pct: true, 중: 3, 상: 5 },
  { stat: '아군 피해량 강화 효과', pct: true, 중: 4.5, 상: 7.5 },
  { stat: '적에게 주는 피해', pct: true, 중: 1.2, 상: 2 },
  { stat: '전투 중 생명력 회복량', pct: false, 중: 25, 상: 50 },
  { stat: '최대 마나', pct: false, 중: 15, 상: 30 },
  { stat: '최대 생명력', pct: false, 중: 3250, 상: 6500 },
  { stat: '추가 피해', pct: true, 중: 1.6, 상: 2.6 },
  { stat: '치명타 적중률', pct: true, 중: 0.95, 상: 1.55 },
  { stat: '치명타 피해', pct: true, 중: 2.4, 상: 4.0 },
  { stat: '파티원 보호막 효과', pct: true, 중: 2.1, 상: 3.5 },
  { stat: '파티원 회복 효과', pct: true, 중: 2.1, 상: 3.5 },
];

export const TIER_STYLE: Record<OptionTier, string> = {
  하: 'text-blue-700',
  중: 'text-purple-700',
  상: 'text-yellow-700',
};

export const TIER_BADGE: Record<OptionTier, string> = {
  하: 'bg-blue-400 text-white',
  중: 'bg-purple-500 text-white',
  상: 'bg-yellow-400 text-white',
};

export const ACCESSORY_STAT_RANGE: Record<string, { min: number; max: number }> = {
  목걸이: { min: 15178, max: 17857 },
  귀걸이: { min: 11806, max: 13889 },
  반지: { min: 10962, max: 12897 },
};

export function getQualityColor(quality: number): string {
  if (quality === 100) return 'bg-orange-300';
  if (quality >= 90) return 'bg-purple-600';
  if (quality >= 70) return 'bg-blue-400';
  if (quality >= 30) return 'bg-green-500';
  return 'bg-yellow-300';
}

export function splitEffectLines(text: string): string[] {
  return text
    .split('\n')
    .flatMap((line) => line.split(/(?<=[\d%])\s*(?=[가-힣])/))
    .filter(Boolean);
}

export function splitBraceletEffects(text: string): string[] {
  return text
    .split(/\n|,\s*/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function parseStoneEngravings(
  effect: string | null,
): Array<{ name: string; level: number }> {
  if (!effect) return [];
  const parts = effect.includes('\n') ? effect.split('\n') : effect.split(/,\s*/);
  return parts
    .map((s) => s.trim())
    .filter((s) => s && !s.includes('레벨 보너스'))
    .map((line) => {
      const cleaned = line.replace(/[\[\]]/g, '').trim();
      const lvMatch = cleaned.match(/^(.*?)\s*Lv\.(\d+)/);
      if (lvMatch) return { name: lvMatch[1].trim(), level: parseInt(lvMatch[2], 10) };
      const plusMatch = cleaned.match(/^(.*?)\s*\+(\d+)/);
      if (plusMatch)
        return {
          name: plusMatch[1].replace(/\s*활성도$/, '').trim(),
          level: parseInt(plusMatch[2], 10),
        };
      return { name: cleaned, level: 0 };
    });
}

export function splitEffectParts(effect: string): { name: string; value: string } {
  const m = effect.match(/^(.*?)(\+[\d,.]+%?.*)$/);
  if (m) return { name: m[1].trim(), value: m[2].trim() };
  return { name: effect, value: '' };
}

export function getEffectTier(effect: string): OptionTier {
  const m = effect.match(/\+([0-9,.]+)(%?)/);
  if (!m) return '하';
  const value = parseFloat(m[1].replace(/,/g, ''));
  const isPercent = m[2] === '%';
  for (const rule of TIER_RULES) {
    if (effect.includes(rule.stat) && (rule.pct === null || rule.pct === isPercent)) {
      if (value === rule.상) return '상';
      if (value === rule.중) return '중';
      return '하';
    }
  }
  return '하';
}

export function parseAccessoryStat(
  basicEffect: string | null,
): { stat: string; value: number } | null {
  if (!basicEffect) return null;
  for (const stat of ['힘', '민첩', '지능']) {
    const match = basicEffect.match(new RegExp(`${stat}\\s*\\+?([\\d,]+)`));
    if (match) return { stat, value: parseInt(match[1].replace(/,/g, ''), 10) };
  }
  return null;
}
