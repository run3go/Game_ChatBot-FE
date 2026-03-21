'use client';

import { ProfileData } from '@/types/profile';
import CardsSection from './CardsSection';
import CharacterHeader from './CharacterHeader';
import EquipmentSection from './equipment/EquipmentSection';
import GemsSection from './GemsSection';
import StatsSection from './StatsSection';

export default function Profile({ data }: { data: ProfileData }) {
  const profile = data.armory_profile_tb[0];
  const gemEffect = data.armory_gem_effects_tb[0];

  return (
    <div className="mt-4 flex flex-col gap-3">
      <CharacterHeader profile={profile} />
      <EquipmentSection equipment={data.armory_equipment_tb} />
      <StatsSection profile={profile} />
      <GemsSection gems={data.armory_gem_tb} gemEffect={gemEffect} />
      <CardsSection
        cards={data.armory_card_tb}
        cardEffects={data.armory_card_effects_tb}
      />
    </div>
  );
}
