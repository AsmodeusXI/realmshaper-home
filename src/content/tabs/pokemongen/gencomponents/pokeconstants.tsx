export enum PokemonType {
  NORMAL = "Normal",
  FIRE = "Fire",
  WATER = "Water",
  GRASS = "Grass",
  ELECTIC = "Electric",
  FLYING = "Flying",
  FIGHTING = "Fighting",
  POISON = "Poison",
  GROUND = "Ground",
  PSYCHIC = "Psychic",
  BUG = "Bug",
  ICE = "Ice",
  ROCK = "Rock",
  DRAGON = "Dragon",
  GHOST = "Ghost",
  DARK = "Dark",
  STEEL = "Steel",
  FAIRY = "Fairy",
  LIGHT = "Light",
};

export enum MoveStatus {
  NONE,
  BUFF,
  CONTROL,
  DOT,
  CLEAN,
  ALLY,
  ENEMY,
};

export interface PokemonMove {
  name: string;
  type: string;
  power?: number;
  status?: number;
  mp?: number;
};
