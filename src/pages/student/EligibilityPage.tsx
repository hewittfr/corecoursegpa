import AccountBalanceOutlined from '@mui/icons-material/AccountBalanceOutlined'
import GroupsOutlined from '@mui/icons-material/GroupsOutlined'
import SchoolOutlined from '@mui/icons-material/SchoolOutlined'
import {
  Alert,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Link,
  Stack,
  Typography,
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import EligibilityTable from '../../components/EligibilityTable'
import PageHeader from '../../components/PageHeader'
import { fullName, schoolLine } from '../../utils/format'

export default function EligibilityPage() {
  const student = useAppSelector((state) => state.student.current)
  const coreGpa = student.eligibility.diActual.coreGpa.toFixed(3)

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

      <Typography variant="h6">DIII, NAIA, and JUCO — how core GPA applies</Typography>
      <Grid container spacing={2}>
        {otherAssociationCards(coreGpa).map((item) => (
          <Grid key={item.title} size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1 }}>
                  {item.icon}
                  <Typography variant="h6">{item.title}</Typography>
                </Stack>
                <Chip
                  size="small"
                  label={item.status}
                  sx={{ bgcolor: '#1B7A4E', color: 'white', fontWeight: 700, mb: 1.25 }}
                />
                <Typography variant="body2" sx={{ fontWeight: 700, mb: 1 }}>
                  NCAA core GPA on file: {coreGpa}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                  {item.summary}
                </Typography>
                <Stack spacing={0.75} sx={{ mb: 1.5 }}>
                  {item.points.map((point) => (
                    <Typography key={point} variant="body2" color="text.secondary">
                      · {point}
                    </Typography>
                  ))}
                </Stack>
                <Link href={item.href} target="_blank" rel="noreferrer" variant="body2" underline="hover">
                  {item.linkLabel}
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  )
}

function otherAssociationCards(coreGpa: string) {
  return [
    {
      title: 'NCAA Division III',
      icon: <SchoolOutlined color="primary" />,
      status: 'Core GPA is a signal, not a sliding-scale rule',
      summary: `DIII does not use the NCAA Eligibility Center 16-core sliding scale that DI and DII use. Each college sets its own admission bar. Your ${coreGpa} core GPA is a strong academic signal for DIII.`,
      points: [
        'No athletic scholarships — academic and need-based aid only.',
        'Amateurism still matters; academics are decided by the campus admissions office.',
        'Keep entering NCAA cores anyway if DI/DII stays on the list.',
      ],
      href: 'https://www.ncaa.org/sports/2014/10/24/ncaa-division-iii.aspx',
      linkLabel: 'NCAA Division III overview',
    },
    {
      title: 'NAIA',
      icon: <AccountBalanceOutlined color="secondary" />,
      status: 'Uses NAIA Eligibility Center, not NCAA cores',
      summary: `NAIA freshman eligibility is based on high school GPA (typically 2.0+), class rank, and/or a test score — not the NCAA 16-core GPA. Your ${coreGpa} core GPA sits well above typical NAIA academic floors.`,
      points: [
        'Register with the NAIA Eligibility Center separately from the NCAA.',
        'Athletic aid is allowed at NAIA schools.',
        'A high core GPA still helps admissions and transfer conversations.',
      ],
      href: 'https://www.naia.org',
      linkLabel: 'NAIA Eligibility Center',
    },
    {
      title: 'JUCO (NJCAA)',
      icon: <GroupsOutlined color="primary" />,
      status: 'Diploma path — cores still matter for transfer',
      summary: `NJCAA eligibility generally starts with a high school diploma or GED, not 16 NCAA cores. With a ${coreGpa} core GPA this is a development or playing-time option, not an academic rescue.`,
      points: [
        'NJCAA DI and DII can offer athletic aid; NJCAA DIII cannot.',
        'If you later transfer to NCAA DI/DII, those 16 cores still count — keep the tracker current.',
        'Use JUCO when you need two years of film, size, or a clearer academic record.',
      ],
      href: 'https://www.njcaa.org',
      linkLabel: 'NJCAA eligibility',
    },
  ]
}
