import React, { useState, useEffect } from 'react';
import { Feather, Sparkles, Shield, ChevronRight } from 'lucide-react';

interface EntranceGateProps {
  onEnter: () => void;
}

export const EntranceGate: React.FC<EntranceGateProps> = ({ onEnter }) => {
  // Korean titles
  const line1Text = "카이로스 연대기";
  const line2Text = "변방의 영주들과 4대 세력";
  const subText = "제국력 345년 · 황실 공인 대륙 총람";

  const [displayedLine1, setDisplayedLine1] = useState('');
  const [displayedLine2, setDisplayedLine2] = useState('');
  const [displayedSub, setDisplayedSub] = useState('');
  const [titlePhase, setTitlePhase] = useState<'line1' | 'line2' | 'sub' | 'ready'>('line1');

  // Interactive "restart" signing state
  const [isSigning, setIsSigning] = useState(false);
  const [signedText, setSignedText] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  // Phase 1: Typing Korean title with initial quill
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (titlePhase === 'line1') {
      if (displayedLine1.length < line1Text.length) {
        timer = setTimeout(() => {
          setDisplayedLine1(line1Text.slice(0, displayedLine1.length + 1));
        }, 70);
      } else {
        timer = setTimeout(() => setTitlePhase('line2'), 200);
      }
    } else if (titlePhase === 'line2') {
      if (displayedLine2.length < line2Text.length) {
        timer = setTimeout(() => {
          setDisplayedLine2(line2Text.slice(0, displayedLine2.length + 1));
        }, 60);
      } else {
        timer = setTimeout(() => setTitlePhase('sub'), 200);
      }
    } else if (titlePhase === 'sub') {
      if (displayedSub.length < subText.length) {
        timer = setTimeout(() => {
          setDisplayedSub(subText.slice(0, displayedSub.length + 1));
        }, 30);
      } else {
        timer = setTimeout(() => {
          setTitlePhase('ready');
        }, 200);
      }
    }

    return () => clearTimeout(timer);
  }, [titlePhase, displayedLine1, displayedLine2, displayedSub]);

  // Phase 2: Typing "restart" when clicked and immediately entering website
  useEffect(() => {
    if (!isSigning) return;

    const target = "restart";
    let charIndex = 0;

    const interval = setInterval(() => {
      charIndex++;
      if (charIndex <= target.length) {
        setSignedText(target.slice(0, charIndex));
      }

      if (charIndex >= target.length) {
        clearInterval(interval);
        setIsCompleted(true);
        // Guaranteed transition into main website
        setTimeout(() => {
          onEnter();
        }, 350);
      }
    }, 90);

    return () => clearInterval(interval);
  }, [isSigning, onEnter]);

  // Click handler to trigger quill writing "restart"
  const handleTriggerSigning = () => {
    if (isSigning || isCompleted) return;

    // Immediately complete title if clicked early
    if (titlePhase !== 'ready') {
      setDisplayedLine1(line1Text);
      setDisplayedLine2(line2Text);
      setDisplayedSub(subText);
      setTitlePhase('ready');
    }

    setIsSigning(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950 overflow-hidden select-none">
      {/* Background vignette & atmospheric ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(41,37,36,0.85)_0%,rgba(12,10,9,0.98)_100%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#b45309_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Skip Button (Top Right) */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={onEnter}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-amber-300 hover:text-amber-100 bg-amber-950/40 hover:bg-amber-900/60 border border-amber-800/60 rounded-lg backdrop-blur-sm transition-all cursor-pointer"
        >
          <span>입장 건너뛰기</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Parchment Document Container */}
      <div
        className={`relative w-full max-w-3xl mx-4 sm:mx-8 p-8 sm:p-14 bg-gradient-to-b from-stone-900 via-stone-900/95 to-stone-950 border border-amber-600/30 rounded-2xl shadow-[0_0_80px_rgba(0,0,0,0.9),0_0_40px_rgba(217,119,6,0.15)] transition-all duration-500 ${
          isCompleted ? 'scale-105 opacity-0 blur-sm pointer-events-none' : 'scale-100 opacity-100'
        }`}
      >
        {/* Ornate corner brackets */}
        <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-amber-500/60 pointer-events-none" />
        <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-amber-500/60 pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-amber-500/60 pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-amber-500/60 pointer-events-none" />

        {/* Imperial Heading Kicker in Korean */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-amber-400">
            <span className="w-6 h-px bg-amber-500/40" />
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-lore">카이로스 제국 황실 공인 공식 문서</span>
            <span className="w-6 h-px bg-amber-500/40" />
          </div>
        </div>

        {/* Animated Quill and Inscribed Korean Title Area */}
        <div className="relative text-center min-h-[170px] flex flex-col items-center justify-center">
          {/* Animated 깃펜 (Top Quill Pen while writing title) */}
          {titlePhase !== 'ready' && (
            <div className="absolute -top-4 right-1/4 sm:right-1/3 z-10 animate-quill-float pointer-events-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              <div className="relative">
                <svg
                  className="w-14 h-14 sm:w-16 sm:h-16 text-amber-300 transform -rotate-12"
                  viewBox="0 0 64 64"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path
                    d="M10 54 C 20 40, 36 24, 52 10 C 56 6, 60 7, 58 12 C 50 28, 36 44, 22 56 Z"
                    fill="url(#quillGrad1)"
                    stroke="#F59E0B"
                  />
                  <path d="M50 14 C 44 20, 38 23, 30 25" stroke="#FDE68A" strokeWidth="1.5" />
                  <path d="M42 22 C 36 28, 30 31, 24 33" stroke="#FDE68A" strokeWidth="1.5" />
                  <path d="M34 30 C 28 36, 22 39, 16 41" stroke="#FDE68A" strokeWidth="1.5" />
                  <path d="M10 54 L 6 60 L 12 56 Z" fill="#D97706" stroke="#B45309" strokeWidth="2" />
                  <circle cx="6" cy="60" r="1.5" fill="#EF4444" />
                  <defs>
                    <linearGradient id="quillGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FEF3C7" />
                      <stop offset="50%" stopColor="#D97706" />
                      <stop offset="100%" stopColor="#78350F" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="absolute bottom-0 left-0 w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              </div>
            </div>
          )}

          {/* Korean Title: Line 1 */}
          <h1 className="font-lore text-3xl sm:text-5xl font-black tracking-tight text-amber-100 drop-shadow-[0_2px_14px_rgba(217,119,6,0.4)]">
            {displayedLine1}
            {titlePhase === 'line1' && (
              <span className="inline-block w-1 h-8 sm:h-12 ml-1 bg-amber-400 animate-pulse align-middle" />
            )}
          </h1>

          {/* Korean Title: Line 2 */}
          <h2 className="font-lore text-xl sm:text-3xl font-extrabold tracking-normal text-amber-300/90 mt-2">
            {displayedLine2}
            {titlePhase === 'line2' && (
              <span className="inline-block w-1 h-6 sm:h-8 ml-1 bg-amber-400 animate-pulse align-middle" />
            )}
          </h2>

          {/* Korean Subtitle */}
          <p className="font-lore text-xs sm:text-sm tracking-wide text-stone-400 mt-4">
            {displayedSub}
            {titlePhase === 'sub' && (
              <span className="inline-block w-1 h-4 ml-1 bg-stone-300 animate-pulse align-middle" />
            )}
          </p>
        </div>

        {/* Divider */}
        <div className="relative my-8 flex items-center justify-center">
          <div className="w-full border-t border-amber-600/25" />
          <div className="absolute px-4 bg-stone-900 text-amber-500">
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        {/* Korean Lore Summary */}
        <div className="text-center text-xs sm:text-sm text-stone-300 leading-relaxed font-lore max-w-xl mx-auto space-y-2">
          <p>
            제국력 345년, 200년 만에 부활한 마왕과 전쟁의 먹구름이 대륙을 뒤덮는다.
          </p>
          <p className="text-stone-400">
            대산림·대평원·대협곡의 세력이 요동치는 가운데, 척박한 북방 변방영지에 새로운 영주가 부임한다.
          </p>
        </div>

        {/* NON-BUTTON INTERACTION ZONE: Parchment Endorsement / Signature Line */}
        <div className="mt-10 flex flex-col items-center justify-center">
          <div
            onClick={handleTriggerSigning}
            className={`relative w-full max-w-md mx-auto pt-6 pb-4 px-6 text-center cursor-pointer transition-all duration-300 rounded-xl group ${
              isSigning
                ? 'bg-amber-950/30'
                : 'hover:bg-stone-900/80 hover:shadow-lg'
            }`}
          >
            {/* Elegant Manuscript Flourish Line (Not a button box) */}
            <div className="flex items-center justify-center gap-3 text-stone-500 group-hover:text-amber-400 transition-colors">
              <span className="w-12 h-px bg-amber-700/40 group-hover:bg-amber-500/60 transition-colors" />
              <Feather className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-lore tracking-wider">
                {!isSigning && !isCompleted ? '영주 인가 서명란' : '영주 서명 기재 중...'}
              </span>
              <span className="w-12 h-px bg-amber-700/40 group-hover:bg-amber-500/60 transition-colors" />
            </div>

            {/* Signature Base Line with Inscribed "restart" */}
            <div className="relative mt-4 min-h-[52px] flex items-center justify-center border-b-2 border-dashed border-amber-700/50 group-hover:border-amber-400/80 transition-colors">
              {/* Dynamic Quill Pen actively writing "restart" */}
              {isSigning && !isCompleted && (
                <div
                  className="absolute -top-9 z-30 transition-all duration-100 pointer-events-none drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)]"
                  style={{
                    left: `${Math.min(22 + signedText.length * 9.5, 80)}%`,
                  }}
                >
                  <svg
                    className="w-12 h-12 text-amber-200 transform -rotate-12 animate-pulse"
                    viewBox="0 0 64 64"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path
                      d="M10 54 C 20 40, 36 24, 52 10 C 56 6, 60 7, 58 12 C 50 28, 36 44, 22 56 Z"
                      fill="url(#quillGrad2)"
                      stroke="#F59E0B"
                    />
                    <path d="M50 14 C 44 20, 38 23, 30 25" stroke="#FDE68A" strokeWidth="1.5" />
                    <path d="M42 22 C 36 28, 30 31, 24 33" stroke="#FDE68A" strokeWidth="1.5" />
                    <path d="M10 54 L 6 60 L 12 56 Z" fill="#D97706" stroke="#B45309" strokeWidth="2" />
                    <circle cx="6" cy="60" r="2" fill="#EF4444" />
                    <defs>
                      <linearGradient id="quillGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FEF3C7" />
                        <stop offset="50%" stopColor="#D97706" />
                        <stop offset="100%" stopColor="#78350F" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="absolute bottom-0 left-0 w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                </div>
              )}

              {/* Hand-written text "restart" inscribed by the quill */}
              {isSigning ? (
                <div className="flex items-center">
                  <span className="font-cinzel text-2xl sm:text-3xl font-black italic tracking-widest text-amber-200 drop-shadow-[0_0_12px_rgba(245,158,11,0.7)]">
                    {signedText}
                  </span>
                  {!isCompleted && (
                    <span className="inline-block w-0.5 h-6 ml-1 bg-amber-400 animate-pulse" />
                  )}
                  {isCompleted && (
                    <span className="ml-2 inline-flex items-center text-xs font-lore text-emerald-400 animate-bounce">
                      ✓ 서명 인가 완료
                    </span>
                  )}
                </div>
              ) : (
                <div className="text-xs text-amber-400/80 group-hover:text-amber-300 font-lore tracking-wider transition-colors">
                  이곳을 클릭하면 깃펜이 나타나 <span className="font-cinzel font-bold text-amber-200 tracking-wider">restart</span> 를 적고 들어갑니다
                </div>
              )}
            </div>

            {/* Subtle help label underneath */}
            <p className="mt-2 text-[11px] text-stone-500 font-lore">
              ※ 클릭 시 깃펜이 서명란에 <span className="font-mono text-stone-400">restart</span> 를 필기한 후 본 웹사이트로 바로 진입합니다.
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-[11px] text-stone-500">
          <span>제국력 345년 제1차 대륙 총람서 · 영주 등록 편람</span>
        </div>
      </div>
    </div>
  );
};
