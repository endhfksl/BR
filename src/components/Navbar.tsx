import React from 'react';
import { Feather } from 'lucide-react';

export type NavTab = 'world' | 'realms' | 'characters' | 'map';

interface NavbarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onReplayEntrance: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onReplayEntrance,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-stone-950/90 backdrop-blur-md border-b border-amber-900/30">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-8 py-3.5">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onSelectTab('world')}
          className="font-lore text-lg sm:text-xl font-black tracking-wide text-amber-200 hover:text-amber-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer text-left"
        >
          카이로스 연대기
        </button>

        {/* Zone 2: 4 clean single-line text navigation links */}
        <nav className="flex items-center gap-4 sm:gap-8 text-xs sm:text-sm font-medium">
          <button
            onClick={() => onSelectTab('world')}
            className={`whitespace-nowrap shrink-0 py-1 transition-colors cursor-pointer border-b-2 ${
              activeTab === 'world'
                ? 'border-amber-400 text-amber-300 font-semibold'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            세계관
          </button>

          <button
            onClick={() => onSelectTab('realms')}
            className={`whitespace-nowrap shrink-0 py-1 transition-colors cursor-pointer border-b-2 ${
              activeTab === 'realms'
                ? 'border-amber-400 text-amber-300 font-semibold'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            능력 & 경지
          </button>

          <button
            onClick={() => onSelectTab('characters')}
            className={`whitespace-nowrap shrink-0 py-1 transition-colors cursor-pointer border-b-2 ${
              activeTab === 'characters'
                ? 'border-amber-400 text-amber-300 font-semibold'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            인물 도감
          </button>

          <button
            onClick={() => onSelectTab('map')}
            className={`whitespace-nowrap shrink-0 py-1 transition-colors cursor-pointer border-b-2 ${
              activeTab === 'map'
                ? 'border-amber-400 text-amber-300 font-semibold'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            대륙 지도
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0">
          <button
            onClick={onReplayEntrance}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-amber-200 hover:text-amber-100 bg-amber-950/50 hover:bg-amber-900/60 border border-amber-700/50 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Feather className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">입장 연출 다시보기</span>
            <span className="sm:hidden">연출</span>
          </button>
        </div>
      </div>
    </header>
  );
};
