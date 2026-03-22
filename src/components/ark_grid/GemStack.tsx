'use client';

import { ArkGridGemItem } from '@/types/ark_grid';
import GemItem from './GemItem';

export default function GemStack({ gems }: { gems: ArkGridGemItem[] }) {
  return (
    <div className="flex shrink-0 items-center">
      {gems.map((gem, idx) => (
        <GemItem key={gem.gem_index} gem={gem} zIndex={gems.length - idx} />
      ))}
    </div>
  );
}
