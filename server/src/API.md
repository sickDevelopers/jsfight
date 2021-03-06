### game

- **`getCurrentSoldier()`**:*Soldier* -> get the current soldier
- **`getEnemyTeam()`**:*Team* -> reference to the enemy team
- **`getMyTeam()`**:*Team* -> reference to your team

### Team API

- **`getAliveSoldiers()`**:*Array<Soldier>* -> get alive soldiers
- **`getFirstSoldier()`**:*Soldier* -> get the first soldier
- **`getLastSoldier()`**:*Soldier* -> get the last soldier
- **`getStrongestSoldier()`**:*Soldier* -> get the soldier with the highest attack
- **`getWeakestSoldier()`**:*Soldier* -> get the soldier with the lowes attack
- **`getMostDamagedSoldier()`**:*Soldier* -> get the soldier with the lowest health
- **`getHealer()`**:*Soldier* -> get one soldier who can heal

### Your Soldier API

#### DEV (24HP)
- **`hit(target)`**:*void* -> attacks (3dmg) a target (must be an enemy soldier)
- **`protect(target)`**:*void* -> protects a target from the first hit or cast until he gets damage

#### PM (20 HP)
- **`hit(target)`**:*void* -> attacks (2dmg) a target (must be an enemy soldier)
- **`heal(target)`**:*void* -> heals (5HP) a target (must be one of your soldiers)
- **`silence(target)`**:*void* -> silence a target (can't cast, heal or silence) for one turn
- **`blind(target)`**:*void* -> blinds a target, can't hit for one turn

#### MKTG (15 HP)
- **`hit(target)`**:*void* -> attacks (1dmg) a target (must be an enemy soldier)
- **`cast()`**:*void* -> cast a spell (1dmg) on all enemies
- **`poison(target)`**:*void* -> poison an enemy. Deals 2dmg, then 2dmg per turn for 2 turns. If the enemy is already poisoned, it doesn't deal initial damage but extends poison duration.

#### HR (18HP)
- **`hit(target)`**:*void* -> attacks (1dmg) a target (must be an enemy soldier)
- **`ress(target)`**:*void* -> ress a target (must be a companion) with half of his max health
- **`summon('physical_attack'|'physical_defense'|'magic_attack'|'magic_defense')`**:*void* -> summons a totem (1 round duration) which boosts the stat corresponding to the parameter for the entire team. Max 3 totems. Totems can be targeted and damaged by physical attacks.

#### COMMON TO ALL SOLDIERS
- **`canHeal()`**:*boolean* -> check if soldier can heal
- **`canCast()`**:*boolean* -> check if soldier can cast
- **`canSilence()`**:*boolean* -> check if soldier can silence
- **`canPoison()`**:*boolean* -> check if soldier can poison
- **`canProtect()`**:*boolean* -> check if soldier can protect
- **`canBlind()`**:*boolean* -> check if soldier can blind
- **`canRess()`**:*boolean* -> check if soldier can ress
- **`canSummon()`**:*boolean* -> check if soldier can summon
- **`getMotto()`**:*string* -> return soldier motto
- **`getType()`**:*string* -> return soldier type
- **`getHealth()`**:*int* -> return soldier health
- **`getAttack()`**:*int* -> return soldier attack
- **`getName()`**:*string* -> return soldier name
- **`getId()`**:*string* -> return soldier id
- **`getMaxHealth()`**:*int* -> return soldier max health
- **`getStatus()`**:*Array* -> return a list containing all soldier status. A soldier can be in one or more of the following states:
  - OK: the soldier is alive
  - SILENCED: the soldier is silenced and can't cast, heal or silence
  - BLIND: the soldier can't do any physical attack
  - POISONED: the soldier is poisoned, it will loose 2HP at the end of his next turn
  - PROTECTED: the soldier is protected, the next attack will not harm him (hit or cast)
  - DEAD: the soldier is dead
- **`getTotems()`**:*Array* -> return an array of the totems summoned by that soldier

### Enemy Soldier Api

- **`getType()`**:*string* -> return soldier type
- **`getHealth()`**:*int* -> return soldier health
- **`getAttack()`**:*int* -> return soldier attack
- **`getName()`**:*string* -> return soldier name
- **`getId()`**:*string* -> return soldier id
- **`getMaxHealth()`**:*int* -> return soldier max health
- **`getStatus()`**:*string* -> return soldier status
