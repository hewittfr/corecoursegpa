import {
  Alert,
  Autocomplete,
  Card,
  CardContent,
  Link,
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
  findStateAverages,
  FLORIDA_AVERAGES_SOURCE,
  FLORIDA_SOURCE_LINKS,
  STATE_AVERAGE_YEARS,
  STATE_AVERAGES_SOURCE,
  STATE_TEST_AVERAGES,
} from '../mock/stateTestAverages'
import type { TestScore } from '../types'

function formatPct(value: number | null): string {
  return value == null ? '—' : `${value}%`
}

function formatCount(value: number): string {
  return value.toLocaleString('en-US')
}

function latestScore(scores: TestScore[], type: TestScore['type']): number | null {
  const match = scores
    .filter((item) => item.type === type)
    .sort((a, b) => b.testDate.localeCompare(a.testDate))[0]
  return match ? match.score : null
}

interface StateAveragesCardProps {
  schoolState: string
  testScores: TestScore[]
}

export default function StateAveragesCard({ schoolState, testScores }: StateAveragesCardProps) {
  const defaultCode = STATE_TEST_AVERAGES.some((item) => item.code === schoolState)
    ? schoolState
    : 'FL'
  const [stateCode, setStateCode] = useState(defaultCode)
  const selected = useMemo(() => findStateAverages(stateCode), [stateCode])
  const satScore = latestScore(testScores, 'SAT')
  const actScore = latestScore(testScores, 'ACT')
  const latest = selected.years[2025]
  const isFlorida = selected.code === 'FL'
  const showSatSections = STATE_AVERAGE_YEARS.some((year) => selected.years[year].satErw != null)

  return (
    <Card>
      <CardContent>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{ mb: 2, justifyContent: 'space-between' }}
        >
          <Stack spacing={0.5}>
            <Typography variant="h6">State averages for college admissions</Typography>
            <Typography variant="body2" color="text.secondary">
              Mean SAT and ACT scores for the last three graduating classes. Defaults to{' '}
              {findStateAverages(defaultCode).name}.
            </Typography>
          </Stack>
          <Autocomplete
            size="small"
            options={STATE_TEST_AVERAGES}
            value={selected}
            onChange={(_event, value) => {
              if (value) setStateCode(value.code)
            }}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.code === value.code}
            sx={{ minWidth: 260 }}
            renderInput={(params) => <TextField {...params} label="State" />}
          />
        </Stack>

        <Alert severity="info" sx={{ mb: 2 }}>
          These are statewide means for the graduating class, not college cutoffs. States that test
          nearly every graduate usually post lower averages than opt-in states. Many colleges still
          want a score on file even when NCAA eligibility does not require one.
        </Alert>

        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Graduating class</TableCell>
                <TableCell align="right">SAT mean</TableCell>
                {showSatSections ? <TableCell align="right">SAT ERW</TableCell> : null}
                {showSatSections ? <TableCell align="right">SAT Math</TableCell> : null}
                <TableCell align="right">SAT tested</TableCell>
                <TableCell align="right">ACT composite</TableCell>
                <TableCell align="right">ACT tested</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {STATE_AVERAGE_YEARS.map((year) => {
                const row = selected.years[year]
                return (
                  <TableRow key={year}>
                    <TableCell>{year}</TableCell>
                    <TableCell align="right">{row.sat}</TableCell>
                    {showSatSections ? (
                      <TableCell align="right">{row.satErw ?? '—'}</TableCell>
                    ) : null}
                    {showSatSections ? (
                      <TableCell align="right">{row.satMath ?? '—'}</TableCell>
                    ) : null}
                    <TableCell align="right">
                      {formatPct(row.satPct)}
                      {row.satTakers != null && row.satGraduates != null ? (
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                          {formatCount(row.satTakers)} of {formatCount(row.satGraduates)}
                        </Typography>
                      ) : null}
                    </TableCell>
                    <TableCell align="right">{row.act.toFixed(1)}</TableCell>
                    <TableCell align="right">{formatPct(row.actPct)}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {satScore != null || actScore != null ? (
          <Typography variant="body2" sx={{ mt: 2 }}>
            {satScore != null
              ? `Your latest SAT (${satScore}) is ${satScore - latest.sat >= 0 ? '+' : ''}${satScore - latest.sat} versus the ${selected.name} class of 2025 SAT mean.`
              : null}
            {satScore != null && actScore != null ? ' ' : null}
            {actScore != null
              ? `Your latest ACT (${actScore}) is ${actScore - latest.act >= 0 ? '+' : ''}${(actScore - latest.act).toFixed(1)} versus the ${selected.name} class of 2025 ACT mean.`
              : null}
          </Typography>
        ) : null}

        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
          Sources: {isFlorida ? FLORIDA_AVERAGES_SOURCE : STATE_AVERAGES_SOURCE}
        </Typography>
        {isFlorida ? (
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
            Official reports:{' '}
            {FLORIDA_SOURCE_LINKS.map((item, index) => (
              <span key={item.href}>
                {index > 0 ? ' · ' : null}
                <Link href={item.href} target="_blank" rel="noopener noreferrer">
                  {item.label}
                </Link>
              </span>
            ))}
          </Typography>
        ) : null}
      </CardContent>
    </Card>
  )
}
