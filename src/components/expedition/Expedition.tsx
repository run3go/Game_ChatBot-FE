import { ExpeditionData } from '@/types/expedition';
import { useState } from 'react';

export default function Expedition({ data }: { data: ExpeditionData }) {
  const characters = data.expedition_tb;
  const [tooltip, setTooltip] = useState<{
    name: string;
    x: number;
    y: number;
  } | null>(null);

  const grouped = characters.reduce<Record<string, typeof characters>>(
    (acc, char) => {
      if (!acc[char.ServerName]) acc[char.ServerName] = [];
      acc[char.ServerName].push(char);
      return acc;
    },
    {},
  );

  return (
    <div className="flex flex-col gap-6">
      {tooltip && (
        <div
          className="pointer-events-none fixed z-50 rounded bg-gray-800/70 px-2 py-1 text-xs text-white shadow-lg"
          style={{ left: tooltip.x + 12, top: tooltip.y + 12 }}
        >
          {tooltip.name}
        </div>
      )}
      {Object.entries(grouped).map(([serverName, chars]) => (
        <div key={serverName}>
          <h3 className="mb-3 text-sm font-semibold text-gray-500">
            {serverName} ({chars.length})
          </h3>
          <div className="grid grid-cols-4 gap-3">
            {chars.map((char) => (
              <div
                key={char.CharacterName}
                className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm"
              >
                <p
                  className="truncate text-sm font-semibold text-gray-800"
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    if (el.scrollWidth > el.clientWidth) {
                      setTooltip({
                        name: char.CharacterName,
                        x: e.clientX,
                        y: e.clientY,
                      });
                    }
                  }}
                  onMouseMove={(e) => {
                    if (tooltip)
                      setTooltip(
                        (prev) =>
                          prev && { ...prev, x: e.clientX, y: e.clientY },
                      );
                  }}
                  onMouseLeave={() => setTooltip(null)}
                >
                  {char.CharacterName}
                </p>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    Lv.{char.CharacterLevel} {char.CharacterClassName}
                  </span>
                  <span className="text-xs font-medium text-gray-700">
                    {char.ItemAvgLevel}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
