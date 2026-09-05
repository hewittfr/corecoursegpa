import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  FormControlLabel,
  Grid,
  MenuItem,
  Stack,
  Step,
  StepContent,
  StepLabel,
  Stepper,
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
import { Link as RouterLink } from 'react-router-dom'
import { useAppDispatch } from '../../../app/hooks'
import {
  moveTargetSchool,
  removeTargetSchool,
  updateAcademicInterests,
  updatePreferredRegions,
  upsertTargetSchool,
} from '../../../features/student/studentSlice'
import {
  collegeMatches,
  defaultRegionsForState,
  DIVISION_OPTIONS,
  findCollege,
  MAJOR_OPTIONS,
  mixSummary,
  REGION_OPTIONS,
  suggestedFit,
  TARGET_COLLEGES,
  TARGET_LIST_GOAL,
  TARGET_PROCESS,
} from '../../../mock/targetSchools'
import type { College, CollegeRegion, Student, TargetFit } from '../../../types'
import { primarySport } from '../../../utils/format'

const FIT_COLORS: Record<TargetFit, 'error' | 'warning' | 'success'> = {
  Reach: 'error',
  Target: 'warning',
  Likely: 'success',
}

interface TargetSchoolsPanelProps {
  student: Student
}

export default function TargetSchoolsPanel({ student }: TargetSchoolsPanelProps) {
  const dispatch = useAppDispatch()
  const sport = student.sports.find((item) => item.primary)?.name ?? 'Football'
  const [step, setStep] = useState(0)
  const [divisions, setDivisions] = useState<string[]>(['NCAA DII', 'NCAA DIII', 'NAIA', 'NCAA DI'])
  const [requireSport, setRequireSport] = useState(true)
  const [researchIds, setResearchIds] = useState<string[]>([])

  const regions = student.preferredRegions
  const majors = student.academicInterests
  const top10 = [...student.targetSchools].sort((a, b) => a.rank - b.rank)

  const matches = useMemo(
    () =>
      TARGET_COLLEGES.filter((college) =>
        collegeMatches(college, { majors, regions, divisions, sport, requireSport }),
      ),
    [majors, regions, divisions, sport, requireSport],
  )

  const recommendedRegions = defaultRegionsForState(student.school.state)

  return (
    <Stack spacing={2}>
      <Alert severity="info">
        You do not need a dream school today. You need a process: honest athletic level, a major you
        would finish, a region you can visit, then a living top 10. This walkthrough starts from an
        empty list.
      </Alert>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            {primarySport(student)} · Class of {student.graduationYear} · {student.school.city},{' '}
            {student.school.state}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Core GPA {student.eligibility.diActual.coreGpa.toFixed(3)} ·{' '}
            {student.profile.heightFeet}'{student.profile.heightInches}" · {student.profile.weightLbs} lbs
            {student.profile.fortyYard != null ? ` · 40 ${student.profile.fortyYard.toFixed(2)}s` : ''}
            {student.testScores.length === 0 ? ' · No SAT/ACT yet' : ''}
          </Typography>
        </CardContent>
      </Card>

      <TopTenCard student={student} />

      <Stepper activeStep={step} orientation="vertical">
        {TARGET_PROCESS.map((item, index) => (
          <Step key={item.title}>
            <StepLabel
              optional={
                <Typography variant="caption" color="text.secondary">
                  {item.goal}
                </Typography>
              }
            >
              {index + 1}. {item.title}
            </StepLabel>
            <StepContent>
              <Stack spacing={2} sx={{ pb: 2 }}>
                <Typography variant="body2">{item.why}</Typography>
                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 0.75 }}>
                    Do this
                  </Typography>
                  <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
                    {item.doThis.map((line) => (
                      <Typography key={line} component="li" variant="body2" sx={{ mb: 0.5 }}>
                        {line}
                      </Typography>
                    ))}
                  </Box>
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 0.75 }}>
                    Avoid
                  </Typography>
                  <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
                    {item.avoid.map((line) => (
                      <Typography key={line} component="li" variant="body2" sx={{ mb: 0.5 }}>
                        {line}
                      </Typography>
                    ))}
                  </Box>
                </Box>

                {index === 0 ? <StartActions /> : null}
                {index === 1 ? (
                  <ChipPicker
                    label="Majors or clusters"
                    options={[...MAJOR_OPTIONS]}
                    value={majors}
                    onToggle={(option) =>
                      dispatch(updateAcademicInterests(toggleValue(majors, option)))
                    }
                  />
                ) : null}
                {index === 2 ? (
                  <Stack spacing={1}>
                    <Typography variant="body2" color="text.secondary">
                      Suggested first map from {student.school.city}, {student.school.state}:{' '}
                      {recommendedRegions.join(' + ')}.
                    </Typography>
                    <Button
                      size="small"
                      onClick={() => dispatch(updatePreferredRegions(recommendedRegions))}
                      sx={{ alignSelf: 'flex-start' }}
                    >
                      Use the suggested map
                    </Button>
                    <ChipPicker
                      label="Regions you will actually visit"
                      options={REGION_OPTIONS}
                      value={regions}
                      onToggle={(option) =>
                        dispatch(
                          updatePreferredRegions(toggleValue(regions, option as CollegeRegion)),
                        )
                      }
                    />
                  </Stack>
                ) : null}
                {index === 3 ? (
                  <ChipPicker
                    label="Divisions to research"
                    options={[...DIVISION_OPTIONS]}
                    value={divisions}
                    onToggle={(option) => setDivisions(toggleValue(divisions, option))}
                  />
                ) : null}
                {index === 4 ? (
                  <LongList
                    student={student}
                    colleges={matches}
                    researchIds={researchIds}
                    requireSport={requireSport}
                    onRequireSport={setRequireSport}
                    onToggleResearch={(id) => setResearchIds(toggleValue(researchIds, id))}
                  />
                ) : null}
                {index === 5 ? <CutToTen student={student} colleges={matches} /> : null}

                <Stack direction="row" spacing={1}>
                  <Button disabled={index === 0} onClick={() => setStep(index - 1)}>
                    Back
                  </Button>
                  {index < TARGET_PROCESS.length - 1 ? (
                    <Button variant="contained" color="secondary" onClick={() => setStep(index + 1)}>
                      Next
                    </Button>
                  ) : (
                    <Button component={RouterLink} to="/coaches" variant="contained" color="secondary">
                      Find coaches for the top 10
                    </Button>
                  )}
                </Stack>
              </Stack>
            </StepContent>
          </Step>
        ))}
      </Stepper>

      {top10.length >= TARGET_LIST_GOAL ? (
        <Alert severity="success">
          You have a full top {TARGET_LIST_GOAL}: {mixSummary(top10.map((item) => item.fit))}. Re-rank
          after camps, new film, or a test score.
        </Alert>
      ) : null}
    </Stack>
  )
}

function StartActions() {
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
      <Button component={RouterLink} to="/recruiting/positions" color="secondary" size="small">
        Position requirements
      </Button>
      <Button component={RouterLink} to="/eligibility" size="small">
        Eligibility
      </Button>
      <Button component={RouterLink} to="/recruiting/profile" size="small">
        Profile and measurables
      </Button>
    </Stack>
  )
}

function ChipPicker({
  label,
  options,
  value,
  onToggle,
}: {
  label: string
  options: readonly string[]
  value: string[]
  onToggle: (option: string) => void
}) {
  return (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        {label}
      </Typography>
      <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
        {options.map((option) => (
          <Chip
            key={option}
            label={option}
            color={value.includes(option) ? 'primary' : 'default'}
            variant={value.includes(option) ? 'filled' : 'outlined'}
            onClick={() => onToggle(option)}
          />
        ))}
      </Stack>
    </Box>
  )
}

function LongList({
  student,
  colleges,
  researchIds,
  requireSport,
  onRequireSport,
  onToggleResearch,
}: {
  student: Student
  colleges: College[]
  researchIds: string[]
  requireSport: boolean
  onRequireSport: (value: boolean) => void
  onToggleResearch: (id: string) => void
}) {
  const sport = student.sports.find((item) => item.primary)?.name ?? 'Football'

  return (
    <Stack spacing={1.5}>
      <FormControlLabel
        control={
          <Checkbox checked={requireSport} onChange={(event) => onRequireSport(event.target.checked)} />
        }
        label={`Only schools that sponsor ${sport}`}
      />
      <Typography variant="body2" color="text.secondary">
        {colleges.length} schools match your major, region, and division filters. Add them to a
        research list first — the top 10 comes next.
      </Typography>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>School</TableCell>
              <TableCell>Division</TableCell>
              <TableCell>Region</TableCell>
              <TableCell>Suggested fit</TableCell>
              <TableCell align="right">Research</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {colleges.map((college) => {
              const fit = suggestedFit(college, student.profile)
              return (
                <TableRow key={college.id}>
                  <TableCell>
                    <Typography variant="body2">{college.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {college.city}, {college.state} · {college.setting} · {college.size}
                    </Typography>
                  </TableCell>
                  <TableCell>{college.division}</TableCell>
                  <TableCell>{college.region}</TableCell>
                  <TableCell>
                    <Chip size="small" color={FIT_COLORS[fit]} label={fit} />
                  </TableCell>
                  <TableCell align="right">
                    <Button size="small" onClick={() => onToggleResearch(college.id)}>
                      {researchIds.includes(college.id) ? 'Remove' : 'Add'}
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="caption" color="text.secondary">
        Research list: {researchIds.length} schools
      </Typography>
    </Stack>
  )
}

function CutToTen({ student, colleges }: { student: Student; colleges: College[] }) {
  const dispatch = useAppDispatch()
  const full = student.targetSchools.length >= TARGET_LIST_GOAL
  const rows = colleges.slice(0, 16)

  return (
    <Stack spacing={1.5}>
      <Typography variant="body2" color="text.secondary">
        Promote schools into the top {TARGET_LIST_GOAL}. Suggested tags use your current height,
        weight, and the school’s division — change the tag if film says otherwise.
      </Typography>
      {rows.map((college) => {
        const existing = student.targetSchools.find((item) => item.collegeId === college.id)
        const fit = existing?.fit ?? suggestedFit(college, student.profile)
        return (
          <Card key={college.id} variant="outlined">
            <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={1}
                sx={{ justifyContent: 'space-between', alignItems: { sm: 'center' } }}
              >
                <Box>
                  <Typography variant="subtitle2">{college.name}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {college.division} · {college.city}, {college.state} · {college.athleticNote}
                  </Typography>
                </Box>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                  {existing ? (
                    <TextField
                      select
                      size="small"
                      label="Fit"
                      value={existing.fit}
                      onChange={(event) =>
                        dispatch(
                          upsertTargetSchool({
                            collegeId: college.id,
                            fit: event.target.value as TargetFit,
                            rank: existing.rank,
                          }),
                        )
                      }
                      sx={{ minWidth: 120 }}
                    >
                      <MenuItem value="Reach">Reach</MenuItem>
                      <MenuItem value="Target">Target</MenuItem>
                      <MenuItem value="Likely">Likely</MenuItem>
                    </TextField>
                  ) : (
                    <Chip size="small" color={FIT_COLORS[fit]} label={fit} />
                  )}
                  {existing ? (
                    <Button size="small" onClick={() => dispatch(removeTargetSchool(college.id))}>
                      Remove
                    </Button>
                  ) : (
                    <Button
                      size="small"
                      color="secondary"
                      disabled={full}
                      onClick={() =>
                        dispatch(
                          upsertTargetSchool({
                            collegeId: college.id,
                            fit,
                            rank: student.targetSchools.length + 1,
                          }),
                        )
                      }
                    >
                      Add to top 10
                    </Button>
                  )}
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        )
      })}
    </Stack>
  )
}

function TopTenCard({ student }: { student: Student }) {
  const dispatch = useAppDispatch()
  const list = [...student.targetSchools].sort((a, b) => a.rank - b.rank)
  const likelyCount = list.filter((item) => item.fit === 'Likely').length

  return (
    <Card>
      <CardContent>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1}
          sx={{ mb: 1.5, justifyContent: 'space-between', alignItems: { sm: 'center' } }}
        >
          <Typography variant="h6">
            Top {TARGET_LIST_GOAL} · {list.length}/{TARGET_LIST_GOAL}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {list.length ? mixSummary(list.map((item) => item.fit)) : 'Empty — walk the steps below'}
          </Typography>
        </Stack>
        {list.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            When you finish the last step, your ranked schools will show here and stay saved on this
            profile.
          </Typography>
        ) : (
          <Grid container spacing={1}>
            {list.map((item, index) => {
              const college = findCollege(item.collegeId)
              if (!college) return null
              return (
                <Grid key={item.collegeId} size={{ xs: 12 }}>
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={1}
                    sx={{ justifyContent: 'space-between', alignItems: { sm: 'center' } }}
                  >
                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flexWrap: 'wrap' }} useFlexGap>
                      <Typography variant="subtitle2">
                        {item.rank}. {college.name}
                      </Typography>
                      <Chip size="small" color={FIT_COLORS[item.fit]} label={item.fit} />
                      <Typography variant="caption" color="text.secondary">
                        {college.division} · {college.city}, {college.state}
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={0.5}>
                      <Button
                        size="small"
                        disabled={index === 0}
                        onClick={() =>
                          dispatch(moveTargetSchool({ collegeId: item.collegeId, direction: 'up' }))
                        }
                      >
                        Up
                      </Button>
                      <Button
                        size="small"
                        disabled={index === list.length - 1}
                        onClick={() =>
                          dispatch(moveTargetSchool({ collegeId: item.collegeId, direction: 'down' }))
                        }
                      >
                        Down
                      </Button>
                      <Button size="small" onClick={() => dispatch(removeTargetSchool(item.collegeId))}>
                        Remove
                      </Button>
                    </Stack>
                  </Stack>
                </Grid>
              )
            })}
          </Grid>
        )}
        {list.length > 0 && likelyCount < 2 ? (
          <Alert severity="warning" sx={{ mt: 1.5 }}>
            Add at least two Likely schools so the list still works if Reach staffs stay silent.
          </Alert>
        ) : null}
      </CardContent>
    </Card>
  )
}

function toggleValue<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value]
}
