import React, { useState } from 'react';
import { TERRITORIES } from '../data/lore';
import { Territory, FactionId } from '../types/fantasy';
import { MapPin, Compass, Shield, Users, Coins, Footprints, AlertCircle, Sparkles, Crown } from 'lucide-react';

export const ContinentMapTab: React.FC = () => {
  const [selectedTerritory, setSelectedTerritory] = useState<Territory>(
    TERRITORIES.find((t) => t.id === 'frontier_town') || TERRITORIES[0]
  );
  const [filterFaction, setFilterFaction] = useState<FactionId | 'all'>('all');
  const [showRoutes, setShowRoutes] = useState<boolean>(true);

  const filteredTerritories = TERRITORIES.filter(
    (t) => filterFaction === 'all' || t.faction === filterFaction
  );

  const getPinColor = (territory: Territory) => {
    if (territory.id === 'frontier_town') return 'bg-amber-500 border-amber-300 text-stone-950 ring-4 ring-amber-400/40 animate-pulse';
    if (territory.faction === 'kairos') return 'bg-sky-600 border-sky-300 text-white';
    if (territory.faction === 'great_forest') return 'bg-emerald-600 border-emerald-300 text-white';
    if (territory.faction === 'great_canyon') return 'bg-rose-700 border-rose-400 text-white';
    if (territory.faction === 'great_plains') return 'bg-amber-700 border-amber-300 text-white';
    return 'bg-stone-600 border-stone-300 text-white';
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <section className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-stone-900 via-stone-900 to-amber-950/40 border border-amber-900/40 shadow-xl overflow-hidden">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase mb-2">
            <Compass className="w-4 h-4" />
            <span>대륙 전도 & 거점 지형도</span>
          </div>
          <h1 className="font-cinzel text-2xl sm:text-4xl font-extrabold text-amber-100 tracking-wide">
            카이로스 대륙 형세도
          </h1>
          <p className="mt-3 text-sm text-stone-300 font-lore leading-relaxed">
            중앙의 카이로스 제국, 서쪽의 대산림, 동쪽의 대평원, 북쪽의 대협곡.
            그리고 그 세력들이 마주하는 북방 변방영지를 중심으로 주요 거점과 도보 이동 일수를 탐색하십시오.
          </p>
        </div>

        {/* Filters */}
        <div className="mt-6 pt-4 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setFilterFaction('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                filterFaction === 'all'
                  ? 'bg-amber-600 text-stone-950 font-bold'
                  : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800'
              }`}
            >
              전체 영지
            </button>
            <button
              onClick={() => setFilterFaction('kairos')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                filterFaction === 'kairos'
                  ? 'bg-sky-600 text-white font-bold'
                  : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800'
              }`}
            >
              제국 영지
            </button>
            <button
              onClick={() => setFilterFaction('great_forest')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                filterFaction === 'great_forest'
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800'
              }`}
            >
              대산림
            </button>
            <button
              onClick={() => setFilterFaction('great_plains')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                filterFaction === 'great_plains'
                  ? 'bg-amber-700 text-white font-bold'
                  : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800'
              }`}
            >
              대평원
            </button>
            <button
              onClick={() => setFilterFaction('great_canyon')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                filterFaction === 'great_canyon'
                  ? 'bg-rose-700 text-white font-bold'
                  : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800'
              }`}
            >
              대협곡
            </button>
          </div>

          <label className="flex items-center gap-2 text-xs text-stone-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showRoutes}
              onChange={(e) => setShowRoutes(e.target.checked)}
              className="accent-amber-500 rounded"
            />
            <span>변방영지 연결 경로선 표시</span>
          </label>
        </div>
      </section>

      {/* Main Map & Detail Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Interactive Map Canvas (8 cols) */}
        <div className="lg:col-span-8 p-4 sm:p-6 rounded-2xl bg-stone-900/90 border border-amber-900/40 shadow-2xl relative overflow-hidden">
          {/* Map Surface Background */}
          <div className="relative w-full aspect-[4/3] rounded-xl bg-gradient-to-b from-[#181512] via-[#211c16] to-[#120f0d] border border-amber-950/60 overflow-hidden shadow-inner select-none">
            {/* Topography Texture Overlays */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

            {/* Region Atmospheric Color Wash */}
            {/* North: Great Canyon (Crimson) */}
            <div className="absolute top-0 inset-x-0 h-1/4 bg-gradient-to-b from-rose-950/40 to-transparent pointer-events-none" />
            {/* West: Great Forest (Emerald) */}
            <div className="absolute top-1/4 left-0 w-1/3 bottom-0 bg-gradient-to-r from-emerald-950/40 to-transparent pointer-events-none" />
            {/* East: Great Plains (Amber/Gold) */}
            <div className="absolute top-1/4 right-0 w-1/3 bottom-0 bg-gradient-to-l from-amber-950/40 to-transparent pointer-events-none" />
            {/* Center: Kairos Empire (Blue slate) */}
            <div className="absolute top-1/3 left-1/3 w-1/3 h-1/2 bg-[radial-gradient(ellipse_at_center,rgba(14,116,144,0.18)_0%,transparent_70%)] pointer-events-none" />

            {/* Region Label Watermarks */}
            <div className="absolute top-4 left-6 font-cinzel text-xs font-bold text-rose-500/40 tracking-widest pointer-events-none">
              대협곡 (GREAT CANYON)
            </div>
            <div className="absolute bottom-6 left-6 font-cinzel text-xs font-bold text-emerald-500/40 tracking-widest pointer-events-none">
              대산림 (GREAT FOREST)
            </div>
            <div className="absolute bottom-6 right-6 font-cinzel text-xs font-bold text-amber-500/40 tracking-widest pointer-events-none">
              대평원 (GREAT PLAINS)
            </div>
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 font-cinzel text-xs font-bold text-sky-400/40 tracking-widest pointer-events-none">
              카이로스 제국 (KAIROS EMPIRE)
            </div>

            {/* SVG Connecting Route Lines */}
            {showRoutes && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                {/* Frontier (42, 14) to Roden (42, 24) */}
                <line x1="42%" y1="14%" x2="42%" y2="24%" stroke="#d97706" strokeWidth="2" strokeDasharray="4 3" opacity="0.8" />
                <text x="44%" y="19%" fill="#fbbf24" fontSize="10" fontFamily="monospace">도보 3일</text>

                {/* Roden (42, 24) to Aion (48, 38) */}
                <line x1="42%" y1="24%" x2="48%" y2="38%" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />

                {/* Frontier (42, 14) to Aion (48, 38) Direct concept */}
                <line x1="42%" y1="14%" x2="48%" y2="38%" stroke="#d97706" strokeWidth="1" strokeDasharray="2 4" opacity="0.4" />
                <text x="48%" y="27%" fill="#e0e7ff" fontSize="9" fontFamily="monospace">도보 15일</text>

                {/* Aion (48, 38) to Eldorado (50, 65) */}
                <line x1="48%" y1="38%" x2="50%" y2="65%" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6 4" opacity="0.7" />
                <text x="51%" y="52%" fill="#38bdf8" fontSize="10" fontFamily="monospace">황도 가도</text>

                {/* Frontier (42, 14) to Danpung (28, 19) */}
                <line x1="42%" y1="14%" x2="28%" y2="19%" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
                <text x="32%" y="15%" fill="#34d399" fontSize="9" fontFamily="monospace">반나절</text>

                {/* Frontier (42, 14) to Bellana (62, 12) */}
                <line x1="42%" y1="14%" x2="62%" y2="12%" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.7" />
                <text x="52%" y="11%" fill="#fb7185" fontSize="9" fontFamily="monospace">도보 3.5일</text>

                {/* Frontier (42, 14) to Demon Castle (50, 6) */}
                <line x1="42%" y1="14%" x2="50%" y2="6%" stroke="#f43f5e" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
              </svg>
            )}

            {/* Territory Pins */}
            {filteredTerritories.map((territory) => {
              const isSelected = selectedTerritory.id === territory.id;
              const isFrontier = territory.id === 'frontier_town';

              return (
                <button
                  key={territory.id}
                  onClick={() => setSelectedTerritory(territory)}
                  style={{
                    left: `${territory.coordinates.x}%`,
                    top: `${territory.coordinates.y}%`,
                  }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 group focus:outline-none transition-transform ${
                    isSelected ? 'scale-125 z-30' : 'hover:scale-115'
                  }`}
                  title={territory.name}
                >
                  <div
                    className={`relative w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center border-2 shadow-lg cursor-pointer ${getPinColor(
                      territory
                    )}`}
                  >
                    {isFrontier ? (
                      <Crown className="w-3.5 h-3.5 text-stone-950 font-bold" />
                    ) : (
                      <MapPin className="w-3.5 h-3.5" />
                    )}
                  </div>

                  {/* Territory Label Badge */}
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded text-[10px] sm:text-xs font-semibold whitespace-nowrap shadow-md pointer-events-none transition-colors ${
                      isSelected
                        ? 'bg-amber-400 text-stone-950 font-bold ring-1 ring-amber-300'
                        : 'bg-stone-900/90 text-stone-200 border border-stone-800'
                    }`}
                  >
                    {territory.name.split(' ')[0]}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Map Legend */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-400">
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-amber-500 border border-amber-300" />
                <span>변방영지 ({'{user}'})</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-sky-600" />
                <span>카이로스 제국</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-600" />
                <span>대산림 (엘프)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-amber-700" />
                <span>대평원</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-700" />
                <span>대협곡 (마족)</span>
              </span>
            </div>
            <span className="text-[11px] text-stone-500">
              핀을 클릭하면 상세 정보가 표시됩니다
            </span>
          </div>
        </div>

        {/* Selected Territory Detail Card (4 cols) */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-stone-900/95 border-2 border-amber-700/50 shadow-2xl space-y-5">
          <div className="border-b border-stone-800 pb-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-amber-400">
                {selectedTerritory.grade}
              </span>
              <span className="text-stone-400">
                영주: {selectedTerritory.lord}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-cinzel text-amber-100 mt-1">
              {selectedTerritory.name}
            </h2>
          </div>

          {/* Core Metrics */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-stone-950/80 border border-stone-800 space-y-1">
              <div className="flex items-center gap-1 text-stone-400">
                <Users className="w-3.5 h-3.5 text-stone-400" />
                <span>인구수</span>
              </div>
              <div className="font-semibold text-stone-200">{selectedTerritory.population}</div>
            </div>

            <div className="p-3 rounded-lg bg-stone-950/80 border border-stone-800 space-y-1">
              <div className="flex items-center gap-1 text-stone-400">
                <Shield className="w-3.5 h-3.5 text-stone-400" />
                <span>가용 군사력</span>
              </div>
              <div className="font-semibold text-amber-300 font-mono text-[11px] truncate">
                {selectedTerritory.military}
              </div>
            </div>

            <div className="p-3 rounded-lg bg-stone-950/80 border border-stone-800 space-y-1">
              <div className="flex items-center gap-1 text-stone-400">
                <Coins className="w-3.5 h-3.5 text-stone-400" />
                <span>징세 및 재정</span>
              </div>
              <div className="font-semibold text-stone-200 text-[11px]">{selectedTerritory.tax}</div>
            </div>

            <div className="p-3 rounded-lg bg-stone-950/80 border border-stone-800 space-y-1">
              <div className="flex items-center gap-1 text-stone-400">
                <Footprints className="w-3.5 h-3.5 text-stone-400" />
                <span>변방과의 거리</span>
              </div>
              <div className="font-semibold text-amber-400 text-[11px]">
                {selectedTerritory.travelToFrontier || '직통로 없음'}
              </div>
            </div>
          </div>

          {/* Defense & Trade */}
          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-lg bg-stone-950/60 border border-stone-800 space-y-1">
              <span className="font-semibold text-stone-300">방어 시설:</span>
              <p className="text-stone-400">{selectedTerritory.defense}</p>
            </div>
            <div className="p-3 rounded-lg bg-stone-950/60 border border-stone-800 space-y-1">
              <span className="font-semibold text-stone-300">물자 유통:</span>
              <p className="text-stone-400">{selectedTerritory.trade}</p>
            </div>
          </div>

          {/* Lore Description */}
          <div className="space-y-1 text-xs">
            <span className="font-semibold text-stone-300">영지 개요:</span>
            <p className="text-stone-300 font-lore leading-relaxed">
              {selectedTerritory.description}
            </p>
          </div>

          {/* Key Figures */}
          <div className="pt-3 border-t border-stone-800 text-xs">
            <span className="font-semibold text-amber-300">관련 주요 인물:</span>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {selectedTerritory.keyFigures.map((fig, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded bg-stone-950 border border-stone-800 text-stone-300 text-[11px]"
                >
                  {fig}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
