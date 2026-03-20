export const GRADE_STYLE: Record<
  string,
  { text: string; badge: string; background: string }
> = {
  고대: {
    text: 'text-[#c8b08e]',
    badge: 'bg-[#c8b08e]/20 text-[#c8b08e] border border-[#c8b08e]/40',
    background: 'bg-ancient-item',
  },
  유물: {
    text: 'text-orange-500',
    badge: 'bg-orange-500/20 text-orange-500 border border-orange-500/40',
    background: 'bg-relic-item',
  },
  전설: {
    text: 'text-yellow-500',
    badge: 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/40',
    background: 'bg-legend-item',
  },
  영웅: {
    text: 'text-purple-500',
    badge: 'bg-purple-500/20 text-purple-500 border border-purple-500/40',
    background: 'bg-heroic-item',
  },
};
