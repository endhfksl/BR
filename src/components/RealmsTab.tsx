import React, { useState } from 'react';
import { QI_REALMS, MAGIC_CIRCLES, MILITARY_CALC_SCALE, DOMAIN_CLASH_INFO } from '../data/realms';
import { Shield, Sparkles, Sword, Calculator, Zap, AlertTriangle, Flame, Skull, ChevronRight, Activity } from 'lucide-react';

export const RealmsTab: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'both' | 'qi' | 'magic' | 'clash'>('both');

  // Interactive Military Power Calculator state
  const [militiaCount, setMilitiaCount] = useState<number>(20);
  const [flowerCount, setFlowerCount] = useState<number>(0);
  const [steelCount, setSteelCount] = useState<number>(0);
  const [manifestCount, setManifestCount] = useState<number>(0);
  const [denseCount, setDenseCount] = useState<number>(0);
  const [realmCount, setRealmCount] = useState<number>(0);

  // Interactive Domain Clash Simulator state
  const [selectedPresetId, setSelectedPresetId] = useState<string>('terina_vs_ellaria');
  const [combatant1Index, setCombatant1Index] = useState<number>(0); // 테리나
  const [combatant2Index, setCombatant2Index] = useState<number>(1); // 엘라리아
  const [clashEnergyDrain, setClashEnergyDrain] = useState<number>(75); // simulated drain intensity

  const totalMilitaryPower =
    militiaCount * MILITARY_CALC_SCALE.militia.value +
    flowerCount * MILITARY_CALC_SCALE.flower_sense.value +
    steelCount * MILITARY_CALC_SCALE.steel_construct.value +
    manifestCount * MILITARY_CALC_SCALE.manifest_transform.value +
    denseCount * MILITARY_CALC_SCALE.dense_sovereign.value +
    realmCount * MILITARY_CALC_SCALE.realm_absolute.value;

  const totalSoldiers =
    militiaCount + flowerCount + steelCount + manifestCount + denseCount + realmCount;

  // Evaluate territory tier based on military power
  const getEvaluatedGrade = (power: number) => {
    if (power < 50) return { grade: '마을 (Village)', color: 'text-stone-300', bg: 'bg-stone-800' };
    if (power <= 200) return { grade: '큰마을 (Town)', color: 'text-emerald-300', bg: 'bg-emerald-950/60' };
    if (power <= 1000) return { grade: '소도시 (Small City)', color: 'text-blue-300', bg: 'bg-blue-950/60' };
    if (power <= 5000) return { grade: '도시 (City)', color: 'text-amber-300', bg: 'bg-amber-950/60' };
    return { grade: '대도시 (Metropolis)', color: 'text-rose-300', bg: 'bg-rose-950/60' };
  };

  const currentGrade = getEvaluatedGrade(totalMilitaryPower);

  // Preset loaders
  const loadPreset = (preset: 'frontier' | 'roden' | 'aion' | 'elfed') => {
    if (preset === 'frontier') {
      setMilitiaCount(20);
      setFlowerCount(0);
      setSteelCount(0);
      setManifestCount(0);
      setDenseCount(0);
      setRealmCount(0);
    } else if (preset === 'roden') {
      setMilitiaCount(100);
      setFlowerCount(15);
      setSteelCount(10);
      setManifestCount(1);
      setDenseCount(0);
      setRealmCount(0);
    } else if (preset === 'aion') {
      setMilitiaCount(2000);
      setFlowerCount(500);
      setSteelCount(100);
      setManifestCount(10);
      setDenseCount(1);
      setRealmCount(0);
    } else if (preset === 'elfed') {
      setMilitiaCount(0);
      setFlowerCount(20);
      setSteelCount(100);
      setManifestCount(30);
      setDenseCount(2);
      setRealmCount(1);
    }
  };

  const handleSelectPreset = (presetId: string) => {
    setSelectedPresetId(presetId);
    if (presetId === 'terina_vs_ellaria') {
      setCombatant1Index(0); // 테리나
      setCombatant2Index(1); // 엘라리아
    } else if (presetId === 'asura_vs_kaina') {
      setCombatant1Index(5); // 아수라
      setCombatant2Index(4); // 카이나
    } else if (presetId === 'astaroth_vs_victoria') {
      setCombatant1Index(2); // 아스타로트
      setCombatant2Index(3); // 빅토리아
    }
  };

  const currentPreset = DOMAIN_CLASH_INFO.clashPresets.find((p) => p.id === selectedPresetId);
  const combatant1 = DOMAIN_CLASH_INFO.realmHolders[combatant1Index];
  const combatant2 = DOMAIN_CLASH_INFO.realmHolders[combatant2Index];

  return (
    <div className="space-y-12">
      {/* Header */}
      <section className="relative p-6 sm:p-10 rounded-2xl bg-gradient-to-r from-stone-900 via-stone-900 to-amber-950/40 border border-amber-900/40 shadow-xl overflow-hidden">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase mb-2">
            <Sword className="w-4 h-4" />
            <span>경지 체계 · 군사력 산정 · 영역 충돌</span>
          </div>
          <h1 className="font-cinzel text-2xl sm:text-4xl font-extrabold text-amber-100 tracking-wide">
            기(氣) & 마법(魔法) 5대 경지
          </h1>
          <p className="mt-3 text-sm sm:text-base text-stone-300 font-lore leading-relaxed">
            육체를 거푸집으로 단련하는 무인의 기(氣)와 심장에 서클을 구축하여 법칙을 비트는 마법(魔法).
            경지 한 단계의 격차는 절대적인 유지력을 결정지으며, 최상위 영역급 강자들의 격돌은 물리와 개념을 붕괴시키는 <strong>영역 충돌(Domain Clash)</strong>을 유발합니다.
          </p>

          <div className="flex flex-wrap items-center gap-2 mt-6">
            <button
              onClick={() => setActiveCategory('both')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                activeCategory === 'both' ? 'bg-amber-600 text-stone-950 font-bold' : 'bg-stone-800 text-stone-300 hover:text-white'
              }`}
            >
              전체 비교 (기 + 마법)
            </button>
            <button
              onClick={() => setActiveCategory('qi')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                activeCategory === 'qi' ? 'bg-amber-600 text-stone-950 font-bold' : 'bg-stone-800 text-stone-300 hover:text-white'
              }`}
            >
              기(氣) 5단계만 보기
            </button>
            <button
              onClick={() => setActiveCategory('magic')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                activeCategory === 'magic' ? 'bg-amber-600 text-stone-950 font-bold' : 'bg-stone-800 text-stone-300 hover:text-white'
              }`}
            >
              마법(魔法) 5단계만 보기
            </button>
            <button
              onClick={() => setActiveCategory('clash')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                activeCategory === 'clash'
                  ? 'bg-rose-600 text-white font-bold shadow-md ring-2 ring-rose-400/40'
                  : 'bg-rose-950/60 text-rose-300 hover:bg-rose-900/80 border border-rose-800/50'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>💥 영역 충돌 (Domain Clash)</span>
            </button>
          </div>
        </div>
      </section>

      {/* SECTION: #영역 충돌 (DOMAIN CLASH) */}
      {(activeCategory === 'clash' || activeCategory === 'both') && (
        <section className="p-6 sm:p-10 rounded-2xl bg-gradient-to-b from-stone-900 via-stone-900 to-rose-950/30 border-2 border-rose-700/50 shadow-2xl space-y-8 relative overflow-hidden">
          {/* Ambient glow decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Title Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-rose-900/40 pb-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-rose-400 tracking-wider uppercase mb-1">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>최상위 초월자들의 극한 격돌 · 물리 & 개념 붕괴</span>
              </div>
              <h2 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-amber-100 flex items-center gap-3">
                <span>#영역 충돌 (Domain Clash)</span>
              </h2>
            </div>
            <span className="text-xs px-3 py-1 rounded bg-rose-950 text-rose-300 border border-rose-800 font-mono">
              기와 마법의 영역 공통 적용
            </span>
          </div>

          {/* Definition Quote Banner */}
          <div className="p-5 rounded-xl bg-stone-950/80 border-l-4 border-rose-600 space-y-2">
            <div className="text-xs font-semibold text-rose-400">개념 정의</div>
            <p className="text-sm sm:text-base text-stone-200 font-lore leading-relaxed font-semibold">
              &quot;{DOMAIN_CLASH_INFO.definition}&quot;
            </p>
          </div>

          {/* Core Effects & Rules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. 두 가지 고유 규칙의 동시 강제 적용 */}
            <div className="p-5 rounded-xl bg-stone-950/60 border border-stone-800 space-y-3">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h3>1. 두 가지 고유 규칙의 동시 강제 적용</h3>
              </div>
              <p className="text-xs text-stone-300 font-lore leading-relaxed">
                양측이 창조한 <strong>&apos;두 가지 고유 규칙&apos;</strong>이 한 공간에 동시에 강제 적용되어 상호 간섭하고 모순을 일으킵니다.
              </p>
              <div className="p-3 rounded-lg bg-stone-900/80 border border-amber-900/40 text-xs text-amber-200/90 font-lore space-y-1">
                <span className="font-semibold text-amber-400">규칙 충돌 실례:</span>
                <p>
                  &quot;모든 참격이 절대 명중한다&quot;는 기의 규칙과 &quot;모든 물리력이 둔화된다&quot;는 마법의 규칙이 동시에 동일 전장에 성립하여 두 상반된 법칙이 전장을 비틉니다.
                </p>
              </div>
            </div>

            {/* 2. 기하급수적 마나·기 소모량 폭증 */}
            <div className="p-5 rounded-xl bg-stone-950/60 border border-stone-800 space-y-3">
              <div className="flex items-center gap-2 text-rose-300 font-bold text-sm">
                <Flame className="w-4 h-4 text-rose-400" />
                <h3>2. 기하급수적 기·마나 소모량 폭증</h3>
              </div>
              <p className="text-xs text-stone-300 font-lore leading-relaxed">
                현실에 심상을 강제로 덧씌우는 영역 전개 자체도 막대한 기와 마나를 소모하지만, <strong>타인의 영역과 충돌하며 이를 억누르거나 방어할 때는 그 소모량이 기하급수적으로 폭증</strong>합니다.
              </p>
              <div className="p-3 rounded-lg bg-stone-900/80 border border-rose-900/40 text-xs text-rose-200/90 font-lore">
                평소 수 시간 유지 가능한 고유 영역이라도 충돌 시에는 수 분, 길어야 수십 초 내에 술자의 전력을 급격히 바닥내며 치열한 소모전으로 치닫습니다.
              </div>
            </div>
          </div>

          {/* Defeat Conditions & Rebound Penalty Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 패배 조건 */}
            <div className="p-5 rounded-xl bg-stone-950/70 border border-stone-800 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Shield className="w-4 h-4 text-amber-400" />
                <h3>충돌 지속 및 패배 조건</h3>
              </div>
              <ul className="text-xs text-stone-300 space-y-2.5 font-lore">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <div>
                    <strong>자원 한계(고갈): </strong>
                    어느 한쪽의 기나 마나가 한계에 다다를 때까지 충돌은 멈추지 않고 지속됩니다.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <div>
                    <strong>육체적 데미지 및 전투 불능: </strong>
                    충돌 도중 발생한 물리적·개념적 참격이나 타격으로 인해 한쪽이 육체적으로 전투 불능에 빠질 때까지 이어집니다.
                  </div>
                </li>
              </ul>
            </div>

            {/* 치명적 반동 (Rebound) */}
            <div className="p-5 rounded-xl bg-stone-950/70 border border-rose-900/60 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <h3>패배자의 반동: 심상 붕괴 및 역류 현상</h3>
              </div>
              <p className="text-xs text-stone-300 font-lore leading-relaxed">
                한계에 달해 영역이 깨진 패배자는 <strong>현실에 덧씌웠던 심상이 산산조각 나며 막대한 역류 현상</strong>을 겪게 됩니다.
              </p>
              <div className="text-xs text-rose-300 bg-rose-950/40 p-3 rounded-lg border border-rose-800/40 font-lore">
                체내 기맥이나 마나 서클이 처참하게 파열되며, 극심한 반동으로 인해 장기간 폐인이 되거나 즉사 수준의 치명상을 입게 됩니다.
              </div>
            </div>
          </div>

          {/* INTERACTIVE DOMAIN CLASH SIMULATOR */}
          <div className="p-6 rounded-xl bg-stone-950 border border-amber-600/40 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
                  <Activity className="w-4 h-4 text-amber-400" />
                  <span>영역 충돌 가상 매치업 시뮬레이터</span>
                </div>
                <h3 className="font-cinzel text-lg font-bold text-stone-100 mt-0.5">
                  영역 보유자 간의 규칙 충돌 & 소모율 검증
                </h3>
              </div>

              {/* Matchup Presets */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-stone-400">대표 충돌 매치업:</span>
                <button
                  onClick={() => handleSelectPreset('terina_vs_ellaria')}
                  className={`px-2.5 py-1 rounded border transition-colors cursor-pointer ${
                    selectedPresetId === 'terina_vs_ellaria'
                      ? 'bg-amber-600 text-stone-950 font-bold border-amber-400'
                      : 'bg-stone-800 text-stone-300 border-stone-700 hover:text-white'
                  }`}
                >
                  테리나 vs 엘라리아
                </button>
                <button
                  onClick={() => handleSelectPreset('asura_vs_kaina')}
                  className={`px-2.5 py-1 rounded border transition-colors cursor-pointer ${
                    selectedPresetId === 'asura_vs_kaina'
                      ? 'bg-amber-600 text-stone-950 font-bold border-amber-400'
                      : 'bg-stone-800 text-stone-300 border-stone-700 hover:text-white'
                  }`}
                >
                  아수라 vs 카이나
                </button>
                <button
                  onClick={() => handleSelectPreset('astaroth_vs_victoria')}
                  className={`px-2.5 py-1 rounded border transition-colors cursor-pointer ${
                    selectedPresetId === 'astaroth_vs_victoria'
                      ? 'bg-amber-600 text-stone-950 font-bold border-amber-400'
                      : 'bg-stone-800 text-stone-300 border-stone-700 hover:text-white'
                  }`}
                >
                  아스타로트 vs 빅토리아
                </button>
              </div>
            </div>

            {/* Duel Visualizers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
              {/* VS Emblem Badge in middle */}
              <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-stone-950 border-2 border-amber-500 items-center justify-center font-cinzel text-xs font-black text-amber-300 z-10 shadow-lg">
                VS
              </div>

              {/* Combatant 1 */}
              <div className="p-4 rounded-xl bg-stone-900/90 border border-stone-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-amber-400 font-mono">{combatant1.realm}</span>
                    <h4 className="text-base font-bold text-stone-100">{combatant1.name}</h4>
                  </div>
                  <select
                    value={combatant1Index}
                    onChange={(e) => setCombatant1Index(Number(e.target.value))}
                    className="text-xs bg-stone-950 text-stone-200 border border-stone-700 rounded px-2 py-1 focus:outline-none"
                  >
                    {DOMAIN_CLASH_INFO.realmHolders.map((holder, idx) => (
                      <option key={idx} value={idx}>
                        {holder.name} ({holder.realm})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="p-3 rounded-lg bg-stone-950 border border-stone-800/80 space-y-1">
                  <div className="text-xs font-semibold text-amber-300">
                    전개된 고유 규칙:
                  </div>
                  <p className="text-xs text-stone-300 font-lore">
                    {combatant1.rule}
                  </p>
                </div>
              </div>

              {/* Combatant 2 */}
              <div className="p-4 rounded-xl bg-stone-900/90 border border-stone-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-cyan-400 font-mono">{combatant2.realm}</span>
                    <h4 className="text-base font-bold text-stone-100">{combatant2.name}</h4>
                  </div>
                  <select
                    value={combatant2Index}
                    onChange={(e) => setCombatant2Index(Number(e.target.value))}
                    className="text-xs bg-stone-950 text-stone-200 border border-stone-700 rounded px-2 py-1 focus:outline-none"
                  >
                    {DOMAIN_CLASH_INFO.realmHolders.map((holder, idx) => (
                      <option key={idx} value={idx}>
                        {holder.name} ({holder.realm})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="p-3 rounded-lg bg-stone-950 border border-stone-800/80 space-y-1">
                  <div className="text-xs font-semibold text-cyan-300">
                    전개된 고유 규칙:
                  </div>
                  <p className="text-xs text-stone-300 font-lore">
                    {combatant2.rule}
                  </p>
                </div>
              </div>
            </div>

            {/* Simulated Energy Drain Rate Bar */}
            <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-rose-300 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
                  <span>실시간 마나·기 소모율 폭증 게이지 (충돌 압력)</span>
                </span>
                <span className="font-mono text-rose-400 font-bold">{clashEnergyDrain}% / 초 (평소 대비 약 10배)</span>
              </div>
              <div className="w-full h-3 bg-stone-950 rounded-full overflow-hidden p-0.5 border border-stone-800">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 via-rose-500 to-red-600 rounded-full transition-all duration-300"
                  style={{ width: `${clashEnergyDrain}%` }}
                />
              </div>
              <div className="text-[11px] text-stone-400 flex justify-between">
                <span>일반 영역 전개 (안정)</span>
                <span className="text-rose-400">규칙 상호 충돌로 인한 급격한 자원 고갈 단계</span>
              </div>
            </div>

            {/* Collision Narrative Box */}
            {currentPreset && (
              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-800/40 text-xs font-lore text-stone-300 space-y-1">
                <span className="font-semibold text-amber-300">시뮬레이션 충돌 양상:</span>
                <p className="leading-relaxed">
                  {currentPreset.collisionEffect}
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Realms Grid (Qi and Magic) */}
      {(activeCategory === 'both' || activeCategory === 'qi' || activeCategory === 'magic') && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 기(氣) 체계 */}
          {(activeCategory === 'both' || activeCategory === 'qi') && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-amber-900/40">
                <Sword className="w-5 h-5 text-amber-400" />
                <h2 className="font-cinzel text-xl font-bold text-amber-200">
                  기(氣) 수련 체계 · 육체 거푸집
                </h2>
              </div>

              <div className="space-y-4">
                {QI_REALMS.map((realm) => (
                  <div
                    key={realm.stage}
                    className="p-5 rounded-xl bg-stone-900/80 border border-stone-800 hover:border-amber-600/50 transition-all space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-amber-950 text-amber-400 border border-amber-700/60 flex items-center justify-center text-xs font-bold font-mono">
                          {realm.stage}
                        </span>
                        <h3 className="font-bold text-base text-stone-100">{realm.name}</h3>
                        <span className="text-xs text-stone-400">({realm.circleOrGrade})</span>
                      </div>
                      <span className="text-xs font-mono text-amber-300 bg-stone-950 px-2 py-0.5 rounded border border-stone-800">
                        군사력: {realm.militaryValue}
                      </span>
                    </div>

                    <p className="text-xs text-stone-300 font-lore leading-relaxed">{realm.description}</p>

                    <div className="space-y-1 text-xs text-stone-400 pt-1">
                      {realm.capabilities.map((cap, i) => (
                        <div key={i} className="flex items-start gap-1.5">
                          <span className="text-amber-500 font-bold">·</span>
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>

                    <div className="text-[11px] text-amber-300/90 pt-2 border-t border-stone-800/80">
                      <strong className="text-stone-400">실전 무력: </strong>
                      <span>{realm.exampleFeat}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 마법(魔法) 체계 */}
          {(activeCategory === 'both' || activeCategory === 'magic') && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-cyan-900/40">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <h2 className="font-cinzel text-xl font-bold text-cyan-200">
                  마법(魔法) 수식 체계 · 심장 서클
                </h2>
              </div>

              <div className="space-y-4">
                {MAGIC_CIRCLES.map((realm) => (
                  <div
                    key={realm.stage}
                    className="p-5 rounded-xl bg-stone-900/80 border border-stone-800 hover:border-cyan-600/50 transition-all space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-700/60 flex items-center justify-center text-xs font-bold font-mono">
                          {realm.stage}
                        </span>
                        <h3 className="font-bold text-base text-stone-100">{realm.name}</h3>
                        <span className="text-xs text-stone-400">({realm.circleOrGrade})</span>
                      </div>
                      <span className="text-xs font-mono text-cyan-300 bg-stone-950 px-2 py-0.5 rounded border border-stone-800">
                        군사력: {realm.militaryValue}
                      </span>
                    </div>

                    <p className="text-xs text-stone-300 font-lore leading-relaxed">{realm.description}</p>

                    <div className="space-y-1 text-xs text-stone-400 pt-1">
                      {realm.capabilities.map((cap, i) => (
                        <div key={i} className="flex items-start gap-1.5">
                          <span className="text-cyan-500 font-bold">·</span>
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>

                    <div className="text-[11px] text-cyan-300/90 pt-2 border-t border-stone-800/80">
                      <strong className="text-stone-400">실전 무력: </strong>
                      <span>{realm.exampleFeat}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* INTERACTIVE MILITARY POWER CALCULATOR */}
      <section className="p-6 sm:p-8 rounded-2xl bg-stone-900/90 border-2 border-amber-500/40 shadow-2xl space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase mb-1">
              <Calculator className="w-4 h-4" />
              <span>영지 군사력 산정 시뮬레이터</span>
            </div>
            <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-stone-100">
              영지 가용 병력 & 승급 가능 등급 판정
            </h2>
          </div>

          {/* Quick presets */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-stone-400">프리셋:</span>
            <button
              onClick={() => loadPreset('frontier')}
              className="px-2.5 py-1 text-xs bg-stone-800 hover:bg-stone-700 text-stone-300 rounded border border-stone-700 cursor-pointer"
            >
              변방영지 초기 (20)
            </button>
            <button
              onClick={() => loadPreset('roden')}
              className="px-2.5 py-1 text-xs bg-stone-800 hover:bg-stone-700 text-stone-300 rounded border border-stone-700 cursor-pointer"
            >
              로덴 소도시
            </button>
            <button
              onClick={() => loadPreset('aion')}
              className="px-2.5 py-1 text-xs bg-stone-800 hover:bg-stone-700 text-stone-300 rounded border border-stone-700 cursor-pointer"
            >
              아이온 대도시
            </button>
            <button
              onClick={() => loadPreset('elfed')}
              className="px-2.5 py-1 text-xs bg-stone-800 hover:bg-stone-700 text-stone-300 rounded border border-stone-700 cursor-pointer"
            >
              엘페드 왕도
            </button>
          </div>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 1. 일반 민병 */}
          <div className="p-4 rounded-xl bg-stone-950/80 border border-stone-800 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-stone-200">일반 민병 (기·마법 없음)</span>
              <span className="font-mono text-amber-400">× 1 pt</span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="0"
                max="500"
                value={militiaCount}
                onChange={(e) => setMilitiaCount(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <span className="font-mono text-sm w-12 text-right">{militiaCount}명</span>
            </div>
            <div className="text-[11px] text-stone-500">기여 점수: {militiaCount * 1}</div>
          </div>

          {/* 2. 개화 / 감응 */}
          <div className="p-4 rounded-xl bg-stone-950/80 border border-stone-800 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-stone-200">개화 무인 / 1서클 감응</span>
              <span className="font-mono text-amber-400">× 25 pt</span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="0"
                max="200"
                value={flowerCount}
                onChange={(e) => setFlowerCount(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <span className="font-mono text-sm w-12 text-right">{flowerCount}명</span>
            </div>
            <div className="text-[11px] text-stone-500">기여 점수: {flowerCount * 25}</div>
          </div>

          {/* 3. 강체 / 구축 */}
          <div className="p-4 rounded-xl bg-stone-950/80 border border-stone-800 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-stone-200">강체 기사 / 2~3서클 구축</span>
              <span className="font-mono text-amber-400">× 250 pt</span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="0"
                max="50"
                value={steelCount}
                onChange={(e) => setSteelCount(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <span className="font-mono text-sm w-12 text-right">{steelCount}명</span>
            </div>
            <div className="text-[11px] text-stone-500">기여 점수: {steelCount * 250}</div>
          </div>

          {/* 4. 발현 / 변성 */}
          <div className="p-4 rounded-xl bg-stone-950/80 border border-stone-800 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-stone-200">발현 무인 / 4~5서클 변성</span>
              <span className="font-mono text-amber-400">× 1,500 pt</span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="0"
                max="20"
                value={manifestCount}
                onChange={(e) => setManifestCount(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <span className="font-mono text-sm w-12 text-right">{manifestCount}명</span>
            </div>
            <div className="text-[11px] text-stone-500">기여 점수: {manifestCount * 1500}</div>
          </div>

          {/* 5. 응집 / 주관 */}
          <div className="p-4 rounded-xl bg-stone-950/80 border border-stone-800 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-stone-200">응집 검성 / 6~7서클 주관</span>
              <span className="font-mono text-amber-400">× 4,000 pt</span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="0"
                max="5"
                value={denseCount}
                onChange={(e) => setDenseCount(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <span className="font-mono text-sm w-12 text-right">{denseCount}명</span>
            </div>
            <div className="text-[11px] text-stone-500">기여 점수: {denseCount * 4000}</div>
          </div>

          {/* 6. 영역 초월자 */}
          <div className="p-4 rounded-xl bg-stone-950/80 border border-stone-800 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-rose-300">영역(領域) 초월자</span>
              <span className="font-mono text-rose-400">× 25,000 pt</span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="0"
                max="2"
                value={realmCount}
                onChange={(e) => setRealmCount(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
              <span className="font-mono text-sm w-12 text-right">{realmCount}명</span>
            </div>
            <div className="text-[11px] text-stone-500">기여 점수: {realmCount * 25000}</div>
          </div>
        </div>

        {/* Calculation Result Summary Box */}
        <div className="p-6 rounded-xl bg-gradient-to-r from-stone-950 via-stone-900 to-amber-950/30 border border-amber-600/40 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="text-xs text-stone-400">현재 병력 구성 총계 ({totalSoldiers}명)</div>
            <div className="text-2xl sm:text-4xl font-extrabold font-mono text-amber-300">
              군사력 {totalMilitaryPower.toLocaleString()} pt
            </div>
            <div className="text-xs text-stone-400 font-lore">
              일반병 1명=1pt · 개화=25pt · 강체=250pt · 발현=1500pt · 응집=4000pt · 영역=25000pt
            </div>
          </div>

          <div className="p-4 rounded-xl bg-stone-900/90 border border-stone-800 flex items-center gap-4">
            <div>
              <div className="text-xs text-stone-400">달성 가능 영지 등급</div>
              <div className={`text-lg sm:text-xl font-bold font-cinzel ${currentGrade.color}`}>
                {currentGrade.grade}
              </div>
            </div>
            <div className={`px-3 py-1 rounded text-xs font-semibold ${currentGrade.bg} ${currentGrade.color}`}>
              {totalMilitaryPower < 50 && '마을 기준 충족'}
              {totalMilitaryPower >= 50 && totalMilitaryPower <= 200 && '큰마을 기준 충족'}
              {totalMilitaryPower > 200 && totalMilitaryPower <= 1000 && '소도시 기준 충족'}
              {totalMilitaryPower > 1000 && totalMilitaryPower <= 5000 && '도시 기준 충족'}
              {totalMilitaryPower > 5000 && '대도시 군사력 도달'}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
