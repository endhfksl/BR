import React, { useState } from 'react';
import { EntranceGate } from './components/EntranceGate';
import { Navbar, NavTab } from './components/Navbar';
import { WorldLoreTab } from './components/WorldLoreTab';
import { RealmsTab } from './components/RealmsTab';
import { CharactersTab } from './components/CharactersTab';
import { ContinentMapTab } from './components/ContinentMapTab';

export default function App() {
  const [isEntered, setIsEntered] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<NavTab>('world');

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col">
      {/* 1. Fullscreen Entrance Gate with Animated Quill & Imperial Wax Seal */}
      {!isEntered && (
        <EntranceGate onEnter={() => setIsEntered(true)} />
      )}

      {/* 2. Main Navigation Bar (adheres strictly to Top Bar Contract) */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onReplayEntrance={() => setIsEntered(false)}
      />

      {/* 3. Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 sm:py-10">
        {activeTab === 'world' && <WorldLoreTab />}
        {activeTab === 'realms' && <RealmsTab />}
        {activeTab === 'characters' && <CharactersTab />}
        {activeTab === 'map' && <ContinentMapTab />}
      </main>

      {/* 4. Elegant Minimalist Footer */}
      <footer className="border-t border-amber-900/30 bg-stone-950/80 py-8 text-center text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-cinzel tracking-wider text-stone-400 font-semibold">
            CHRONICLES OF KAIROS · IMPERIAL YEAR 345
          </p>
          <p className="font-lore text-stone-500">
            카이로스 제국 황실 공인 대륙 총람 및 북방 변방영주 집무 지침서
          </p>
          <div className="flex items-center justify-center gap-4 text-[11px] text-stone-600 pt-2">
            <span>세계관</span>
            <span>·</span>
            <span>기 & 마법 경지</span>
            <span>·</span>
            <span>인물 도감</span>
            <span>·</span>
            <span>대륙 지도</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
