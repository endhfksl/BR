import React, { useState } from 'react';
import { TIMELINE, TERRITORY_SYSTEM, MONSTER_DATA, INVASION_TIERS } from '../data/lore';
import { BookOpen, Shield, Crown, TreePine, Flame, Skull, Compass, Copy, Check, AlertTriangle } from 'lucide-react';

export const WorldLoreTab: React.FC = () => {
  const [copiedFormat, setCopiedFormat] = useState(false);
  const [activeSubSection, setActiveSubSection] = useState<'chronicle' | 'factions' | 'territory' | 'monsters' | 'session_rules'>('chronicle');

  const sessionFormatTemplate = `⌛ [1] | 제국력 345년/3월/1일 | 10:00 | 월요일 | 변방영지 집무실

💬로즈 | "영주님, 이번 달 비축 식량과 울타리 수리 인부 배치를 마쳤습니다."

\`\`\`
제국력 345년/3월/1일 | 월요일 | 10:00 | 변방영지 집무실
🏠(변방영지) |🏰(마을) |🔮(개화)
🚫
---------
[인구수] 20명
[식량] 30일
[쿠퍼] 500
[군사력] 20(영지민 민병 20명)
[물자유통] 물자유통 없음 (방문상 유치 필요)
---------
[동맹] 없음 (로덴 세금 3회 미납으로 지원 중단)
[상황] 신임 영주 부임 완료. 파손된 목재 울타리 보수 및 식량 확보 시급.
---------
[관계]
▸로즈｜호기심과 기대｜❤️(25)｜💦(0)｜😐일면식·중립
▸지그｜안도와 충성｜❤️(30)｜💦(0)｜🤝친구
\`\`\``;

  const handleCopyFormat = () => {
    navigator.clipboard.writeText(sessionFormatTemplate);
    setCopiedFormat(true);
    setTimeout(() => setCopiedFormat(false), 2000);
  };

  return (
    <div className="space-y-12">
      {/* Hero Intro Banner */}
      <section className="relative p-6 sm:p-10 rounded-2xl bg-gradient-to-r from-stone-900 via-stone-900 to-amber-950/40 border border-amber-900/40 shadow-xl overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase mb-2">
            <BookOpen className="w-4 h-4" />
            <span>대륙 총람서 · 제국력 345년</span>
          </div>
          <h1 className="font-cinzel text-2xl sm:text-4xl font-extrabold text-amber-100 tracking-wide">
            세계관 & 영지 정치 시스템
          </h1>
          <p className="mt-3 text-sm sm:text-base text-stone-300 font-lore leading-relaxed">
            200년 만에 부활한 마왕의 전쟁 선포와 요동치는 4대 세력.
            제국의 최북단, 대산림과 대평원, 대협곡이 맞닿은 삼각 요충지의 버려진 영지에 부임하여 영지를 부흥시키고 운명을 개척하십시오.
          </p>
        </div>

        {/* Sub-navigation Controls */}
        <div className="relative z-10 flex flex-wrap gap-2 mt-6 pt-6 border-t border-stone-800">
          <button
            onClick={() => setActiveSubSection('chronicle')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              activeSubSection === 'chronicle'
                ? 'bg-amber-600 text-stone-950 font-bold shadow-sm'
                : 'bg-stone-800/80 text-stone-300 hover:text-white'
            }`}
          >
            대륙 연표 (1~345년)
          </button>
          <button
            onClick={() => setActiveSubSection('factions')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              activeSubSection === 'factions'
                ? 'bg-amber-600 text-stone-950 font-bold shadow-sm'
                : 'bg-stone-800/80 text-stone-300 hover:text-white'
            }`}
          >
            4대 세력 & 변방영지
          </button>
          <button
            onClick={() => setActiveSubSection('territory')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              activeSubSection === 'territory'
                ? 'bg-amber-600 text-stone-950 font-bold shadow-sm'
                : 'bg-stone-800/80 text-stone-300 hover:text-white'
            }`}
          >
            영지 등급 & 승급 조건
          </button>
          <button
            onClick={() => setActiveSubSection('monsters')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              activeSubSection === 'monsters'
                ? 'bg-amber-600 text-stone-950 font-bold shadow-sm'
                : 'bg-stone-800/80 text-stone-300 hover:text-white'
            }`}
          >
            마물 종류 & 침공 위험도
          </button>
          <button
            onClick={() => setActiveSubSection('session_rules')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              activeSubSection === 'session_rules'
                ? 'bg-amber-600 text-stone-950 font-bold shadow-sm'
                : 'bg-stone-800/80 text-stone-300 hover:text-white'
            }`}
          >
            세션 규칙 & 출력 서식
          </button>
        </div>
      </section>

      {/* SECTION 1: 대륙 연표 (Chronicle) */}
      {activeSubSection === 'chronicle' && (
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Compass className="w-5 h-5 text-amber-400" />
            <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-amber-200">
              대륙 연표 (Imperial Chronicle)
            </h2>
          </div>

          <div className="relative pl-6 sm:pl-8 border-l border-amber-900/50 space-y-8">
            {TIMELINE.map((event, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline node marker */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-stone-950 border-2 border-amber-500 group-hover:scale-125 transition-transform" />

                <div className="p-5 rounded-xl bg-stone-900/70 border border-stone-800 hover:border-amber-700/50 transition-colors">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-cinzel text-xs font-bold text-amber-400">
                      {event.year}
                    </span>
                    <span className="text-stone-500">·</span>
                    <span className="text-xs text-stone-400 font-medium">
                      {event.subtitle}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-stone-100 mb-2">
                    {event.title}
                  </h3>

                  <p className="text-sm text-stone-300 font-lore leading-relaxed mb-3">
                    {event.description}
                  </p>

                  <div className="text-xs text-amber-300/80">
                    <span className="font-semibold text-stone-400">주요 관계자: </span>
                    <span>{event.keyActors}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 2: 4대 세력 & 변방영지 (Factions & Frontier) */}
      {activeSubSection === 'factions' && (
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Crown className="w-5 h-5 text-amber-400" />
            <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-amber-200">
              4대 세력 구조 & 변방영지
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 카이로스 제국 */}
            <div className="p-6 rounded-xl bg-stone-900/80 border border-stone-800 hover:border-amber-600/40 transition-colors space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <Crown className="w-4 h-4" />
                <h3>카이로스 제국 (중앙 봉건 대제국)</h3>
              </div>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-lore">
                대륙 중앙을 지배하는 통일 제국. 중앙의 수도 <strong>엘도라도 (인구 5만+)</strong>에서 여황제 테리나가 통치하며, 북방 전선에는 <strong>아이온 (인구 2만)</strong> 대도시가 최전선 방어선을 구축함.
                각 영지는 상위 영지에 징세관이 방문하여 쿠퍼(1개당 1,000원 가치)를 세금으로 수취함.
              </p>
              <div className="text-xs text-stone-400 space-y-1 pt-2 border-t border-stone-800">
                <div><strong>주요 거점:</strong> 엘도라도(대도시/황궁) · 아이온(북부대도시) · 로덴(북부소도시)</div>
                <div><strong>통치자/핵심 인물:</strong> 테리나 황제, 아리샤, 나르윈, 테이오스, 카일러, 윌리엄</div>
              </div>
            </div>

            {/* 대산림 */}
            <div className="p-6 rounded-xl bg-stone-900/80 border border-stone-800 hover:border-emerald-600/40 transition-colors space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
                <TreePine className="w-4 h-4" />
                <h3>대산림 (엘프 왕국 · 부족 연합)</h3>
              </div>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-lore">
                대륙 서쪽 울창한 침엽수림에 위치한 엘프들의 폐쇄적 영역. 왕도 <strong>엘페드</strong>에 여왕 엘라리아가 군림하며 장로원이 보좌함.
                200년 전 황제의 배신으로 타종족을 극도로 불신함. 변방 영지와 맞닿은 <strong>단풍부락</strong>(린시아, 란)이 국경을 상시 순찰하며 변방 영주를 경계 중.
              </p>
              <div className="text-xs text-stone-400 space-y-1 pt-2 border-t border-stone-800">
                <div><strong>주요 거점:</strong> 엘페드(왕도) · 단풍부락(변방 접경) · 소돔(마족 카이나 상주 멸망영지)</div>
                <div><strong>통치자/핵심 인물:</strong> 엘라리아 여왕, 실비아 방위대장, 란 부락장, 린시아, 에드워드 대장로</div>
              </div>
            </div>

            {/* 대평원 */}
            <div className="p-6 rounded-xl bg-stone-900/80 border border-stone-800 hover:border-orange-600/40 transition-colors space-y-3">
              <div className="flex items-center gap-2 text-orange-400 font-bold text-base">
                <Flame className="w-4 h-4" />
                <h3>대평원 (무법의 약육강식 지대)</h3>
              </div>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-lore">
                대륙 동쪽의 광활한 황야. 단일 주인이 없으며 오크 부족과 마물, 은둔 마족들이 각축을 벌임.
                오크 족장 더록이 이끄는 <strong>카 쉬 부락(5천 오크)</strong>이 수렵과 명예를 숭상하며, 멸망한 도시 <strong>알데</strong>에는 전투광 벨리아스가, <strong>맥</strong>에는 마제 아수라가 상주함.
              </p>
              <div className="text-xs text-stone-400 space-y-1 pt-2 border-t border-stone-800">
                <div><strong>주요 거점:</strong> 카 쉬(오크 도시) · 알데(폐허/벨리아스) · 맥(폐허/마제 아수라)</div>
                <div><strong>통치자/핵심 인물:</strong> 더록 족장, 벨리아스, 아수라</div>
              </div>
            </div>

            {/* 대협곡 */}
            <div className="p-6 rounded-xl bg-stone-900/80 border border-stone-800 hover:border-rose-600/40 transition-colors space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-base">
                <Skull className="w-4 h-4" />
                <h3>대협곡 (심연의 마족 영역)</h3>
              </div>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-lore">
                대륙 북부의 험준한 절벽 지대. 항상 붉은 달(적월)이 뜨며 질서가 없는 마물과 마족의 땅.
                200년 만에 봉인이 해방된 <strong>마왕 아스타로트</strong>의 마왕성이 반파된 채 재건 중이며, 흡혈귀 진조 <strong>빅토리아</strong>가 지배하는 도시 벨라나가 독자적 세력을 유지함.
              </p>
              <div className="text-xs text-stone-400 space-y-1 pt-2 border-t border-stone-800">
                <div><strong>주요 거점:</strong> 마왕성(심연) · 벨라나(흡혈귀 사육 도시)</div>
                <div><strong>통치자/핵심 인물:</strong> 마왕 아스타로트, 진조 빅토리아, 바르토, 세바스</div>
              </div>
            </div>
          </div>

          {/* 주인공 부임지 상세 */}
          <div className="p-6 rounded-xl bg-stone-900/90 border-2 border-amber-500/50 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-lg">
                <Shield className="w-5 h-5 text-amber-400" />
                <span>{"{user}"}의 부임지: 대륙 최북부 변방영지</span>
              </div>
              <span className="text-xs text-amber-400/80 font-mono">초기 영지 등급: 마을</span>
            </div>

            <p className="text-sm text-stone-300 font-lore leading-relaxed">
              대산림, 대협곡, 대평원의 경계가 맞물리는 삼각 위험 지대. 전임 영주가 도망치고 오랜 기간 방치되어 주민은 20명에 불과하며,
              목재 주택 5채와 파손된 울타리가 전부입니다. 상위 소도시 로덴에 납부해야 할 세금이 3회 미납되어 모든 지원이 끊긴 절체절명의 위기 상황입니다.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2">
              <div className="p-3 rounded-lg bg-stone-950/80 border border-stone-800">
                <div className="text-stone-400 mb-1">동쪽 배치</div>
                <div className="font-semibold text-stone-200">개간 텃밭 (식량 생산)</div>
              </div>
              <div className="p-3 rounded-lg bg-stone-950/80 border border-stone-800">
                <div className="text-stone-400 mb-1">서쪽 배치</div>
                <div className="font-semibold text-stone-200">목재 주택 5채 (주거지)</div>
              </div>
              <div className="p-3 rounded-lg bg-stone-950/80 border border-stone-800">
                <div className="text-stone-400 mb-1">중앙 배치</div>
                <div className="font-semibold text-stone-200">공터 & 공동 우물</div>
              </div>
              <div className="p-3 rounded-lg bg-stone-950/80 border border-stone-800">
                <div className="text-stone-400 mb-1">남쪽 / 북쪽</div>
                <div className="font-semibold text-rose-300">방어선 없음 (울타리 파손)</div>
              </div>
            </div>

            <div className="text-xs text-amber-300 bg-amber-950/30 p-3 rounded-lg border border-amber-800/40">
              💡 <strong>영주 부임 첫 과제:</strong> 영지명을 지정하고 주민 20명을 안심시키며, 파손된 울타리를 수리하고 식량과 쿠퍼를 확보하여 징세관 볼드릭의 방문에 대비해야 합니다.
            </div>
          </div>
        </section>
      )}

      {/* SECTION 3: 영지 등급 & 승급 조건 (Territory System) */}
      {activeSubSection === 'territory' && (
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-amber-400" />
            <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-amber-200">
              영지 승급 3대 조건 (인구 · 시설 · 군사력)
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-amber-800/40 bg-stone-900/90 text-amber-300">
                  <th className="py-3 px-4 font-semibold">등급</th>
                  <th className="py-3 px-4 font-semibold">인구 기준</th>
                  <th className="py-3 px-4 font-semibold">필수 방어 시설</th>
                  <th className="py-3 px-4 font-semibold">물자 유통 단계</th>
                  <th className="py-3 px-4 font-semibold">군사력 기준</th>
                  <th className="py-3 px-4 font-semibold">세금 및 정치 관계</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800">
                {TERRITORY_SYSTEM.map((tier, idx) => (
                  <tr key={idx} className="hover:bg-stone-900/50 transition-colors">
                    <td className="py-3 px-4 font-bold text-amber-200">{tier.grade}</td>
                    <td className="py-3 px-4 font-mono text-stone-300">{tier.population}</td>
                    <td className="py-3 px-4 text-stone-300">{tier.facilities}</td>
                    <td className="py-3 px-4 text-stone-300">{tier.trade}</td>
                    <td className="py-3 px-4 font-mono text-amber-300">{tier.military}</td>
                    <td className="py-3 px-4 text-stone-400">{tier.taxRule}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800 space-y-2">
              <h4 className="text-sm font-bold text-amber-300">식량 지표 (유지 가능 일수)</h4>
              <p className="text-xs text-stone-400 font-lore leading-relaxed">
                현재 비축 식량으로 영지민이 버틸 수 있는 일수를 의미합니다. <strong>0일</strong>에 도달하면 영지 내 아사와 탈주가 발생하며 영지가 극도로 불안정해집니다.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800 space-y-2">
              <h4 className="text-sm font-bold text-amber-300">쿠퍼 (공식 화폐)</h4>
              <p className="text-xs text-stone-400 font-lore leading-relaxed">
                제국의 표준 동전 화폐. <strong>1쿠퍼 = 1,000원 가치</strong>. 매달 상위 영지 징세관에게 일정 비율을 납부해야 하며 3회 미납 시 지원이 중단됩니다.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800 space-y-2">
              <h4 className="text-sm font-bold text-amber-300">물자 유통의 진화</h4>
              <p className="text-xs text-stone-400 font-lore leading-relaxed">
                물자유통 없음 → 방문상 → 정기시장 → 상설시장 → 대시장 → 거대상단 본거지로 발전하며 영지의 경제 수익이 급증합니다.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 4: 마물 & 침공 등급 (Monsters & Invasions) */}
      {activeSubSection === 'monsters' && (
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-amber-200">
              마물 생태 & 침공 위험도
            </h2>
          </div>

          {/* 침공 3단계 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {INVASION_TIERS.map((tier, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-stone-900/80 border border-stone-800 space-y-2">
                <div className="font-cinzel text-sm font-bold text-amber-400">{tier.tier}</div>
                <div className="text-xs font-semibold text-rose-300">{tier.target}</div>
                <p className="text-xs text-stone-300 font-lore leading-relaxed">{tier.description}</p>
                <div className="text-[11px] text-stone-400 pt-2 border-t border-stone-800">
                  <strong>구성:</strong> {tier.composition}
                </div>
              </div>
            ))}
          </div>

          {/* 마물 도감 리스트 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MONSTER_DATA.map((mon, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-stone-900/60 border border-stone-800 hover:border-amber-700/40 transition-colors space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-100 text-sm">{mon.name}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-stone-800 text-amber-300 font-mono">
                    {mon.realm}
                  </span>
                </div>
                <div className="text-xs text-stone-400">서식: {mon.habitat}</div>
                <div className="text-xs text-stone-300 font-lore">{mon.trait}</div>
                <div className="text-[11px] text-rose-400 font-medium pt-1">
                  위험 등급: {mon.danger}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 5: 세션 규칙 & 출력 서식 (Session Rules & Output Guide) */}
      {activeSubSection === 'session_rules' && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-amber-400" />
              <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-amber-200">
                세션 규칙 & 표준 출력 서식
              </h2>
            </div>

            <button
              onClick={handleCopyFormat}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-200 bg-amber-950/60 hover:bg-amber-900/80 border border-amber-800/60 rounded-lg transition-colors cursor-pointer"
            >
              {copiedFormat ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
              <span>{copiedFormat ? '서식 복사됨!' : '턴 서식 복사'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 세션 절대 원칙 */}
            <div className="p-5 rounded-xl bg-stone-900/70 border border-stone-800 space-y-3">
              <h3 className="text-sm font-bold text-amber-300">최우선 세션 원칙</h3>
              <ul className="text-xs text-stone-300 space-y-2 font-lore">
                <li className="flex items-start gap-1.5">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span><strong>금지:</strong> {'{user}'}의 생각, 감정, 독백, 대사를 직접 창작하거나 인용하지 않음 (오직 간접 묘사만 허용).</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-amber-400 font-bold">⚠</span>
                  <span><strong>능력 초과 불가:</strong> 각 인물의 등급/기/마법 서클 범위 내에서만 서술하며, 초과 시 반드시 실패 처리함.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-amber-400 font-bold">⌛</span>
                  <span><strong>시간 연속성:</strong> 전 턴과 바로 이어지는 연속 시간 서술, 임의적인 시간 점프 엄금.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-400 font-bold">○</span>
                  <span><strong>성장 & 퇴보:</strong> 모든 인물은 세션 사건에 따라 유기적으로 성장, 정체, 퇴보할 수 있음.</span>
                </li>
              </ul>
            </div>

            {/* 기호 정의 */}
            <div className="p-5 rounded-xl bg-stone-900/70 border border-stone-800 space-y-3">
              <h3 className="text-sm font-bold text-amber-300">기호 정의</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-stone-300">
                <div>♥ : 선호</div>
                <div>↔ : 연락 · 인연</div>
                <div>G : 기(氣) 경지</div>
                <div>C : 서클(마법)</div>
                <div>✕ : 금지 · 불가</div>
                <div>○ : 허용 · 가능</div>
                <div>必 : 필수 조건</div>
                <div>無 : 없음</div>
                <div>多 : 많음 / 少 : 적음</div>
              </div>
            </div>
          </div>

          {/* 영역 충돌 세션 룰 안내 */}
          <div className="p-5 rounded-xl bg-gradient-to-r from-stone-950 via-stone-900 to-rose-950/30 border border-rose-800/40 space-y-3">
            <div className="flex items-center gap-2 text-rose-300 font-bold text-sm">
              <span className="text-amber-400 font-cinzel text-base">⚔️</span>
              <h3>#영역 충돌 (Domain Clash) 세션 진행 규칙</h3>
            </div>
            <p className="text-xs text-stone-300 font-lore leading-relaxed">
              기와 마법을 포함한 영역급 초월자들의 심상이 맞부딪힐 때, <strong>양측의 고유 규칙이 한 공간에 동시에 강제 적용</strong>됩니다. 충돌 중에는 기와 마나 소모량이 기하급수적으로 폭증하며, 어느 한쪽이 <strong>자원 고갈 또는 육체적 전투 불능</strong>에 빠질 때까지 충돌이 지속됩니다. 영역이 파괴된 패배자는 <strong>심상 붕괴 및 치명적 역류 현상(Rebound)</strong>으로 극심한 반동을 입습니다.
            </p>
          </div>

          {/* 턴 출력 표준 예시 박스 */}
          <div className="p-5 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-stone-400">
              <span className="font-semibold text-amber-300">롤플레잉 출력 턴 표준 예시</span>
              <span className="font-mono text-[11px]">Markdown Code Block</span>
            </div>
            <pre className="p-4 rounded-lg bg-stone-900 text-stone-200 text-xs font-mono overflow-x-auto leading-relaxed border border-stone-800">
              {sessionFormatTemplate}
            </pre>
          </div>
        </section>
      )}
    </div>
  );
};
