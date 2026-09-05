import CalendarMonthOutlined from '@mui/icons-material/CalendarMonthOutlined'
import FitnessCenterOutlined from '@mui/icons-material/FitnessCenterOutlined'
import LibraryBooksOutlined from '@mui/icons-material/LibraryBooksOutlined'
import SportsFootballOutlined from '@mui/icons-material/SportsFootballOutlined'
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import PositionFitPreview from '../../../components/PositionFitPreview'
import {
  currentRecruitingPeriod,
  isCampEvent,
  mockCalendarEvents,
} from '../../../mock/calendarEvents'
import { findCollege, mixSummary, TARGET_LIST_GOAL } from '../../../mock/targetSchools'
import type { Student } from '../../../types'
import { formatDateRange, fullName, primarySport } from '../../../utils/format'

const pathSteps = [
  {
    number: '1',
    title: 'Get your profile coach-ready',
    body: 'Height, weight, combine times, honors, and a film link coaches can scan in under a minute.',
    to: '/recruiting/profile',
    action: 'Update profile',
  },
  {
    number: '2',
    title: 'See what your position needs',
    body: 'Compare your measurables to typical ranges by division so the school list stays honest.',
    to: '/recruiting/positions',
    action: 'Position requirements',
  },
  {
    number: '3',
    title: 'Build a living top 10',
    body: 'Start from no list. Filter by major, region, and division, then cut to ten names you can defend.',
    to: '/recruiting/targets',
    action: 'Target schools',
  },
  {
    number: '4',
    title: 'Learn how recruiting actually works',
    body: 'The loop, the class-year timeline, and the rules that keep you from wasting a junior year.',
    to: '/recruiting/how-to',
    action: 'How to get recruited',
  },
  {
    number: '5',
    title: 'Write coaches the right way',
    body: 'When to email, when to DM, and sample notes you can send after new film.',
    to: '/recruiting/communication',
    action: 'Coach communication',
  },
  {
    number: '6',
    title: 'Get the film right',
    body: 'What a QB (or any position) tape has to show before a staff will keep watching.',
    to: '/recruiting/film',
    action: 'Game film',
  },
  {
    number: '7',
    title: 'Plan visits and camps',
    body: 'Junior days, unofficial visits, and which camps are worth a Saturday.',
    to: '/recruiting/visits',
    action: 'Visits and camps',
  },
  {
    number: '8',
    title: 'Offers and signing',
    body: 'What a real offer looks like and what to do before anyone signs.',
    to: '/recruiting/offers',
    action: 'Offers and signing',
  },
]

interface RecruitingDashboardPanelProps {
  student: Student
}

export default function RecruitingDashboardPanel({ student }: RecruitingDashboardPanelProps) {
  const today = new Date().toISOString().slice(0, 10)
  const sport = student.sports.find((item) => item.primary) ?? student.sports[0]
  const sportName = sport?.name ?? 'Football'
  const period = currentRecruitingPeriod(sportName, today)
  const upcoming = [...mockCalendarEvents]
    .filter(
      (item) =>
        (item.type === 'Deadline' || item.type === 'Test Date' || item.type === 'Important Date') &&
        !isCampEvent(item) &&
        item.startDate >= today &&
        (item.sport === 'All' || item.sport === sportName),
    )
    .sort((a, b) => a.startDate.localeCompare(b.startDate))
    .slice(0, 4)
  const camps = [...mockCalendarEvents]
    .filter(
      (item) =>
        isCampEvent(item) &&
        item.startDate >= today &&
        (item.sport === 'All' || item.sport === sportName),
    )
    .sort((a, b) => a.startDate.localeCompare(b.startDate))
    .slice(0, 4)
  const nextStep = student.targetSchools.length === 0 ? pathSteps[2] : pathSteps[4]

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
        <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
          <Typography variant="overline" sx={{ color: '#F3C2C2', letterSpacing: '0.14em' }}>
            Recruiting
          </Typography>
          <Typography variant="h4" sx={{ mb: 0.5 }}>
            {fullName(student)}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, opacity: 0.9 }}>
            {primarySport(student)} · Class of {student.graduationYear} · {student.school.city},{' '}
            {student.school.state}
          </Typography>
          <Typography variant="body2" sx={{ maxWidth: 640, opacity: 0.92 }}>
            Start with what is happening now — the calendar, your numbers, and the next camp — then
            walk the path below. You do not need a dream school on day one.
          </Typography>
        </CardContent>
      </Card>

      <Stack spacing={1}>
        <Typography variant="h6">On your board right now</Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, lg: 4 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1 }}>
                  <CalendarMonthOutlined color="primary" />
                  <Typography variant="h6">Recruiting calendar</Typography>
                </Stack>
                {period ? (
                  <Chip size="small" color="secondary" label={period.type} sx={{ mb: 1 }} />
                ) : null}
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                  {period
                    ? `${period.title} through ${formatDateRange(period.endDate, period.endDate)}.`
                    : `No published ${sportName} period covers today.`}
                </Typography>
                <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                  Important dates
                </Typography>
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
                <Button component={RouterLink} to="/recruiting/calendar" color="secondary">
                  Open recruiting calendar
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, lg: 4 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1 }}>
                  <SportsFootballOutlined color="secondary" />
                  <Typography variant="h6">Camps and junior days</Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  School-hosted days beat a paid national tour if the staff is already on your list.
                </Typography>
                <List dense>
                  {camps.map((event) => (
                    <ListItem key={event.id} disableGutters>
                      <ListItemText
                        primary={event.title}
                        secondary={formatDateRange(event.startDate, event.endDate)}
                      />
                    </ListItem>
                  ))}
                </List>
                <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
                  <Button component={RouterLink} to="/recruiting/visits" size="small">
                    Visits and camps
                  </Button>
                  <Button component={RouterLink} to="/recruiting/calendar" size="small">
                    Full calendar
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, lg: 4 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1 }}>
                  <FitnessCenterOutlined color="secondary" />
                  <Typography variant="h6">Your target list</Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {student.targetSchools.length}/{TARGET_LIST_GOAL} schools
                  {student.targetSchools.length
                    ? ` · ${mixSummary(student.targetSchools.map((item) => item.fit))}`
                    : ' · empty'}
                </Typography>
                {student.targetSchools.length === 0 ? (
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                    After you read your position numbers, walk major, region, and division until you
                    can defend 10 names.
                  </Typography>
                ) : (
                  <List dense>
                    {[...student.targetSchools]
                      .sort((a, b) => a.rank - b.rank)
                      .slice(0, 4)
                      .map((item) => (
                        <ListItem key={item.collegeId} disableGutters>
                          <ListItemText
                            primary={`${item.rank}. ${findCollege(item.collegeId)?.name ?? item.collegeId}`}
                            secondary={item.fit}
                          />
                        </ListItem>
                      ))}
                  </List>
                )}
                <Button component={RouterLink} to="/recruiting/targets" color="secondary">
                  {student.targetSchools.length ? 'Edit top 10' : 'Start the school list'}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Stack>

      <PositionFitPreview
        sport={sportName}
        position={sport?.positions[0] ?? 'Quarterback'}
        profile={student.profile}
      />

      <Stack spacing={1.5}>
        <Box>
          <Typography variant="h6">Walk this path</Typography>
          <Typography variant="body2" color="text.secondary">
            Do these in order the first time. After that, jump to whatever is stale — film, the
            list, or a coach note.
          </Typography>
        </Box>
        <AlertNext step={nextStep} emptyList={student.targetSchools.length === 0} />
        <Grid container spacing={2}>
          {pathSteps.map((step) => (
            <Grid key={step.number} size={{ xs: 12, md: 6 }}>
              <Card sx={{ height: '100%' }}>
                <CardActionArea component={RouterLink} to={step.to} sx={{ height: '100%' }}>
                  <CardContent>
                    <Stack direction="row" spacing={1.5} sx={{ alignItems: 'flex-start' }}>
                      <Box
                        sx={{
                          width: 36,
                          height: 36,
                          borderRadius: '50%',
                          bgcolor: step.number === '1' ? 'secondary.main' : 'primary.main',
                          color: 'white',
                          display: 'grid',
                          placeItems: 'center',
                          fontWeight: 800,
                          flexShrink: 0,
                        }}
                      >
                        {step.number}
                      </Box>
                      <Box>
                        <Typography variant="subtitle1">{step.title}</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.75 }}>
                          {step.body}
                        </Typography>
                        <Typography variant="body2" color="secondary" sx={{ fontWeight: 700 }}>
                          {step.action}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Stack>

      <Stack spacing={1.5}>
        <Typography variant="h6">Also keep these current</Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ height: '100%' }}>
              <CardActionArea component={RouterLink} to="/recruiting/guidelines" sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="subtitle1">Guidelines</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Eligibility first, honest level, and how to stay safe.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ height: '100%' }}>
              <CardActionArea component={RouterLink} to="/recruiting/resources" sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="subtitle1">Resources</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Official sites and tools — not paid “guaranteed offer” services.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ height: '100%' }}>
              <CardActionArea component={RouterLink} to="/coaches" sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="subtitle1">Coach search</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Find staff for the schools on your top 10 and keep notes.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ height: '100%' }}>
              <CardActionArea component={RouterLink} to="/training" sx={{ height: '100%' }}>
                <CardContent>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 0.5 }}>
                    <LibraryBooksOutlined color="secondary" fontSize="small" />
                    <Typography variant="subtitle1">Training library</Typography>
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    Short videos and checklists for eligibility and outreach.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  )
}

function AlertNext({
  step,
  emptyList,
}: {
  step: (typeof pathSteps)[number]
  emptyList: boolean
}) {
  return (
    <Card sx={{ bgcolor: '#E6EEFF' }}>
      <CardContent>
        <Typography variant="overline" color="primary" sx={{ letterSpacing: '0.08em' }}>
          Suggested next step
        </Typography>
        <Typography variant="subtitle1">{emptyList ? 'Start the school list after you know your numbers' : step.title}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {emptyList
            ? 'Finish the profile and position page, then build a top 10. A list of ten Power logos is not a plan.'
            : step.body}
        </Typography>
        <Button component={RouterLink} to={emptyList ? '/recruiting/targets' : step.to} color="secondary">
          {emptyList ? 'Build a top 10' : step.action}
        </Button>
      </CardContent>
    </Card>
  )
}
