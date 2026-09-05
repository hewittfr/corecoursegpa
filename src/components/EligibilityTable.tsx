import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import type { EligibilitySummary } from '../types'
import { formatNeeded, formatScore } from '../utils/format'

interface EligibilityTableProps {
  eligibility: EligibilitySummary
  compact?: boolean
}

const highlightLabels = new Set([
  'Core Course Credits Needed',
  'Prior to Senior Year Credits Needed',
  'Prior to Senior Year EMS Needed',
])

export default function EligibilityTable({
  eligibility,
  compact = false,
}: EligibilityTableProps) {
  const columns = [
    eligibility.diActual,
    eligibility.diiActual,
    eligibility.diProjected,
    eligibility.diiProjected,
  ]

  const rows = [
    {
      label: 'Core Course GPA',
      values: columns.map((column) => column.coreGpa.toFixed(3)),
    },
    {
      label: 'Core Course Credits Completed',
      values: columns.map((column) => String(column.creditsCompleted)),
    },
    {
      label: 'Core Course Credits Needed',
      values: columns.map((column) => String(column.creditsNeeded)),
    },
    {
      label: 'Prior to Senior Year Credits Needed',
      values: columns.map((column) => formatNeeded(column.priorToSeniorCreditsNeeded)),
    },
    {
      label: 'Prior to Senior Year EMS Needed',
      values: columns.map((column) => formatNeeded(column.priorToSeniorEmsNeeded)),
    },
    {
      label: 'Your SAT Score',
      values: columns.map((column) => formatScore(column.satScore)),
    },
    {
      label: 'Your ACT Score',
      values: columns.map((column) => formatScore(column.actScore)),
    },
  ]

  const visibleRows = compact ? rows.slice(0, 5) : rows

  return (
    <TableContainer component={Paper} variant="outlined" sx={{ borderColor: '#D7DCE8' }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 700, color: 'primary.main' }}>Category</TableCell>
            <TableCell sx={{ fontWeight: 700, color: 'primary.main' }}>
              Division I (Actual)
            </TableCell>
            <TableCell sx={{ fontWeight: 700, color: 'primary.main' }}>
              Division II (Actual)
            </TableCell>
            <TableCell sx={{ fontWeight: 700, color: 'secondary.main' }}>
              Division I (Projected)
            </TableCell>
            <TableCell sx={{ fontWeight: 700, color: 'secondary.main' }}>
              Division II (Projected)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {visibleRows.map((row) => {
            const highlight = highlightLabels.has(row.label)
            return (
              <TableRow
                key={row.label}
                sx={{ bgcolor: highlight ? '#E6EEFF' : 'background.paper' }}
              >
                <TableCell sx={{ fontWeight: highlight ? 700 : 500 }}>{row.label}</TableCell>
                {row.values.map((value, index) => (
                  <TableCell key={`${row.label}-${index}`}>{value}</TableCell>
                ))}
              </TableRow>
            )
          })}
          {!compact
            ? ['Screen', 'PDF'].map((kind) => (
                <TableRow key={kind}>
                  <TableCell sx={{ fontWeight: 500 }}>Detailed Report ({kind})</TableCell>
                  {columns.map((_, index) => (
                    <TableCell key={`${kind}-${index}`}>
                      <Button size="small" color="secondary">
                        Report ({kind})
                      </Button>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
      {compact ? (
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', p: 1.5 }}>
          Projected columns include in-progress and planned NCAA core courses.
        </Typography>
      ) : null}
    </TableContainer>
  )
}
