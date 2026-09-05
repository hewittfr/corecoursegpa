import SchoolOutlined from '@mui/icons-material/SchoolOutlined'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { Formik } from 'formik'
import { Navigate, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import BrandMark from '../components/BrandMark'
import { authenticateDemo, loginFailure, loginSuccess } from '../features/auth/authSlice'
import { DEMO_CREDENTIALS } from '../mock/data'

const loginSchema = Yup.object({
  email: Yup.string().email('Enter a valid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
})

export default function LoginPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const error = useAppSelector((state) => state.auth.error)

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1.1fr 0.9fr' },
      }}
    >
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          justifyContent: 'space-between',
          p: 6,
          color: 'white',
          backgroundColor: 'primary.main',
          backgroundImage: `
            linear-gradient(120deg, rgba(165, 40, 40, 0.18), transparent 42%),
            linear-gradient(210deg, rgba(255,255,255,0.05) 0%, transparent 38%),
            linear-gradient(45deg, rgba(255,255,255,0.04) 25%, transparent 25%),
            linear-gradient(135deg, rgba(255,255,255,0.04) 25%, transparent 25%)
          `,
          backgroundSize: 'auto, auto, 72px 72px, 72px 72px',
        }}
      >
        <BrandMark invert />
        <Box>
          <Typography
            variant="overline"
            sx={{ color: '#F3C2C2', letterSpacing: '0.16em', fontWeight: 800 }}
          >
            Student recruiting hub
          </Typography>
          <Typography variant="h3" sx={{ mb: 2, maxWidth: 540, mt: 1 }}>
            Recruiting preparation begins in the freshman year.
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 400, opacity: 0.9, maxWidth: 480 }}>
            Track NCAA core course GPA, build a recruiting profile, and stay ahead of
            calendars, coaches, and eligibility deadlines.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', opacity: 0.85 }}>
          <SchoolOutlined fontSize="small" />
          <Typography variant="body2">
            Student, parent, and school accounts — student view first
          </Typography>
        </Stack>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 3, md: 6 },
        }}
      >
        <Card sx={{ width: '100%', maxWidth: 460 }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 3 }}>
              <BrandMark compact />
            </Box>
            <Typography variant="h5" sx={{ mb: 0.5 }}>
              Student sign in
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Use the demo account to preview the student dashboard.
            </Typography>

            <Alert severity="info" sx={{ mb: 3 }}>
              {DEMO_CREDENTIALS.email}
              <br />
              {DEMO_CREDENTIALS.password}
            </Alert>

            {error ? (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            ) : null}

            <Formik
              initialValues={{ email: DEMO_CREDENTIALS.email, password: DEMO_CREDENTIALS.password }}
              validationSchema={loginSchema}
              onSubmit={(values) => {
                const user = authenticateDemo(values.email, values.password)
                if (!user) {
                  dispatch(loginFailure('Email or password is incorrect.'))
                  return
                }
                dispatch(loginSuccess(user))
                navigate('/dashboard')
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <Box component="form" onSubmit={handleSubmit} noValidate>
                  <Stack spacing={2.25}>
                    <TextField
                      name="email"
                      label="Email"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                      fullWidth
                    />
                    <TextField
                      name="password"
                      label="Password"
                      type="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                      fullWidth
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      disabled={isSubmitting}
                    >
                      Member login
                    </Button>
                    <Button
                      type="button"
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        dispatch(loginSuccess(authenticateDemo(DEMO_CREDENTIALS.email, DEMO_CREDENTIALS.password)!))
                        navigate('/dashboard')
                      }}
                    >
                      Enter as Alexander Caldwell
                    </Button>
                  </Stack>
                </Box>
              )}
            </Formik>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}
