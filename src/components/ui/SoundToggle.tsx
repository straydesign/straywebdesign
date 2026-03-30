'use client';

import { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { isSoundEnabled, toggleSound } from '@/lib/sounds';

export default function SoundToggle() {
  const [enabled, setEnabled] = useState(isSoundEnabled);

  const handleToggle = () => {
    const newState = toggleSound();
    setEnabled(newState);
  };

  return (
    <button
      onClick={handleToggle}
      className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-text-tertiary transition-colors hover:text-text-secondary"
      aria-label={enabled ? 'Mute sounds' : 'Enable sounds'}
      title={enabled ? 'Mute sounds' : 'Enable sounds'}
    >
      {enabled ? (
        <Volume2 className="h-3.5 w-3.5" />
      ) : (
        <VolumeX className="h-3.5 w-3.5" />
      )}
      <span className="hidden sm:inline">{enabled ? 'Sound on' : 'Sound off'}</span>
    </button>
  );
}
