import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Link,
  Stack,
  Typography,
} from '@mui/material'
import ArrowBack from '@mui/icons-material/ArrowBack'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { Link as RouterLink, Navigate, useLocation } from 'react-router-dom'
import PageHeader from '../../components/PageHeader'
import { useAppSelector } from '../../app/hooks'
import {
  communicationWhen,
  filmBasics,
  filmBySport,
  howToGetRecruited,
  offersAndSigning,
  RECRUITING_SECTIONS,
  recruitingGuidelines,
  recruitingResources,
  sampleMessages,
  visitsAndCamps,
  type GuideCard,
  type RecruitingSectionId,
} from '../../mock/recruitingContent'
import PositionRequirementsPanel from './recruiting/PositionRequirementsPanel'
import RecruitingDashboardPanel from './recruiting/RecruitingDashboardPanel'
import RecruitingProfilePanel from './recruiting/RecruitingProfilePanel'
import TargetSchoolsPanel from './recruiting/TargetSchoolsPanel'

function isSection(value: string | undefined): value is RecruitingSectionId {
  return RECRUITING_SECTIONS.some((item) => item.id === value)
}

function GuideCards({ cards }: { cards: GuideCard[] }) {
  return (
    <Stack spacing={2}>
      {cards.map((card) => (
        <Card key={card.title}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: card.body ? 1 : 1.5 }}>
              {card.title}
            </Typography>
            {card.body ? (
              <Typography variant="body2" color="text.secondary" sx={{ mb: card.bullets ? 1.5 : 0 }}>
                {card.body}
              </Typography>
            ) : null}
            {card.bullets ? (
              <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
                {card.bullets.map((item) => (
                  <Typography key={item} component="li" variant="body2" sx={{ mb: 0.75 }}>
                    {item}
                  </Typography>
                ))}
              </Box>
            ) : null}
          </CardContent>
        </Card>
      ))}
    </Stack>
  )
}

function CommunicationPanel() {
  return (
    <Stack spacing={2}>
      <GuideCards cards={communicationWhen} />
      {sampleMessages.map((sample) => (
        <Card key={sample.title}>
          <CardContent>
            <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap', mb: 1 }}>
              <Typography variant="h6">{sample.title}</Typography>
              <Chip size="small" label={sample.channel} color={sample.channel === 'Email' ? 'primary' : 'secondary'} />
            </Stack>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
              {sample.when}
            </Typography>
            <Box
              sx={{
                bgcolor: '#F5F7FB',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                p: 2,
                whiteSpace: 'pre-wrap',
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                fontSize: 13,
                lineHeight: 1.55,
              }}
            >
              {sample.body}
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
              Copy, then replace the brackets and coach name. Keep it under a minute to read.
            </Typography>
          </CardContent>
        </Card>
      ))}
      <Alert severity="info">
        Track every send and reply in{' '}
        <Link component={RouterLink} to="/coaches">
          Coach Search
        </Link>
        . Check{' '}
        <Link component={RouterLink} to="/recruiting/calendar">
          the recruiting calendar
        </Link>{' '}
        before you assume a coach is ignoring you during a dead period.
      </Alert>
    </Stack>
  )
}

function FilmPanel() {
  const student = useAppSelector((state) => state.student.current)
  const primary = student.sports.find((item) => item.primary)?.name ?? 'Football'

  return (
    <Stack spacing={2}>
      <GuideCards cards={filmBasics} />
      <Typography variant="h6">What coaches look for by sport</Typography>
      {filmBySport.map((sport) => (
        <Accordion key={sport.sport} defaultExpanded={sport.sport === primary} disableGutters>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography sx={{ fontWeight: 700 }}>{sport.sport}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
              {sport.overview}
            </Typography>
            <Stack spacing={1.5}>
              {sport.positions.map((position) => (
                <Box key={position.name}>
                  <Typography variant="subtitle2">{position.name}</Typography>
                  <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
                    {position.lookingFor.map((item) => (
                      <Typography key={item} component="li" variant="body2" sx={{ mb: 0.5 }}>
                        {item}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              ))}
            </Stack>
          </AccordionDetails>
        </Accordion>
      ))}
    </Stack>
  )
}

function ResourcesPanel() {
  return (
    <Stack spacing={2}>
      <Alert severity="info">
        Use tools. Do not buy a “guaranteed scholarship.” Your counselor, high school coach, and
        film will do more than a paid mass blast.
      </Alert>
      {recruitingResources.map((resource) => (
        <Card key={resource.name}>
          <CardContent>
            <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap', mb: 0.5, alignItems: 'center' }}>
              <Typography variant="h6">{resource.name}</Typography>
              <Chip size="small" label={resource.kind} />
            </Stack>
            <Typography variant="body2" color="text.secondary">
              {resource.note}
            </Typography>
            {resource.href ? (
              <Button
                href={resource.href}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{ mt: 1, px: 0 }}
              >
                Open site
              </Button>
            ) : null}
          </CardContent>
        </Card>
      ))}
    </Stack>
  )
}

export default function RecruitingPage() {
  const location = useLocation()
  const student = useAppSelector((state) => state.student.current)
  const section = location.pathname.split('/').filter(Boolean)[1]

  if (!section || section === 'dashboard') {
    return <RecruitingDashboardPanel student={student} />
  }
  if (!isSection(section)) {
    return <Navigate to="/recruiting" replace />
  }

  const label = RECRUITING_SECTIONS.find((item) => item.id === section)?.label ?? 'Recruiting'

  return (
    <Stack spacing={2}>
      <Button
        component={RouterLink}
        to="/recruiting"
        startIcon={<ArrowBack />}
        sx={{ alignSelf: 'flex-start', px: 0 }}
      >
        Back to recruiting
      </Button>
      <PageHeader title={label} subtitle="Part of the recruiting path. Return to the hub when you are done." />
      {section === 'profile' ? <RecruitingProfilePanel /> : null}
      {section === 'positions' ? <PositionRequirementsPanel student={student} /> : null}
      {section === 'targets' ? <TargetSchoolsPanel student={student} /> : null}
      {section === 'guidelines' ? <GuideCards cards={recruitingGuidelines} /> : null}
      {section === 'how-to' ? <GuideCards cards={howToGetRecruited} /> : null}
      {section === 'communication' ? <CommunicationPanel /> : null}
      {section === 'film' ? <FilmPanel /> : null}
      {section === 'visits' ? <GuideCards cards={visitsAndCamps} /> : null}
      {section === 'offers' ? <GuideCards cards={offersAndSigning} /> : null}
      {section === 'resources' ? <ResourcesPanel /> : null}
    </Stack>
  )
}
