import type { RecruitingProfile } from '../types'

export type MetricId =
  | 'height'
  | 'weight'
  | 'forty'
  | 'shuttle'
  | 'threeCone'
  | 'vertical'
  | 'broadJump'

export type MetricBetter = 'higher' | 'lower'

export type FitLabel = 'below' | 'in' | 'above' | 'none'

export interface DivisionMetric {
  id: MetricId
  label: string
  typical: string
  min: number
  max: number
  better: MetricBetter
}

export interface PositionDivisionTargets {
  division: string
  metrics: DivisionMetric[]
}

export interface PositionRequirement {
  sport: string
  position: string
  overview: string
  notes: string[]
  divisions: PositionDivisionTargets[]
}

function m(
  id: MetricId,
  label: string,
  typical: string,
  min: number,
  max: number,
  better: MetricBetter = 'higher',
): DivisionMetric {
  return { id, label, typical, min, max, better }
}

function height(typical: string, min: number, max: number): DivisionMetric {
  return m('height', 'Height', typical, min, max)
}

function weight(typical: string, min: number, max: number): DivisionMetric {
  return m('weight', 'Weight', typical, min, max)
}

function forty(typical: string, min: number, max: number): DivisionMetric {
  return m('forty', '40-yard dash', typical, min, max, 'lower')
}

function shuttle(typical: string, min: number, max: number): DivisionMetric {
  return m('shuttle', '20-yard shuttle', typical, min, max, 'lower')
}

function cone(typical: string, min: number, max: number): DivisionMetric {
  return m('threeCone', '3-cone drill', typical, min, max, 'lower')
}

function vertical(typical: string, min: number, max: number): DivisionMetric {
  return m('vertical', 'Vertical jump', typical, min, max)
}

function broad(typical: string, min: number, max: number): DivisionMetric {
  return m('broadJump', 'Broad jump', typical, min, max)
}

function footballCombine(
  h: [string, number, number],
  w: [string, number, number],
  f: [string, number, number],
  s: [string, number, number],
  c: [string, number, number],
  v: [string, number, number],
  b: [string, number, number],
): DivisionMetric[] {
  return [
    height(...h),
    weight(...w),
    forty(...f),
    shuttle(...s),
    cone(...c),
    vertical(...v),
    broad(...b),
  ]
}

function sizeSpeed(
  h: [string, number, number],
  w: [string, number, number],
  extras: DivisionMetric[] = [],
): DivisionMetric[] {
  return [height(...h), weight(...w), ...extras]
}

const FOOTBALL_NOTES = [
  'These are typical recruited / roster ranges compiled from college roster averages and public combine-style camp data — not NCAA rules.',
  'Film, production, and academics still decide offers. A smaller quarterback who processes and throws on time can out-recruit a taller one who does not.',
  'Freshmen should treat the gap as a training target, not a verdict.',
]

export const POSITION_REQUIREMENTS: PositionRequirement[] = [
  {
    sport: 'Football',
    position: 'Quarterback',
    overview:
      'College staffs want processing, accuracy, and enough size to see and survive the pocket. Dual-threat speed helps at every level, but height and arm talent still sort Power conference boards first.',
    notes: FOOTBALL_NOTES,
    divisions: [
      {
        division: 'NCAA DI (FBS)',
        metrics: footballCombine(
          ["6'2\"–6'5\"", 74, 77],
          ['205–225 lbs', 205, 225],
          ['4.70–4.90s', 4.7, 4.9],
          ['4.20–4.40s', 4.2, 4.4],
          ['7.00–7.20s', 7.0, 7.2],
          ['30–34 in', 30, 34],
          ["9'0\"–9'6\"", 108, 114],
        ),
      },
      {
        division: 'NCAA DI (FCS)',
        metrics: footballCombine(
          ["6'0\"–6'3\"", 72, 75],
          ['190–215 lbs', 190, 215],
          ['4.75–4.95s', 4.75, 4.95],
          ['4.25–4.45s', 4.25, 4.45],
          ['7.10–7.30s', 7.1, 7.3],
          ['28–32 in', 28, 32],
          ["8'8\"–9'2\"", 104, 110],
        ),
      },
      {
        division: 'NCAA DII',
        metrics: footballCombine(
          ["5'11\"–6'3\"", 71, 75],
          ['180–205 lbs', 180, 205],
          ['4.80–5.05s', 4.8, 5.05],
          ['4.30–4.50s', 4.3, 4.5],
          ['7.20–7.40s', 7.2, 7.4],
          ['27–31 in', 27, 31],
          ["8'6\"–9'0\"", 102, 108],
        ),
      },
      {
        division: 'NCAA DIII',
        metrics: footballCombine(
          ["5'10\"–6'2\"", 70, 74],
          ['175–200 lbs', 175, 200],
          ['4.85–5.15s', 4.85, 5.15],
          ['4.35–4.55s', 4.35, 4.55],
          ['7.25–7.50s', 7.25, 7.5],
          ['26–30 in', 26, 30],
          ["8'4\"–8'10\"", 100, 106],
        ),
      },
      {
        division: 'NAIA',
        metrics: footballCombine(
          ["5'10\"–6'2\"", 70, 74],
          ['175–200 lbs', 175, 200],
          ['4.85–5.15s', 4.85, 5.15],
          ['4.35–4.55s', 4.35, 4.55],
          ['7.25–7.50s', 7.25, 7.5],
          ['26–30 in', 26, 30],
          ["8'4\"–8'10\"", 100, 106],
        ),
      },
    ],
  },
  {
    sport: 'Football',
    position: 'Running Back',
    overview:
      'Vision and contact balance matter more than a single 40 time, but Power programs still sort for 200-plus pounds with burst.',
    notes: FOOTBALL_NOTES,
    divisions: [
      {
        division: 'NCAA DI (FBS)',
        metrics: footballCombine(
          ["5'9\"–6'1\"", 69, 73],
          ['200–220 lbs', 200, 220],
          ['4.45–4.60s', 4.45, 4.6],
          ['4.15–4.30s', 4.15, 4.3],
          ['6.90–7.10s', 6.9, 7.1],
          ['34–38 in', 34, 38],
          ["9'8\"–10'4\"", 116, 124],
        ),
      },
      {
        division: 'NCAA DI (FCS)',
        metrics: footballCombine(
          ["5'8\"–6'0\"", 68, 72],
          ['185–210 lbs', 185, 210],
          ['4.50–4.70s', 4.5, 4.7],
          ['4.20–4.35s', 4.2, 4.35],
          ['7.00–7.20s', 7.0, 7.2],
          ['32–36 in', 32, 36],
          ["9'4\"–10'0\"", 112, 120],
        ),
      },
      {
        division: 'NCAA DII',
        metrics: footballCombine(
          ["5'8\"–6'0\"", 68, 72],
          ['180–205 lbs', 180, 205],
          ['4.55–4.75s', 4.55, 4.75],
          ['4.25–4.40s', 4.25, 4.4],
          ['7.05–7.25s', 7.05, 7.25],
          ['30–34 in', 30, 34],
          ["9'2\"–9'8\"", 110, 116],
        ),
      },
      {
        division: 'NCAA DIII',
        metrics: footballCombine(
          ["5'7\"–5'11\"", 67, 71],
          ['170–195 lbs', 170, 195],
          ['4.60–4.85s', 4.6, 4.85],
          ['4.30–4.45s', 4.3, 4.45],
          ['7.10–7.35s', 7.1, 7.35],
          ['28–33 in', 28, 33],
          ["8'10\"–9'6\"", 106, 114],
        ),
      },
      {
        division: 'NAIA',
        metrics: footballCombine(
          ["5'7\"–5'11\"", 67, 71],
          ['170–195 lbs', 170, 195],
          ['4.60–4.85s', 4.6, 4.85],
          ['4.30–4.45s', 4.3, 4.45],
          ['7.10–7.35s', 7.1, 7.35],
          ['28–33 in', 28, 33],
          ["8'10\"–9'6\"", 106, 114],
        ),
      },
    ],
  },
  {
    sport: 'Football',
    position: 'Wide Receiver',
    overview:
      'Separation, catch radius, and contested-catch skill travel. Size plus a mid-4.4s 40 is the Power conference prototype; FCS and DII still recruit smaller separators who win on film.',
    notes: FOOTBALL_NOTES,
    divisions: [
      {
        division: 'NCAA DI (FBS)',
        metrics: footballCombine(
          ["6'0\"–6'3\"", 72, 75],
          ['185–210 lbs', 185, 210],
          ['4.40–4.55s', 4.4, 4.55],
          ['4.10–4.25s', 4.1, 4.25],
          ['6.80–7.05s', 6.8, 7.05],
          ['35–39 in', 35, 39],
          ["10'0\"–10'8\"", 120, 128],
        ),
      },
      {
        division: 'NCAA DI (FCS)',
        metrics: footballCombine(
          ["5'10\"–6'2\"", 70, 74],
          ['175–200 lbs', 175, 200],
          ['4.48–4.65s', 4.48, 4.65],
          ['4.15–4.30s', 4.15, 4.3],
          ['6.90–7.15s', 6.9, 7.15],
          ['33–37 in', 33, 37],
          ["9'8\"–10'4\"", 116, 124],
        ),
      },
      {
        division: 'NCAA DII',
        metrics: footballCombine(
          ["5'9\"–6'1\"", 69, 73],
          ['170–190 lbs', 170, 190],
          ['4.52–4.72s', 4.52, 4.72],
          ['4.20–4.35s', 4.2, 4.35],
          ['7.00–7.20s', 7.0, 7.2],
          ['31–35 in', 31, 35],
          ["9'4\"–10'0\"", 112, 120],
        ),
      },
      {
        division: 'NCAA DIII',
        metrics: footballCombine(
          ["5'8\"–6'1\"", 68, 73],
          ['165–185 lbs', 165, 185],
          ['4.58–4.80s', 4.58, 4.8],
          ['4.25–4.42s', 4.25, 4.42],
          ['7.05–7.30s', 7.05, 7.3],
          ['29–34 in', 29, 34],
          ["9'0\"–9'8\"", 108, 116],
        ),
      },
      {
        division: 'NAIA',
        metrics: footballCombine(
          ["5'8\"–6'1\"", 68, 73],
          ['165–185 lbs', 165, 185],
          ['4.58–4.80s', 4.58, 4.8],
          ['4.25–4.42s', 4.25, 4.42],
          ['7.05–7.30s', 7.05, 7.3],
          ['29–34 in', 29, 34],
          ["9'0\"–9'8\"", 108, 116],
        ),
      },
    ],
  },
  {
    sport: 'Football',
    position: 'Tight End',
    overview:
      'In-line size and a usable 40 still open FBS doors. Move tight ends can play lighter if they separate like big receivers.',
    notes: FOOTBALL_NOTES,
    divisions: [
      {
        division: 'NCAA DI (FBS)',
        metrics: footballCombine(
          ["6'3\"–6'6\"", 75, 78],
          ['240–260 lbs', 240, 260],
          ['4.65–4.85s', 4.65, 4.85],
          ['4.25–4.40s', 4.25, 4.4],
          ['7.10–7.30s', 7.1, 7.3],
          ['32–36 in', 32, 36],
          ["9'6\"–10'2\"", 114, 122],
        ),
      },
      {
        division: 'NCAA DI (FCS)',
        metrics: footballCombine(
          ["6'2\"–6'5\"", 74, 77],
          ['225–250 lbs', 225, 250],
          ['4.70–4.95s', 4.7, 4.95],
          ['4.30–4.45s', 4.3, 4.45],
          ['7.15–7.40s', 7.15, 7.4],
          ['30–34 in', 30, 34],
          ["9'2\"–9'10\"", 110, 118],
        ),
      },
      {
        division: 'NCAA DII',
        metrics: footballCombine(
          ["6'2\"–6'5\"", 74, 77],
          ['215–240 lbs', 215, 240],
          ['4.75–5.00s', 4.75, 5.0],
          ['4.35–4.50s', 4.35, 4.5],
          ['7.20–7.45s', 7.2, 7.45],
          ['28–33 in', 28, 33],
          ["9'0\"–9'6\"", 108, 114],
        ),
      },
      {
        division: 'NCAA DIII',
        metrics: footballCombine(
          ["6'1\"–6'4\"", 73, 76],
          ['205–230 lbs', 205, 230],
          ['4.80–5.10s', 4.8, 5.1],
          ['4.38–4.55s', 4.38, 4.55],
          ['7.25–7.50s', 7.25, 7.5],
          ['27–32 in', 27, 32],
          ["8'8\"–9'4\"", 104, 112],
        ),
      },
      {
        division: 'NAIA',
        metrics: footballCombine(
          ["6'1\"–6'4\"", 73, 76],
          ['205–230 lbs', 205, 230],
          ['4.80–5.10s', 4.8, 5.1],
          ['4.38–4.55s', 4.38, 4.55],
          ['7.25–7.50s', 7.25, 7.5],
          ['27–32 in', 27, 32],
          ["8'8\"–9'4\"", 104, 112],
        ),
      },
    ],
  },
  {
    sport: 'Football',
    position: 'Offensive Line',
    overview:
      'Length, mass, and a clean kick-slide matter more than a 40. FBS tackles are usually 6\'5"+ and 300-plus; guards and centers can play a shade shorter.',
    notes: FOOTBALL_NOTES,
    divisions: [
      {
        division: 'NCAA DI (FBS)',
        metrics: footballCombine(
          ["6'4\"–6'7\"", 76, 79],
          ['300–325 lbs', 300, 325],
          ['5.10–5.35s', 5.1, 5.35],
          ['4.55–4.75s', 4.55, 4.75],
          ['7.50–7.80s', 7.5, 7.8],
          ['26–30 in', 26, 30],
          ["8'6\"–9'2\"", 102, 110],
        ),
      },
      {
        division: 'NCAA DI (FCS)',
        metrics: footballCombine(
          ["6'3\"–6'6\"", 75, 78],
          ['280–310 lbs', 280, 310],
          ['5.15–5.45s', 5.15, 5.45],
          ['4.60–4.80s', 4.6, 4.8],
          ['7.60–7.90s', 7.6, 7.9],
          ['25–29 in', 25, 29],
          ["8'4\"–9'0\"", 100, 108],
        ),
      },
      {
        division: 'NCAA DII',
        metrics: footballCombine(
          ["6'2\"–6'5\"", 74, 77],
          ['270–300 lbs', 270, 300],
          ['5.20–5.50s', 5.2, 5.5],
          ['4.65–4.85s', 4.65, 4.85],
          ['7.65–8.00s', 7.65, 8.0],
          ['24–28 in', 24, 28],
          ["8'2\"–8'10\"", 98, 106],
        ),
      },
      {
        division: 'NCAA DIII',
        metrics: footballCombine(
          ["6'1\"–6'4\"", 73, 76],
          ['255–290 lbs', 255, 290],
          ['5.25–5.60s', 5.25, 5.6],
          ['4.70–4.95s', 4.7, 4.95],
          ['7.70–8.10s', 7.7, 8.1],
          ['23–27 in', 23, 27],
          ["8'0\"–8'8\"", 96, 104],
        ),
      },
      {
        division: 'NAIA',
        metrics: footballCombine(
          ["6'1\"–6'4\"", 73, 76],
          ['255–290 lbs', 255, 290],
          ['5.25–5.60s', 5.25, 5.6],
          ['4.70–4.95s', 4.7, 4.95],
          ['7.70–8.10s', 7.7, 8.1],
          ['23–27 in', 23, 27],
          ["8'0\"–8'8\"", 96, 104],
        ),
      },
    ],
  },
  {
    sport: 'Football',
    position: 'Defensive Line',
    overview:
      'Edge rushers need first-step burst; interiors need mass and a short-area get-off. 40 times matter more on the edge than at nose.',
    notes: FOOTBALL_NOTES,
    divisions: [
      {
        division: 'NCAA DI (FBS)',
        metrics: footballCombine(
          ["6'3\"–6'6\"", 75, 78],
          ['260–295 lbs', 260, 295],
          ['4.70–4.95s', 4.7, 4.95],
          ['4.30–4.50s', 4.3, 4.5],
          ['7.15–7.40s', 7.15, 7.4],
          ['31–35 in', 31, 35],
          ["9'4\"–10'0\"", 112, 120],
        ),
      },
      {
        division: 'NCAA DI (FCS)',
        metrics: footballCombine(
          ["6'2\"–6'5\"", 74, 77],
          ['245–280 lbs', 245, 280],
          ['4.80–5.05s', 4.8, 5.05],
          ['4.35–4.55s', 4.35, 4.55],
          ['7.25–7.50s', 7.25, 7.5],
          ['29–33 in', 29, 33],
          ["9'0\"–9'8\"", 108, 116],
        ),
      },
      {
        division: 'NCAA DII',
        metrics: footballCombine(
          ["6'1\"–6'4\"", 73, 76],
          ['235–270 lbs', 235, 270],
          ['4.85–5.15s', 4.85, 5.15],
          ['4.40–4.60s', 4.4, 4.6],
          ['7.30–7.60s', 7.3, 7.6],
          ['27–32 in', 27, 32],
          ["8'8\"–9'4\"", 104, 112],
        ),
      },
      {
        division: 'NCAA DIII',
        metrics: footballCombine(
          ["6'0\"–6'4\"", 72, 76],
          ['225–260 lbs', 225, 260],
          ['4.90–5.25s', 4.9, 5.25],
          ['4.45–4.70s', 4.45, 4.7],
          ['7.35–7.70s', 7.35, 7.7],
          ['26–31 in', 26, 31],
          ["8'6\"–9'2\"", 102, 110],
        ),
      },
      {
        division: 'NAIA',
        metrics: footballCombine(
          ["6'0\"–6'4\"", 72, 76],
          ['225–260 lbs', 225, 260],
          ['4.90–5.25s', 4.9, 5.25],
          ['4.45–4.70s', 4.45, 4.7],
          ['7.35–7.70s', 7.35, 7.7],
          ['26–31 in', 26, 31],
          ["8'6\"–9'2\"", 102, 110],
        ),
      },
    ],
  },
  {
    sport: 'Football',
    position: 'Linebacker',
    overview:
      'Range to the boundary and a clean downhill strike. FBS staffs want 225-plus with a mid-4.6s 40; lower divisions still recruit lighter run-and-hit players.',
    notes: FOOTBALL_NOTES,
    divisions: [
      {
        division: 'NCAA DI (FBS)',
        metrics: footballCombine(
          ["6'1\"–6'3\"", 73, 75],
          ['225–245 lbs', 225, 245],
          ['4.55–4.70s', 4.55, 4.7],
          ['4.15–4.30s', 4.15, 4.3],
          ['6.95–7.15s', 6.95, 7.15],
          ['34–38 in', 34, 38],
          ["9'10\"–10'6\"", 118, 126],
        ),
      },
      {
        division: 'NCAA DI (FCS)',
        metrics: footballCombine(
          ["6'0\"–6'3\"", 72, 75],
          ['210–230 lbs', 210, 230],
          ['4.60–4.80s', 4.6, 4.8],
          ['4.20–4.38s', 4.2, 4.38],
          ['7.05–7.25s', 7.05, 7.25],
          ['32–36 in', 32, 36],
          ["9'6\"–10'2\"", 114, 122],
        ),
      },
      {
        division: 'NCAA DII',
        metrics: footballCombine(
          ["5'11\"–6'2\"", 71, 74],
          ['200–225 lbs', 200, 225],
          ['4.65–4.85s', 4.65, 4.85],
          ['4.25–4.42s', 4.25, 4.42],
          ['7.10–7.35s', 7.1, 7.35],
          ['30–34 in', 30, 34],
          ["9'2\"–9'10\"", 110, 118],
        ),
      },
      {
        division: 'NCAA DIII',
        metrics: footballCombine(
          ["5'10\"–6'2\"", 70, 74],
          ['190–215 lbs', 190, 215],
          ['4.70–4.95s', 4.7, 4.95],
          ['4.30–4.50s', 4.3, 4.5],
          ['7.15–7.40s', 7.15, 7.4],
          ['28–33 in', 28, 33],
          ["8'10\"–9'6\"", 106, 114],
        ),
      },
      {
        division: 'NAIA',
        metrics: footballCombine(
          ["5'10\"–6'2\"", 70, 74],
          ['190–215 lbs', 190, 215],
          ['4.70–4.95s', 4.7, 4.95],
          ['4.30–4.50s', 4.3, 4.5],
          ['7.15–7.40s', 7.15, 7.4],
          ['28–33 in', 28, 33],
          ["8'10\"–9'6\"", 106, 114],
        ),
      },
    ],
  },
  {
    sport: 'Football',
    position: 'Cornerback',
    overview:
      'Hip fluidity and play speed first. FBS corners are often 5\'11"+ with a 4.4s 40; shorter corners still get on the field if they stay in phase on film.',
    notes: FOOTBALL_NOTES,
    divisions: [
      {
        division: 'NCAA DI (FBS)',
        metrics: footballCombine(
          ["5'11\"–6'2\"", 71, 74],
          ['180–195 lbs', 180, 195],
          ['4.40–4.52s', 4.4, 4.52],
          ['4.05–4.20s', 4.05, 4.2],
          ['6.75–6.95s', 6.75, 6.95],
          ['36–40 in', 36, 40],
          ["10'2\"–10'10\"", 122, 130],
        ),
      },
      {
        division: 'NCAA DI (FCS)',
        metrics: footballCombine(
          ["5'10\"–6'1\"", 70, 73],
          ['170–190 lbs', 170, 190],
          ['4.45–4.60s', 4.45, 4.6],
          ['4.10–4.25s', 4.1, 4.25],
          ['6.85–7.10s', 6.85, 7.1],
          ['34–38 in', 34, 38],
          ["9'10\"–10'6\"", 118, 126],
        ),
      },
      {
        division: 'NCAA DII',
        metrics: footballCombine(
          ["5'9\"–6'0\"", 69, 72],
          ['165–185 lbs', 165, 185],
          ['4.50–4.68s', 4.5, 4.68],
          ['4.15–4.32s', 4.15, 4.32],
          ['6.95–7.20s', 6.95, 7.2],
          ['32–36 in', 32, 36],
          ["9'6\"–10'2\"", 114, 122],
        ),
      },
      {
        division: 'NCAA DIII',
        metrics: footballCombine(
          ["5'8\"–6'0\"", 68, 72],
          ['160–180 lbs', 160, 180],
          ['4.55–4.75s', 4.55, 4.75],
          ['4.20–4.38s', 4.2, 4.38],
          ['7.00–7.25s', 7.0, 7.25],
          ['30–35 in', 30, 35],
          ["9'2\"–9'10\"", 110, 118],
        ),
      },
      {
        division: 'NAIA',
        metrics: footballCombine(
          ["5'8\"–6'0\"", 68, 72],
          ['160–180 lbs', 160, 180],
          ['4.55–4.75s', 4.55, 4.75],
          ['4.20–4.38s', 4.2, 4.38],
          ['7.00–7.25s', 7.0, 7.25],
          ['30–35 in', 30, 35],
          ["9'2\"–9'10\"", 110, 118],
        ),
      },
    ],
  },
  {
    sport: 'Football',
    position: 'Safety',
    overview:
      'Range, tackling, and coverage IQ. A 4.5s 40 with 200 pounds is the FBS look; DII/DIII still recruit hybrid linebacker-safeties who hit and communicate.',
    notes: FOOTBALL_NOTES,
    divisions: [
      {
        division: 'NCAA DI (FBS)',
        metrics: footballCombine(
          ["6'0\"–6'2\"", 72, 74],
          ['195–215 lbs', 195, 215],
          ['4.45–4.58s', 4.45, 4.58],
          ['4.10–4.25s', 4.1, 4.25],
          ['6.85–7.10s', 6.85, 7.1],
          ['35–39 in', 35, 39],
          ["10'0\"–10'8\"", 120, 128],
        ),
      },
      {
        division: 'NCAA DI (FCS)',
        metrics: footballCombine(
          ["5'11\"–6'2\"", 71, 74],
          ['185–205 lbs', 185, 205],
          ['4.50–4.68s', 4.5, 4.68],
          ['4.15–4.32s', 4.15, 4.32],
          ['6.95–7.20s', 6.95, 7.2],
          ['33–37 in', 33, 37],
          ["9'8\"–10'4\"", 116, 124],
        ),
      },
      {
        division: 'NCAA DII',
        metrics: footballCombine(
          ["5'10\"–6'1\"", 70, 73],
          ['180–200 lbs', 180, 200],
          ['4.55–4.75s', 4.55, 4.75],
          ['4.20–4.38s', 4.2, 4.38],
          ['7.00–7.25s', 7.0, 7.25],
          ['31–35 in', 31, 35],
          ["9'4\"–10'0\"", 112, 120],
        ),
      },
      {
        division: 'NCAA DIII',
        metrics: footballCombine(
          ["5'9\"–6'1\"", 69, 73],
          ['170–195 lbs', 170, 195],
          ['4.60–4.82s', 4.6, 4.82],
          ['4.25–4.42s', 4.25, 4.42],
          ['7.10–7.35s', 7.1, 7.35],
          ['29–34 in', 29, 34],
          ["9'0\"–9'8\"", 108, 116],
        ),
      },
      {
        division: 'NAIA',
        metrics: footballCombine(
          ["5'9\"–6'1\"", 69, 73],
          ['170–195 lbs', 170, 195],
          ['4.60–4.82s', 4.6, 4.82],
          ['4.25–4.42s', 4.25, 4.42],
          ['7.10–7.35s', 7.1, 7.35],
          ['29–34 in', 29, 34],
          ["9'0\"–9'8\"", 108, 116],
        ),
      },
    ],
  },
  {
    sport: 'Football',
    position: 'Kicker / Punter',
    overview:
      'Leg speed and consistency beat combine numbers. Height and a clean 40 still show up on camp cards, but hang time, distance, and accuracy are the real board.',
    notes: [
      ...FOOTBALL_NOTES,
      'Bring a charted camp video: kickoffs, FG from 35/40/45/50, and directional punts.',
    ],
    divisions: [
      {
        division: 'NCAA DI (FBS)',
        metrics: sizeSpeed(["5'10\"–6'3\"", 70, 75], ['175–210 lbs', 175, 210], [forty('4.80–5.20s', 4.8, 5.2)]),
      },
      {
        division: 'NCAA DI (FCS)',
        metrics: sizeSpeed(["5'9\"–6'2\"", 69, 74], ['170–205 lbs', 170, 205], [forty('4.85–5.25s', 4.85, 5.25)]),
      },
      {
        division: 'NCAA DII',
        metrics: sizeSpeed(["5'8\"–6'2\"", 68, 74], ['165–200 lbs', 165, 200], [forty('4.90–5.30s', 4.9, 5.3)]),
      },
      {
        division: 'NCAA DIII',
        metrics: sizeSpeed(["5'8\"–6'1\"", 68, 73], ['160–195 lbs', 160, 195], [forty('4.95–5.40s', 4.95, 5.4)]),
      },
      {
        division: 'NAIA',
        metrics: sizeSpeed(["5'8\"–6'1\"", 68, 73], ['160–195 lbs', 160, 195], [forty('4.95–5.40s', 4.95, 5.4)]),
      },
    ],
  },
  {
    sport: 'Basketball',
    position: 'Point Guard',
    overview:
      'Lead guards are measured on pace, pick-and-roll decisions, and on-ball defense. Height still sorts high-major boards; a 6-foot lead who gets downhill can play anywhere.',
    notes: [
      'Typical college roster ranges, not NCAA rules. Wingspan and game film outweigh a single vertical.',
    ],
    divisions: [
      { division: 'NCAA DI', metrics: sizeSpeed(["6'0\"–6'4\"", 72, 76], ['165–190 lbs', 165, 190], [vertical('32–38 in', 32, 38)]) },
      { division: 'NCAA DII', metrics: sizeSpeed(["5'10\"–6'2\"", 70, 74], ['160–185 lbs', 160, 185], [vertical('30–36 in', 30, 36)]) },
      { division: 'NCAA DIII', metrics: sizeSpeed(["5'9\"–6'2\"", 69, 74], ['155–180 lbs', 155, 180], [vertical('28–34 in', 28, 34)]) },
      { division: 'NAIA', metrics: sizeSpeed(["5'9\"–6'2\"", 69, 74], ['155–180 lbs', 155, 180], [vertical('28–34 in', 28, 34)]) },
    ],
  },
  {
    sport: 'Basketball',
    position: 'Wing',
    overview:
      'Wings need size to guard multiple positions and enough bounce to finish through contact.',
    notes: ['Typical college roster ranges, not NCAA rules.'],
    divisions: [
      { division: 'NCAA DI', metrics: sizeSpeed(["6'4\"–6'7\"", 76, 79], ['190–220 lbs', 190, 220], [vertical('34–40 in', 34, 40)]) },
      { division: 'NCAA DII', metrics: sizeSpeed(["6'2\"–6'6\"", 74, 78], ['180–210 lbs', 180, 210], [vertical('32–38 in', 32, 38)]) },
      { division: 'NCAA DIII', metrics: sizeSpeed(["6'1\"–6'5\"", 73, 77], ['175–205 lbs', 175, 205], [vertical('30–36 in', 30, 36)]) },
      { division: 'NAIA', metrics: sizeSpeed(["6'1\"–6'5\"", 73, 77], ['175–205 lbs', 175, 205], [vertical('30–36 in', 30, 36)]) },
    ],
  },
  {
    sport: 'Basketball',
    position: 'Forward / Center',
    overview:
      'Frontcourt recruiting still starts with height and frame, then rim protection and a usable face-up game.',
    notes: ['Typical college roster ranges, not NCAA rules.'],
    divisions: [
      { division: 'NCAA DI', metrics: sizeSpeed(["6'7\"–6'11\"", 79, 83], ['215–250 lbs', 215, 250], [vertical('30–36 in', 30, 36)]) },
      { division: 'NCAA DII', metrics: sizeSpeed(["6'5\"–6'9\"", 77, 81], ['205–240 lbs', 205, 240], [vertical('28–34 in', 28, 34)]) },
      { division: 'NCAA DIII', metrics: sizeSpeed(["6'4\"–6'8\"", 76, 80], ['200–230 lbs', 200, 230], [vertical('26–32 in', 26, 32)]) },
      { division: 'NAIA', metrics: sizeSpeed(["6'4\"–6'8\"", 76, 80], ['200–230 lbs', 200, 230], [vertical('26–32 in', 26, 32)]) },
    ],
  },
  {
    sport: 'Baseball',
    position: 'Pitcher',
    overview:
      'Velocity, command, and a second pitch matter more than a 40. Height still shows up on DI boards because leverage and downhill angle are easy to project.',
    notes: [
      'Typical roster / showcase ranges. Track velo, spin, and command separately from combine numbers.',
    ],
    divisions: [
      { division: 'NCAA DI', metrics: sizeSpeed(["6'1\"–6'5\"", 73, 77], ['185–220 lbs', 185, 220], [forty('6.8–7.2s (60-yard equiv. context)', 6.8, 7.2)]) },
      { division: 'NCAA DII', metrics: sizeSpeed(["5'11\"–6'4\"", 71, 76], ['175–210 lbs', 175, 210]) },
      { division: 'NCAA DIII', metrics: sizeSpeed(["5'10\"–6'3\"", 70, 75], ['170–205 lbs', 170, 205]) },
      { division: 'NAIA', metrics: sizeSpeed(["5'10\"–6'3\"", 70, 75], ['170–205 lbs', 170, 205]) },
    ],
  },
  {
    sport: 'Baseball',
    position: 'Catcher',
    overview:
      'Pop time, receiving, and blocking beat raw size. Strong frames still get looks because catchers have to last a conference weekend.',
    notes: ['Typical roster ranges. A 2.0-or-better pop time is the DI conversation starter.'],
    divisions: [
      { division: 'NCAA DI', metrics: sizeSpeed(["5'10\"–6'3\"", 70, 75], ['185–215 lbs', 185, 215]) },
      { division: 'NCAA DII', metrics: sizeSpeed(["5'9\"–6'2\"", 69, 74], ['175–205 lbs', 175, 205]) },
      { division: 'NCAA DIII', metrics: sizeSpeed(["5'8\"–6'2\"", 68, 74], ['170–200 lbs', 170, 200]) },
      { division: 'NAIA', metrics: sizeSpeed(["5'8\"–6'2\"", 68, 74], ['170–200 lbs', 170, 200]) },
    ],
  },
  {
    sport: 'Baseball',
    position: 'Infield',
    overview:
      'Middle infielders can play smaller if the hands and arm play. Corners need more size and extra-base power.',
    notes: ['Typical roster ranges. 60-yard times around 6.7–7.0 keep DI middle infielders on the board.'],
    divisions: [
      { division: 'NCAA DI', metrics: sizeSpeed(["5'10\"–6'3\"", 70, 75], ['175–205 lbs', 175, 205]) },
      { division: 'NCAA DII', metrics: sizeSpeed(["5'9\"–6'2\"", 69, 74], ['165–195 lbs', 165, 195]) },
      { division: 'NCAA DIII', metrics: sizeSpeed(["5'8\"–6'2\"", 68, 74], ['160–190 lbs', 160, 190]) },
      { division: 'NAIA', metrics: sizeSpeed(["5'8\"–6'2\"", 68, 74], ['160–190 lbs', 160, 190]) },
    ],
  },
  {
    sport: 'Baseball',
    position: 'Outfield',
    overview:
      'Range and arm strength first. Center fielders can be lighter; corners need extra thump.',
    notes: ['Typical roster ranges.'],
    divisions: [
      { division: 'NCAA DI', metrics: sizeSpeed(["5'11\"–6'3\"", 71, 75], ['180–210 lbs', 180, 210]) },
      { division: 'NCAA DII', metrics: sizeSpeed(["5'10\"–6'2\"", 70, 74], ['170–200 lbs', 170, 200]) },
      { division: 'NCAA DIII', metrics: sizeSpeed(["5'9\"–6'2\"", 69, 74], ['165–195 lbs', 165, 195]) },
      { division: 'NAIA', metrics: sizeSpeed(["5'9\"–6'2\"", 69, 74], ['165–195 lbs', 165, 195]) },
    ],
  },
  {
    sport: 'Softball',
    position: 'Pitcher',
    overview:
      'Spin, movement, and a repeatable delivery beat height. Taller pitchers still get earlier looks because of angle.',
    notes: ['Typical roster ranges, not NCAA rules.'],
    divisions: [
      { division: 'NCAA DI', metrics: sizeSpeed(["5'7\"–6'0\"", 67, 72], ['140–175 lbs', 140, 175]) },
      { division: 'NCAA DII', metrics: sizeSpeed(["5'5\"–5'10\"", 65, 70], ['135–170 lbs', 135, 170]) },
      { division: 'NCAA DIII', metrics: sizeSpeed(["5'4\"–5'9\"", 64, 69], ['130–165 lbs', 130, 165]) },
      { division: 'NAIA', metrics: sizeSpeed(["5'4\"–5'9\"", 64, 69], ['130–165 lbs', 130, 165]) },
    ],
  },
  {
    sport: 'Softball',
    position: 'Catcher',
    overview:
      'Pop time, framing, and blocking. A strong frame helps over a 60-game spring.',
    notes: ['Typical roster ranges.'],
    divisions: [
      { division: 'NCAA DI', metrics: sizeSpeed(["5'5\"–5'10\"", 65, 70], ['145–175 lbs', 145, 175]) },
      { division: 'NCAA DII', metrics: sizeSpeed(["5'4\"–5'9\"", 64, 69], ['140–170 lbs', 140, 170]) },
      { division: 'NCAA DIII', metrics: sizeSpeed(["5'3\"–5'8\"", 63, 68], ['135–165 lbs', 135, 165]) },
      { division: 'NAIA', metrics: sizeSpeed(["5'3\"–5'8\"", 63, 68], ['135–165 lbs', 135, 165]) },
    ],
  },
  {
    sport: 'Softball',
    position: 'Infield / Outfield',
    overview:
      'Range, arm, and contact quality. Speed plays bigger in the outfield than at the corners.',
    notes: ['Typical roster ranges.'],
    divisions: [
      { division: 'NCAA DI', metrics: sizeSpeed(["5'4\"–5'9\"", 64, 69], ['130–165 lbs', 130, 165]) },
      { division: 'NCAA DII', metrics: sizeSpeed(["5'3\"–5'8\"", 63, 68], ['125–160 lbs', 125, 160]) },
      { division: 'NCAA DIII', metrics: sizeSpeed(["5'2\"–5'8\"", 62, 68], ['120–155 lbs', 120, 155]) },
      { division: 'NAIA', metrics: sizeSpeed(["5'2\"–5'8\"", 62, 68], ['120–155 lbs', 120, 155]) },
    ],
  },
  {
    sport: 'Soccer',
    position: 'Goalkeeper',
    overview:
      'Length, handling, and distribution. DI keepers are often 6-foot-plus; lower divisions still recruit shorter shot-stoppers with elite feet.',
    notes: ['Typical roster ranges. 40 times are less important than agility and aerial command.'],
    divisions: [
      { division: 'NCAA DI', metrics: sizeSpeed(["6'0\"–6'4\"", 72, 76], ['170–200 lbs', 170, 200], [vertical('28–34 in', 28, 34)]) },
      { division: 'NCAA DII', metrics: sizeSpeed(["5'10\"–6'3\"", 70, 75], ['160–190 lbs', 160, 190], [vertical('26–32 in', 26, 32)]) },
      { division: 'NCAA DIII', metrics: sizeSpeed(["5'9\"–6'2\"", 69, 74], ['155–185 lbs', 155, 185], [vertical('24–30 in', 24, 30)]) },
      { division: 'NAIA', metrics: sizeSpeed(["5'9\"–6'2\"", 69, 74], ['155–185 lbs', 155, 185], [vertical('24–30 in', 24, 30)]) },
    ],
  },
  {
    sport: 'Soccer',
    position: 'Field Player',
    overview:
      'Engine, 1v1 defending or attacking, and a clear role. Size helps center backs more than attacking mids.',
    notes: ['Typical roster ranges. Coaches recruit film and club level first.'],
    divisions: [
      { division: 'NCAA DI', metrics: sizeSpeed(["5'7\"–6'2\"", 67, 74], ['140–180 lbs', 140, 180], [forty('4.60–4.90s', 4.6, 4.9)]) },
      { division: 'NCAA DII', metrics: sizeSpeed(["5'6\"–6'1\"", 66, 73], ['135–175 lbs', 135, 175], [forty('4.70–5.00s', 4.7, 5.0)]) },
      { division: 'NCAA DIII', metrics: sizeSpeed(["5'5\"–6'0\"", 65, 72], ['130–170 lbs', 130, 170], [forty('4.75–5.10s', 4.75, 5.1)]) },
      { division: 'NAIA', metrics: sizeSpeed(["5'5\"–6'0\"", 65, 72], ['130–170 lbs', 130, 170], [forty('4.75–5.10s', 4.75, 5.1)]) },
    ],
  },
  {
    sport: 'Volleyball',
    position: 'Outside Hitter / Opposite',
    overview:
      'Approach jump and hitting efficiency matter more than standing height, but DI pins are usually 6\'0"+.',
    notes: ['Typical roster ranges. Post your approach jump, not only standing reach.'],
    divisions: [
      { division: 'NCAA DI', metrics: sizeSpeed(["6'0\"–6'4\"", 72, 76], ['150–180 lbs', 150, 180], [vertical('28–34 in', 28, 34)]) },
      { division: 'NCAA DII', metrics: sizeSpeed(["5'10\"–6'2\"", 70, 74], ['145–175 lbs', 145, 175], [vertical('26–32 in', 26, 32)]) },
      { division: 'NCAA DIII', metrics: sizeSpeed(["5'8\"–6'1\"", 68, 73], ['140–170 lbs', 140, 170], [vertical('24–30 in', 24, 30)]) },
      { division: 'NAIA', metrics: sizeSpeed(["5'8\"–6'1\"", 68, 73], ['140–170 lbs', 140, 170], [vertical('24–30 in', 24, 30)]) },
    ],
  },
  {
    sport: 'Volleyball',
    position: 'Setter',
    overview:
      'Hands, tempo, and leadership. Setters can play shorter than pins if they run a fast offense.',
    notes: ['Typical roster ranges.'],
    divisions: [
      { division: 'NCAA DI', metrics: sizeSpeed(["5'8\"–6'1\"", 68, 73], ['135–165 lbs', 135, 165], [vertical('24–30 in', 24, 30)]) },
      { division: 'NCAA DII', metrics: sizeSpeed(["5'6\"–6'0\"", 66, 72], ['130–160 lbs', 130, 160], [vertical('22–28 in', 22, 28)]) },
      { division: 'NCAA DIII', metrics: sizeSpeed(["5'5\"–5'11\"", 65, 71], ['125–155 lbs', 125, 155], [vertical('20–26 in', 20, 26)]) },
      { division: 'NAIA', metrics: sizeSpeed(["5'5\"–5'11\"", 65, 71], ['125–155 lbs', 125, 155], [vertical('20–26 in', 20, 26)]) },
    ],
  },
  {
    sport: 'Volleyball',
    position: 'Libero / DS',
    overview:
      'Serve-receive and defense. Liberos are often the shortest players on the roster; speed and reading beat height.',
    notes: ['Typical roster ranges.'],
    divisions: [
      { division: 'NCAA DI', metrics: sizeSpeed(["5'4\"–5'9\"", 64, 69], ['120–150 lbs', 120, 150]) },
      { division: 'NCAA DII', metrics: sizeSpeed(["5'3\"–5'8\"", 63, 68], ['115–145 lbs', 115, 145]) },
      { division: 'NCAA DIII', metrics: sizeSpeed(["5'2\"–5'8\"", 62, 68], ['110–145 lbs', 110, 145]) },
      { division: 'NAIA', metrics: sizeSpeed(["5'2\"–5'8\"", 62, 68], ['110–145 lbs', 110, 145]) },
    ],
  },
  {
    sport: 'Lacrosse',
    position: 'Attack / Midfield',
    overview:
      'Stick skill and dodge speed first. Midfielders need a usable 40 and enough size to survive slides.',
    notes: ['Typical roster / combine-camp ranges.'],
    divisions: [
      { division: 'NCAA DI', metrics: footballCombine(
        ["5'9\"–6'2\"", 69, 74],
        ['165–195 lbs', 165, 195],
        ['4.55–4.80s', 4.55, 4.8],
        ['4.20–4.40s', 4.2, 4.4],
        ['7.00–7.25s', 7.0, 7.25],
        ['30–35 in', 30, 35],
        ["9'0\"–9'8\"", 108, 116],
      ) },
      { division: 'NCAA DII', metrics: sizeSpeed(["5'8\"–6'1\"", 68, 73], ['160–190 lbs', 160, 190], [forty('4.65–4.90s', 4.65, 4.9)]) },
      { division: 'NCAA DIII', metrics: sizeSpeed(["5'7\"–6'1\"", 67, 73], ['155–185 lbs', 155, 185], [forty('4.70–5.00s', 4.7, 5.0)]) },
      { division: 'NAIA', metrics: sizeSpeed(["5'7\"–6'1\"", 67, 73], ['155–185 lbs', 155, 185], [forty('4.70–5.00s', 4.7, 5.0)]) },
    ],
  },
  {
    sport: 'Lacrosse',
    position: 'Defense / Goalie',
    overview:
      'Length for poles and composure for goalies. Close defense at DI is often 6-foot-plus with a physical frame.',
    notes: ['Typical roster ranges.'],
    divisions: [
      { division: 'NCAA DI', metrics: sizeSpeed(["6'0\"–6'4\"", 72, 76], ['185–220 lbs', 185, 220], [forty('4.70–4.95s', 4.7, 4.95)]) },
      { division: 'NCAA DII', metrics: sizeSpeed(["5'10\"–6'3\"", 70, 75], ['175–210 lbs', 175, 210], [forty('4.75–5.05s', 4.75, 5.05)]) },
      { division: 'NCAA DIII', metrics: sizeSpeed(["5'9\"–6'2\"", 69, 74], ['170–205 lbs', 170, 205], [forty('4.80–5.15s', 4.8, 5.15)]) },
      { division: 'NAIA', metrics: sizeSpeed(["5'9\"–6'2\"", 69, 74], ['170–205 lbs', 170, 205], [forty('4.80–5.15s', 4.8, 5.15)]) },
    ],
  },
  {
    sport: 'Track & Field',
    position: 'Sprints / Jumps',
    overview:
      'Marks are the resume. Height and weight only tell whether the event looks sustainable.',
    notes: [
      'Post FAT marks from the current outdoor season. Combine-style 40s are secondary to legal race times.',
    ],
    divisions: [
      { division: 'NCAA DI', metrics: sizeSpeed(["5'8\"–6'3\"", 68, 75], ['145–190 lbs', 145, 190], [forty('4.40–4.65s', 4.4, 4.65), vertical('32–40 in', 32, 40)]) },
      { division: 'NCAA DII', metrics: sizeSpeed(["5'7\"–6'2\"", 67, 74], ['140–185 lbs', 140, 185], [forty('4.50–4.75s', 4.5, 4.75), vertical('30–37 in', 30, 37)]) },
      { division: 'NCAA DIII', metrics: sizeSpeed(["5'6\"–6'2\"", 66, 74], ['135–180 lbs', 135, 180], [forty('4.55–4.85s', 4.55, 4.85), vertical('28–35 in', 28, 35)]) },
      { division: 'NAIA', metrics: sizeSpeed(["5'6\"–6'2\"", 66, 74], ['135–180 lbs', 135, 180], [forty('4.55–4.85s', 4.55, 4.85), vertical('28–35 in', 28, 35)]) },
    ],
  },
  {
    sport: 'Track & Field',
    position: 'Distance',
    overview:
      'Race times and volume durability. Light frames are common; the standard is the mark, not the 40.',
    notes: ['Typical roster frames only. Lead with 1600 / 3200 / 5K marks.'],
    divisions: [
      { division: 'NCAA DI', metrics: sizeSpeed(["5'6\"–6'2\"", 66, 74], ['120–160 lbs', 120, 160]) },
      { division: 'NCAA DII', metrics: sizeSpeed(["5'5\"–6'1\"", 65, 73], ['115–155 lbs', 115, 155]) },
      { division: 'NCAA DIII', metrics: sizeSpeed(["5'4\"–6'1\"", 64, 73], ['110–155 lbs', 110, 155]) },
      { division: 'NAIA', metrics: sizeSpeed(["5'4\"–6'1\"", 64, 73], ['110–155 lbs', 110, 155]) },
    ],
  },
  {
    sport: 'Track & Field',
    position: 'Throws',
    overview:
      'Mass, power, and technical marks. DI throwers are usually the biggest athletes in the program.',
    notes: ['Typical roster frames. Lead with shot / disc / hammer / javelin marks.'],
    divisions: [
      { division: 'NCAA DI', metrics: sizeSpeed(["6'0\"–6'5\"", 72, 77], ['230–280 lbs', 230, 280], [vertical('24–30 in', 24, 30)]) },
      { division: 'NCAA DII', metrics: sizeSpeed(["5'11\"–6'4\"", 71, 76], ['215–265 lbs', 215, 265], [vertical('22–28 in', 22, 28)]) },
      { division: 'NCAA DIII', metrics: sizeSpeed(["5'10\"–6'3\"", 70, 75], ['200–250 lbs', 200, 250], [vertical('20–27 in', 20, 27)]) },
      { division: 'NAIA', metrics: sizeSpeed(["5'10\"–6'3\"", 70, 75], ['200–250 lbs', 200, 250], [vertical('20–27 in', 20, 27)]) },
    ],
  },
]

export const POSITION_REQUIREMENTS_SOURCE =
  'Typical recruited and roster ranges compiled from public college roster listings and widely published high-school combine / camp bands. These are not official NCAA standards and are not cutoffs. Class of 2028 athletes should use them as training targets next to film and academics.'

export function requirementSports(): string[] {
  return [...new Set(POSITION_REQUIREMENTS.map((item) => item.sport))]
}

export function positionsForSport(sport: string): string[] {
  return POSITION_REQUIREMENTS.filter((item) => item.sport === sport).map((item) => item.position)
}

export function findPositionRequirement(sport: string, position: string): PositionRequirement {
  return (
    POSITION_REQUIREMENTS.find((item) => item.sport === sport && item.position === position) ??
    POSITION_REQUIREMENTS.find((item) => item.sport === sport) ??
    POSITION_REQUIREMENTS[0]
  )
}

export function heightInches(profile: Pick<RecruitingProfile, 'heightFeet' | 'heightInches'>): number {
  return profile.heightFeet * 12 + profile.heightInches
}

export function formatHeightInches(total: number): string {
  const feet = Math.floor(total / 12)
  const inches = total % 12
  return `${feet}'${inches}"`
}

export function formatBroadJump(totalInches: number): string {
  const feet = Math.floor(totalInches / 12)
  const inches = totalInches % 12
  return `${feet}'${inches}"`
}

export function studentMetricValue(profile: RecruitingProfile, id: MetricId): number | null {
  switch (id) {
    case 'height':
      return heightInches(profile)
    case 'weight':
      return profile.weightLbs
    case 'forty':
      return profile.fortyYard
    case 'shuttle':
      return profile.shuttle
    case 'threeCone':
      return profile.threeCone
    case 'vertical':
      return profile.verticalInches
    case 'broadJump':
      return profile.broadJumpInches
    default:
      return null
  }
}

export function formatStudentMetric(profile: RecruitingProfile, id: MetricId): string {
  const value = studentMetricValue(profile, id)
  if (value == null) return 'Not entered'
  if (id === 'height' || id === 'broadJump') return formatHeightInches(value)
  if (id === 'weight') return `${value} lbs`
  if (id === 'vertical') return `${value} in`
  return `${value.toFixed(2)}s`
}

export function compareMetric(value: number | null, metric: DivisionMetric): FitLabel {
  if (value == null) return 'none'
  if (value >= metric.min && value <= metric.max) return 'in'
  if (metric.better === 'lower') return value < metric.min ? 'above' : 'below'
  return value > metric.max ? 'above' : 'below'
}

export function fitChipLabel(fit: FitLabel, better: MetricBetter): string {
  if (fit === 'none') return 'Not entered'
  if (fit === 'in') return 'In range'
  if (better === 'lower') return fit === 'above' ? 'Faster than typical' : 'Slower than typical'
  return fit === 'above' ? 'Above typical' : 'Below typical'
}

export function previewMetrics(requirement: PositionRequirement): DivisionMetric[] {
  const first = requirement.divisions[0]
  return first.metrics.filter((metric) =>
    metric.id === 'height' || metric.id === 'weight' || metric.id === 'forty' || metric.id === 'vertical',
  )
}
