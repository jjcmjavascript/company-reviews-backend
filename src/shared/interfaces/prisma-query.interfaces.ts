export interface NumberIn {
  in: number[];
}

export interface StringIn {
  in: string[];
}

export interface StartsWith {
  startsWith: string;
  mode?: 'insensitive' | 'default';
}

export interface StringContains {
  contains: string;
  mode?: 'insensitive' | 'default';
}

export interface Where {
  [key: string]: string | number | NumberIn | StartsWith | StringContains;
}

export type OrderDirection = 'ASC' | 'DESC';

export interface FindMany {
  where?: Where;
  skip?: number;
  take?: number;
}
