'use client';

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';

// ============================================
// CONFIGURATION
// ============================================
interface SignupConfig {
  title: string;
  subtitle: string;
  deadlineDate: Date;
  deadlineText: string;
  applyUrl: string | null;
  applyButtonText: string;
  closedButtonText: string;
  contactEmail: string;
}

const DEFAULT_CONFIG: SignupConfig = {
  title: 'Apply to TVG',
  subtitle: 'Applications for Spring 2026 are closed. Stay tuned for Fall 2026.',
  deadlineDate: new Date('2026-01-22T23:59:00-06:00'),
  deadlineText: 'Thursday 01/22 by 11:59 PM CT',
  applyUrl: null,
  applyButtonText: 'Apply Now',
  closedButtonText: 'Applications Closed',
  contactEmail: 'contact.txventuregroup@gmail.com',
};

// ============================================
// Context
// ============================================
interface SignupModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  config: SignupConfig;
}

const SignupModalContext = createContext<SignupModalContextType | undefined>(undefined);

export function useSignupModal() {
  const context = useContext(SignupModalContext);
  if (!context) throw new Error('useSignupModal must be used within SignupModalProvider');
  return context;
}

export const useJoinModal = useSignupModal;

// ============================================
// Countdown Hook
// ============================================
function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    };
    setTimeLeft(calc());
    const timer = setInterval(() => setTimeLeft(calc()), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}

// ============================================
// Provider
// ============================================
export function SignupModalProvider({ children, config: customConfig }: { children: ReactNode; config?: Partial<SignupConfig> }) {
  const [isOpen, setIsOpen] = useState(false);
  const config = { ...DEFAULT_CONFIG, ...customConfig };
  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => { if (e.key === 'Escape' && isOpen) closeModal(); };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, closeModal]);

  return (
    <SignupModalContext.Provider value={{ isOpen, openModal, closeModal, config }}>
      {children}
      <SignupModal isOpen={isOpen} onClose={closeModal} config={config} />
    </SignupModalContext.Provider>
  );
}

export const JoinModalProvider = SignupModalProvider;

// ============================================
// Countdown Display
// ============================================
function CountdownDisplay({ targetDate, deadlineText }: { targetDate: Date; deadlineText: string }) {
  const timeLeft = useCountdown(targetDate);
  const fmt = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="my-8">
      <div className="label text-center mb-4">Deadline</div>
      <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto">
        {[
          { val: timeLeft.days, label: 'Days' },
          { val: timeLeft.hours, label: 'Hours' },
          { val: timeLeft.minutes, label: 'Min' },
          { val: timeLeft.seconds, label: 'Sec' },
        ].map(item => (
          <div key={item.label} className="border border-[#141414] p-3 text-center">
            <div className="text-2xl font-light">{fmt(item.val)}</div>
            <div className="label">{item.label}</div>
          </div>
        ))}
      </div>
      <div className="label text-center mt-4">{deadlineText}</div>
    </div>
  );
}

// ============================================
// Modal
// ============================================
function SignupModal({ isOpen, onClose, config }: { isOpen: boolean; onClose: () => void; config: SignupConfig }) {
  if (!isOpen) return null;

  const isApplicationOpen = config.applyUrl !== null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#141414]/80 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-[#E4E3E0] text-[#141414] w-full max-w-md border border-[#141414] relative animate-scale-in">
        {/* Close */}
        <button
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center hover:bg-[#141414] hover:text-[#E4E3E0] transition-colors"
          onClick={onClose}
        >
          ×
        </button>

        <div className="p-8">
          <div className="label mb-4">Texas Venture Group</div>
          <h2 className="text-2xl font-light mb-4">{config.title}</h2>
          <p className="text-sm opacity-60">{config.subtitle}</p>

          <CountdownDisplay targetDate={config.deadlineDate} deadlineText={config.deadlineText} />

          <div className="space-y-3">
            {isApplicationOpen ? (
              <a
                href={config.applyUrl!}
                className="btn-primary w-full text-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                {config.applyButtonText}
              </a>
            ) : (
              <span className="block w-full py-3 px-4 text-center border border-[#141414]/30 opacity-50 cursor-not-allowed text-sm">
                {config.closedButtonText}
              </span>
            )}
            <a
              href="https://ventura.beehiiv.com"
              className="btn-primary w-full text-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join Our Newsletter
            </a>
            <a
              href={`mailto:${config.contactEmail}`}
              className="btn-secondary w-full text-center"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupModal;
