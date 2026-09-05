import { Alert, Button, Card, CardContent, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import EligibilityTable from '../../components/EligibilityTable'
import PageHeader from '../../components/PageHeader'
import { fullName, schoolLine } from '../../utils/format'

export default function EligibilityPage() {
  const student = useAppSelector((state) => state.student.current)

  return (
    <Stack spacing={2.5}>
      <PageHeader
        title="NCAA DI/DII Initial-Eligibility Status Summary"
        subtitle={`${fullName(student)} · ${schoolLine(student)}`}
        action={
          <Button component={RouterLink} to="/courses" variant="contained" color="secondary">
            Update core courses
          </Button>
        }
      />

      <Alert severity="info">
        Division I still needs 0.5 English, math, or science credit before the start of the
        senior year. SAT and ACT scores are not on file.
      </Alert>

      <Card>
        <CardContent>
          <EligibilityTable eligibility={student.eligibility} />
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
            * Division I requires 10 core courses before the seventh semester, including 7 in
            English, math, or science. ** Many colleges still require an SAT or ACT score for
            admission even when the NCAA sliding scale is not in use.
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  )
}
