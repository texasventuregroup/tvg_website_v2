'use client';

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';

// ============================================
// CONFIGURATION - Edit this section to customize
// ============================================

interface SignupConfig {
  title: string;
  subtitle: string;
  deadlineDate: Date;
  deadlineText: string;
  applyUrl: string | null; // null = applications closed
  applyButtonText: string;
  closedButtonText: string;
  contactEmail: string;
}

const DEFAULT_CONFIG: SignupConfig = {
  title: 'Join TVG',
  subtitle: 'Applications for the Spring 2026 cohort are now closed. Stay tuned for Fall 2026 opportunities to join UT Austin\'s premier venture capital and startup community.',
  deadlineDate: new Date('2026-01-22T23:59:00-06:00'),
  deadlineText: 'Thursday 01/22 by 11:59 PM CT',
  applyUrl: null, // Set to URL string when applications open
  applyButtonText: 'Apply Now',
  closedButtonText: 'Applications Closed',
  contactEmail: 'contact.txventuregroup@gmail.com',
};

// ============================================
// Context & Hook
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
  if (!context) {
    throw new Error('useSignupModal must be used within a SignupModalProvider');
  }
  return context;
}

// Legacy alias for backwards compatibility
export const useJoinModal = useSignupModal;

// ============================================
// Countdown Hook
// ============================================

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function useCountdown(targetDate: Date): TimeLeft {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}

// ============================================
// Provider Component
// ============================================

interface SignupModalProviderProps {
  children: ReactNode;
  config?: Partial<SignupConfig>;
}

export function SignupModalProvider({ children, config: customConfig }: SignupModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const config = { ...DEFAULT_CONFIG, ...customConfig };

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeModal();
      }
    };

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

// Legacy alias
export const JoinModalProvider = SignupModalProvider;

// ============================================
// Countdown Component (isolated to prevent parent re-renders)
// ============================================

function CountdownDisplay({ targetDate, deadlineText }: { targetDate: Date; deadlineText: string }) {
  const timeLeft = useCountdown(targetDate);
  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="signup-modal__countdown-section">
      <div className="signup-modal__countdown-header">Application Deadline</div>
      <div className="signup-modal__countdown">
        <div className="signup-modal__countdown-item">
          <div className="signup-modal__countdown-value">{formatNumber(timeLeft.days)}</div>
          <div className="signup-modal__countdown-label">Days</div>
        </div>
        <div className="signup-modal__countdown-item">
          <div className="signup-modal__countdown-value">{formatNumber(timeLeft.hours)}</div>
          <div className="signup-modal__countdown-label">Hours</div>
        </div>
        <div className="signup-modal__countdown-item">
          <div className="signup-modal__countdown-value">{formatNumber(timeLeft.minutes)}</div>
          <div className="signup-modal__countdown-label">Minutes</div>
        </div>
        <div className="signup-modal__countdown-item">
          <div className="signup-modal__countdown-value">{formatNumber(timeLeft.seconds)}</div>
          <div className="signup-modal__countdown-label">Seconds</div>
        </div>
      </div>
      <div className="signup-modal__countdown-deadline">{deadlineText}</div>
    </div>
  );
}

// ============================================
// Modal Component
// ============================================

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: SignupConfig;
}

function SignupModal({ isOpen, onClose, config }: SignupModalProps) {
  const isApplicationOpen = config.applyUrl !== null;

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="signup-modal-backdrop" onClick={handleBackdropClick}>
      <div className="signup-modal">
        <div className="signup-modal__close" onClick={onClose} role="button" tabIndex={0} aria-label="Close" onKeyDown={(e) => e.key === 'Enter' && onClose()}>
          <svg className="signup-modal__close-icon" width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M1 1L9 9M1 9L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>

        <div className="signup-modal__content">
          <h2 className="signup-modal__title">{config.title}</h2>
          <p className="signup-modal__text">{config.subtitle}</p>

          <CountdownDisplay targetDate={config.deadlineDate} deadlineText={config.deadlineText} />

          {/* Action Buttons */}
          <div className="signup-modal__actions">
            {isApplicationOpen ? (
              <a href={config.applyUrl!} className="button button--primary" target="_blank" rel="noopener noreferrer">
                {config.applyButtonText}
              </a>
            ) : (
              <span className="button button--primary signup-modal__disabled-btn">
                {config.closedButtonText}
              </span>
            )}
            <a href={`mailto:${config.contactEmail}`} className="button">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupModal;
