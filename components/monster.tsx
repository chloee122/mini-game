import { Button } from '@/components/ui/button';
import { monsters } from '@/lib/monster';
import { cn } from '@/lib/utils';
import { Howl } from 'howler';
import Image from 'next/image';
import { useMemo } from 'react';

type MonsterProps =
  | {
      id: number;
      hp?: undefined;
      mode: 'select';
      onSelected: (id: number) => void;
      onAttack?: undefined;
    }
  | {
      id: number;
      hp: number;
      mode: 'battle';
      onAttack: () => void;
      onSelected?: undefined;
    }
  | {
      id: number;
      hp?: undefined;
      mode: 'none';
      onAttack?: undefined;
      onSelected?: undefined;
    };

export default function Monster({
  id,
  mode,
  hp,
  onSelected,
  onAttack,
}: MonsterProps) {
  var sound = useMemo(() => {
    return new Howl({
      src: ['sounds/attack.mp3'],
      html5: true,
    });
  }, []);

  const monster = useMemo(() => {
    return monsters.find((monster) => monster.id === id);
  }, [id]);

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
        <Button onClick={() => onSelected(monster.id)}>選ぶ</Button>
      )}
    </div>
  );
}
