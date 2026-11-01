import React, { useState } from 'react';
import { CHARACTERS, getCharacterImageUrl, SITUATION_LABELS } from '../data/characters';
import { Character, FactionId } from '../types/fantasy';
import { User, Heart, Sparkles, Shield, Search, Flame, MessageSquare, ChevronRight, X, ExternalLink } from 'lucide-react';

export const CharactersTab: React.FC = () => {
  const [selectedFaction, setSelectedFaction] = useState<FactionId | 'all' | 'supporting'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Situation preview states map: character id -> situation code (default is 1 = 평상시)
  const [situationMap, setSituationMap] = useState<Record<string, number>>({});
  
  // Modal for inspecting full situation codes for a character
  const [inspectingChar, setInspectingChar] = useState<Character | null>(null);

  // Fallback image error tracker
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleSituationChange = (charId: string, code: number) => {
    setSituationMap((prev) => ({
      ...prev,
      [charId]: code,
    }));
  };

  const filteredCharacters = CHARACTERS.filter((c) => {
    // Faction match
    if (selectedFaction === 'supporting') {
      if (c.code !== 'U') return false;
    } else if (selectedFaction !== 'all') {
      if (c.code === 'U') return false;
      if (c.faction !== selectedFaction) return false;
    }

    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = c.name.toLowerCase().includes(q);
      const matchTitle = c.title.toLowerCase().includes(q);
      const matchRealm = c.realmStage.toLowerCase().includes(q);
      const matchPersonality = c.personality.toLowerCase().includes(q);
      return matchName || matchTitle || matchRealm || matchPersonality;
    }

    return true;
  });

  return (
    <div className="space-y-10">
      {/* Header Banner */}
      <section className="relative p-6 sm:p-10 rounded-2xl bg-gradient-to-r from-stone-900 via-stone-900 to-amber-950/40 border border-amber-900/40 shadow-xl overflow-hidden">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase mb-2">
            <User className="w-4 h-4" />
            <span>주요 인물 도감 · 인연록</span>
          </div>
          <h1 className="font-cinzel text-2xl sm:text-4xl font-extrabold text-amber-100 tracking-wide">
            대륙의 영웅들과 영지 인재
          </h1>
          <p className="mt-3 text-sm sm:text-base text-stone-300 font-lore leading-relaxed">
            카이로스 제국의 황제와 기사들, 대산림의 엘프 여왕과 방위대, 대협곡과 대평원의 마족 군주들,
            그리고 변방 영지를 함께 부흥시킬 핵심 인재들의 성격과 배경, 3단 표정(평상시·설렘·흥분)을 실시간으로 확인하십시오.
          </p>
        </div>

        {/* Faction Tabs & Search */}
        <div className="mt-8 pt-6 border-t border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-950/80 rounded-xl border border-stone-800">
            <button
              onClick={() => setSelectedFaction('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                selectedFaction === 'all'
                  ? 'bg-amber-600 text-stone-950 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              전체
            </button>
            <button
              onClick={() => setSelectedFaction('kairos')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                selectedFaction === 'kairos'
                  ? 'bg-amber-600 text-stone-950 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              카이로스 제국
            </button>
            <button
              onClick={() => setSelectedFaction('great_forest')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                selectedFaction === 'great_forest'
                  ? 'bg-amber-600 text-stone-950 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              대산림 (엘프)
            </button>
            <button
              onClick={() => setSelectedFaction('great_canyon')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                selectedFaction === 'great_canyon'
                  ? 'bg-amber-600 text-stone-950 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              마족 & 심연
            </button>
            <button
              onClick={() => setSelectedFaction('great_plains')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                selectedFaction === 'great_plains'
                  ? 'bg-amber-600 text-stone-950 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              대평원 (맥·알데·오크)
            </button>
            <button
              onClick={() => setSelectedFaction('frontier')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                selectedFaction === 'frontier'
                  ? 'bg-amber-600 text-stone-950 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              변방영지 인재
            </button>
            <button
              onClick={() => setSelectedFaction('wanderer')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                selectedFaction === 'wanderer'
                  ? 'bg-amber-600 text-stone-950 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              방랑자
            </button>
            <button
              onClick={() => setSelectedFaction('supporting')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                selectedFaction === 'supporting'
                  ? 'bg-amber-600 text-stone-950 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              조연 (U)
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="인물명, 경지, 성격 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-950/80 border border-stone-800 rounded-lg text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>
      </section>

      {/* Characters List Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {filteredCharacters.map((char) => {
          const currentSituation = situationMap[char.id] ?? (char.subCode ?? 1);
          const currentImgUrl = getCharacterImageUrl(char, currentSituation);
          const hasImageError = imageErrors[`${char.id}_${currentSituation}`];

          return (
            <article
              key={char.id}
              className="p-6 rounded-2xl bg-stone-900/85 border border-stone-800 hover:border-amber-600/40 transition-all flex flex-col justify-between shadow-lg"
            >
              <div className="space-y-5">
                {/* Top Info Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-cinzel text-xs font-bold px-2 py-0.5 rounded bg-amber-950/70 text-amber-300 border border-amber-800/60">
                      코드: {char.code === 'U' ? `U${char.subCode}` : char.code}
                    </span>
                    <span className="text-xs text-stone-400">{char.factionName}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-stone-400">
                    <span>{char.age}</span>
                    {char.gender === 'female' && (
                      <span className="text-rose-300 font-medium">{char.cupSize}</span>
                    )}
                    {char.mbti && <span>· {char.mbti}</span>}
                    {char.maritalStatus && (
                      <span className="text-stone-500">· {char.maritalStatus}</span>
                    )}
                  </div>
                </div>

                {/* Main Split: Portrait Preview + Core Character Stats */}
                <div className="flex flex-col sm:flex-row gap-5">
                  {/* Portrait Column */}
                  <div className="sm:w-48 shrink-0 flex flex-col items-center">
                    <div className="relative w-44 h-56 rounded-xl overflow-hidden bg-stone-950 border-2 border-amber-900/40 shadow-inner group">
                      {!hasImageError ? (
                        <img
                          src={currentImgUrl}
                          alt={`${char.name} - ${SITUATION_LABELS[currentSituation] || '상황'}`}
                          referrerPolicy="no-referrer"
                          onError={() => {
                            setImageErrors((prev) => ({
                              ...prev,
                              [`${char.id}_${currentSituation}`]: true,
                            }));
                          }}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        // Stylized Medieval Silhouette Fallback
                        <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center bg-gradient-to-b from-stone-950 via-stone-900 to-amber-950/30">
                          <div className="w-12 h-12 rounded-full border border-amber-500/40 flex items-center justify-center text-amber-300 font-cinzel text-xl font-black mb-2">
                            {char.code}
                          </div>
                          <div className="font-bold text-xs text-amber-200">{char.name}</div>
                          <div className="text-[10px] text-stone-400 mt-1">
                            {SITUATION_LABELS[currentSituation] || `상황 코드 ${currentSituation}`}
                          </div>
                          <span className="text-[9px] text-amber-500/70 mt-2 font-mono">
                            {char.code === 'U' ? `U${char.subCode}.jpg` : `${char.code}${currentSituation}.jpg`}
                          </span>
                        </div>
                      )}

                      {/* Current Situation Badge Overlay */}
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-stone-950/95 via-stone-950/60 to-transparent p-2 text-center">
                        <span className="text-[11px] font-medium text-amber-200">
                          {SITUATION_LABELS[currentSituation] || `코드 ${currentSituation}`}
                        </span>
                      </div>
                    </div>

                    {/* REQUIRED INTERACTIVE PREVIEW CONTROLS: 평상시 > 설렘 > 흥분 */}
                    <div className="w-full mt-3 space-y-1">
                      <div className="text-[10px] text-stone-400 text-center font-semibold">
                        인물 미리보기 (표정 전환)
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        {/* 1. 평상시 (1) */}
                        <button
                          onClick={() => handleSituationChange(char.id, char.code === 'U' ? (char.subCode ?? 1) : 1)}
                          className={`px-1.5 py-1 text-[11px] font-medium rounded transition-all cursor-pointer text-center ${
                            currentSituation === 1 || (char.code === 'U' && currentSituation === char.subCode)
                              ? 'bg-amber-600 text-stone-950 font-bold shadow-sm'
                              : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800'
                          }`}
                        >
                          평상시
                        </button>

                        {/* 2. 설렘·부끄 (6) */}
                        <button
                          onClick={() => handleSituationChange(char.id, 6)}
                          disabled={char.code === 'U'}
                          className={`px-1.5 py-1 text-[11px] font-medium rounded transition-all cursor-pointer text-center ${
                            currentSituation === 6
                              ? 'bg-rose-600 text-white font-bold shadow-sm'
                              : char.code === 'U'
                              ? 'bg-stone-950 text-stone-600 cursor-not-allowed'
                              : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800'
                          }`}
                        >
                          설렘
                        </button>

                        {/* 3. 흥분·발정 (9) */}
                        <button
                          onClick={() => handleSituationChange(char.id, 9)}
                          disabled={char.code === 'U' || char.gender === 'male'}
                          className={`px-1.5 py-1 text-[11px] font-medium rounded transition-all cursor-pointer text-center ${
                            currentSituation === 9
                              ? 'bg-purple-600 text-white font-bold shadow-sm'
                              : char.code === 'U' || char.gender === 'male'
                              ? 'bg-stone-950 text-stone-600 cursor-not-allowed'
                              : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800'
                          }`}
                        >
                          흥분
                        </button>
                      </div>

                      {/* View other situations trigger */}
                      <button
                        onClick={() => setInspectingChar(char)}
                        className="w-full mt-1.5 py-1 text-[10px] text-amber-400 hover:text-amber-300 bg-stone-950/60 hover:bg-stone-950 rounded border border-amber-900/40 flex items-center justify-center gap-1 cursor-pointer transition-colors"
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>전체 상황 코드 ({char.availableSituations.length}종)</span>
                      </button>
                    </div>
                  </div>

                  {/* Character Details Column */}
                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-amber-100 flex items-center gap-2">
                        <span>{char.name}</span>
                        <span className="text-xs font-normal text-amber-400 font-cinzel">
                          {char.title}
                        </span>
                      </h3>
                      <div className="text-xs text-stone-400 font-medium mt-0.5">
                        {char.role}
                      </div>
                    </div>

                    {/* 경지 & 전투 방식 */}
                    <div className="p-3 rounded-lg bg-stone-950/70 border border-stone-800 space-y-1">
                      <div className="flex items-center gap-1.5 text-xs">
                        <Shield className="w-3.5 h-3.5 text-amber-400" />
                        <span className="font-semibold text-stone-300">능력 & 경지:</span>
                        <span className="text-amber-300 font-bold">{char.realmStage}</span>
                      </div>
                      <div className="text-xs text-stone-400 font-lore leading-relaxed">
                        {char.combatStyle}
                      </div>
                    </div>

                    {/* 성격 (Personality) */}
                    <div className="text-xs space-y-1">
                      <div className="font-semibold text-stone-300 flex items-center gap-1.5">
                        <Heart className="w-3.5 h-3.5 text-rose-400" />
                        <span>성격 & 특징:</span>
                      </div>
                      <p className="text-stone-300 font-lore leading-relaxed">
                        {char.personality}
                      </p>
                    </div>

                    {/* 간단한 배경 (Background) */}
                    <div className="text-xs space-y-1">
                      <div className="font-semibold text-stone-400">간단한 배경:</div>
                      <p className="text-stone-300 font-lore leading-relaxed">
                        {char.background}
                      </p>
                    </div>

                    {/* 말투 & 특징 요약 */}
                    <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-stone-800/60 text-stone-400">
                      <div>
                        <strong>말투: </strong>
                        <span>{char.speechTone}</span>
                      </div>
                      {char.favoriteThings && (
                        <div>
                          <strong>선호(♥): </strong>
                          <span>{char.favoriteThings}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Sample Roleplay Quote Syntax */}
                <div className="p-3 rounded-xl bg-stone-950/90 border border-amber-900/30 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-amber-500/40 bg-stone-900">
                    <img
                      src={currentImgUrl}
                      alt={char.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-amber-300 font-semibold">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>대사 예시 · RP syntax:</span>
                      <code className="text-[10px] text-stone-500 font-mono">
                        💬{char.name} | &quot;...&quot;
                      </code>
                    </div>
                    <p className="text-xs text-stone-200 font-lore italic leading-relaxed">
                      &quot;{char.sampleQuote}&quot;
                    </p>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* FULL SITUATION GALLERY MODAL */}
      {inspectingChar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl max-h-[85vh] bg-stone-900 border border-amber-600/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-cinzel text-xs font-bold px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                  코드: {inspectingChar.code}
                </span>
                <h3 className="font-bold text-base text-stone-100">
                  {inspectingChar.name} 전체 표정 & 상황 코드 갤러리
                </h3>
              </div>
              <button
                onClick={() => setInspectingChar(null)}
                className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Situation Grid */}
            <div className="p-5 overflow-y-auto space-y-4">
              <p className="text-xs text-stone-300 font-lore">
                원하는 상황 코드를 클릭하면 해당 표정이 캐릭터 카드 미리보기에 즉시 적용됩니다.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {inspectingChar.availableSituations.map((sit) => {
                  const url = getCharacterImageUrl(inspectingChar, sit.code);
                  const isCurrent = (situationMap[inspectingChar.id] ?? (inspectingChar.subCode ?? 1)) === sit.code;

                  return (
                    <button
                      key={sit.code}
                      onClick={() => {
                        handleSituationChange(inspectingChar.id, sit.code);
                        setInspectingChar(null);
                      }}
                      className={`p-2 rounded-xl text-left border transition-all cursor-pointer flex flex-col gap-2 ${
                        isCurrent
                          ? 'border-amber-400 bg-amber-950/40 shadow-md'
                          : 'border-stone-800 bg-stone-950 hover:border-amber-700/60'
                      }`}
                    >
                      <div className="w-full h-28 rounded-lg overflow-hidden bg-stone-900 relative">
                        <img
                          src={url}
                          alt={sit.label}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        <div className="absolute top-1 left-1 px-1.5 py-0.5 bg-black/75 rounded text-[10px] font-mono text-amber-300">
                          #{sit.code}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-stone-200 truncate">{sit.label}</span>
                        {isCurrent && <span className="text-[10px] text-amber-400 font-bold">선택됨</span>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-stone-800 flex justify-end bg-stone-950">
              <button
                onClick={() => setInspectingChar(null)}
                className="px-4 py-2 text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
