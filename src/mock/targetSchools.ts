import type { College, CollegeRegion, RecruitingProfile, TargetFit } from '../types'

export const MAJOR_OPTIONS = [
  'Business',
  'Engineering',
  'Computer Science',
  'Health / Pre-Med',
  'Education',
  'Communications',
  'Criminal Justice',
  'Undeclared / Exploring',
] as const

export const REGION_OPTIONS: CollegeRegion[] = [
  'Florida',
  'Southeast',
  'Mid-Atlantic',
  'Midwest',
  'Northeast',
  'Southwest',
  'West',
]

export const DIVISION_OPTIONS = ['NCAA DI', 'NCAA DII', 'NCAA DIII', 'NAIA', 'NJCAA'] as const

function school(
  id: string,
  name: string,
  city: string,
  state: string,
  region: CollegeRegion,
  division: College['division'],
  conference: string,
  setting: College['setting'],
  size: College['size'],
  majors: string[],
  sports: string[],
  athleticNote: string,
): College {
  return { id, name, city, state, region, division, conference, setting, size, majors, sports, athleticNote }
}

const allMajors = [...MAJOR_OPTIONS]

export const TARGET_COLLEGES: College[] = [
  school('col-001', 'University of South Florida', 'Tampa', 'FL', 'Florida', 'NCAA DI', 'American', 'Urban', 'Large', allMajors, ['Football', 'Basketball', 'Baseball', 'Soccer', 'Track & Field'], 'FBS home-state program. High academic bar for preferred walk-on; roster spots at QB are scarce.'),
  school('col-002', 'University of Florida', 'Gainesville', 'FL', 'Florida', 'NCAA DI', 'SEC', 'Suburban', 'Large', allMajors, ['Football', 'Basketball', 'Baseball', 'Softball', 'Track & Field'], 'Power conference. Treat as a long-shot athletic reach unless camp film clearly says otherwise.'),
  school('col-003', 'Florida Southern College', 'Lakeland', 'FL', 'Florida', 'NCAA DII', 'Sunshine State', 'Suburban', 'Small', ['Business', 'Education', 'Communications', 'Health / Pre-Med', 'Undeclared / Exploring'], ['Baseball', 'Basketball', 'Soccer', 'Softball', 'Volleyball', 'Lacrosse'], 'Strong DII academics nearby. Confirm the sport you play is sponsored before you write the coach.'),
  school('col-004', 'University of Tampa', 'Tampa', 'FL', 'Florida', 'NCAA DII', 'Sunshine State', 'Urban', 'Medium', ['Business', 'Computer Science', 'Communications', 'Health / Pre-Med', 'Education', 'Undeclared / Exploring'], ['Baseball', 'Basketball', 'Soccer', 'Softball', 'Volleyball', 'Lacrosse'], 'Home-city DII campus. Football is not sponsored — use it as an academic/life-fit example, not a football target.'),
  school('col-005', 'Emory University', 'Atlanta', 'GA', 'Southeast', 'NCAA DIII', 'UAA', 'Suburban', 'Medium', ['Business', 'Computer Science', 'Health / Pre-Med', 'Engineering', 'Undeclared / Exploring'], ['Basketball', 'Soccer', 'Baseball', 'Track & Field'], 'Elite academics, no football. A model DIII academic fit if the sport ends tomorrow.'),
  school('col-006', 'Florida State University', 'Tallahassee', 'FL', 'Florida', 'NCAA DI', 'ACC', 'Urban', 'Large', allMajors, ['Football', 'Basketball', 'Baseball', 'Softball', 'Soccer', 'Track & Field'], 'FBS Power program. Academic and athletic reach for most high-school QBs.'),
  school('col-007', 'University of Central Florida', 'Orlando', 'FL', 'Florida', 'NCAA DI', 'Big 12', 'Suburban', 'Large', allMajors, ['Football', 'Basketball', 'Baseball', 'Soccer', 'Track & Field'], 'FBS, three hours from Tampa. Large campus, many majors, thin QB board.'),
  school('col-008', 'Florida Atlantic University', 'Boca Raton', 'FL', 'Florida', 'NCAA DI', 'American', 'Suburban', 'Large', allMajors, ['Football', 'Basketball', 'Baseball', 'Soccer', 'Track & Field'], 'FBS Group-of-5 style roster. Still a size/film reach for a 5\'6" freshman QB.'),
  school('col-009', 'Bethune-Cookman University', 'Daytona Beach', 'FL', 'Florida', 'NCAA DI', 'SWAC', 'Urban', 'Medium', ['Business', 'Education', 'Communications', 'Criminal Justice', 'Health / Pre-Med', 'Undeclared / Exploring'], ['Football', 'Basketball', 'Baseball', 'Track & Field'], 'FCS. Closer athletic conversation than Power FBS if film and grades line up.'),
  school('col-010', 'Florida A&M University', 'Tallahassee', 'FL', 'Florida', 'NCAA DI', 'SWAC', 'Urban', 'Medium', ['Business', 'Engineering', 'Education', 'Communications', 'Criminal Justice', 'Health / Pre-Med'], ['Football', 'Basketball', 'Baseball', 'Track & Field'], 'FCS home-state option. Ask how many 2028 QBs they are already tracking.'),
  school('col-011', 'Jacksonville University', 'Jacksonville', 'FL', 'Florida', 'NCAA DI', 'Pioneer', 'Suburban', 'Small', ['Business', 'Communications', 'Education', 'Health / Pre-Med', 'Computer Science', 'Undeclared / Exploring'], ['Football', 'Basketball', 'Baseball', 'Soccer', 'Lacrosse'], 'FCS non-scholarship football (Pioneer). Playing time and a degree can beat a logo.'),
  school('col-012', 'University of West Florida', 'Pensacola', 'FL', 'Florida', 'NCAA DII', 'Gulf South', 'Suburban', 'Medium', ['Business', 'Engineering', 'Computer Science', 'Education', 'Health / Pre-Med', 'Criminal Justice'], ['Football', 'Soccer', 'Baseball', 'Softball', 'Track & Field'], 'DII football in-state. A realistic research school for a developing QB.'),
  school('col-013', 'Valdosta State University', 'Valdosta', 'GA', 'Southeast', 'NCAA DII', 'Gulf South', 'Small town', 'Medium', ['Business', 'Education', 'Communications', 'Criminal Justice', 'Health / Pre-Med'], ['Football', 'Basketball', 'Baseball', 'Softball'], 'Short drive from North Florida. DII football with a history of developing smaller-school talent.'),
  school('col-014', 'Georgia Southern University', 'Statesboro', 'GA', 'Southeast', 'NCAA DI', 'Sun Belt', 'Small town', 'Large', ['Business', 'Engineering', 'Education', 'Communications', 'Health / Pre-Med'], ['Football', 'Basketball', 'Baseball', 'Soccer', 'Track & Field'], 'FBS Sun Belt. Athletic reach; keep it if you camp well and the major is a real interest.'),
  school('col-015', 'Mercer University', 'Macon', 'GA', 'Southeast', 'NCAA DI', 'Southern', 'Urban', 'Medium', ['Business', 'Engineering', 'Health / Pre-Med', 'Education', 'Communications'], ['Football', 'Basketball', 'Baseball', 'Soccer', 'Lacrosse'], 'FCS with a serious academic brand. Good “would I stay if I got hurt?” test.'),
  school('col-016', 'Berry College', 'Mount Berry', 'GA', 'Southeast', 'NCAA DIII', 'SAA', 'Small town', 'Small', ['Business', 'Education', 'Communications', 'Health / Pre-Med', 'Undeclared / Exploring'], ['Football', 'Basketball', 'Soccer', 'Baseball', 'Track & Field'], 'DIII football plus a distinctive campus. Likely athletic band for a developing QB.'),
  school('col-017', 'Southeastern University', 'Lakeland', 'FL', 'Florida', 'NAIA', 'Sun Conference', 'Suburban', 'Small', ['Business', 'Education', 'Communications', 'Criminal Justice', 'Health / Pre-Med', 'Undeclared / Exploring'], ['Football', 'Basketball', 'Baseball', 'Soccer', 'Softball'], 'NAIA, 30 minutes from Tampa. Early playing time is often more available than at FBS camps.'),
  school('col-018', 'Webber International University', 'Babson Park', 'FL', 'Florida', 'NAIA', 'Sun Conference', 'Small town', 'Small', ['Business', 'Computer Science', 'Criminal Justice', 'Communications', 'Undeclared / Exploring'], ['Football', 'Basketball', 'Baseball', 'Soccer'], 'Small NAIA campus. Ask about QB room depth before you fall in love with the drive.'),
  school('col-019', 'Ave Maria University', 'Ave Maria', 'FL', 'Florida', 'NAIA', 'Sun Conference', 'Small town', 'Small', ['Business', 'Education', 'Communications', 'Undeclared / Exploring'], ['Football', 'Basketball', 'Soccer', 'Baseball'], 'NAIA South Florida. Life-fit and faith-fit questions matter as much as the 40.'),
  school('col-020', 'Newberry College', 'Newberry', 'SC', 'Southeast', 'NCAA DII', 'SAC', 'Small town', 'Small', ['Business', 'Education', 'Communications', 'Criminal Justice', 'Undeclared / Exploring'], ['Football', 'Basketball', 'Baseball', 'Soccer'], 'Carolinas DII. Matches a “Florida, Georgia, and the Carolinas” first map.'),
  school('col-021', 'Wingate University', 'Wingate', 'NC', 'Southeast', 'NCAA DII', 'SAC', 'Small town', 'Medium', ['Business', 'Education', 'Communications', 'Health / Pre-Med', 'Undeclared / Exploring'], ['Football', 'Basketball', 'Baseball', 'Soccer', 'Lacrosse'], 'DII with a wide sport menu. A solid target if you want the Carolinas.'),
  school('col-022', 'Wofford College', 'Spartanburg', 'SC', 'Southeast', 'NCAA DI', 'Southern', 'Urban', 'Small', ['Business', 'Computer Science', 'Education', 'Undeclared / Exploring'], ['Football', 'Basketball', 'Soccer', 'Baseball', 'Track & Field'], 'FCS academics-first campus. Reach on athletics, strong on “degree if sport ends.”'),
  school('col-023', 'Centre College', 'Danville', 'KY', 'Southeast', 'NCAA DIII', 'SAA', 'Small town', 'Small', ['Business', 'Computer Science', 'Education', 'Undeclared / Exploring'], ['Football', 'Basketball', 'Soccer', 'Baseball', 'Track & Field'], 'DIII liberal-arts football. Likely athletic band; confirm you want Kentucky.'),
  school('col-024', 'Iowa Western Community College', 'Council Bluffs', 'IA', 'Midwest', 'NJCAA', 'ICCAC', 'Suburban', 'Small', ['Business', 'Computer Science', 'Health / Pre-Med', 'Undeclared / Exploring'], ['Football', 'Basketball', 'Baseball', 'Soccer'], 'JUCO path if you need two years of film, size, and grades before a four-year board.'),
]

export const mockColleges = TARGET_COLLEGES

export const TARGET_LIST_GOAL = 10

export interface ProcessStep {
  title: string
  goal: string
  why: string
  doThis: string[]
  avoid: string[]
}

export const TARGET_PROCESS: ProcessStep[] = [
  {
    title: 'Start from zero',
    goal: 'Admit you do not have a list yet — and that is normal.',
    why: 'Most freshmen and sophomores start with a logo, a TV team, or a parent’s alma mater. That is a wish, not a board. A usable list starts with you: academics, body, film, and the life you would accept if the sport ended.',
    doThis: [
      'Write one sentence: “I am a [class year] [position] at [high school] who needs a school that offers [major or two] and a real chance to play.”',
      'Open Position Requirements and read your sport by division. Circle the divisions where your height, weight, and 40 are closest today — not where you hope to be as a senior.',
      'Look at eligibility: GPA, cores, and a test-score plan. Coaches delete emails that cannot get admitted.',
      'Pick one non-negotiable (major, stay near family, or playing time). Everything else can flex.',
    ],
    avoid: [
      'Building a list of 10 Power conference schools and calling it a plan.',
      'Paying anyone who “guarantees” a Division I offer.',
      'Waiting until junior year to think about majors. Admissions and the NCAA clock start now.',
    ],
  },
  {
    title: 'Choose a major — or two clusters',
    goal: 'Give every school an academic reason to stay on the list.',
    why: 'Athletic aid can disappear. A major you will finish is the backup plan that still looks like a first choice. If you are undecided, pick two clusters (for example Business and Communications) and require a school to offer both.',
    doThis: [
      'Talk to a counselor for 15 minutes: What classes do you already like? What would you study if football were gone?',
      'Select 1–3 majors or clusters below. Undeclared is allowed if you also pick a second cluster.',
      'On each school site later, confirm the major is a real department — not just a concentration buried in another college.',
      'If you need Engineering or Nursing, drop schools that do not offer them even if the coach is interested.',
    ],
    avoid: [
      'Picking a major only because “athletes do that.”',
      'Assuming every university offers every major. Small DII/NAIA campuses are often narrower.',
    ],
  },
  {
    title: 'Draw a map',
    goal: 'Decide how far you will actually travel for a visit, a camp, and four years.',
    why: 'Unofficial visits, injured weekends, and family emergencies are cheaper when the campus is a drive. A national list is fine later. Your first map should be a region you can research this semester.',
    doThis: [
      'Start with your home state, then one surrounding region. For a Tampa athlete that is usually Florida plus the Southeast (Georgia, Alabama, the Carolinas).',
      'Ask your family what they can afford for 2–3 unofficial visits a year.',
      'Keep 1–2 “anywhere” schools only if the major or athletic fit is rare.',
      'Write down climate, city vs small town, and whether you want to be close enough to come home on a bye week.',
    ],
    avoid: [
      'A 40-school list in 40 states before you have film or a test score.',
      'Ignoring cost of travel. A dead-period camp you cannot reach is not a target.',
    ],
  },
  {
    title: 'Match the division to your film',
    goal: 'Sort schools into reach, target, and likely before you fall in love with a helmet.',
    why: 'Division is not a moral ranking. It is roster size, aid rules, and how many players they take at your position. A 5\'6" freshman quarterback who is honest about typical combine ranges will spend more time on DII, DIII, NAIA, and FCS than on Power FBS.',
    doThis: [
      'Use the chips below plus Position Requirements. If you are below typical height and weight for FBS, those schools are reaches — you may still camp there.',
      'Build a mix, not a stack: about 2–3 Reach, 4–5 Target, 3–4 Likely when you get to a top 10.',
      'Watch last year’s commits at your position, not the starting senior. Ask: “Do I look like the players they just signed?”',
      'Include at least one campus you would attend with no sport. That is your academic safety.',
    ],
    avoid: [
      'Cutting every DIII/NAIA school because a classmate only talks about Division I.',
      'Treating JUCO as failure. It is a tool if you need time to grow or fix grades.',
    ],
  },
  {
    title: 'Build a long list (about 25 schools)',
    goal: 'Research more schools than you can email this month.',
    why: 'Coaches stop recruiting classes, schemes change, and majors close. A long list gives you replacements. Filter this directory by the major, region, and division you just chose, then add every school that survives a five-minute scan.',
    doThis: [
      'Filter the table. Open the school site: Does it sponsor your sport? Does it offer your major? Where do last year’s players at your position come from?',
      'Add 20–30 schools to your research list. You are not emailing all of them yet.',
      'Write one line per school: athletic fit, academic fit, and a question you still have.',
      'If the filter returns fewer than 12, loosen region or add a second major cluster.',
    ],
    avoid: [
      'Adding a school because a highlight video looked cool and you never checked the major.',
      'Stopping at five schools. Five replies will not all come.',
    ],
  },
  {
    title: 'Cut to a living top 10',
    goal: 'Leave this page with 10 names you can defend to a parent and a coach.',
    why: 'Ten is small enough to email well and large enough to survive silence. Rank them. Tag Reach / Target / Likely. Revisit the list after each camp, grade report, and new film.',
    doThis: [
      'Promote the 10 you would actually visit. Rank 1–10. Keep at least two Likely schools.',
      'For each of the 10: find the position coach or recruiting coordinator in Coach Search and draft one email.',
      'Put the next camp or junior day on the Training Calendar.',
      'Re-rank after any new measurable, SAT/ACT score, or coach reply. The top 10 is a working document, not a tattoo.',
    ],
    avoid: [
      'A top 10 that is eight Reach schools and two daydreams.',
      'Never telling your high school coach the list. They cannot recommend you into a vacuum.',
    ],
  },
]

export function suggestedFit(college: College, profile: RecruitingProfile): TargetFit {
  const height = profile.heightFeet * 12 + profile.heightInches
  const isPowerFbs = college.division === 'NCAA DI' && ['SEC', 'ACC', 'Big 12', 'American', 'Sun Belt'].includes(college.conference)
  const isFcs = college.division === 'NCAA DI' && !isPowerFbs

  if (college.division === 'NCAA DI' && isPowerFbs) return 'Reach'
  if (isFcs) return height < 72 || profile.weightLbs < 185 ? 'Reach' : 'Target'
  if (college.division === 'NCAA DII') return height < 71 || profile.weightLbs < 175 ? 'Target' : 'Target'
  if (college.division === 'NJCAA') return 'Likely'
  return 'Likely'
}

export function collegeMatches(
  college: College,
  filters: {
    majors: string[]
    regions: CollegeRegion[]
    divisions: string[]
    sport?: string
    requireSport?: boolean
  },
): boolean {
  const majorOk =
    filters.majors.length === 0 || filters.majors.some((major) => college.majors.includes(major))
  const regionOk = filters.regions.length === 0 || filters.regions.includes(college.region)
  const divisionOk = filters.divisions.length === 0 || filters.divisions.includes(college.division)
  const sportOk =
    !filters.requireSport || !filters.sport || college.sports.includes(filters.sport)
  return majorOk && regionOk && divisionOk && sportOk
}

export function findCollege(id: string): College | undefined {
  return TARGET_COLLEGES.find((item) => item.id === id)
}

export function defaultRegionsForState(state: string): CollegeRegion[] {
  if (state === 'FL') return ['Florida', 'Southeast']
  if (['GA', 'AL', 'SC', 'NC', 'TN', 'KY', 'MS', 'LA'].includes(state)) return ['Southeast', 'Florida']
  return ['Southeast']
}

export function mixSummary(fits: TargetFit[]): string {
  const reach = fits.filter((item) => item === 'Reach').length
  const target = fits.filter((item) => item === 'Target').length
  const likely = fits.filter((item) => item === 'Likely').length
  return `${reach} Reach · ${target} Target · ${likely} Likely`
}
