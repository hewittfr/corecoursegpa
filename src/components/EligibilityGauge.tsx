import CheckCircle from '@mui/icons-material/CheckCircle'
import ErrorOutline from '@mui/icons-material/ErrorOutlineOutlined'
import RadioButtonUnchecked from '@mui/icons-material/RadioButtonUnchecked'
import { Box, Button, Chip, LinearProgress, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import type { EligibilityColumn } from '../types'
import {
  buildEligibilityGauge,
  type EligibilityRequirement,
  type EligibilityTone,
} from '../utils/format'

const TONE_COLOR: Record<EligibilityTone, string> = {
  success: '#1B7A4E',
  warning: '#C47B17',
  danger: '#A52828',
}

interface EligibilityGaugeProps {
  column: EligibilityColumn
}

export default function EligibilityGauge({ column }: EligibilityGaugeProps) {
  const model = buildEligibilityGauge(column)
  const color = TONE_COLOR[model.tone]

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '280px 1fr' },
        gap: { xs: 2, md: 4 },
        alignItems: 'center',
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <GaugeArc percent={model.percent} color={color} />
        <Chip
          label={model.label}
          size="small"
          sx={{
            mt: -1,
            bgcolor: color,
            color: 'white',
            fontWeight: 700,
          }}
        />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1.25 }}>
          Division I eligibility progress
        </Typography>
        <Button component={RouterLink} to="/eligibility" color="secondary" size="small" sx={{ mt: 0.5 }}>
          View full status
        </Button>
      </Box>

      <Stack spacing={1.5}>
        <Typography variant="h6">Eligibility status</Typography>
        <Typography variant="body2" color="text.secondary">
          Weighted against NCAA Division I initial-eligibility rules: core GPA, 16 core
          credits, and the 10 / 7-course requirements before senior year.
        </Typography>
        {model.requirements.map((requirement) => (
          <RequirementRow key={requirement.id} requirement={requirement} />
        ))}
      </Stack>
    </Box>
  )
}

function RequirementRow({ requirement }: { requirement: EligibilityRequirement }) {
  const icon = requirement.met ? (
    <CheckCircle sx={{ color: '#1B7A4E', fontSize: 20 }} />
  ) : requirement.progress >= 50 ? (
    <RadioButtonUnchecked sx={{ color: '#C47B17', fontSize: 20 }} />
  ) : (
    <ErrorOutline sx={{ color: 'secondary.main', fontSize: 20 }} />
  )

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
        {icon}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {requirement.label}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {requirement.detail}
          </Typography>
        </Box>
        <Typography variant="caption" sx={{ fontWeight: 700, color: 'primary.main' }}>
          {requirement.progress}%
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={requirement.progress}
        sx={{
          height: 6,
          borderRadius: 999,
          bgcolor: '#E6EEFF',
          '& .MuiLinearProgress-bar': {
            bgcolor: requirement.met ? '#1B7A4E' : requirement.progress >= 50 ? '#222A5B' : '#A52828',
          },
        }}
      />
    </Box>
  )
}

function GaugeArc({ percent, color }: { percent: number; color: string }) {
  const radius = 84
  const stroke = 14
  const cx = 110
  const cy = 108
  const start = polar(cx, cy, radius, 180)
  const end = polar(cx, cy, radius, 0)
  const valueEnd = polar(cx, cy, radius, 180 - (percent / 100) * 180)
  const track = `M ${start.x} ${start.y} A ${radius} ${radius} 0 0 1 ${end.x} ${end.y}`
  const value =
    percent <= 0
      ? ''
      : `M ${start.x} ${start.y} A ${radius} ${radius} 0 0 1 ${valueEnd.x} ${valueEnd.y}`

  return (
    <Box
      component="svg"
      viewBox="0 0 220 140"
      role="img"
      aria-label={`Eligibility progress ${percent} percent`}
      sx={{ width: '100%', maxWidth: 280, height: 'auto' }}
    >
      <path d={track} fill="none" stroke="#E6EEFF" strokeWidth={stroke} strokeLinecap="round" />
      {value ? (
        <path d={value} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" />
      ) : null}
      <text
        x="110"
        y="96"
        textAnchor="middle"
        fill="#222A5B"
        fontSize="36"
        fontWeight="800"
        fontFamily="Roboto, Helvetica, Arial, sans-serif"
      >
        {percent}%
      </text>
      <text
        x="110"
        y="118"
        textAnchor="middle"
        fill="#5A6072"
        fontSize="12"
        fontFamily="Roboto, Helvetica, Arial, sans-serif"
      >
        complete
      </text>
    </Box>
  )
}

function polar(cx: number, cy: number, radius: number, angle: number) {
  const radians = (angle * Math.PI) / 180
  return {
    x: cx + radius * Math.cos(radians),
    y: cy - radius * Math.sin(radians),
  }
}
