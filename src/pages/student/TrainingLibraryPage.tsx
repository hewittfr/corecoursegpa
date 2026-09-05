import CalendarMonthOutlined from '@mui/icons-material/CalendarMonthOutlined'
import CheckCircle from '@mui/icons-material/CheckCircle'
import FactCheckOutlined from '@mui/icons-material/FactCheckOutlined'
import HourglassEmpty from '@mui/icons-material/HourglassEmpty'
import RadioButtonUnchecked from '@mui/icons-material/RadioButtonUnchecked'
import VideocamOutlined from '@mui/icons-material/VideocamOutlined'
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageHeader from '../../components/PageHeader'
import { mockTrainingTopics } from '../../mock/data'
import type { TrainingStatus, TrainingTopic } from '../../types'

const featuredIcons = [
  <VideocamOutlined key="video" />,
  <FactCheckOutlined key="check" />,
  <CalendarMonthOutlined key="cal" />,
]

const STATUS_ORDER: TrainingStatus[] = ['Complete', 'In Progress', 'Not Started']

const STATUS_STYLE: Record<
  TrainingStatus,
  { bgcolor: string; color: string; icon: typeof CheckCircle | typeof HourglassEmpty | typeof RadioButtonUnchecked }
> = {
  Complete: { bgcolor: '#1B7A4E', color: '#ffffff', icon: CheckCircle },
  'In Progress': { bgcolor: '#C47B17', color: '#ffffff', icon: HourglassEmpty },
  'Not Started': { bgcolor: '#E6EEFF', color: '#222A5B', icon: RadioButtonUnchecked },
}

function StatusChip({ status, size = 'small' }: { status: TrainingStatus; size?: 'small' | 'medium' }) {
  const style = STATUS_STYLE[status]
  const Icon = style.icon
  return (
    <Chip
      size={size}
      icon={<Icon sx={{ color: `${style.color} !important`, fontSize: 16 }} />}
      label={status}
      sx={{ bgcolor: style.bgcolor, color: style.color, fontWeight: 700 }}
    />
  )
}

export default function TrainingLibraryPage() {
  const [searchParams] = useSearchParams()
  const requestedTopic = searchParams.get('topic')
  const [activeId, setActiveId] = useState(
    requestedTopic && mockTrainingTopics.some((topic) => topic.id === requestedTopic)
      ? requestedTopic
      : mockTrainingTopics[0].id,
  )
  const [statusFilter, setStatusFilter] = useState<TrainingStatus | 'All'>('All')

  useEffect(() => {
    if (requestedTopic && mockTrainingTopics.some((topic) => topic.id === requestedTopic)) {
      setActiveId(requestedTopic)
    }
  }, [requestedTopic])
  const featured = mockTrainingTopics.filter((topic) => topic.featured).slice(0, 3)
  const active = mockTrainingTopics.find((topic) => topic.id === activeId) ?? mockTrainingTopics[0]

  const counts = useMemo(() => {
    return STATUS_ORDER.reduce(
      (acc, status) => {
        acc[status] = mockTrainingTopics.filter((topic) => topic.status === status).length
        return acc
      },
      { Complete: 0, 'In Progress': 0, 'Not Started': 0 } as Record<TrainingStatus, number>,
    )
  }, [])

  const visibleTopics = mockTrainingTopics.filter(
    (topic) => statusFilter === 'All' || topic.status === statusFilter,
  )

  return (
    <Stack spacing={3}>
      <PageHeader
        title="Important Recruiting Topics Library"
        subtitle="Each module is marked Complete, In Progress, or Not Started so you can see what still needs attention."
      />

      <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
        <Chip
          label={`All · ${mockTrainingTopics.length}`}
          onClick={() => setStatusFilter('All')}
          variant={statusFilter === 'All' ? 'filled' : 'outlined'}
          color="primary"
        />
        {STATUS_ORDER.map((status) => (
          <Chip
            key={status}
            label={`${status} · ${counts[status]}`}
            onClick={() => setStatusFilter(status)}
            variant={statusFilter === status ? 'filled' : 'outlined'}
            sx={
              statusFilter === status
                ? { bgcolor: STATUS_STYLE[status].bgcolor, color: STATUS_STYLE[status].color }
                : undefined
            }
          />
        ))}
      </Stack>

      <Grid container spacing={2}>
        {featured.map((topic, index) => (
          <Grid key={topic.id} size={{ xs: 12, md: 4 }}>
            <Card>
              <CardActionArea onClick={() => setActiveId(topic.id)} sx={{ p: 1 }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Box
                    sx={{
                      width: 72,
                      height: 72,
                      mx: 'auto',
                      mb: 1.5,
                      borderRadius: '50%',
                      bgcolor: index === 0 ? 'secondary.main' : 'primary.main',
                      color: 'white',
                      display: 'grid',
                      placeItems: 'center',
                    }}
                  >
                    {featuredIcons[index]}
                  </Box>
                  <Typography variant="subtitle1">{topic.title}</Typography>
                  {topic.duration ? (
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                      {topic.duration}
                    </Typography>
                  ) : (
                    <Box sx={{ mb: 1 }} />
                  )}
                  <StatusChip status={topic.status} />
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Important topics
              </Typography>
              <List dense>
                {visibleTopics.map((topic) => (
                  <TopicListItem
                    key={topic.id}
                    topic={topic}
                    selected={topic.id === activeId}
                    onSelect={() => setActiveId(topic.id)}
                  />
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ minHeight: 280 }}>
            <CardContent>
              <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap', mb: 1.5 }}>
                <Chip label={active.category} color="primary" size="small" />
                <StatusChip status={active.status} />
              </Stack>
              <Typography variant="h5" sx={{ mb: 1 }}>
                {active.title}
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                {active.description}
              </Typography>
              <Typography variant="body2">
                This is a mock training article. In a later phase these items will open videos,
                checklists, and official NCAA / NAIA / NJCAA resources.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  )
}

function TopicListItem({
  topic,
  selected,
  onSelect,
}: {
  topic: TrainingTopic
  selected: boolean
  onSelect: () => void
}) {
  return (
    <ListItemButton
      selected={selected}
      onClick={onSelect}
      sx={{
        borderRadius: 1,
        alignItems: 'flex-start !important',
        '&.Mui-selected': {
          bgcolor: '#E6EEFF',
          color: 'primary.main',
        },
      }}
    >
      <ListItemText
        primary={topic.title}
        secondary={topic.category}
        sx={{ mr: 1 }}
      />
      <StatusChip status={topic.status} />
    </ListItemButton>
  )
}
