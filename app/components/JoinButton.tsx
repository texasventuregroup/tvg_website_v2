'use client';

import { useJoinModal } from './SignupModal';

interface JoinButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export default function JoinButton({ className = 'button', children = 'Join' }: JoinButtonProps) {
  const { openModal } = useJoinModal();

  return (
    <button className={className} onClick={openModal}>
      {children}
    </button>
  );
}
