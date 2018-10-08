export interface CombatCondition {
  name: string;
  duration: number;
}

export interface CombatParticipantState {
  id: number;
  name: string;
  hp: number;
  fp: number;
  conditions: Array<CombatCondition>;
  delta?: {
    hp: Array<number>;
    fp: Array<number>;
    conditions: Array<CombatCondition>;
  }
}
