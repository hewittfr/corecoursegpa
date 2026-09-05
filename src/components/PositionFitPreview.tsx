import {
  Alert,
  Box,
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
  Tooltip,
  Typography,
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import {
  bestDivisionFitForMetric,
  compareMetric,
  findPositionRequirement,
  fitChipLabel,
  formatStudentMetric,
  metricForDivision,
  overallMetricRecommendation,
  previewDivisionColumns,
  previewMetrics,
  studentMetricValue,
  type DivisionFitLabel,
  type FitLabel,
} from '../mock/positionRequirements'
import type { RecruitingProfile } from '../types'

const FIT_COLOR: Record<FitLabel, string> = {
  in: '#1B7A4E',
  above: '#1B7A4E',
  below: '#A52828',
  none: '#5A6072',
}

const DIVISION_FIT_STYLE: Record<DivisionFitLabel, { bgcolor: string; color: string }> = {
  D1: { bgcolor: '#222A5B', color: '#ffffff' },
  D2: { bgcolor: '#3D467C', color: '#ffffff' },
  D3: { bgcolor: '#C47B17', color: '#ffffff' },
  NAIA: { bgcolor: '#3A4A86', color: '#ffffff' },
  'Below NAIA': { bgcolor: '#A52828', color: '#ffffff' },
  'Not entered': { bgcolor: '#E6EEFF', color: '#222A5B' },
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
  const metrics = previewMetrics(requirement)
  const columns = previewDivisionColumns(requirement)
  const recommendation = overallMetricRecommendation(profile, metrics, columns)

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
              Typical D1, D2, D3, and NAIA ranges versus your {requirement.position} profile.
            </Typography>
          </Stack>
          <Button component={RouterLink} to="/recruiting/positions" color="secondary" size="small">
            Full breakdown
          </Button>
        </Stack>
        <Box sx={{ overflowX: 'auto' }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Metric</TableCell>
                <TableCell align="right">You</TableCell>
                {columns.map((column) => (
                  <TableCell key={column.label} align="right">
                    {column.label}
                  </TableCell>
                ))}
                <TableCell align="right">Your fit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {metrics.map((metric) => {
                const value = studentMetricValue(profile, metric.id)
                const bestFit = bestDivisionFitForMetric(value, metric.id, columns)
                return (
                  <TableRow key={metric.id}>
                    <TableCell>{metric.label}</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>
                      {formatStudentMetric(profile, metric.id)}
                    </TableCell>
                    {columns.map((column) => {
                      const divisionMetric = metricForDivision(column.division, metric.id)
                      if (!divisionMetric) {
                        return (
                          <TableCell key={column.label} align="right">
                            —
                          </TableCell>
                        )
                      }
                      const fit = compareMetric(value, divisionMetric)
                      return (
                        <TableCell key={column.label} align="right" sx={{ whiteSpace: 'nowrap' }}>
                          <Tooltip title={`${column.division.division}: ${fitChipLabel(fit, divisionMetric.better)}`}>
                            <Typography variant="body2" sx={{ color: FIT_COLOR[fit], fontWeight: 600 }}>
                              {divisionMetric.typical}
                            </Typography>
                          </Tooltip>
                        </TableCell>
                      )
                    })}
                    <TableCell align="right">
                      <Tooltip title={bestFit.detail}>
                        <Chip
                          size="small"
                          label={bestFit.label}
                          sx={{ ...DIVISION_FIT_STYLE[bestFit.label], fontWeight: 700 }}
                        />
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Box>
        <Alert severity="info" sx={{ mt: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
            {recommendation.headline}
          </Typography>
          <Typography variant="body2">{recommendation.body}</Typography>
        </Alert>
      </CardContent>
    </Card>
  )
}
