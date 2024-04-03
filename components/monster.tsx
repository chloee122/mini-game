import { Button } from '@/components/ui/button';
import { monsters } from '@/lib/monster';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { Howl, Howler } from 'howler';

type MonsterProps =
  | {
      id: number;
      mode: 'select';
      onSelected: (id: number) => void;
      onAttack?: undefined;
      onInit?: undefined;
    }
  | {
      id: number;
      mode: 'battle';
      onAttack: () => void;
      onSelected?: undefined;
      onInit: (setHp: Dispatch<SetStateAction<number>>) => void;
    }
  | {
      id: number;
      mode: 'none';
      onAttack?: undefined;
      onSelected?: undefined;
      onInit?: undefined;
    };

export default function Monster({
  id,
  mode,
  onInit,
  onSelected,
  onAttack,
}: MonsterProps) {
  const [hp, setHp] = useState(100);
  var sound = useMemo(() => {
    return new Howl({
      src: ['sounds/attack.mp3'],
      html5: true,
    });
  }, []);

  const monster = useMemo(() => {
    return monsters.find((monster) => monster.id === id);
  }, [id]);

  useEffect(() => {
    onInit?.(setHp);
    console.log('初期化完了');
  }, [setHp, onInit]);

  if (!monster) {
    return null;
  }

  return (
    <div key={monster.id} className="p-4 border space-y-2 shadow-sm">
      <div className="aspect-square relative">
        <Image
          src={`/images/monster-${monster.id}.svg`}
          unoptimized
          fill
          alt=""
        />
      </div>
      <h2>{monster.name}</h2>

      {mode === 'battle' && (
        <div>
          <p>HP: {hp}</p>
          <div className="h-3 rounded-full overflow-hidden border">
            <div
              className={cn(
                'size-full transition duration-500 origin-left',
                hp > 30 ? 'bg-green-500' : 'bg-red-500'
              )}
              style={{
                transform: `scaleX(${hp / 100})`,
              }}
            ></div>
          </div>
        </div>
      )}

      {mode === 'battle' && (
        <Button
          onClick={() => {
            onAttack();
            sound.play();
          }}
          disabled={hp <= 0}
        >
          アタック
        </Button>
      )}

      {mode === 'select' && (
        <Button onClick={() => onSelected(monster.id)} disabled={hp <= 0}>
          選ぶ
        </Button>
      )}
    </div>
  );
}
