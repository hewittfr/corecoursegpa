import CheckCircle from '@mui/icons-material/CheckCircle'
import ChevronRight from '@mui/icons-material/ChevronRight'
import ErrorOutline from '@mui/icons-material/ErrorOutlineOutlined'
import InfoOutlined from '@mui/icons-material/InfoOutlined'
import PlayArrow from '@mui/icons-material/PlayArrow'
import Replay from '@mui/icons-material/Replay'
import WarningAmber from '@mui/icons-material/WarningAmber'
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  LinearProgress,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { mockTrainingTopics } from '../mock/data'
import type { Student } from '../types'
import {
  buildRecruitingProcess,
  type ProcessStep,
  type ProcessStepStatus,
  type ProcessTask,
} from '../utils/recruitingProcess'

const STATUS_STYLE: Record<ProcessStepStatus, { bgcolor: string; color: string }> = {
  Complete: { bgcolor: '#1B7A4E', color: '#ffffff' },
  'In Progress': { bgcolor: '#C47B17', color: '#ffffff' },
  'Not Started': { bgcolor: '#E6EEFF', color: '#222A5B' },
}

interface RecruitingProcessGuideProps {
  student: Student
}

export default function RecruitingProcessGuide({ student }: RecruitingProcessGuideProps) {
  const model = buildRecruitingProcess(student, mockTrainingTopics)

  return (
    <Card>
      <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={1.5}
          sx={{ mb: 2, justifyContent: 'space-between', alignItems: { md: 'flex-start' } }}
        >
          <Box>
            <Typography variant="h6">3-step recruiting process</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, maxWidth: 640 }}>
              Do these in order. Each checkbox is one concrete action — watch, enter, or send.
              Do not skip ahead until the step before it is moving.
            </Typography>
          </Box>
          <Chip
            label={`${model.overallPercent}% overall`}
            sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 700, alignSelf: { xs: 'flex-start', md: 'center' } }}
          />
        </Stack>

        {model.next ? (
          <Box
            sx={{
              mb: 2.5,
              p: 1.75,
              borderRadius: 1.5,
              bgcolor: '#E6EEFF',
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 1.5,
              alignItems: { sm: 'center' },
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <Typography variant="caption" sx={{ fontWeight: 700, color: 'secondary.main', letterSpacing: '0.06em' }}>
                YOUR NEXT STEP · STEP {model.next.step.number}
              </Typography>
              <Typography variant="subtitle1">{model.next.task.label}</Typography>
              <Typography variant="caption" color="text.secondary">
                {model.next.task.hint}
              </Typography>
            </Box>
            <Button
              component={RouterLink}
              to={model.next.task.to}
              variant="contained"
              color="secondary"
              endIcon={<ChevronRight />}
              sx={{ flexShrink: 0 }}
            >
              {model.next.task.cta}
            </Button>
          </Box>
        ) : (
          <Box sx={{ mb: 2.5, p: 1.75, borderRadius: 1.5, bgcolor: '#E8F5EE' }}>
            <Typography variant="subtitle1" sx={{ color: '#1B7A4E' }}>
              All three steps are complete. Keep courses and notes updated as the year goes on.
            </Typography>
          </Box>
        )}

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' },
            gap: 2,
          }}
        >
          {model.steps.map((step, index) => (
            <StepCard
              key={step.number}
              step={step}
              previousComplete={index === 0 || model.steps[index - 1].status === 'Complete'}
              isFocus={model.next?.step.number === step.number}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  )
}

function StepCard({
  step,
  previousComplete,
  isFocus,
}: {
  step: ProcessStep
  previousComplete: boolean
  isFocus: boolean
}) {
  const statusStyle = STATUS_STYLE[step.status]
  const barColor =
    step.status === 'Complete' ? '#1B7A4E' : step.status === 'In Progress' ? '#C47B17' : '#222A5B'

  return (
    <Box
      sx={{
        height: '100%',
        p: 2,
        borderRadius: 1.5,
        border: '2px solid',
        borderColor: isFocus ? 'secondary.main' : 'divider',
        bgcolor: 'background.paper',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Stack direction="row" spacing={1.25} sx={{ alignItems: 'flex-start', mb: 1.25 }}>
        <Box
          sx={{
            width: 36,
            height: 36,
            flexShrink: 0,
            borderRadius: '50%',
            bgcolor: isFocus ? 'secondary.main' : 'primary.main',
            color: 'white',
            display: 'grid',
            placeItems: 'center',
            fontWeight: 800,
          }}
        >
          {step.number}
        </Box>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
            <Typography variant="subtitle1">{step.title}</Typography>
            <Tooltip title={step.why} placement="top">
              <InfoOutlined sx={{ fontSize: 16, color: 'text.secondary' }} />
            </Tooltip>
          </Stack>
          <Typography variant="caption" color="text.secondary">
            {step.goal}
          </Typography>
        </Box>
        {step.completed > 0 ? (
          <Tooltip title={`Review ${step.title.toLowerCase()}`}>
            <IconButton
              component={RouterLink}
              to={step.reviewTo}
              size="small"
              aria-label={`Review ${step.title}`}
              sx={{ mt: -0.5, mr: -0.75 }}
            >
              <Replay fontSize="small" />
            </IconButton>
          </Tooltip>
        ) : null}
      </Stack>

      <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 0.75 }}>
        <Chip size="small" label={step.status} sx={{ ...statusStyle, fontWeight: 700 }} />
        <Typography variant="caption" sx={{ fontWeight: 700, color: 'primary.main' }}>
          {step.completed} of {step.total} · {step.percent}%
        </Typography>
      </Stack>
      <LinearProgress
        variant="determinate"
        value={step.percent}
        sx={{
          height: 8,
          borderRadius: 999,
          mb: 1.5,
          bgcolor: '#E6EEFF',
          '& .MuiLinearProgress-bar': { bgcolor: barColor },
        }}
      />

      {!previousComplete ? (
        <Typography variant="caption" sx={{ display: 'block', mb: 1.25, color: 'secondary.main', fontWeight: 600 }}>
          Finish the previous step first so coaches have something to review.
        </Typography>
      ) : null}

      <Stack spacing={0.75} sx={{ flex: 1 }}>
        {step.tasks.map((task) => (
          <TaskRow key={task.id} task={task} isNext={step.nextTask?.id === task.id} />
        ))}
      </Stack>
    </Box>
  )
}

function TaskRow({ task, isNext }: { task: ProcessTask; isNext: boolean }) {
  const warning = !task.done && (Boolean(task.inProgress) || isNext)
  const actionLabel = task.done ? `Review ${task.label}` : task.cta

  return (
    <Stack direction="row" spacing={0.5} sx={{ alignItems: 'flex-start' }}>
      <Stack
        direction="row"
        spacing={1}
        component={RouterLink}
        to={task.to}
        sx={{
          flex: 1,
          minWidth: 0,
          alignItems: 'flex-start',
          textDecoration: 'none',
          color: 'inherit',
          p: 0.75,
          ml: -0.75,
          borderRadius: 1,
          bgcolor: warning ? '#FDECEC' : 'transparent',
          '&:hover': { bgcolor: warning ? '#F8D4D4' : '#F5F7FB' },
        }}
      >
        {task.done ? (
          <CheckCircle sx={{ fontSize: 18, color: '#1B7A4E', mt: '1px' }} />
        ) : warning ? (
          <WarningAmber sx={{ fontSize: 18, color: '#C47B17', mt: '1px' }} />
        ) : (
          <ErrorOutline sx={{ fontSize: 18, color: 'secondary.main', mt: '1px' }} />
        )}
        <Box sx={{ minWidth: 0 }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: warning ? 700 : 500,
              textDecoration: task.done ? 'line-through' : 'none',
              color: task.done ? 'text.secondary' : 'text.primary',
            }}
          >
            {task.label}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {task.hint}
          </Typography>
        </Box>
      </Stack>
      <Tooltip title={actionLabel}>
        <IconButton
          component={RouterLink}
          to={task.to}
          size="small"
          aria-label={actionLabel}
          sx={{
            mt: 0.15,
            width: 32,
            height: 32,
            bgcolor: task.done ? 'primary.main' : 'secondary.main',
            color: 'white',
            '&:hover': {
              bgcolor: task.done ? 'primary.dark' : 'secondary.dark',
            },
          }}
        >
          <PlayArrow sx={{ fontSize: 20 }} />
        </IconButton>
      </Tooltip>
    </Stack>
  )
}
