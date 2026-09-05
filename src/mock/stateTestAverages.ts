export const STATE_AVERAGE_YEARS = [2025, 2024, 2023] as const

export type StateAverageYear = (typeof STATE_AVERAGE_YEARS)[number]

export interface YearTestAverages {
  sat: number
  satPct: number | null
  act: number
  actPct: number
  satErw?: number
  satMath?: number
  satTakers?: number
  satGraduates?: number
}

export interface StateTestAverages {
  code: string
  name: string
  years: Record<StateAverageYear, YearTestAverages>
}

function y(
  sat: number,
  satPct: number | null,
  act: number,
  actPct: number,
  extra?: Partial<YearTestAverages>,
): YearTestAverages {
  return { sat, satPct, act, actPct, ...extra }
}

export const STATE_TEST_AVERAGES: StateTestAverages[] = [
  { code: 'US', name: 'United States (national)', years: { 2025: y(1029, null, 19.4, 36), 2024: y(1024, null, 19.4, 36), 2023: y(1028, 51, 19.5, 37) } },
  { code: 'AL', name: 'Alabama', years: { 2025: y(1172, 3, 18.0, 100), 2024: y(1160, 3, 18.0, 100), 2023: y(1161, 3, 18.0, 100) } },
  { code: 'AK', name: 'Alaska', years: { 2025: y(1097, 27, 19.7, 9), 2024: y(1080, 32, 19.9, 13), 2023: y(1082, 30, 20.2, 15) } },
  { code: 'AZ', name: 'Arizona', years: { 2025: y(1194, 10, 17.7, 99), 2024: y(1190, 10, 17.7, 100), 2023: y(1183, 11, 17.7, 98) } },
  { code: 'AR', name: 'Arkansas', years: { 2025: y(1177, 2, 18.5, 92), 2024: y(1190, 2, 18.5, 95), 2023: y(1192, 2, 18.6, 96) } },
  { code: 'CA', name: 'California', years: { 2025: y(1096, 26, 26.4, 4), 2024: y(1090, 24, 26.5, 3), 2023: y(1083, 25, 25.7, 4) } },
  { code: 'CO', name: 'Colorado', years: { 2025: y(987, 90, 24.7, 8), 2024: y(1000, 90, 24.7, 8), 2023: y(996, 90, 24.5, 9) } },
  { code: 'CT', name: 'Connecticut', years: { 2025: y(989, 91, 27.1, 6), 2024: y(990, 98, 26.5, 8), 2023: y(1007, 93, 26.4, 8) } },
  { code: 'DE', name: 'Delaware', years: { 2025: y(933, 94, 25.2, 3), 2024: y(950, 97, 25.0, 4), 2023: y(958, 95, 24.8, 4) } },
  { code: 'DC', name: 'District of Columbia', years: { 2025: y(958, 85, 27.6, 10), 2024: y(940, 100, 26.7, 17), 2023: y(969, 100, 26.0, 17) } },
  {
    code: 'FL',
    name: 'Florida',
    years: {
      // College Board Florida SAT Suite Annual Reports + ACT Average ACT Scores by State PDFs
      2025: y(970, 87, 19.6, 39, { satErw: 502, satMath: 468, satTakers: 204_840, satGraduates: 234_996 }),
      2024: y(948, 95, 19.0, 44, { satErw: 493, satMath: 455, satTakers: 229_784, satGraduates: 240_930 }),
      2023: y(966, 90, 18.9, 46, { satErw: 503, satMath: 463, satTakers: 205_159, satGraduates: 227_860 }),
    },
  },
  { code: 'GA', name: 'Georgia', years: { 2025: y(1038, 56, 21.4, 23), 2024: y(1040, 56, 21.2, 27), 2023: y(1054, 53, 21.3, 28) } },
  { code: 'HI', name: 'Hawaii', years: { 2025: y(1125, 29, 17.5, 68), 2024: y(1120, 27, 17.7, 62), 2023: y(1114, 30, 17.9, 64) } },
  { code: 'ID', name: 'Idaho', years: { 2025: y(1003, 69, 23.3, 8), 2024: y(1000, 76, 23.3, 10), 2023: y(970, 95, 23.0, 12) } },
  { code: 'IL', name: 'Illinois', years: { 2025: y(961, 99, 23.1, 16), 2024: y(966, 96, 24.5, 14), 2023: y(970, 96, 24.5, 16) } },
  { code: 'IN', name: 'Indiana', years: { 2025: y(950, 100, 23.5, 6), 2024: y(970, 100, 23.3, 7), 2023: y(971, 100, 22.9, 8) } },
  { code: 'IA', name: 'Iowa', years: { 2025: y(1211, 2, 21.0, 41), 2024: y(1200, 2, 21.0, 43), 2023: y(1208, 2, 20.8, 48) } },
  { code: 'KS', name: 'Kansas', years: { 2025: y(1238, 2, 19.1, 73), 2024: y(1260, 2, 19.3, 72), 2023: y(1245, 2, 19.4, 74) } },
  { code: 'KY', name: 'Kentucky', years: { 2025: y(1181, 2, 18.4, 100), 2024: y(1200, 2, 18.6, 100), 2023: y(1208, 2, 18.7, 100) } },
  { code: 'LA', name: 'Louisiana', years: { 2025: y(1195, 2, 18.3, 100), 2024: y(1200, 2, 18.2, 100), 2023: y(1194, 3, 18.2, 100) } },
  { code: 'ME', name: 'Maine', years: { 2025: y(1078, 39, 25.4, 1), 2024: y(1070, 38, 25.0, 2), 2023: y(1080, 38, 24.8, 2) } },
  { code: 'MD', name: 'Maryland', years: { 2025: y(1003, 73, 24.9, 6), 2024: y(1000, 70, 24.7, 6), 2023: y(1008, 71, 24.5, 7) } },
  { code: 'MA', name: 'Massachusetts', years: { 2025: y(1114, 57, 26.4, 7), 2024: y(1110, 55, 26.1, 7), 2023: y(1112, 57, 26.4, 8) } },
  { code: 'MI', name: 'Michigan', years: { 2025: y(953, 100, 24.6, 5), 2024: y(970, 96, 24.5, 6), 2023: y(967, 97, 24.4, 7) } },
  { code: 'MN', name: 'Minnesota', years: { 2025: y(1210, 3, 20.6, 68), 2024: y(1220, 3, 20.7, 66), 2023: y(1201, 3, 20.8, 68) } },
  { code: 'MS', name: 'Mississippi', years: { 2025: y(1223, 1, 17.7, 100), 2024: y(1200, 1, 17.7, 100), 2023: y(1184, 1, 17.6, 100) } },
  { code: 'MO', name: 'Missouri', years: { 2025: y(1174, 4, 19.8, 70), 2024: y(1190, 3, 19.8, 65), 2023: y(1191, 3, 19.8, 66) } },
  { code: 'MT', name: 'Montana', years: { 2025: y(1205, 5, 19.4, 98), 2024: y(1200, 4, 19.5, 97), 2023: y(1193, 5, 18.8, 98) } },
  { code: 'NE', name: 'Nebraska', years: { 2025: y(1249, 1, 19.2, 100), 2024: y(1230, 1, 19.1, 95), 2023: y(1252, 1, 19.2, 96) } },
  { code: 'NV', name: 'Nevada', years: { 2025: y(1177, 7, 17.2, 100), 2024: y(1180, 6, 17.2, 100), 2023: y(1166, 6, 17.2, 100) } },
  { code: 'NH', name: 'New Hampshire', years: { 2025: y(1017, 76, 25.9, 3), 2024: y(1020, 82, 25.9, 4), 2023: y(1035, 82, 25.2, 5) } },
  { code: 'NJ', name: 'New Jersey', years: { 2025: y(1061, 66, 24.6, 9), 2024: y(1050, 66, 24.1, 10), 2023: y(1066, 64, 24.4, 10) } },
  { code: 'NM', name: 'New Mexico', years: { 2025: y(875, 100, 20.6, 8), 2024: y(890, 100, 20.0, 12), 2023: y(901, 94, 20.2, 14) } },
  { code: 'NY', name: 'New York', years: { 2025: y(1045, 62, 25.9, 8), 2024: y(1040, 61, 25.4, 8), 2023: y(1039, 62, 25.3, 9) } },
  { code: 'NC', name: 'North Carolina', years: { 2025: y(1165, 22, 18.3, 91), 2024: y(1160, 20, 18.5, 89), 2023: y(1127, 24, 18.5, 90) } },
  { code: 'ND', name: 'North Dakota', years: { 2025: y(1254, 1, 19.4, 82), 2024: y(1230, 1, 19.6, 87), 2023: y(1287, 1, 19.6, 89) } },
  { code: 'OH', name: 'Ohio', years: { 2025: y(1018, 20, 18.8, 72), 2024: y(1030, 21, 19.0, 78), 2023: y(1044, 18, 19.2, 82) } },
  { code: 'OK', name: 'Oklahoma', years: { 2025: y(1150, 2, 17.5, 100), 2024: y(970, 9, 17.6, 100), 2023: y(953, 18, 17.8, 100) } },
  { code: 'OR', name: 'Oregon', years: { 2025: y(1127, 24, 20.8, 13), 2024: y(1120, 23, 21.1, 13), 2023: y(1125, 24, 20.9, 13) } },
  { code: 'PA', name: 'Pennsylvania', years: { 2025: y(1084, 47, 24.5, 5), 2024: y(1080, 46, 24.3, 5), 2023: y(1078, 48, 23.9, 6) } },
  { code: 'RI', name: 'Rhode Island', years: { 2025: y(935, 99, 25.4, 4), 2024: y(950, 99, 25.4, 4), 2023: y(958, 95, 24.5, 5) } },
  { code: 'SC', name: 'South Carolina', years: { 2025: y(1017, 53, 18.7, 35), 2024: y(1020, 51, 18.7, 40), 2023: y(1028, 50, 18.8, 40) } },
  { code: 'SD', name: 'South Dakota', years: { 2025: y(1214, 2, 21.0, 60), 2024: y(1210, 1, 21.1, 58), 2023: y(1208, 1, 21.1, 59) } },
  { code: 'TN', name: 'Tennessee', years: { 2025: y(1189, 4, 18.8, 100), 2024: y(1190, 4, 18.8, 100), 2023: y(1191, 4, 18.4, 100) } },
  { code: 'TX', name: 'Texas', years: { 2025: y(964, 74, 19.3, 22), 2024: y(971, 73, 19.4, 22), 2023: y(978, 71, 19.3, 23) } },
  { code: 'UT', name: 'Utah', years: { 2025: y(1229, 2, 20.0, 91), 2024: y(1230, 2, 20.0, 89), 2023: y(1239, 2, 19.9, 90) } },
  { code: 'VT', name: 'Vermont', years: { 2025: y(1115, 49, 23.9, 6), 2024: y(1100, 43, 23.6, 6), 2023: y(1099, 45, 23.6, 6) } },
  { code: 'VA', name: 'Virginia', years: { 2025: y(1112, 48, 25.2, 6), 2024: y(1100, 51, 24.8, 8), 2023: y(1113, 49, 24.6, 8) } },
  { code: 'WA', name: 'Washington', years: { 2025: y(1095, 35, 24.8, 5), 2024: y(1080, 37, 24.5, 5), 2023: y(1081, 37, 24.5, 6) } },
  { code: 'WV', name: 'West Virginia', years: { 2025: y(911, 93, 20.2, 19), 2024: y(920, 89, 20.4, 22), 2023: y(923, 90, 20.3, 26) } },
  { code: 'WI', name: 'Wisconsin', years: { 2025: y(1240, 2, 19.4, 95), 2024: y(1220, 2, 19.4, 94), 2023: y(1236, 2, 19.4, 95) } },
  { code: 'WY', name: 'Wyoming', years: { 2025: y(1234, 1, 19.1, 100), 2024: y(1250, 1, 19.1, 100), 2023: y(1200, 1, 19.0, 100) } },
]

export const FLORIDA_AVERAGES_SOURCE =
  'Florida SAT: College Board Florida SAT Suite of Assessments Annual Reports — class of 2025 (204,840 takers / 234,996 graduates, mean 970, ERW 502, Math 468), class of 2024 (229,784 / 240,930, mean 948, ERW 493, Math 455), and class of 2023 (205,159 / 227,860, mean 966, ERW 503, Math 463). Florida ACT: ACT Average ACT Scores by State — class of 2025 (19.6 composite, 39% tested), class of 2024 (19.0, 44%), and class of 2023 (18.9, 46%). Class of 2026 reports were not published as of September 2026.'

export const FLORIDA_SOURCE_LINKS = [
  {
    label: 'SAT 2025',
    href: 'https://reports.collegeboard.org/media/pdf/2025-florida-sat-suite-of-assessments-annual-report%20ADA-v0.2.pdf',
  },
  {
    label: 'SAT 2024',
    href: 'https://reports.collegeboard.org/media/pdf/2024-florida-sat-suite-of-assessments-annual-report-ADA.pdf',
  },
  {
    label: 'SAT 2023',
    href: 'https://reports.collegeboard.org/media/pdf/2023-florida-sat-suite-of-assessments-annual-report-ADA.pdf',
  },
  {
    label: 'ACT 2025',
    href: 'https://www.act.org/content/dam/act/unsecured/documents/2025-Average-ACT-Scores-by-State-Average-Score-by-Section.pdf',
  },
  {
    label: 'ACT 2024',
    href: 'https://www.act.org/content/dam/act/unsecured/documents/2024-Average-ACT-Scores-by-State-Percent-Meeting-Benchmarks.pdf',
  },
  {
    label: 'ACT 2023',
    href: 'https://www.act.org/content/dam/act/unsecured/documents/2023-Average-ACT-Scores-by-State.pdf',
  },
] as const

export const STATE_AVERAGES_SOURCE =
  'SAT: College Board SAT Suite state reports via NCES Digest table 226.40 (class of 2023), published class-of-2024 state summaries, and College Board class-of-2025 state summaries. ACT: official Average ACT Scores by State PDFs for the classes of 2023, 2024, and 2025. Class of 2026 reports were not yet published as of September 2026.'

export function findStateAverages(code: string): StateTestAverages {
  return STATE_TEST_AVERAGES.find((item) => item.code === code) ?? STATE_TEST_AVERAGES.find((item) => item.code === 'FL')!
}
