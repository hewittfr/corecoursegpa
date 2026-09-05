import {
  Alert,
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
import * as Yup from 'yup'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import PageHeader from '../../components/PageHeader'
import StateAveragesCard from '../../components/StateAveragesCard'
import { addTestScore, updateNcaaId } from '../../features/student/studentSlice'
import type { TestType } from '../../types'

const ncaaSchema = Yup.object({
  ncaaId: Yup.string()
    .matches(/^[0-9]*$/, 'NCAA ID must be numeric')
    .min(8, 'NCAA ID must be at least 8 digits')
    .required('NCAA ID is required'),
})

const scoreSchema = Yup.object({
  type: Yup.string().oneOf(['SAT', 'ACT']).required(),
  score: Yup.number()
    .required('Score is required')
    .when('type', {
      is: 'SAT',
      then: (schema) => schema.min(400, 'SAT scores start at 400').max(1600, 'SAT scores cap at 1600'),
      otherwise: (schema) => schema.min(1, 'ACT scores start at 1').max(36, 'ACT scores cap at 36'),
    }),
  testDate: Yup.string().required('Test date is required'),
})

export default function TestScoresPage() {
  const student = useAppSelector((state) => state.student.current)
  const dispatch = useAppDispatch()

  return (
    <Stack spacing={3}>
      <PageHeader
        title="NCAA ID and SAT/ACT"
        subtitle="Many colleges still require a test score for admission even when NCAA eligibility does not."
      />

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            NCAA Eligibility Center ID
          </Typography>
          <Formik
            initialValues={{ ncaaId: student.ncaaId }}
            enableReinitialize
            validationSchema={ncaaSchema}
            onSubmit={(values) => {
              dispatch(updateNcaaId(values.ncaaId))
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ alignItems: 'flex-start' }}>
                  <TextField
                    name="ncaaId"
                    label="NCAA ID"
                    value={values.ncaaId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.ncaaId && Boolean(errors.ncaaId)}
                    helperText={touched.ncaaId && errors.ncaaId}
                    fullWidth
                  />
                  <Button type="submit" variant="contained" color="secondary" sx={{ minWidth: 140, mt: { sm: 0.5 } }}>
                    Save ID
                  </Button>
                </Stack>
              </Box>
            )}
          </Formik>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Add a test score
          </Typography>
          <Formik
            initialValues={{ type: 'SAT' as TestType, score: '', testDate: '' }}
            validationSchema={scoreSchema}
            onSubmit={(values, helpers) => {
              dispatch(
                addTestScore({
                  id: crypto.randomUUID(),
                  type: values.type,
                  score: Number(values.score),
                  testDate: values.testDate,
                }),
              )
              helpers.resetForm()
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ alignItems: 'flex-start' }}>
                  <TextField select name="type" label="Test" value={values.type} onChange={handleChange} sx={{ minWidth: 140 }}>
                    <MenuItem value="SAT">SAT</MenuItem>
                    <MenuItem value="ACT">ACT</MenuItem>
                  </TextField>
                  <TextField
                    name="score"
                    label="Score"
                    type="number"
                    value={values.score}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.score && Boolean(errors.score)}
                    helperText={touched.score && errors.score}
                    fullWidth
                  />
                  <TextField
                    name="testDate"
                    label="Test date"
                    type="date"
                    value={values.testDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.testDate && Boolean(errors.testDate)}
                    helperText={touched.testDate && errors.testDate}
                    slotProps={{ inputLabel: { shrink: true } }}
                    fullWidth
                  />
                  <Button type="submit" variant="contained" sx={{ minWidth: 140, mt: { md: 0.5 } }}>
                    Add score
                  </Button>
                </Stack>
              </Box>
            )}
          </Formik>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Scores on file
          </Typography>
          {student.testScores.length === 0 ? (
            <Alert severity="info">No SAT or ACT scores have been entered yet.</Alert>
          ) : (
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Test</TableCell>
                  <TableCell>Score</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {student.testScores.map((score) => (
                  <TableRow key={score.id}>
                    <TableCell>{score.type}</TableCell>
                    <TableCell>{score.score}</TableCell>
                    <TableCell>{score.testDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <StateAveragesCard schoolState={student.school.state} testScores={student.testScores} />
    </Stack>
  )
}
