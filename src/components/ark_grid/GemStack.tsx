import { GRADE_STYLE } from '@/lib/datas/color';
import { ArkGridGemItem } from '@/types/ark_grid';
import Image from 'next/image';

export default function GemStack({ gems }: { gems: ArkGridGemItem[] }) {
  return (
    <div className="flex shrink-0 items-center">
      {gems.map((gem, idx) => (
        <div
          key={gem.gem_index}
          className="group relative -ml-2 first:ml-0"
          style={{ zIndex: gems.length - idx }}
        >
          <Image
            width={28}
            height={28}
            src={gem.icon}
            alt={`gem-${gem.gem_index}`}
            className={`${GRADE_STYLE[gem.grade].background} rounded-full border-2 border-white object-contain transition-transform duration-150 group-hover:z-50 group-hover:scale-125`}
          />
        </div>
      ))}
    </div>
  );
}
