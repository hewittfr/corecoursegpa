import DirectionsRun from '@mui/icons-material/DirectionsRun'
import { Box, Stack, Typography } from '@mui/material'

interface BrandMarkProps {
  invert?: boolean
  compact?: boolean
}

export default function BrandMark({ invert = false, compact = false }: BrandMarkProps) {
  return (
    <Stack direction="row" spacing={1.25} sx={{ alignItems: 'center' }}>
      <Box
        sx={{
          width: compact ? 34 : 40,
          height: compact ? 34 : 40,
          borderRadius: 1,
          display: 'grid',
          placeItems: 'center',
          bgcolor: invert ? 'rgba(255,255,255,0.12)' : '#E6EEFF',
          color: invert ? '#ffffff' : 'secondary.main',
        }}
      >
        <DirectionsRun fontSize={compact ? 'small' : 'medium'} />
      </Box>
      <Box>
        <Typography
          variant={compact ? 'subtitle1' : 'h6'}
          sx={{ lineHeight: 1.1, letterSpacing: '-0.02em' }}
        >
          <Box component="span" sx={{ color: invert ? '#fff' : 'primary.main' }}>
            CoreCourse
          </Box>
          <Box component="span" sx={{ color: invert ? '#F3C2C2' : 'secondary.main' }}>
            GPA
          </Box>
        </Typography>
        {!compact ? (
          <Typography
            variant="caption"
            sx={{ color: invert ? 'rgba(255,255,255,0.78)' : 'secondary.main', display: 'block' }}
          >
            Addressing recruiting and eligibility at its core
          </Typography>
        ) : null}
      </Box>
    </Stack>
  )
}
