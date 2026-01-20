'use client';

import { useJoinModal } from './SignupModal';

interface JoinButtonProps {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export default function JoinButton({ className = 'button', children = 'Join', style }: JoinButtonProps) {
  const { openModal } = useJoinModal();

  return (
    <button className={className} style={style} onClick={openModal}>
      {children}
    </button>
  );
}
