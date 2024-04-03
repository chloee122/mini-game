'use client';

import { MonsterCount } from '@/lib/monster';
import { ReactNode, createContext, useContext, useMemo, useState } from 'react';

type ContextType = {
  playerHp: number;
  enemyHp: number;
  enemyId: number;
  reset: VoidFunction;
  attack: (target: 'player' | 'enemy') => void;
};

const Context = createContext<ContextType>({} as ContextType);

export function StageProvider({ children }: { children: ReactNode }) {
  const [playerHp, setPlayerHp] = useState<number>(100);
  const [enemyHp, setEnemeyHp] = useState<number>(100);

  const enemyId = useMemo(() => {
    return Math.floor(Math.random() * MonsterCount) + 1;
  }, []);

  const reset = () => {
    setPlayerHp(100);
    setEnemeyHp(100);
  };

  const attack = (target: 'player' | 'enemy') => {
    if (target === 'player') {
      setPlayerHp((prev) => Math.max(prev - 10, 0));
    } else {
      setEnemeyHp((prev) => Math.max(prev - 10, 0));
    }
  };

  return (
    <Context.Provider
      value={{
        playerHp,
        enemyHp,
        attack,
        enemyId,
        reset,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useStage = () => useContext(Context);
