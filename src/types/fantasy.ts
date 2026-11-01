export type FactionId = 
  | 'kairos' 
  | 'great_forest' 
  | 'great_plains' 
  | 'great_canyon' 
  | 'frontier' 
  | 'wanderer';

export interface Character {
  id: string;
  code: string; // 'A' ~ 'T', or 'U' for supporting
  subCode?: number; // for U codes like U40, U42
  name: string;
  title: string;
  role: string;
  faction: FactionId;
  factionName: string;
  age: string;
  gender: 'female' | 'male' | 'other';
  mbti?: string;
  enneagram?: string;
  cupSize?: string;
  maritalStatus?: string;
  realmType: '기' | '마법' | '복합' | '일반' | '영역';
  realmStage: string;
  combatStyle: string;
  personality: string;
  background: string;
  specialTrait: string;
  speechTone: string;
  favoriteThings?: string;
  sampleQuote: string;
  availableSituations: {
    code: number;
    label: string;
    category: 'daily' | 'battle' | 'special';
  }[];
}

export interface Territory {
  id: string;
  name: string;
  faction: FactionId;
  grade: '마을' | '큰마을' | '소도시' | '도시' | '대도시' | '왕도' | '폐허/멸망';
  lord: string;
  population: string;
  military: string;
  defense: string;
  tax: string;
  trade: string;
  description: string;
  keyFigures: string[];
  coordinates: { x: number; y: number }; // percentage on map
  travelToFrontier?: string;
}

export interface RealmInfo {
  stage: number;
  name: string;
  category: 'qi' | 'magic';
  circleOrGrade: string;
  description: string;
  capabilities: string[];
  exampleFeat: string;
  militaryValue: number;
}
