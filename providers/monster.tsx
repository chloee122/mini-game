'use client';

import { ReactNode, createContext, useContext, useState } from 'react';

type ContextType = {
  myMonsterId: number | undefined;
  setMyMonsterId: (id: number) => void;
};

const Context = createContext<ContextType>({} as ContextType);

export function MonsterProvider({ children }: { children: ReactNode }) {
  const [myMonsterId, setMyMonsterId] = useState<number>();

  return (
    <Context.Provider
      value={{
        myMonsterId,
        setMyMonsterId,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useMonster = () => useContext(Context);
