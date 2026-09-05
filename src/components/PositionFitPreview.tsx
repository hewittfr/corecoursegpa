import {
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import {
  compareMetric,
  findPositionRequirement,
  fitChipLabel,
  formatStudentMetric,
  previewMetrics,
  studentMetricValue,
} from '../mock/positionRequirements'
import type { RecruitingProfile } from '../types'

function fitColor(fit: ReturnType<typeof compareMetric>): 'default' | 'success' | 'warning' {
  if (fit === 'in' || fit === 'above') return 'success'
  if (fit === 'below') return 'warning'
  return 'default'
}

interface PositionFitPreviewProps {
  sport: string
  position: string
  profile: RecruitingProfile
  compact?: boolean
}

export default function PositionFitPreview({
  sport,
  position,
  profile,
  compact = false,
}: PositionFitPreviewProps) {
  const requirement = findPositionRequirement(sport, position)
  const topDivision = requirement.divisions[0]
  const metrics = previewMetrics(requirement)

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1}
          sx={{ mb: 1.5, justifyContent: 'space-between', alignItems: { sm: 'center' } }}
        >
          <Stack spacing={0.25}>
            <Typography variant="h6">
              {compact ? 'Position requirements' : `${requirement.sport} · ${requirement.position}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Typical {topDivision.division} ranges versus your profile.
            </Typography>
          </Stack>
          <Button component={RouterLink} to="/recruiting/positions" color="secondary" size="small">
            All divisions
          </Button>
        </Stack>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Metric</TableCell>
              <TableCell align="right">You</TableCell>
              <TableCell align="right">{topDivision.division}</TableCell>
              <TableCell align="right">Fit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {metrics.map((metric) => {
              const fit = compareMetric(studentMetricValue(profile, metric.id), metric)
              return (
                <TableRow key={metric.id}>
                  <TableCell>{metric.label}</TableCell>
                  <TableCell align="right">{formatStudentMetric(profile, metric.id)}</TableCell>
                  <TableCell align="right">{metric.typical}</TableCell>
                  <TableCell align="right">
                    <Chip size="small" color={fitColor(fit)} label={fitChipLabel(fit, metric.better)} />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
