import type { EligibilityColumn, Student } from '../types'

export function fullName(student: Student): string {
  return `${student.firstName} ${student.lastName}`
}

export function schoolLine(student: Student): string {
  return `${student.school.name} — Class of ${student.graduationYear}`
}

export function locationLine(student: Student): string {
  return `${student.school.city}, ${student.school.state}`
}

export function primarySport(student: Student): string {
  const sport = student.sports.find((item) => item.primary) ?? student.sports[0]
  if (!sport) return 'No sport listed'
  return `${sport.name} · ${sport.positions.join(', ')}`
}

export function formatScore(score: number | null): string {
  return score == null ? 'None' : String(score)
}

export function formatNeeded(value: number | null): string {
  return value == null ? 'n/a' : String(value)
}

export function creditProgress(column: EligibilityColumn): number {
  const total = column.creditsCompleted + column.creditsNeeded
  if (total <= 0) return 0
  return Math.round((column.creditsCompleted / total) * 100)
}

export type EligibilityTone = 'success' | 'warning' | 'danger'

export interface EligibilityRequirement {
  id: string
  label: string
  detail: string
  progress: number
  met: boolean
}

export interface EligibilityGaugeModel {
  percent: number
  label: string
  tone: EligibilityTone
  requirements: EligibilityRequirement[]
}

const MIN_DI_GPA = 2.3
const PRE_SENIOR_CORE = 10
const PRE_SENIOR_EMS = 7

function clampPercent(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)))
}

export function buildEligibilityGauge(column: EligibilityColumn): EligibilityGaugeModel {
  const totalCredits = column.creditsCompleted + column.creditsNeeded
  const creditPct = totalCredits > 0 ? (column.creditsCompleted / totalCredits) * 100 : 0
  const gpaPct = (column.coreGpa / MIN_DI_GPA) * 100

  const preSeniorNeeded = column.priorToSeniorCreditsNeeded
  const preSeniorPct =
    preSeniorNeeded == null
      ? 100
      : ((PRE_SENIOR_CORE - preSeniorNeeded) / PRE_SENIOR_CORE) * 100

  const emsNeeded = column.priorToSeniorEmsNeeded
  const emsPct =
    emsNeeded == null ? 100 : ((PRE_SENIOR_EMS - emsNeeded) / PRE_SENIOR_EMS) * 100

  const requirements: EligibilityRequirement[] = [
    {
      id: 'gpa',
      label: 'DI core GPA (2.300 min)',
      detail: `${column.coreGpa.toFixed(3)} on file`,
      progress: clampPercent(gpaPct),
      met: column.coreGpa >= MIN_DI_GPA,
    },
    {
      id: 'credits',
      label: '16 NCAA core credits',
      detail: `${column.creditsCompleted} completed · ${column.creditsNeeded} needed`,
      progress: clampPercent(creditPct),
      met: column.creditsNeeded <= 0,
    },
    {
      id: 'pre-senior',
      label: '10 cores before senior year',
      detail:
        preSeniorNeeded == null
          ? 'Not required for this division'
          : preSeniorNeeded === 0
            ? 'Requirement already met'
            : `${preSeniorNeeded} credit${preSeniorNeeded === 1 ? '' : 's'} still needed`,
      progress: clampPercent(preSeniorPct),
      met: preSeniorNeeded == null || preSeniorNeeded <= 0,
    },
    {
      id: 'ems',
      label: '7 English / math / science before senior year',
      detail:
        emsNeeded == null
          ? 'Not required for this division'
          : emsNeeded === 0
            ? 'Requirement already met'
            : `${emsNeeded} EMS credit${emsNeeded === 1 ? '' : 's'} still needed`,
      progress: clampPercent(emsPct),
      met: emsNeeded == null || emsNeeded <= 0,
    },
  ]

  const percent = clampPercent(
    requirements.reduce((sum, item) => sum + item.progress, 0) / requirements.length,
  )

  if (requirements.every((item) => item.met)) {
    return { percent: 100, label: 'Requirements met', tone: 'success', requirements }
  }
  if (percent >= 70) {
    return { percent, label: 'On track', tone: 'success', requirements }
  }
  if (percent >= 40) {
    return { percent, label: 'Needs attention', tone: 'warning', requirements }
  }
  return { percent, label: 'At risk', tone: 'danger', requirements }
}

export function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(`${startDate}T00:00:00`)
  const end = new Date(`${endDate}T00:00:00`)
  const sameDay = startDate === endDate
  const formatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
  if (sameDay) return formatter.format(start)
  return `${formatter.format(start)} – ${formatter.format(end)}`
}
