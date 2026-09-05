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
import { updateContactNotes } from '../../features/student/studentSlice'
import { mockCoaches, mockColleges } from '../../mock/data'

const filterSchema = Yup.object({
  query: Yup.string(),
  division: Yup.string(),
  state: Yup.string(),
})

const notesSchema = Yup.object({
  contactNotes: Yup.string().max(2000, 'Keep notes under 2,000 characters').required('Notes are required'),
})

export default function CoachSearchPage() {
  const student = useAppSelector((state) => state.student.current)
  const dispatch = useAppDispatch()
  const [filters, setFilters] = useState({ query: '', division: '', state: '' })

  const coaches = useMemo(() => {
    return mockCoaches.filter((coach) => {
      const matchesQuery = `${coach.name} ${coach.schoolName} ${coach.sport}`
        .toLowerCase()
        .includes(filters.query.toLowerCase())
      const matchesDivision = !filters.division || coach.division === filters.division
      const matchesState = !filters.state || coach.state === filters.state
      return matchesQuery && matchesDivision && matchesState
    })
  }, [filters])

  return (
    <Stack spacing={3}>
      <PageHeader
        title="College Coach Search"
        subtitle="Dummy directory of coaches and member institutions. Filters use Formik + Yup."
      />

      <Card>
        <CardContent>
          <Formik
            initialValues={filters}
            validationSchema={filterSchema}
            onSubmit={(values) => setFilters(values)}
          >
            {({ values, handleChange, handleSubmit, resetForm }) => (
              <Box component="form" onSubmit={handleSubmit}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ alignItems: 'flex-start' }}>
                  <TextField name="query" label="Search coaches or schools" value={values.query} onChange={handleChange} fullWidth />
                  <TextField select name="division" label="Division" value={values.division} onChange={handleChange} sx={{ minWidth: 180 }}>
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="NCAA DI">NCAA DI</MenuItem>
                    <MenuItem value="NCAA DII">NCAA DII</MenuItem>
                    <MenuItem value="NCAA DIII">NCAA DIII</MenuItem>
                  </TextField>
                  <TextField select name="state" label="State" value={values.state} onChange={handleChange} sx={{ minWidth: 120 }}>
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="FL">FL</MenuItem>
                    <MenuItem value="GA">GA</MenuItem>
                  </TextField>
                  <Button type="submit" variant="contained" color="secondary">
                    Search
                  </Button>
                  <Button
                    onClick={() => {
                      resetForm()
                      setFilters({ query: '', division: '', state: '' })
                    }}
                  >
                    Reset
                  </Button>
                </Stack>
              </Box>
            )}
          </Formik>
        </CardContent>
      </Card>

      <Card>
        <CardContent sx={{ overflowX: 'auto' }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Coach</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>School</TableCell>
                <TableCell>Division</TableCell>
                <TableCell>Sport</TableCell>
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {coaches.map((coach) => (
                <TableRow key={coach.id}>
                  <TableCell>{coach.name}</TableCell>
                  <TableCell>{coach.title}</TableCell>
                  <TableCell>{coach.schoolName}</TableCell>
                  <TableCell>{coach.division}</TableCell>
                  <TableCell>{coach.sport}</TableCell>
                  <TableCell>{coach.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Sample member institutions
          </Typography>
          <Stack spacing={0.75}>
            {mockColleges.map((college) => (
              <Typography key={college.id} variant="body2">
                {college.name} — {college.city}, {college.state} · {college.division} · {college.conference}
              </Typography>
            ))}
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            My recruiting contact notes
          </Typography>
          <Formik
            enableReinitialize
            initialValues={{ contactNotes: student.contactNotes }}
            validationSchema={notesSchema}
            onSubmit={(values) => {
              dispatch(updateContactNotes(values.contactNotes))
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
              <Box component="form" onSubmit={handleSubmit} noValidate>
                <TextField
                  name="contactNotes"
                  label="Notes"
                  value={values.contactNotes}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.contactNotes && Boolean(errors.contactNotes)}
                  helperText={touched.contactNotes && errors.contactNotes}
                  multiline
                  minRows={4}
                  fullWidth
                />
                <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                  Save notes
                </Button>
              </Box>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Stack>
  )
}
