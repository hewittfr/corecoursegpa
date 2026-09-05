import Add from '@mui/icons-material/Add'
import DeleteOutlined from '@mui/icons-material/DeleteOutlined'
import EditOutlined from '@mui/icons-material/EditOutlined'
import ExpandMore from '@mui/icons-material/ExpandMore'
import MenuBookOutlined from '@mui/icons-material/MenuBookOutlined'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import { Formik } from 'formik'
import { useMemo, useState } from 'react'
import * as Yup from 'yup'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import PageHeader from '../../components/PageHeader'
import { removeCourse, upsertCourse } from '../../features/student/studentSlice'
import { FLORIDA_CORE_COURSES, floridaCourseByName } from '../../mock/floridaCoreCourses'
import type { CoreCourse, CoursePoints, CourseSemester, LetterGrade } from '../../types'

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

const GRADE_STYLE: Record<string, { bgcolor: string; color: string }> = {
  A: { bgcolor: '#1B7A4E', color: '#ffffff' },
  B: { bgcolor: '#222A5B', color: '#ffffff' },
  C: { bgcolor: '#C47B17', color: '#ffffff' },
  D: { bgcolor: '#A52828', color: '#ffffff' },
  F: { bgcolor: '#A52828', color: '#ffffff' },
}

const SUBJECT_STYLE: Record<string, { bgcolor: string; color: string }> = {
  English: { bgcolor: '#E6EEFF', color: '#222A5B' },
  Math: { bgcolor: '#FDECEC', color: '#A52828' },
  Science: { bgcolor: '#E8F5EE', color: '#1B7A4E' },
  'Social Science': { bgcolor: '#FFF4E0', color: '#C47B17' },
  'Additional Core': { bgcolor: '#F3EEFF', color: '#3A4A86' },
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

type SortKey = 'semester' | 'subject' | 'courseName' | 'letterGrade' | 'points'
type SortDirection = 'asc' | 'desc'

const SORTABLE_COLUMNS: { key: SortKey; label: string }[] = [
  { key: 'semester', label: 'Semester' },
  { key: 'subject', label: 'Subject' },
  { key: 'courseName', label: 'Course' },
  { key: 'letterGrade', label: 'Grade' },
  { key: 'points', label: 'Points' },
]

const SEMESTER_RANK: Record<CourseSemester, number> = {
  Fall: 0,
  Spring: 1,
  Summer: 2,
  'Full Year': 3,
}

const GRADE_RANK: Record<string, number> = {
  A: 0,
  B: 1,
  C: 2,
  D: 3,
  F: 4,
  '': 5,
}

function yearLabel(year: string): string {
  return YEAR_LABELS[year] ?? year
}

function courseSubject(course: CoreCourse): string {
  return floridaCourseByName(course.courseName)?.subject ?? 'Additional Core'
}

function sortValue(course: CoreCourse, key: SortKey): string | number {
  if (key === 'semester') return SEMESTER_RANK[course.semester]
  if (key === 'subject') return courseSubject(course)
  if (key === 'courseName') return course.courseName.toLowerCase()
  if (key === 'letterGrade') return GRADE_RANK[course.letterGrade] ?? 5
  return course.points
}

function sortCourses(courses: CoreCourse[], key: SortKey, direction: SortDirection): CoreCourse[] {
  const dir = direction === 'asc' ? 1 : -1
  return [...courses].sort((left, right) => {
    const a = sortValue(left, key)
    const b = sortValue(right, key)
    if (a < b) return -1 * dir
    if (a > b) return 1 * dir
    return left.courseName.localeCompare(right.courseName)
  })
}

function YearCourseSection({
  year,
  courses,
  editingId,
  onEdit,
  onRemove,
}: {
  year: string
  courses: CoreCourse[]
  editingId: string | null
  onEdit: (id: string) => void
  onRemove: (id: string) => void
}) {
  const [orderBy, setOrderBy] = useState<SortKey>('semester')
  const [order, setOrder] = useState<SortDirection>('asc')
  const sorted = useMemo(() => sortCourses(courses, orderBy, order), [courses, orderBy, order])

  function handleSort(key: SortKey) {
    if (orderBy === key) {
      setOrder((current) => (current === 'asc' ? 'desc' : 'asc'))
      return
    }
    setOrderBy(key)
    setOrder('asc')
  }

  return (
    <Accordion
      defaultExpanded
      disableGutters
      sx={{
        overflow: 'hidden',
        boxShadow: '0 8px 24px rgba(34, 42, 91, 0.06)',
        border: '1px solid #E3E6EE',
        '&:before': { display: 'none' },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMore sx={{ color: 'white' }} />}
        sx={{
          bgcolor: 'primary.light',
          color: 'white',
          minHeight: 52,
          '&:hover': { bgcolor: '#485287' },
          '& .MuiAccordionSummary-content': {
            my: 1,
            mr: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
          },
        }}
      >
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <MenuBookOutlined fontSize="small" />
          <Typography variant="subtitle1">{yearLabel(year)}</Typography>
        </Stack>
        <Chip
          label={`${courses.length} course${courses.length === 1 ? '' : 's'}`}
          sx={{ bgcolor: 'rgba(255,255,255,0.18)', color: 'white' }}
        />
      </AccordionSummary>
      <AccordionDetails sx={{ p: 0 }}>
        <Box sx={{ overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#F5F7FB' }}>
                {SORTABLE_COLUMNS.map((column) => (
                  <TableCell key={column.key} sortDirection={orderBy === column.key ? order : false}>
                    <TableSortLabel
                      active={orderBy === column.key}
                      direction={orderBy === column.key ? order : 'asc'}
                      onClick={() => handleSort(column.key)}
                    >
                      {column.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sorted.map((course) => {
                const subject = courseSubject(course)
                const gradeStyle = course.letterGrade
                  ? GRADE_STYLE[course.letterGrade]
                  : { bgcolor: '#E6EEFF', color: '#222A5B' }
                return (
                  <TableRow
                    key={course.id}
                    hover
                    selected={course.id === editingId}
                    sx={{ '&:last-child td': { borderBottom: 0 } }}
                  >
                    <TableCell>
                      <Chip label={course.semester} variant="outlined" color="secondary" />
                    </TableCell>
                    <TableCell>
                      <Chip label={subject} sx={SUBJECT_STYLE[subject] ?? SUBJECT_STYLE['Additional Core']} />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{course.courseName}</TableCell>
                    <TableCell>
                      <Chip
                        label={course.letterGrade || 'In progress'}
                        sx={{ ...gradeStyle, fontWeight: 700 }}
                      />
                    </TableCell>
                    <TableCell>{course.points}</TableCell>
                    <TableCell align="right">
                      <Tooltip title="Edit">
                        <IconButton aria-label={`Edit ${course.courseName}`} onClick={() => onEdit(course.id)}>
                          <EditOutlined fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Remove">
                        <IconButton
                          aria-label={`Remove ${course.courseName}`}
                          color="secondary"
                          onClick={() => onRemove(course.id)}
                        >
                          <DeleteOutlined fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}

export default function CoreCoursesPage() {
  const courses = useAppSelector((state) => state.student.current.courses)
  const dispatch = useAppDispatch()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const grouped = useMemo(() => {
    const years = [...new Set([...YEARS, ...courses.map((course) => course.year)])].sort()
    return years
      .map((year) => ({
        year,
        courses: SEMESTERS.flatMap((semester) =>
          courses.filter((course) => course.year === year && course.semester === semester),
        ),
      }))
      .filter((group) => group.courses.length > 0)
  }, [courses])

  const editing = courses.find((course) => course.id === editingId) ?? null
  const courseOptions = useMemo(() => {
    const names = new Set(FLORIDA_CORE_COURSES.map((course) => course.name))
    const extras = courses
      .map((course) => course.courseName)
      .filter((name) => !names.has(name))
      .map((name) => floridaCourseByName(name) ?? { name, subject: 'Additional Core' as const })
    return [...FLORIDA_CORE_COURSES, ...extras]
  }, [courses])

  function openAdd() {
    setEditingId(null)
    setDialogOpen(true)
  }

  function openEdit(id: string) {
    setEditingId(id)
    setDialogOpen(true)
  }

  function closeDialog() {
    setDialogOpen(false)
    setEditingId(null)
  }

  return (
    <Stack spacing={3}>
      <PageHeader
        title="Update core courses"
        subtitle="Choose NCAA-approved Florida core courses by year and semester. Points are the credit value: 0, 0.5, or 1."
        action={
          <Button variant="contained" color="secondary" startIcon={<Add />} onClick={openAdd}>
            Add course
          </Button>
        }
      />

      {grouped.map((yearGroup) => (
        <YearCourseSection
          key={yearGroup.year}
          year={yearGroup.year}
          courses={yearGroup.courses}
          editingId={editingId}
          onEdit={openEdit}
          onRemove={(id) => {
            if (editingId === id) closeDialog()
            dispatch(removeCourse(id))
          }}
        />
      ))}

      <Dialog open={dialogOpen} onClose={closeDialog} maxWidth="sm" fullWidth>
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
          onSubmit={(values) => {
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
            closeDialog()
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <DialogTitle>{editing ? 'Edit course' : 'Add a course'}</DialogTitle>
              <DialogContent>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Course names are NCAA-approved Florida cores. Choose from the list — do not type a custom title.
                </Typography>
                <Stack spacing={2} sx={{ mt: 0.5 }}>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
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
                  <Autocomplete
                    options={courseOptions}
                    groupBy={(option) => option.subject}
                    getOptionLabel={(option) => option.name}
                    isOptionEqualToValue={(option, value) => option.name === value.name}
                    value={courseOptions.find((option) => option.name === values.courseName) ?? null}
                    onChange={(_event, option) => {
                      void setFieldValue('courseName', option?.name ?? '')
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="courseName"
                        label="Course name"
                        onBlur={handleBlur}
                        error={touched.courseName && Boolean(errors.courseName)}
                        helperText={
                          (touched.courseName && errors.courseName) ||
                          'Florida NCAA-approved core courses only'
                        }
                      />
                    )}
                  />
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
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
                </Stack>
              </DialogContent>
              <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={closeDialog}>Cancel</Button>
                <Button type="submit" variant="contained" color="secondary">
                  {editing ? 'Save changes' : 'Add course'}
                </Button>
              </DialogActions>
            </Box>
          )}
        </Formik>
      </Dialog>
    </Stack>
  )
}
