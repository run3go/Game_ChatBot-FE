export const GRADE_STYLE: Record<
  string,
  { text: string; badge: string; solidBadge: string; background: string }
> = {
  고대: {
    text: 'text-[#c8b08e]',
    badge: 'bg-[#c8b08e]/20 text-[#c8b08e] border border-[#c8b08e]/40',
    solidBadge: 'bg-[#c8b08e] text-white',
    background: 'bg-ancient-item',
  },
  유물: {
    text: 'text-orange-500',
    badge: 'bg-orange-500/20 text-orange-500 border border-orange-500/40',
    solidBadge: 'bg-orange-500 text-white',
    background: 'bg-relic-item',
  },
  전설: {
    text: 'text-orange-400',
    badge: 'bg-orange-400/20 text-orange-400 border border-orange-400/40',
    solidBadge: 'bg-orange-400 text-white',
    background: 'bg-legend-item',
  },
  영웅: {
    text: 'text-purple-500',
    badge: 'bg-purple-500/20 text-purple-500 border border-purple-500/40',
    solidBadge: 'bg-purple-500 text-white',
    background: 'bg-heroic-item',
  },
  희귀: {
    text: 'text-blue-500',
    badge: 'bg-blue-500/20 text-blue-500 border border-blue-500/40',
    solidBadge: 'bg-blue-500 text-white',
    background: 'bg-rare-item',
  },
  고급: {
    text: 'text-green-600',
    badge: 'bg-green-600/20 text-green-600 border border-green-600/40',
    solidBadge: 'bg-green-600 text-white',
    background: 'bg-advanced-item',
  },
};
