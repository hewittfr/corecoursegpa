import SportsFootballOutlined from '@mui/icons-material/SportsFootballOutlined'
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { updateProfile } from '../../../features/student/studentSlice'
import { fullName, locationLine } from '../../../utils/format'

const optionalMetric = Yup.number().transform((value, original) =>
  original === '' || original == null ? null : value,
)

const profileSchema = Yup.object({
  ncaaId: Yup.string(),
  heightFeet: Yup.number().min(4).max(8).required('Height is required'),
  heightInches: Yup.number().min(0).max(11).required('Inches are required'),
  weightLbs: Yup.number().min(80).max(400).required('Weight is required'),
  fortyYard: optionalMetric.min(4).max(7).nullable(),
  shuttle: optionalMetric.min(3.5).max(6).nullable(),
  threeCone: optionalMetric.min(6).max(9).nullable(),
  verticalInches: optionalMetric.min(10).max(50).nullable(),
  broadJumpInches: optionalMetric.min(60).max(150).nullable(),
  athleticHonors: Yup.string().required('Add at least one athletic honor'),
  academicHonors: Yup.string().required('Add at least one academic honor'),
  communityHonors: Yup.string(),
  bio: Yup.string().max(600, 'Keep the bio under 600 characters').required('Bio is required'),
  highlightVideoUrl: Yup.string()
    .transform((value) => (value === '' ? undefined : value))
    .url('Enter a valid URL')
    .optional(),
})

function toLines(value: string): string[] {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

export default function RecruitingProfilePanel() {
  const student = useAppSelector((state) => state.student.current)
  const dispatch = useAppDispatch()
  const profile = student.profile

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 5 }}>
        <Card
          sx={{
            overflow: 'hidden',
            bgcolor: 'primary.main',
            color: 'white',
            height: '100%',
          }}
        >
          <Box sx={{ p: 3, bgcolor: 'primary.dark' }}>
            <Typography variant="h4" sx={{ color: '#F6D365' }}>
              {fullName(student)}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.85 }}>
              {student.school.name}
            </Typography>
          </Box>
          <CardContent>
            <Stack spacing={1.25}>
              <Typography>{locationLine(student)}</Typography>
              <Typography>Class of {student.graduationYear}</Typography>
              <Divider sx={{ borderColor: 'rgba(255,255,255,0.16)' }} />
              <Typography>
                NCAA DI Core GPA {student.eligibility.diActual.coreGpa.toFixed(3)}
              </Typography>
              <Typography>
                NCAA DII Core GPA {student.eligibility.diiActual.coreGpa.toFixed(3)}
              </Typography>
              <Typography>
                {profile.heightFeet}'{profile.heightInches}" · {profile.weightLbs} lbs
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                40 {profile.fortyYard != null ? `${profile.fortyYard.toFixed(2)}s` : '—'} · Shuttle{' '}
                {profile.shuttle != null ? `${profile.shuttle.toFixed(2)}s` : '—'} · 3-cone{' '}
                {profile.threeCone != null ? `${profile.threeCone.toFixed(2)}s` : '—'}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Vertical {profile.verticalInches != null ? `${profile.verticalInches} in` : '—'} · Broad{' '}
                {profile.broadJumpInches != null
                  ? `${Math.floor(profile.broadJumpInches / 12)}'${profile.broadJumpInches % 12}"`
                  : '—'}
              </Typography>
              <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
                {student.sports.map((sport) => (
                  <Chip
                    key={sport.name}
                    icon={<SportsFootballOutlined />}
                    label={`${sport.name} · ${sport.positions.join(', ')}`}
                    sx={{ bgcolor: 'secondary.main', color: 'white' }}
                  />
                ))}
              </Stack>
              <Divider sx={{ borderColor: 'rgba(255,255,255,0.16)' }} />
              <Typography variant="subtitle2">Athletic honors</Typography>
              {profile.athleticHonors.map((item) => (
                <Typography key={item} variant="body2">
                  {item}
                </Typography>
              ))}
              <Typography variant="subtitle2">Academic & community</Typography>
              {[...profile.academicHonors, ...profile.communityHonors].map((item) => (
                <Typography key={item} variant="body2">
                  {item}
                </Typography>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, md: 7 }}>
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Update profile
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              This is the snapshot coaches should be able to scan in under a minute. Keep height,
              weight, combine times, honors, and film current.
            </Typography>
            <Formik
              enableReinitialize
              initialValues={{
                ncaaId: profile.ncaaId,
                heightFeet: profile.heightFeet,
                heightInches: profile.heightInches,
                weightLbs: profile.weightLbs,
                fortyYard: profile.fortyYard ?? '',
                shuttle: profile.shuttle ?? '',
                threeCone: profile.threeCone ?? '',
                verticalInches: profile.verticalInches ?? '',
                broadJumpInches: profile.broadJumpInches ?? '',
                athleticHonors: profile.athleticHonors.join('\n'),
                academicHonors: profile.academicHonors.join('\n'),
                communityHonors: profile.communityHonors.join('\n'),
                bio: profile.bio,
                highlightVideoUrl: profile.highlightVideoUrl,
              }}
              validationSchema={profileSchema}
              onSubmit={(values) => {
                dispatch(
                  updateProfile({
                    ncaaId: values.ncaaId,
                    heightFeet: Number(values.heightFeet),
                    heightInches: Number(values.heightInches),
                    weightLbs: Number(values.weightLbs),
                    fortyYard: values.fortyYard === '' ? null : Number(values.fortyYard),
                    shuttle: values.shuttle === '' ? null : Number(values.shuttle),
                    threeCone: values.threeCone === '' ? null : Number(values.threeCone),
                    verticalInches: values.verticalInches === '' ? null : Number(values.verticalInches),
                    broadJumpInches: values.broadJumpInches === '' ? null : Number(values.broadJumpInches),
                    athleticHonors: toLines(values.athleticHonors),
                    academicHonors: toLines(values.academicHonors),
                    communityHonors: toLines(values.communityHonors),
                    bio: values.bio,
                    highlightVideoUrl: values.highlightVideoUrl,
                  }),
                )
              }}
            >
              {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                <Box component="form" onSubmit={handleSubmit} noValidate>
                  <Stack spacing={2}>
                    <TextField
                      name="ncaaId"
                      label="NCAA ID"
                      value={values.ncaaId}
                      onChange={handleChange}
                      fullWidth
                    />
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                      <TextField
                        name="heightFeet"
                        label="Height (ft)"
                        type="number"
                        value={values.heightFeet}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.heightFeet && Boolean(errors.heightFeet)}
                        helperText={touched.heightFeet && errors.heightFeet}
                        fullWidth
                      />
                      <TextField
                        name="heightInches"
                        label="Height (in)"
                        type="number"
                        value={values.heightInches}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.heightInches && Boolean(errors.heightInches)}
                        helperText={touched.heightInches && errors.heightInches}
                        fullWidth
                      />
                      <TextField
                        name="weightLbs"
                        label="Weight (lbs)"
                        type="number"
                        value={values.weightLbs}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.weightLbs && Boolean(errors.weightLbs)}
                        helperText={touched.weightLbs && errors.weightLbs}
                        fullWidth
                      />
                    </Stack>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} useFlexGap sx={{ flexWrap: 'wrap' }}>
                      <TextField
                        name="fortyYard"
                        label="40-yard (sec)"
                        type="number"
                        value={values.fortyYard}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.fortyYard && Boolean(errors.fortyYard)}
                        helperText={touched.fortyYard && errors.fortyYard}
                        slotProps={{ htmlInput: { step: 0.01 } }}
                        sx={{ flex: 1, minWidth: 140 }}
                      />
                      <TextField
                        name="shuttle"
                        label="Shuttle (sec)"
                        type="number"
                        value={values.shuttle}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.shuttle && Boolean(errors.shuttle)}
                        helperText={touched.shuttle && errors.shuttle}
                        slotProps={{ htmlInput: { step: 0.01 } }}
                        sx={{ flex: 1, minWidth: 140 }}
                      />
                      <TextField
                        name="threeCone"
                        label="3-cone (sec)"
                        type="number"
                        value={values.threeCone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.threeCone && Boolean(errors.threeCone)}
                        helperText={touched.threeCone && errors.threeCone}
                        slotProps={{ htmlInput: { step: 0.01 } }}
                        sx={{ flex: 1, minWidth: 140 }}
                      />
                    </Stack>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                      <TextField
                        name="verticalInches"
                        label="Vertical (in)"
                        type="number"
                        value={values.verticalInches}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.verticalInches && Boolean(errors.verticalInches)}
                        helperText={touched.verticalInches && errors.verticalInches}
                        fullWidth
                      />
                      <TextField
                        name="broadJumpInches"
                        label="Broad jump (in)"
                        type="number"
                        value={values.broadJumpInches}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.broadJumpInches && Boolean(errors.broadJumpInches)}
                        helperText={
                          (touched.broadJumpInches && errors.broadJumpInches) ||
                          'Total inches — 98 is 8\'2"'
                        }
                        fullWidth
                      />
                    </Stack>
                    <TextField
                      name="bio"
                      label="Player bio"
                      value={values.bio}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.bio && Boolean(errors.bio)}
                      helperText={touched.bio && errors.bio}
                      multiline
                      minRows={3}
                      fullWidth
                    />
                    <TextField
                      name="athleticHonors"
                      label="Athletic honors (one per line)"
                      value={values.athleticHonors}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.athleticHonors && Boolean(errors.athleticHonors)}
                      helperText={touched.athleticHonors && errors.athleticHonors}
                      multiline
                      minRows={3}
                      fullWidth
                    />
                    <TextField
                      name="academicHonors"
                      label="Academic honors (one per line)"
                      value={values.academicHonors}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.academicHonors && Boolean(errors.academicHonors)}
                      helperText={touched.academicHonors && errors.academicHonors}
                      multiline
                      minRows={2}
                      fullWidth
                    />
                    <TextField
                      name="communityHonors"
                      label="Community honors (one per line)"
                      value={values.communityHonors}
                      onChange={handleChange}
                      multiline
                      minRows={2}
                      fullWidth
                    />
                    <TextField
                      name="highlightVideoUrl"
                      label="Highlight video URL"
                      value={values.highlightVideoUrl}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.highlightVideoUrl && Boolean(errors.highlightVideoUrl)}
                      helperText={touched.highlightVideoUrl && errors.highlightVideoUrl}
                      fullWidth
                    />
                    <Button type="submit" variant="contained" color="secondary">
                      Save recruiting profile
                    </Button>
                  </Stack>
                </Box>
              )}
            </Formik>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
