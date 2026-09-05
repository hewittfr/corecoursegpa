export type UserRole = 'student' | 'parent' | 'admin'

export type CourseSubject =
  | 'English'
  | 'Math'
  | 'Science'
  | 'Social Science'
  | 'Additional English/Math/Science'
  | 'Additional Core'

export type CourseStatus = 'Completed' | 'In Progress' | 'Planned'

export type LetterGrade = 'A' | 'B' | 'C' | 'D' | 'F'

export type CourseSemester = 'Fall' | 'Spring' | 'Summer' | 'Full Year'

export type CoursePoints = 0 | 0.5 | 1

export type TestType = 'SAT' | 'ACT'

export type CalendarEventType =
  | 'Dead Period'
  | 'Quiet Period'
  | 'Contact Period'
  | 'Evaluation Period'
  | 'Recruiting Shutdown'
  | 'Deadline'
  | 'Test Date'
  | 'Important Date'

export interface School {
  id: string
  name: string
  city: string
  state: string
  county: string
  district: string
  ceebCode: string
}

export interface Sport {
  name: string
  positions: string[]
  primary: boolean
}

export interface CoreCourse {
  id: string
  year: string
  semester: CourseSemester
  courseName: string
  letterGrade: LetterGrade | ''
  points: CoursePoints
}

export interface TestScore {
  id: string
  type: TestType
  score: number
  testDate: string
  superscore?: number
}

export interface EligibilityColumn {
  coreGpa: number
  creditsCompleted: number
  creditsNeeded: number
  priorToSeniorCreditsNeeded: number | null
  priorToSeniorEmsNeeded: number | null
  satScore: number | null
  actScore: number | null
}

export interface EligibilitySummary {
  diActual: EligibilityColumn
  diiActual: EligibilityColumn
  diProjected: EligibilityColumn
  diiProjected: EligibilityColumn
}

export interface RecruitingProfile {
  ncaaId: string
  heightFeet: number
  heightInches: number
  weightLbs: number
  fortyYard: number | null
  shuttle: number | null
  threeCone: number | null
  verticalInches: number | null
  broadJumpInches: number | null
  athleticHonors: string[]
  academicHonors: string[]
  communityHonors: string[]
  bio: string
  highlightVideoUrl: string
}

export interface Student {
  id: string
  firstName: string
  lastName: string
  email: string
  graduationYear: number
  school: School
  sports: Sport[]
  ncaaId: string
  courses: CoreCourse[]
  testScores: TestScore[]
  eligibility: EligibilitySummary
  profile: RecruitingProfile
  contactNotes: string
  academicInterests: string[]
  preferredRegions: CollegeRegion[]
  targetSchools: TargetSchool[]
}

export interface AuthUser {
  id: string
  email: string
  role: UserRole
  studentId?: string
  displayName: string
}

export type TrainingStatus = 'Complete' | 'In Progress' | 'Not Started'

export interface TrainingTopic {
  id: string
  title: string
  category: string
  duration?: string
  featured?: boolean
  description: string
  status: TrainingStatus
}

export interface CalendarEvent {
  id: string
  title: string
  type: CalendarEventType
  sport: string
  startDate: string
  endDate: string
  notes: string
}

export interface CollegeCoach {
  id: string
  name: string
  title: string
  sport: string
  schoolName: string
  division: 'NCAA DI' | 'NCAA DII' | 'NCAA DIII' | 'NAIA' | 'NJCAA'
  state: string
  email: string
}

export type CollegeRegion =
  | 'Florida'
  | 'Southeast'
  | 'Mid-Atlantic'
  | 'Midwest'
  | 'Northeast'
  | 'Southwest'
  | 'West'

export type CampusSetting = 'Urban' | 'Suburban' | 'Small town'

export type CampusSize = 'Small' | 'Medium' | 'Large'

export type TargetFit = 'Reach' | 'Target' | 'Likely'

export interface College {
  id: string
  name: string
  city: string
  state: string
  region: CollegeRegion
  division: CollegeCoach['division']
  conference: string
  setting: CampusSetting
  size: CampusSize
  majors: string[]
  sports: string[]
  athleticNote: string
}

export interface TargetSchool {
  collegeId: string
  fit: TargetFit
  rank: number
}
