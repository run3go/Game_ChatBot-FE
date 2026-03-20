import { type ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  iconBgColor: string;
  title: string;
  description: string;
  onClick?: () => void;
}

export default function FeatureCard({
  icon,
  iconBgColor,
  title,
  description,
  onClick,
}: FeatureCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex w-full cursor-pointer flex-col rounded-2xl border border-gray-200 bg-white p-6 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
    >
      <div
        className={`mb-4 grid size-12 place-items-center rounded-xl ${iconBgColor}`}
      >
        {icon}
      </div>
      <h3 className="mb-2 text-base font-semibold text-gray-900">{title}</h3>
      <p className="text-sm leading-relaxed text-gray-500">{description}</p>
    </button>
  );
}
