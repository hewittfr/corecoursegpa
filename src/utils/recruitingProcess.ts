import type { Student, TrainingTopic } from '../types'

export type ProcessStepStatus = 'Complete' | 'In Progress' | 'Not Started'

export interface ProcessTask {
  id: string
  label: string
  hint: string
  cta: string
  to: string
  done: boolean
}

export interface ProcessResource {
  label: string
  href: string
}

export interface ProcessStep {
  number: 1 | 2 | 3
  title: string
  goal: string
  why: string
  tasks: ProcessTask[]
  resources: ProcessResource[]
  completed: number
  total: number
  percent: number
  status: ProcessStepStatus
  nextTask: ProcessTask | null
}

export interface RecruitingProcessModel {
  steps: ProcessStep[]
  next: { step: ProcessStep; task: ProcessTask } | null
  overallPercent: number
}

function trainingDone(topics: TrainingTopic[], id: string): boolean {
  return topics.find((topic) => topic.id === id)?.status === 'Complete'
}

function trainingPath(id: string): string {
  return `/training?topic=${id}`
}

function stepStatus(completed: number, total: number): ProcessStepStatus {
  if (completed >= total && total > 0) return 'Complete'
  if (completed > 0) return 'In Progress'
  return 'Not Started'
}

function toStep(
  number: 1 | 2 | 3,
  title: string,
  goal: string,
  why: string,
  tasks: ProcessTask[],
  resources: ProcessResource[] = [],
): ProcessStep {
  const completed = tasks.filter((task) => task.done).length
  const total = tasks.length
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100)
  return {
    number,
    title,
    goal,
    why,
    tasks,
    resources,
    completed,
    total,
    percent,
    status: stepStatus(completed, total),
    nextTask: tasks.find((task) => !task.done) ?? null,
  }
}

export function buildRecruitingProcess(
  student: Student,
  topics: TrainingTopic[],
): RecruitingProcessModel {
  const hasCourses = student.courses.length > 0
  const hasNcaaId = student.ncaaId.trim().length >= 8
  const hasTestScore = student.testScores.length > 0
  const hasBasics =
    student.profile.heightFeet > 0 &&
    student.profile.weightLbs > 0 &&
    student.sports.some((sport) => sport.positions.length > 0)
  const hasStory =
    student.profile.bio.trim().length > 0 && student.profile.athleticHonors.length > 0
  const hasFilm = student.profile.highlightVideoUrl.trim().length > 0
  const hasNotes = student.contactNotes.trim().length > 0
  const hasTargets = student.targetSchools.length > 0

  const steps: ProcessStep[] = [
    toStep(
      1,
      'Academic eligibility',
      'Prove you can qualify — then keep the tracker current.',
      'Coaches look at eligibility first. Finish this step before outreach so they know you are on track.',
      [
        {
          id: 'eligibility-video',
          label: 'Watch the NCAA Eligibility Tracker video',
          hint: '3:35 · how to enter courses and read your report',
          cta: 'Watch video',
          to: trainingPath('trn-001'),
          done: trainingDone(topics, 'trn-001'),
        },
        {
          id: 'gpa-video',
          label: 'Watch “What is an NCAA Core Course GPA?”',
          hint: '2:11 · core GPA is not the same as your high school GPA',
          cta: 'Watch video',
          to: trainingPath('trn-002'),
          done: trainingDone(topics, 'trn-002'),
        },
        {
          id: 'courses',
          label: 'Enter and project NCAA core courses',
          hint: hasCourses
            ? `${student.courses.length} courses on file`
            : 'Add completed, in-progress, and planned cores',
          cta: 'Enter courses',
          to: '/courses',
          done: hasCourses,
        },
        {
          id: 'ncaa-id',
          label: 'Enter your NCAA ID',
          hint: 'Required so the Eligibility Center and coaches can find you',
          cta: 'Enter NCAA ID',
          to: '/test-scores',
          done: hasNcaaId,
        },
        {
          id: 'tests',
          label: 'Enter SAT or ACT scores',
          hint: 'Many colleges still need a score for admission even if NCAA does not',
          cta: 'Add test score',
          to: '/test-scores',
          done: hasTestScore,
        },
        {
          id: 'quiz',
          label: 'Take the NCAA / NAIA quiz',
          hint: 'Under 15 minutes · confirms you know the rules before you email coaches',
          cta: 'Take quiz',
          to: trainingPath('trn-021'),
          done: trainingDone(topics, 'trn-021'),
        },
      ],
      [
        { label: 'Eligibility status report', href: '/eligibility' },
        {
          label: 'Approved NCAA core courses',
          href: 'https://web3.ncaa.org/hsportal/exec/hsAction',
        },
      ],
    ),
    toStep(
      2,
      'Recruiting profile',
      'Build a one-page digital resume coaches can scan in under a minute.',
      'Do this after eligibility is in motion. Coaches need a photo, numbers, honors, and film — not a long bio.',
      [
        {
          id: 'profile-video',
          label: 'Watch the recruiting profile training video',
          hint: '3:25 · what belongs on the page and what to leave off',
          cta: 'Watch video',
          to: trainingPath('trn-003'),
          done: trainingDone(topics, 'trn-003'),
        },
        {
          id: 'profile-basics',
          label: 'Add height, weight, sport, and position',
          hint: 'The first things a coach looks at after your name',
          cta: 'Update profile',
          to: '/recruiting/profile',
          done: hasBasics,
        },
        {
          id: 'profile-story',
          label: 'Add honors and a short bio',
          hint: 'Athletic, academic, and community honors plus a few sentences',
          cta: 'Add honors',
          to: '/recruiting/profile',
          done: hasStory,
        },
        {
          id: 'profile-film',
          label: 'Add highlight film',
          hint: 'A public Hudl or YouTube link. Full games beat a montage.',
          cta: 'Add film link',
          to: '/recruiting/profile',
          done: hasFilm,
        },
      ],
      [{ label: 'View your profile', href: '/recruiting/profile' }],
    ),
    toStep(
      3,
      'Outreach & research',
      'Find schools that fit, then contact coaches the right way.',
      'Wait until Steps 1 and 2 are moving. A coach email without eligibility or film usually gets deleted.',
      [
        {
          id: 'outreach-video',
          label: 'Watch “How do I contact college coaches directly?”',
          hint: '9:00 · when to email, what to attach, and what not to send',
          cta: 'Watch video',
          to: trainingPath('trn-004'),
          done: trainingDone(topics, 'trn-004'),
        },
        {
          id: 'coach-search',
          label: 'Search college coaches',
          hint: 'Filter by sport, division, and state, then save names',
          cta: 'Search coaches',
          to: '/coaches',
          done: hasTargets,
        },
        {
          id: 'notes',
          label: 'Keep recruiting contact notes',
          hint: hasNotes ? 'Notes started — keep dates and replies here' : 'Track who you emailed and what they said',
          cta: 'Open notes',
          to: '/coaches',
          done: hasNotes,
        },
        {
          id: 'targets',
          label: 'Build a top 10 target list',
          hint:
            student.targetSchools.length === 0
              ? 'Start with honest-fit schools, not a dream list'
              : `${student.targetSchools.length} of 10 schools listed`,
          cta: 'Pick schools',
          to: '/recruiting/targets',
          done: hasTargets,
        },
      ],
      [
        { label: 'NCAA DI schools', href: 'https://www.ncaa.com/schools-index' },
        { label: 'NCAA members by sport', href: 'https://web3.ncaa.org/directory/memberList?type=1' },
        { label: 'NAIA members', href: 'https://www.naia.org' },
        { label: 'NJCAA members', href: 'https://www.njcaa.org' },
        { label: 'BigFuture college search', href: 'https://bigfuture.collegeboard.org/college-search' },
      ],
    ),
  ]

  const next = steps.reduce<{ step: ProcessStep; task: ProcessTask } | null>((found, step) => {
    if (found || !step.nextTask) return found
    return { step, task: step.nextTask }
  }, null)

  const overallPercent = Math.round(
    steps.reduce((sum, step) => sum + step.percent, 0) / steps.length,
  )

  return { steps, next, overallPercent }
}
