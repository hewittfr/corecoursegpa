import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { mockStudent } from '../../mock/data'
import type {
  CollegeRegion,
  CoreCourse,
  RecruitingProfile,
  Student,
  TargetSchool,
  TestScore,
} from '../../types'

interface StudentState {
  current: Student
}

const initialState: StudentState = {
  current: structuredClone(mockStudent),
}

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    upsertCourse(state, action: PayloadAction<CoreCourse>) {
      const index = state.current.courses.findIndex(
        (course) => course.id === action.payload.id,
      )
      if (index >= 0) {
        state.current.courses[index] = action.payload
      } else {
        state.current.courses.push(action.payload)
      }
    },
    removeCourse(state, action: PayloadAction<string>) {
      state.current.courses = state.current.courses.filter(
        (course) => course.id !== action.payload,
      )
    },
    updateProfile(state, action: PayloadAction<RecruitingProfile>) {
      state.current.profile = action.payload
      state.current.ncaaId = action.payload.ncaaId
    },
    addTestScore(state, action: PayloadAction<TestScore>) {
      state.current.testScores.push(action.payload)
      if (action.payload.type === 'SAT') {
        state.current.eligibility.diActual.satScore = action.payload.score
        state.current.eligibility.diiActual.satScore = action.payload.score
        state.current.eligibility.diProjected.satScore = action.payload.score
        state.current.eligibility.diiProjected.satScore = action.payload.score
      } else {
        state.current.eligibility.diActual.actScore = action.payload.score
        state.current.eligibility.diiActual.actScore = action.payload.score
        state.current.eligibility.diProjected.actScore = action.payload.score
        state.current.eligibility.diiProjected.actScore = action.payload.score
      }
    },
    updateNcaaId(state, action: PayloadAction<string>) {
      state.current.ncaaId = action.payload
      state.current.profile.ncaaId = action.payload
    },
    updateContactNotes(state, action: PayloadAction<string>) {
      state.current.contactNotes = action.payload
    },
    updateAcademicInterests(state, action: PayloadAction<string[]>) {
      state.current.academicInterests = action.payload
    },
    updatePreferredRegions(state, action: PayloadAction<CollegeRegion[]>) {
      state.current.preferredRegions = action.payload
    },
    upsertTargetSchool(state, action: PayloadAction<TargetSchool>) {
      const index = state.current.targetSchools.findIndex(
        (item) => item.collegeId === action.payload.collegeId,
      )
      if (index >= 0) {
        state.current.targetSchools[index] = action.payload
      } else if (state.current.targetSchools.length < 10) {
        state.current.targetSchools.push(action.payload)
      }
      state.current.targetSchools = state.current.targetSchools
        .sort((a, b) => a.rank - b.rank)
        .map((item, rank) => ({ ...item, rank: rank + 1 }))
    },
    removeTargetSchool(state, action: PayloadAction<string>) {
      state.current.targetSchools = state.current.targetSchools
        .filter((item) => item.collegeId !== action.payload)
        .map((item, rank) => ({ ...item, rank: rank + 1 }))
    },
    moveTargetSchool(state, action: PayloadAction<{ collegeId: string; direction: 'up' | 'down' }>) {
      const list = [...state.current.targetSchools].sort((a, b) => a.rank - b.rank)
      const index = list.findIndex((item) => item.collegeId === action.payload.collegeId)
      if (index < 0) return
      const swapWith = action.payload.direction === 'up' ? index - 1 : index + 1
      if (swapWith < 0 || swapWith >= list.length) return
      const current = list[index]
      list[index] = list[swapWith]
      list[swapWith] = current
      state.current.targetSchools = list.map((item, rank) => ({ ...item, rank: rank + 1 }))
    },
  },
})

export const {
  upsertCourse,
  removeCourse,
  updateProfile,
  addTestScore,
  updateNcaaId,
  updateContactNotes,
  updateAcademicInterests,
  updatePreferredRegions,
  upsertTargetSchool,
  removeTargetSchool,
  moveTargetSchool,
} = studentSlice.actions

export default studentSlice.reducer
