import {
  Box,
  Button,
  Card,
  CardContent,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import { Formik } from 'formik'
import { useMemo, useState } from 'react'
import * as Yup from 'yup'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import PageHeader from '../../components/PageHeader'
import { removeCourse, upsertCourse } from '../../features/student/studentSlice'
import type { CoursePoints, CourseSemester, LetterGrade } from '../../types'

const YEARS = ['2024-25', '2025-26', '2026-27', '2027-28'] as const
const SEMESTERS: CourseSemester[] = ['Fall', 'Spring', 'Summer', 'Full Year']
const GRADES: LetterGrade[] = ['A', 'B', 'C', 'D', 'F']
const POINTS: CoursePoints[] = [0, 0.5, 1]

const YEAR_LABELS: Record<string, string> = {
  '2024-25': '2024-25 · 9th grade',
  '2025-26': '2025-26 · 10th grade',
  '2026-27': '2026-27 · 11th grade',
  '2027-28': '2027-28 · 12th grade',
}

const courseSchema = Yup.object({
  year: Yup.string().required('Year is required'),
  semester: Yup.string().oneOf(SEMESTERS).required('Semester is required'),
  courseName: Yup.string().required('Course name is required'),
  letterGrade: Yup.string().oneOf(GRADES).required('Grade is required'),
  points: Yup.number().oneOf(POINTS).required('Points are required'),
})

const emptyValues = {
  year: '2026-27',
  semester: 'Fall' as CourseSemester,
  courseName: '',
  letterGrade: '' as LetterGrade | '',
  points: 1 as CoursePoints,
}

function yearLabel(year: string): string {
  return YEAR_LABELS[year] ?? year
}

export default function CoreCoursesPage() {
  const courses = useAppSelector((state) => state.student.current.courses)
  const dispatch = useAppDispatch()
  const [editingId, setEditingId] = useState<string | null>(null)

  const grouped = useMemo(() => {
    const years = [...new Set([...YEARS, ...courses.map((course) => course.year)])].sort()
    return years
      .map((year) => ({
        year,
        semesters: SEMESTERS.map((semester) => ({
          semester,
          courses: courses.filter((course) => course.year === year && course.semester === semester),
        })).filter((group) => group.courses.length > 0),
      }))
      .filter((group) => group.semesters.length > 0)
  }, [courses])

  const editing = courses.find((course) => course.id === editingId) ?? null

  return (
    <Stack spacing={3}>
      <PageHeader
        title="Update core courses"
        subtitle="Enter NCAA core courses by year and semester. Points are the credit value: 0, 0.5, or 1."
      />

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {editing ? 'Edit course' : 'Add a course'}
          </Typography>
          <Formik
            enableReinitialize
            initialValues={
              editing
                ? {
                    year: editing.year,
                    semester: editing.semester,
                    courseName: editing.courseName,
                    letterGrade: editing.letterGrade,
                    points: editing.points,
                  }
                : emptyValues
            }
            validationSchema={courseSchema}
            onSubmit={(values, helpers) => {
              dispatch(
                upsertCourse({
                  id: editing?.id ?? crypto.randomUUID(),
                  year: values.year,
                  semester: values.semester as CourseSemester,
                  courseName: values.courseName,
                  letterGrade: values.letterGrade as LetterGrade,
                  points: Number(values.points) as CoursePoints,
                }),
              )
              setEditingId(null)
              helpers.resetForm({ values: emptyValues })
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, resetForm }) => (
              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Stack spacing={2}>
                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                    <TextField
                      select
                      name="year"
                      label="Year"
                      value={values.year}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.year && Boolean(errors.year)}
                      helperText={touched.year && errors.year}
                      fullWidth
                    >
                      {YEARS.map((year) => (
                        <MenuItem key={year} value={year}>
                          {yearLabel(year)}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      select
                      name="semester"
                      label="Semester"
                      value={values.semester}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.semester && Boolean(errors.semester)}
                      helperText={touched.semester && errors.semester}
                      fullWidth
                    >
                      {SEMESTERS.map((semester) => (
                        <MenuItem key={semester} value={semester}>
                          {semester}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Stack>
                  <TextField
                    name="courseName"
                    label="Course name"
                    value={values.courseName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.courseName && Boolean(errors.courseName)}
                    helperText={touched.courseName && errors.courseName}
                    fullWidth
                  />
                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                    <TextField
                      select
                      name="letterGrade"
                      label="Grade"
                      value={values.letterGrade}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.letterGrade && Boolean(errors.letterGrade)}
                      helperText={touched.letterGrade && errors.letterGrade}
                      fullWidth
                    >
                      <MenuItem value="">Select a grade</MenuItem>
                      {GRADES.map((grade) => (
                        <MenuItem key={grade} value={grade}>
                          {grade}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      select
                      name="points"
                      label="Points the grade is worth"
                      value={values.points}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.points && Boolean(errors.points)}
                      helperText={touched.points && errors.points}
                      fullWidth
                    >
                      {POINTS.map((point) => (
                        <MenuItem key={point} value={point}>
                          {point}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Stack>
                  <Stack direction="row" spacing={1.5}>
                    <Button type="submit" variant="contained" color="secondary">
                      {editing ? 'Save changes' : 'Add course'}
                    </Button>
                    {editing ? (
                      <Button
                        type="button"
                        onClick={() => {
                          setEditingId(null)
                          resetForm({ values: emptyValues })
                        }}
                      >
                        Cancel edit
                      </Button>
                    ) : null}
                  </Stack>
                </Stack>
              </Box>
            )}
          </Formik>
        </CardContent>
      </Card>

      {grouped.map((yearGroup) => (
        <Box key={yearGroup.year}>
          <Typography variant="h6" color="primary" sx={{ mb: 1.5 }}>
            {yearLabel(yearGroup.year)}
          </Typography>
          <Stack spacing={2}>
            {yearGroup.semesters.map((semesterGroup) => (
              <Card key={`${yearGroup.year}-${semesterGroup.semester}`}>
                <CardContent>
                  <Typography variant="subtitle1" sx={{ mb: 1.5, color: 'secondary.main' }}>
                    {semesterGroup.semester}
                  </Typography>
                  <Box sx={{ overflowX: 'auto' }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Course name</TableCell>
                          <TableCell>Grade</TableCell>
                          <TableCell>Points</TableCell>
                          <TableCell align="right">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {semesterGroup.courses.map((course) => (
                          <TableRow key={course.id} selected={course.id === editingId}>
                            <TableCell>{course.courseName}</TableCell>
                            <TableCell>{course.letterGrade || '—'}</TableCell>
                            <TableCell>{course.points}</TableCell>
                            <TableCell align="right">
                              <Button size="small" onClick={() => setEditingId(course.id)}>
                                Edit
                              </Button>
                              <Button
                                size="small"
                                color="secondary"
                                onClick={() => {
                                  if (editingId === course.id) setEditingId(null)
                                  dispatch(removeCourse(course.id))
                                }}
                              >
                                Remove
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>
      ))}
    </Stack>
  )
}
