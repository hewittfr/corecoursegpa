import CheckCircle from '@mui/icons-material/CheckCircle'
import HourglassEmpty from '@mui/icons-material/HourglassEmpty'
import RadioButtonUnchecked from '@mui/icons-material/RadioButtonUnchecked'
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
import { trainingVideoById } from '../../mock/trainingVideos'
import type { TrainingStatus, TrainingTopic } from '../../types'

const FILTER_TILES: {
  id: TrainingStatus | 'All'
  label: string
  bgcolor: string
  color: string
  icon: typeof CheckCircle | typeof HourglassEmpty | typeof RadioButtonUnchecked | null
}[] = [
  { id: 'All', label: 'All', bgcolor: '#222A5B', color: '#ffffff', icon: null },
  { id: 'Complete', label: 'Complete', bgcolor: '#1B7A4E', color: '#ffffff', icon: CheckCircle },
  { id: 'In Progress', label: 'In Progress', bgcolor: '#C47B17', color: '#ffffff', icon: HourglassEmpty },
  { id: 'Not Started', label: 'Not Started', bgcolor: '#E6EEFF', color: '#222A5B', icon: RadioButtonUnchecked },
]

const STATUS_STYLE: Record<
  TrainingStatus,
  { bgcolor: string; color: string; icon: typeof CheckCircle | typeof HourglassEmpty | typeof RadioButtonUnchecked }
> = {
  Complete: { bgcolor: '#1B7A4E', color: '#ffffff', icon: CheckCircle },
  'In Progress': { bgcolor: '#C47B17', color: '#ffffff', icon: HourglassEmpty },
  'Not Started': { bgcolor: '#E6EEFF', color: '#222A5B', icon: RadioButtonUnchecked },
}

function StatusChip({ status }: { status: TrainingStatus }) {
  const style = STATUS_STYLE[status]
  const Icon = style.icon
  return (
    <Chip
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
  const active = mockTrainingTopics.find((topic) => topic.id === activeId) ?? mockTrainingTopics[0]
  const video = trainingVideoById[active.id]

  const counts = useMemo(() => {
    return mockTrainingTopics.reduce(
      (acc, topic) => {
        acc[topic.status] += 1
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

      <Grid container spacing={1.5}>
        {FILTER_TILES.map((tile) => {
          const count = tile.id === 'All' ? mockTrainingTopics.length : counts[tile.id]
          const selected = statusFilter === tile.id
          const Icon = tile.icon
          return (
            <Grid key={tile.id} size={{ xs: 6, sm: 3 }}>
              <Card
                sx={{
                  height: '100%',
                  bgcolor: tile.bgcolor,
                  color: tile.color,
                  border: selected ? '2px solid #A52828' : '2px solid transparent',
                  boxShadow: selected ? '0 8px 20px rgba(34, 42, 91, 0.18)' : 'none',
                  opacity: selected ? 1 : 0.78,
                }}
              >
                <CardActionArea
                  onClick={() => setStatusFilter(tile.id)}
                  sx={{ height: '100%', py: 1.5, px: 1.5 }}
                >
                  <Stack spacing={0.5} sx={{ alignItems: 'center' }}>
                    {Icon ? <Icon sx={{ fontSize: 20, color: tile.color }} /> : null}
                    <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                      {tile.label}
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 800, lineHeight: 1 }}>
                      {count}
                    </Typography>
                  </Stack>
                </CardActionArea>
              </Card>
            </Grid>
          )
        })}
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
          <Card>
            <CardContent>
              <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap', mb: 1.5 }}>
                <Chip label={active.category} color="primary" />
                <StatusChip status={active.status} />
              </Stack>
              <Typography variant="h5" sx={{ mb: 1 }}>
                {active.title}
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                {active.description}
              </Typography>
              {video ? (
                <>
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      pt: '56.25%',
                      borderRadius: 1,
                      overflow: 'hidden',
                      bgcolor: '#111',
                      mb: 1,
                    }}
                  >
                    <Box
                      component="iframe"
                      src={`https://www.youtube.com/embed/${video.videoId}`}
                      title={active.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        border: 0,
                        width: '100%',
                        height: '100%',
                      }}
                    />
                  </Box>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
                    Demo clip matched to this topic. Not official NCAA coursework.
                  </Typography>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Mock summary
                  </Typography>
                  <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
                    {video.takeaways.map((line) => (
                      <Typography key={line} component="li" variant="body2" sx={{ mb: 0.75 }}>
                        {line}
                      </Typography>
                    ))}
                  </Box>
                </>
              ) : (
                <Typography variant="body2">No demo video is mapped to this topic yet.</Typography>
              )}
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
      <ListItemText primary={topic.title} secondary={topic.category} sx={{ mr: 1 }} />
      <StatusChip status={topic.status} />
    </ListItemButton>
  )
}
