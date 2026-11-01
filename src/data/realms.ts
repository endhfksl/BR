import { RealmInfo } from '../types/fantasy';

export const QI_REALMS: RealmInfo[] = [
  {
    stage: 1,
    name: '개화 (開花)',
    category: 'qi',
    circleOrGrade: '1단계 기초',
    description: '체내 마나를 인지하고 거푸집(육체) 안으로 수용하는 단계.',
    capabilities: [
      '신체 자연 치유력 및 피로 회복 속도의 비약적 상승',
      '신체 반사신경 및 근육 효율 강화',
      '단, 외부로 기를 방출하는 것은 불가능함 (체내 강화에 한정)',
    ],
    exampleFeat: '일반 병사 3~5명을 홀로 상대할 수 있는 기초 무인의 경지',
    militaryValue: 25, // range 10 ~ 50
  },
  {
    stage: 2,
    name: '강체 (剛體)',
    category: 'qi',
    circleOrGrade: '2단계 초인화',
    description: '기가 뼈와 근육, 장기에 완벽히 정착하여 초인적인 육신을 완성함.',
    capabilities: [
      '마나가 실리지 않은 일반 화살이나 칼날을 튕겨내는 단단한 피부',
      '바위를 부수고 통나무를 집어던지는 괴력 발휘',
      '마나 없는 공격에 대한 절대적 저항력 보유',
    ],
    exampleFeat: '일반 화살 세례 속을 맨몸으로 돌파하며 적진을 헤집음 (아이온 기사단 정규 단원 기본 경지)',
    militaryValue: 250, // range 100 ~ 500
  },
  {
    stage: 3,
    name: '발현 (發顯)',
    category: 'qi',
    circleOrGrade: '3단계 외공',
    description: '체내에 머물던 기를 무기나 방어구, 물체에 직접 씌워 발산함.',
    capabilities: [
      '칼날에 푸른 검기(劍氣) 및 강기(罡氣) 형성',
      '강체급 초인의 신체 방어력을 관통하는 유효 타격 가능',
      '원거리 참격 및 무기의 강도 한계 돌파',
    ],
    exampleFeat: '수십 미터 밖의 마물을 검기로 베어 넘기며 일격에 성벽이나 참호를 가름',
    militaryValue: 1500, // range 1000 ~ 2000
  },
  {
    stage: 4,
    name: '응집 (凝集)',
    category: 'qi',
    circleOrGrade: '4단계 검성급',
    description: '기를 극한으로 압축하여 눈에 보이는 물질(고체) 상태로 형상화함.',
    capabilities: [
      '기 물질화를 통한 형태와 길이의 자유자재 변형',
      '진정한 무구강(無軀罡) 완성 (칼날 없이 순수 기의 칼을 현현)',
      '주의(Caution)급 마물 침공을 단독으로 토벌 가능한 일기당천의 무력',
    ],
    exampleFeat: '허공에 수십 자루의 고체 검강을 형성하여 대군을 분쇄 (아리샤, 벨리아스, 더록)',
    militaryValue: 4000, // range 3000 ~ 5000
  },
  {
    stage: 5,
    name: '영역 (領域)',
    category: 'qi',
    circleOrGrade: '5단계 천하무쌍',
    description: '체내의 기와 주변 대자연의 마나가 완벽히 공명하여 독자적인 법칙 공간을 창조함.',
    capabilities: [
      '자신만의 고유 영역 규칙 선포 (예: 절대 명중, 거리 무시, 연속 절단)',
      '의지만으로 허공에 수천 개의 참격을 동시 발생',
      '자연재해급 질량과 초재생으로 전장의 상식을 파괴함',
    ],
    exampleFeat: '테리나 황제의 자성 검조종 원격 학살, 마제 아수라의 지형 분쇄',
    militaryValue: 25000, // range 10000 ~ 50000
  },
];

export const MAGIC_CIRCLES: RealmInfo[] = [
  {
    stage: 1,
    name: '감응 (感應)',
    category: 'magic',
    circleOrGrade: '1서클 입문',
    description: '심장에 최초의 마나 서클을 형성하고 대기 중의 마나 수식을 인지함.',
    capabilities: [
      '빛(라이트), 점화, 기초 수맥 탐사 등 생활 마법 구사',
      '마력 흐름의 이상 감지',
    ],
    exampleFeat: '어두운 밤길을 밝히고 불씨를 피우며 약초의 마력을 판별',
    militaryValue: 25,
  },
  {
    stage: 2,
    name: '구축 (構築)',
    category: 'magic',
    circleOrGrade: '2~3서클 실전',
    description: '마나를 물리적인 현상과 형태로 구체화하여 현실에 실질적 간섭을 시작함.',
    capabilities: [
      '파이어볼, 아이스 스피어, 라이트닝 등 4대 원소 마법',
      '외상 치료 및 독소 정화 신성 마법(힐)',
      '기초 방어막(실드) 형성',
    ],
    exampleFeat: '원거리에서 마물 무리를 원소 마법으로 태우고 부상병을 치유 (세실리아)',
    militaryValue: 250,
  },
  {
    stage: 3,
    name: '변성 (變性)',
    category: 'magic',
    circleOrGrade: '4~5서클 전략',
    description: '주변 환경의 물리 법칙과 성질을 일시적으로 왜곡하고 변환함.',
    capabilities: [
      '단축 영창 및 다채로운 광역 마법 투발',
      '국지적 날씨 조종(폭우, 안개), 공중 비행(플라이)',
      '아군 전체에 신체 및 방어 강화 마법(버프) 부여',
    ],
    exampleFeat: '3중 영창으로 폭풍을 부르며 지형을 진흙탕으로 만들어 적 진격을 봉쇄 (로이터)',
    militaryValue: 1500,
  },
  {
    stage: 4,
    name: '주관 (主管)',
    category: 'magic',
    circleOrGrade: '6~7서클 대마도사',
    description: '시전자의 의지가 곧 현실의 마나 수식을 덮어써 현실을 왜곡함.',
    capabilities: [
      '영창 없이 생각만으로 마법 발동 (무영창)',
      '동시 다중 마법 전개 (5개 이상의 고위 마법 동시 시전)',
      '상대의 마법 술식을 실시간으로 해석하고 강제 해체',
    ],
    exampleFeat: '테이오스 마탑주의 5중 복합 마법, 에드워드 대장로의 대지 격변',
    militaryValue: 4000,
  },
  {
    stage: 5,
    name: '영역 (領域)',
    category: 'magic',
    circleOrGrade: '8서클 이상 신화',
    description: '시전자의 내면 심상 세계를 현실 공간에 강제로 덧씌워 절대 규칙을 창조함.',
    capabilities: [
      '공간 내 모든 마나 흐름을 시전자가 독점',
      '상대 마법 자동 분석 및 즉각 무효화',
      '현실 조작 수준의 광범위 결계와 대재앙 마법 구현',
    ],
    exampleFeat: '엘라리아의 대산림 세계수 결계, 카이나의 부동 다중 방벽, 빅토리아의 혈마법',
    militaryValue: 30000,
  },
];

export const MILITARY_CALC_SCALE = {
  militia: { label: '일반 민병/일반병 (기·마법 없음)', value: 1, desc: '무기 든 영지민' },
  flower_sense: { label: '개화 무인 / 1서클 감응', value: 25, desc: '기초 무인 & 생활 마법사' },
  steel_construct: { label: '강체 기사 / 2~3서클 구축', value: 250, desc: '정규 기사단 & 전투 마법사' },
  manifest_transform: { label: '발현 무인 / 4~5서클 변성', value: 1500, desc: '기사단장급 & 상석 마법사' },
  dense_sovereign: { label: '응집 검성 / 6~7서클 주관', value: 4000, desc: '대영주 & 대마탑주급' },
  realm_absolute: { label: '영역 도달자 (초월적 존재)', value: 25000, desc: '황제, 여왕, 마왕, 마제' },
};

export interface DomainClashPreset {
  id: string;
  combatant1: {
    name: string;
    title: string;
    type: '기' | '마법' | '복합';
    ruleName: string;
    ruleDescription: string;
  };
  combatant2: {
    name: string;
    title: string;
    type: '기' | '마법' | '복합';
    ruleName: string;
    ruleDescription: string;
  };
  collisionEffect: string;
}

export const DOMAIN_CLASH_INFO = {
  title: '영역 충돌 (Domain Clash)',
  subtitle: '초월적 강자들의 심상이 맞부딪히는 궁극의 물리적·개념적 붕괴',
  definition: '기와 마법을 포함한 영역급 초월적 강자들의 심상(내면세계)이 현실로 투영되어 맞부딪힐 때 발생하는 궁극의 물리적·개념적 붕괴 현상',
  effects: [
    {
      title: '두 가지 고유 규칙의 동시 강제 적용',
      description: "양측이 창조한 '두 가지 고유 규칙'이 한 공간에 동시에 강제 적용되어 상호 모순되거나 간섭하는 초자연 현상이 발생함.",
      example: '예: "모든 참격이 절대 명중한다"는 기의 규칙과 "모든 물리력이 둔화된다"는 마법의 규칙이 동일한 전장에서 동시에 성립하여 모순을 일으킴.',
    },
    {
      title: '기하급수적인 기·마나 소모량 폭증',
      description: '현실에 심상을 강제로 덧씌우는 영역 전개 자체도 막대한 기와 마나를 소모하지만, 타인의 영역과 충돌하며 이를 억누르거나 방어할 때는 그 소모량이 기하급수적으로 폭증함.',
      example: '평소 수 시간 유지 가능한 영역도 충돌 시에는 수 분에서 수십 초 내에 술자의 자원을 고갈시킴.',
    },
  ],
  defeatConditions: [
    {
      title: '자원 고갈 (한계 도달)',
      detail: '어느 한쪽의 기나 마나가 한계(고갈)에 다다르면 영역의 유지가 강제로 중단됨.',
    },
    {
      title: '육체적 데미지 및 전투 불능',
      detail: '충돌 와중에 상대의 타격을 허용하여 육체적 데미지로 인해 의식을 잃거나 전투 불능에 빠질 때까지 충돌은 멈추지 않고 지속됨.',
    },
  ],
  reboundPenalty: {
    title: '심상 붕괴 및 치명적 역류 현상 (Rebound)',
    description: '한계에 달해 영역이 깨진 패배자는 현실에 덧씌웠던 심상이 산산조각 나며 막대한 역류 현상이 발생함. 체내 기맥과 마나 서클이 파열되어 장기간 불구가 되거나 극심한 반동으로 빈사 상태에 이름.',
  },
  realmHolders: [
    { name: '테리나 황제', realm: '기 영역', rule: '자성 검조종 및 허공 다수 원격 참격' },
    { name: '엘라리아 여왕', realm: '마법 영역', rule: '대규모 초목 조종 및 국가급 세계수 결계' },
    { name: '아스타로트 마왕', realm: '복합 영역', rule: '영역 내 절대 법칙 부여 + 흑마법 창술' },
    { name: '빅토리아 진조', realm: '마법 영역', rule: '혈액 형태 조작 및 절대 혈마법 지배' },
    { name: '카이나 서기', realm: '마법 영역', rule: '부동(不動) 상시 다중 마력방벽 및 다속성 폭격' },
    { name: '아수라 마제', realm: '기 영역', rule: '행성급 질량 성질 및 불사의 초재생' },
  ],
  clashPresets: [
    {
      id: 'terina_vs_ellaria',
      combatant1: {
        name: '테리나 황제',
        title: '카이로스 여황제',
        type: '기',
        ruleName: '절대 검조종 & 허공 참격',
        ruleDescription: '공간 내 모든 금속 무구의 궤적이 술자의 의지에 따라 허공에서 자동 수렴 및 가속',
      },
      combatant2: {
        name: '엘라리아 여왕',
        title: '엘프 왕국 여왕',
        type: '마법',
        ruleName: '대자연 세계수 결계',
        ruleDescription: '전장 전체를 감싸는 고대 초목 결계가 모든 이물질의 운동 에너지를 흡수하고 정화',
      },
      collisionEffect: '수천 자루의 금속 참격이 쏟아져 내리는 동시에 거대한 세계수 뿌리가 솟구쳐 참격을 얽매며 허공에서 번개와 충격파가 연쇄 폭발함.',
    },
    {
      id: 'asura_vs_kaina',
      combatant1: {
        name: '아수라 마제',
        title: '마족 최강자',
        type: '기',
        ruleName: '절대 질량 & 불사 초재생',
        ruleDescription: '물리 기교를 초월한 무한대의 타격 질량과 상처가 0.1초 내로 메워지는 초재생',
      },
      combatant2: {
        name: '카이나 서기',
        title: '심연의 연구가',
        type: '마법',
        ruleName: '부동(不動) 다중 마력방벽',
        ruleDescription: '시전자가 한 발자국도 움직이지 않는 한 결코 뚫리지 않는 7중 마나 차원 장벽',
      },
      collisionEffect: '지형 전체를 박살 내는 철퇴의 질량 압력이 카이나의 다중 방벽에 정면 충돌하며, 공간 좌표 자체가 비틀려 음속을 넘는 충격파가 방출됨.',
    },
    {
      id: 'astaroth_vs_victoria',
      combatant1: {
        name: '아스타로트 마왕',
        title: '심연의 마왕',
        type: '복합',
        ruleName: '강제 법칙 부여 & 흑마 창술',
        ruleDescription: '자신의 영역 내 존재하는 모든 대상의 마력 방출 효율을 50% 강제 억제',
      },
      combatant2: {
        name: '빅토리아 여왕',
        title: '진조 흡혈귀',
        type: '마법',
        ruleName: '절대 혈류 지배',
        ruleDescription: '공간 내 모든 생명체의 혈액 순환을 시전자의 심장 박동에 강제 동기화',
      },
      collisionEffect: '억압의 흑마법 결계 속에서 핏빛 바다가 소용돌이치며, 창끝의 흑염과 혈액 가시가 맞부딪혀 피와 어둠이 엉켜 대지를 부식시킴.',
    },
  ],
};

