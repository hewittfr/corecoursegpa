import CalendarMonthOutlined from '@mui/icons-material/CalendarMonthOutlined'
import FactCheckOutlined from '@mui/icons-material/FactCheckOutlined'
import FitnessCenterOutlined from '@mui/icons-material/FitnessCenterOutlined'
import LibraryBooksOutlined from '@mui/icons-material/LibraryBooksOutlined'
import PersonOutlined from '@mui/icons-material/PersonOutlined'
import SchoolOutlined from '@mui/icons-material/SchoolOutlined'
import SportsFootballOutlined from '@mui/icons-material/SportsFootballOutlined'
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import EligibilityGauge from '../../components/EligibilityGauge'
import EligibilityTable from '../../components/EligibilityTable'
import PositionFitPreview from '../../components/PositionFitPreview'
import RecruitingProcessGuide from '../../components/RecruitingProcessGuide'
import { mockCalendarEvents, mockTrainingTopics } from '../../mock/data'
import { creditProgress, formatDateRange, fullName, locationLine, primarySport, schoolLine } from '../../utils/format'

export default function StudentDashboard() {
  const student = useAppSelector((state) => state.student.current)
  const di = student.eligibility.diActual
  const today = new Date().toISOString().slice(0, 10)
  const primarySportName = student.sports.find((item) => item.primary)?.name
  const upcoming = [...mockCalendarEvents]
    .filter(
      (item) =>
        (item.type === 'Deadline' || item.type === 'Test Date' || item.type === 'Important Date') &&
        item.startDate >= today &&
        (item.sport === 'All' || item.sport === primarySportName),
    )
    .sort((a, b) => a.startDate.localeCompare(b.startDate))
    .slice(0, 4)
  const featuredTraining = mockTrainingTopics.filter((topic) => topic.featured).slice(0, 3)

  return (
    <Stack spacing={3}>
      <Card
        sx={{
          color: 'white',
          backgroundColor: 'primary.main',
          backgroundImage: `
            linear-gradient(120deg, rgba(165, 40, 40, 0.22), transparent 46%),
            linear-gradient(45deg, rgba(255,255,255,0.05) 25%, transparent 25%)
          `,
          backgroundSize: 'auto, 64px 64px',
        }}
      >
        <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
          <Typography variant="overline" sx={{ color: '#F3C2C2', letterSpacing: '0.14em' }}>
            Welcome back
          </Typography>
          <Typography variant="h4" sx={{ mb: 1 }}>
            {fullName(student)}
          </Typography>
          <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
            <Chip
              icon={<SchoolOutlined />}
              label={schoolLine(student)}
              sx={{ bgcolor: 'rgba(255,255,255,0.12)', color: 'white' }}
            />
            <Chip
              icon={<SportsFootballOutlined />}
              label={primarySport(student)}
              sx={{ bgcolor: 'secondary.main', color: 'white' }}
            />
            <Chip
              label={locationLine(student)}
              sx={{ bgcolor: 'rgba(255,255,255,0.12)', color: 'white' }}
            />
            <Chip
              label={`${student.school.district}`}
              sx={{ bgcolor: 'rgba(255,255,255,0.12)', color: 'white' }}
            />
          </Stack>
        </CardContent>
      </Card>

      <RecruitingProcessGuide student={student} />

      <Card>
        <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
          <EligibilityGauge column={di} />
        </CardContent>
      </Card>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <SummaryCard
            label="DI Core Course GPA"
            value={di.coreGpa.toFixed(3)}
            hint="Actual NCAA Division I"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <SummaryCard
            label="DII Core Course GPA"
            value={student.eligibility.diiActual.coreGpa.toFixed(3)}
            hint="Actual NCAA Division II"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Core credits
              </Typography>
              <Typography variant="h4" color="primary" sx={{ my: 0.5 }}>
                {di.creditsCompleted}/{di.creditsCompleted + di.creditsNeeded}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={creditProgress(di)}
                sx={{ height: 8, borderRadius: 999, mb: 1 }}
              />
              <Typography variant="caption" color="text.secondary">
                {di.creditsNeeded} credits still needed
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <SummaryCard
            label="SAT / ACT"
            value={student.testScores.length ? String(student.testScores[0].score) : 'None'}
            hint="Many colleges still require a score for admission"
            accent
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, lg: 7 }}>
          <Card>
            <CardContent>
              <Stack
                direction="row"
                sx={{ mb: 2, justifyContent: 'space-between', alignItems: 'center' }}
              >
                <Typography variant="h6">Eligibility snapshot</Typography>
                <Button component={RouterLink} to="/eligibility" color="secondary">
                  Full report
                </Button>
              </Stack>
              <EligibilityTable eligibility={student.eligibility} compact />
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, lg: 5 }}>
          <Stack spacing={2}>
            <Card>
              <CardContent>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1 }}>
                  <CalendarMonthOutlined color="primary" />
                  <Typography variant="h6">Upcoming dates</Typography>
                </Stack>
                <List dense>
                  {upcoming.map((event) => (
                    <ListItem key={event.id} disableGutters>
                      <ListItemText
                        primary={event.title}
                        secondary={`${event.type} · ${formatDateRange(event.startDate, event.endDate)}`}
                      />
                    </ListItem>
                  ))}
                </List>
                <Button component={RouterLink} to="/recruiting/calendar">
                  Open training calendar
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1 }}>
                  <LibraryBooksOutlined color="secondary" />
                  <Typography variant="h6">Training materials</Typography>
                </Stack>
                <List dense>
                  {featuredTraining.map((topic) => (
                    <ListItem key={topic.id} disableGutters>
                      <ListItemText
                        primary={topic.title}
                        secondary={topic.duration ? `${topic.category} · ${topic.duration}` : topic.category}
                      />
                    </ListItem>
                  ))}
                </List>
                <Stack direction="row" spacing={1}>
                  <Button component={RouterLink} to="/training" startIcon={<FactCheckOutlined />}>
                    Library
                  </Button>
                  <Button component={RouterLink} to="/recruiting" startIcon={<PersonOutlined />} color="secondary">
                    Recruiting dashboard
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>

      <Box>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Training calendars, resources, and position standards
        </Typography>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1 }}>
                  <CalendarMonthOutlined color="primary" />
                  <Typography variant="h6">Training calendar</Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                  NCAA recruiting windows, SAT/ACT dates, and other dates that matter for{' '}
                  {primarySportName ?? 'your sport'}.
                </Typography>
                <List dense>
                  {upcoming.slice(0, 3).map((event) => (
                    <ListItem key={`tool-${event.id}`} disableGutters>
                      <ListItemText
                        primary={event.title}
                        secondary={formatDateRange(event.startDate, event.endDate)}
                      />
                    </ListItem>
                  ))}
                </List>
                <Button component={RouterLink} to="/recruiting/calendar" color="secondary">
                  Open calendar
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1 }}>
                  <LibraryBooksOutlined color="secondary" />
                  <Typography variant="h6">Training resources</Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                  Eligibility, outreach, and process videos from the training library.
                </Typography>
                <List dense>
                  {featuredTraining.map((topic) => (
                    <ListItem key={`tool-${topic.id}`} disableGutters>
                      <ListItemText primary={topic.title} secondary={topic.duration} />
                    </ListItem>
                  ))}
                </List>
                <Button component={RouterLink} to="/training" startIcon={<FactCheckOutlined />}>
                  Open library
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1 }}>
                  <FitnessCenterOutlined color="secondary" />
                  <Typography variant="h6">Position requirements</Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                  Height, weight, 40 time, and other combine metrics by division for{' '}
                  {primarySport(student)}.
                </Typography>
                <Button component={RouterLink} to="/recruiting/positions" color="secondary">
                  View {primarySportName ?? 'sport'} standards
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <PositionFitPreview
          sport={primarySportName ?? 'Football'}
          position={student.sports.find((item) => item.primary)?.positions[0] ?? 'Quarterback'}
          profile={student.profile}
          compact
        />
      </Box>
    </Stack>
  )
}

function SummaryCard({
  label,
  value,
  hint,
  accent = false,
}: {
  label: string
  value: string
  hint: string
  accent?: boolean
}) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="h4" sx={{ my: 0.5, color: accent ? 'secondary.main' : 'primary.main' }}>
          {value}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {hint}
        </Typography>
      </CardContent>
    </Card>
  )
}
