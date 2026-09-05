import CalendarMonthOutlined from '@mui/icons-material/CalendarMonthOutlined'
import CheckCircle from '@mui/icons-material/CheckCircle'
import ChecklistOutlined from '@mui/icons-material/ChecklistOutlined'
import EventAvailableOutlined from '@mui/icons-material/EventAvailableOutlined'
import FactCheckOutlined from '@mui/icons-material/FactCheckOutlined'
import FlagOutlined from '@mui/icons-material/FlagOutlined'
import HourglassEmpty from '@mui/icons-material/HourglassEmpty'
import LibraryBooksOutlined from '@mui/icons-material/LibraryBooksOutlined'
import MailOutlined from '@mui/icons-material/MailOutlined'
import PersonOutlined from '@mui/icons-material/PersonOutlined'
import QuizOutlined from '@mui/icons-material/QuizOutlined'
import RadioButtonUnchecked from '@mui/icons-material/RadioButtonUnchecked'
import SchoolOutlined from '@mui/icons-material/SchoolOutlined'
import SportsFootballOutlined from '@mui/icons-material/SportsFootballOutlined'
import VideocamOutlined from '@mui/icons-material/VideocamOutlined'
import {
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import EligibilityGauge from '../../components/EligibilityGauge'
import PositionFitPreview from '../../components/PositionFitPreview'
import RecruitingProcessGuide from '../../components/RecruitingProcessGuide'
import { mockCalendarEvents, mockTrainingTopics } from '../../mock/data'
import type { CalendarEventType, TrainingStatus, TrainingTopic } from '../../types'
import { creditProgress, formatDateRange, fullName, locationLine, primarySport, schoolLine } from '../../utils/format'

const TRAINING_STATUS_STYLE: Record<TrainingStatus, { bgcolor: string; color: string }> = {
  Complete: { bgcolor: '#1B7A4E', color: '#ffffff' },
  'In Progress': { bgcolor: '#C47B17', color: '#ffffff' },
  'Not Started': { bgcolor: '#E6EEFF', color: '#222A5B' },
}

const TRAINING_STATUS_ICON: Record<TrainingStatus, typeof CheckCircle> = {
  Complete: CheckCircle,
  'In Progress': HourglassEmpty,
  'Not Started': RadioButtonUnchecked,
}

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
    .slice(0, 7)
  const featuredTraining = mockTrainingTopics.filter((topic) => topic.featured)

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
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Stack
                direction="row"
                spacing={1}
                sx={{ mb: 0.5, justifyContent: 'space-between', alignItems: 'center' }}
              >
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                  <LibraryBooksOutlined color="secondary" />
                  <Typography variant="h6">Training materials</Typography>
                </Stack>
                <Button component={RouterLink} to="/training" color="secondary" startIcon={<FactCheckOutlined />}>
                  Open library
                </Button>
              </Stack>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Watch these in the same order as the 3-step process. Open a topic to continue where you left off.
              </Typography>
              <List dense disablePadding>
                {featuredTraining.map((topic) => {
                  const Icon = TRAINING_STATUS_ICON[topic.status]
                  const style = TRAINING_STATUS_STYLE[topic.status]
                  return (
                    <ListItem key={topic.id} disablePadding>
                      <ListItemButton
                        component={RouterLink}
                        to={`/training?topic=${topic.id}`}
                        sx={{ borderRadius: 1, py: 0.75 }}
                      >
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          {trainingIcon(topic)}
                        </ListItemIcon>
                        <ListItemText
                          primary={topic.title}
                          secondary={
                            topic.duration ? `${topic.category} · ${topic.duration}` : topic.category
                          }
                        />
                        <Chip
                          size="small"
                          icon={<Icon sx={{ color: `${style.color} !important`, fontSize: 16 }} />}
                          label={topic.status}
                          sx={{ ...style, fontWeight: 700, ml: 1 }}
                        />
                      </ListItemButton>
                    </ListItem>
                  )
                })}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, lg: 5 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Stack
                direction="row"
                spacing={1}
                sx={{ mb: 0.5, justifyContent: 'space-between', alignItems: 'center' }}
              >
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                  <CalendarMonthOutlined color="primary" />
                  <Typography variant="h6">Important Upcoming Dates</Typography>
                </Stack>
                <Button
                  component={RouterLink}
                  to="/recruiting/calendar"
                  color="secondary"
                  startIcon={<CalendarMonthOutlined />}
                >
                  Open Calendar
                </Button>
              </Stack>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Test dates, deadlines, and other dates that matter for {primarySportName ?? 'your sport'}.
              </Typography>
              <List dense disablePadding>
                {upcoming.map((event) => (
                  <ListItem key={event.id} disableGutters sx={{ py: 0.75 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      {dateIcon(event.type)}
                    </ListItemIcon>
                    <ListItemText
                      primary={event.title}
                      secondary={`${event.type} · ${formatDateRange(event.startDate, event.endDate)}`}
                    />
                  </ListItem>
                ))}
              </List>
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
    </Stack>
  )
}

function trainingIcon(topic: TrainingTopic) {
  if (topic.category === 'Calendars') {
    return <CalendarMonthOutlined color="primary" fontSize="small" />
  }
  if (topic.category === 'Outreach') {
    return <MailOutlined color="secondary" fontSize="small" />
  }
  if (topic.category === 'Recruiting Profile') {
    return <PersonOutlined color="primary" fontSize="small" />
  }
  if (/checklist/i.test(topic.title)) {
    return <ChecklistOutlined color="primary" fontSize="small" />
  }
  if (topic.duration || /video|webinar/i.test(topic.title)) {
    return <VideocamOutlined color="secondary" fontSize="small" />
  }
  return <SchoolOutlined color="primary" fontSize="small" />
}

function dateIcon(type: CalendarEventType) {
  if (type === 'Test Date') {
    return <QuizOutlined color="primary" fontSize="small" />
  }
  if (type === 'Deadline') {
    return <FlagOutlined color="secondary" fontSize="small" />
  }
  return <EventAvailableOutlined color="primary" fontSize="small" />
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
