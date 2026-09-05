import {
  Alert,
  Autocomplete,
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import { useMemo, useState } from 'react'
import {
  compareMetric,
  findPositionRequirement,
  fitChipLabel,
  formatStudentMetric,
  POSITION_REQUIREMENTS_SOURCE,
  positionsForSport,
  requirementSports,
  studentMetricValue,
} from '../../../mock/positionRequirements'
import type { RecruitingProfile, Student } from '../../../types'

function fitColor(fit: ReturnType<typeof compareMetric>): 'default' | 'success' | 'warning' {
  if (fit === 'in' || fit === 'above') return 'success'
  if (fit === 'below') return 'warning'
  return 'default'
}

interface PositionRequirementsPanelProps {
  student: Student
}

export default function PositionRequirementsPanel({ student }: PositionRequirementsPanelProps) {
  const primary = student.sports.find((item) => item.primary) ?? student.sports[0]
  const sports = requirementSports()
  const defaultSport = sports.includes(primary?.name ?? '') ? primary.name : 'Football'
  const defaultPositions = positionsForSport(defaultSport)
  const defaultPosition = defaultPositions.includes(primary?.positions[0] ?? '')
    ? primary.positions[0]
    : defaultPositions[0]

  const [sport, setSport] = useState(defaultSport)
  const [position, setPosition] = useState(defaultPosition)
  const positions = useMemo(() => positionsForSport(sport), [sport])
  const requirement = useMemo(() => findPositionRequirement(sport, position), [sport, position])
  const profile = student.profile

  return (
    <Stack spacing={2}>
      <Card>
        <CardContent>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={2}
            sx={{ justifyContent: 'space-between', alignItems: { md: 'flex-end' } }}
          >
            <Stack spacing={0.5} sx={{ flex: 1 }}>
              <Typography variant="h6">What coaches typically want</Typography>
              <Typography variant="body2" color="text.secondary">
                Defaults to {primary?.name ?? 'Football'} {primary?.positions[0] ?? 'Quarterback'} from
                your profile. Switch sports to see other boards.
              </Typography>
            </Stack>
            <Autocomplete
              size="small"
              options={sports}
              value={sport}
              onChange={(_event, value) => {
                if (!value) return
                setSport(value)
                setPosition(positionsForSport(value)[0])
              }}
              sx={{ minWidth: 220 }}
              renderInput={(params) => <TextField {...params} label="Sport" />}
            />
            <Autocomplete
              size="small"
              options={positions}
              value={positions.includes(position) ? position : positions[0]}
              onChange={(_event, value) => {
                if (value) setPosition(value)
              }}
              sx={{ minWidth: 240 }}
              renderInput={(params) => <TextField {...params} label="Position" />}
            />
          </Stack>
        </CardContent>
      </Card>

      <Alert severity="info">{requirement.overview}</Alert>

      <YourMeasurables profile={profile} />

      {requirement.divisions.map((division) => (
        <Card key={division.division}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 1.5 }}>
              {division.division}
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Metric</TableCell>
                    <TableCell align="right">Typical range</TableCell>
                    <TableCell align="right">You</TableCell>
                    <TableCell align="right">Fit</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {division.metrics.map((metric) => {
                    const fit = compareMetric(studentMetricValue(profile, metric.id), metric)
                    return (
                      <TableRow key={metric.id}>
                        <TableCell>{metric.label}</TableCell>
                        <TableCell align="right">{metric.typical}</TableCell>
                        <TableCell align="right">{formatStudentMetric(profile, metric.id)}</TableCell>
                        <TableCell align="right">
                          <Chip
                            size="small"
                            color={fitColor(fit)}
                            label={fitChipLabel(fit, metric.better)}
                          />
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      ))}

      {requirement.notes.map((note) => (
        <Typography key={note} variant="body2" color="text.secondary">
          {note}
        </Typography>
      ))}
      <Typography variant="caption" color="text.secondary">
        {POSITION_REQUIREMENTS_SOURCE}
      </Typography>
    </Stack>
  )
}

function YourMeasurables({ profile }: { profile: RecruitingProfile }) {
  const items = [
    { label: 'Height', value: formatStudentMetric(profile, 'height') },
    { label: 'Weight', value: formatStudentMetric(profile, 'weight') },
    { label: '40-yard', value: formatStudentMetric(profile, 'forty') },
    { label: 'Shuttle', value: formatStudentMetric(profile, 'shuttle') },
    { label: '3-cone', value: formatStudentMetric(profile, 'threeCone') },
    { label: 'Vertical', value: formatStudentMetric(profile, 'vertical') },
    { label: 'Broad jump', value: formatStudentMetric(profile, 'broadJump') },
  ]

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 1.5 }}>
          Your measurables
        </Typography>
        <Grid container spacing={1.5}>
          {items.map((item) => (
            <Grid key={item.label} size={{ xs: 6, sm: 4, md: 'grow' }}>
              <Typography variant="caption" color="text.secondary">
                {item.label}
              </Typography>
              <Typography variant="subtitle1" color="primary">
                {item.value}
              </Typography>
            </Grid>
          ))}
        </Grid>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1.5 }}>
          Update these on the recruiting profile so the fit chips stay current.
        </Typography>
      </CardContent>
    </Card>
  )
}
