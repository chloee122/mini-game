'use client';

import Monster from '@/components/monster';
import { Button } from '@/components/ui/button';
import { useMonster } from '@/providers/monster';
import { useStage } from '@/providers/stage';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default function Page() {
  const { myMonsterId } = useMonster();
  const { enemyId, attack, reset, enemyHp, playerHp } = useStage();

  if (!myMonsterId) {
    redirect('/');
  }

  return (
    <div className="container py-10">
      <Button variant="outline" asChild className="mb-4">
        <Link href="/">戻る</Link>
      </Button>
      <Button
        onClick={() => {
          reset();
        }}
        variant="outline"
        className="mb-4"
      >
        リセット
      </Button>
      <h2 className="font-bold text-2xl mb-6">戦闘開始</h2>
      <div className="grid gap-5 grid-cols-2">
        <div>
          <Monster
            hp={playerHp}
            id={myMonsterId}
            mode="battle"
            onAttack={() => attack('enemy')}
          />
        </div>
        <div>
          <Monster
            hp={enemyHp}
            id={enemyId}
            mode="battle"
            onAttack={() => attack('player')}
          />
        </div>
      </div>
    </div>
  );
}
