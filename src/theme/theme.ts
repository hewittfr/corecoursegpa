import { createTheme } from '@mui/material/styles'

const navy = '#222A5B'
const maroon = '#A52828'
const banner = '#E6EEFF'

const theme = createTheme({
  palette: {
    primary: {
      main: navy,
      light: '#3D467C',
      dark: '#161C3D',
      contrastText: '#ffffff',
    },
    secondary: {
      main: maroon,
      light: '#C24A4A',
      dark: '#7E1C1C',
      contrastText: '#ffffff',
    },
    info: {
      main: '#3A4A86',
    },
    success: {
      main: '#1B7A4E',
    },
    warning: {
      main: '#C47B17',
    },
    error: {
      main: maroon,
    },
    background: {
      default: '#F5F7FB',
      paper: '#ffffff',
    },
    text: {
      primary: '#1A1A1A',
      secondary: '#5A6072',
    },
    divider: '#E3E6EE',
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: { fontWeight: 800, letterSpacing: '-0.02em' },
    h5: { fontWeight: 800, letterSpacing: '-0.01em' },
    h6: { fontWeight: 700 },
    subtitle1: { fontWeight: 700 },
    button: { textTransform: 'none', fontWeight: 700 },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#F5F7FB',
          backgroundImage: `linear-gradient(135deg, rgba(34, 42, 91, 0.03) 25%, transparent 25%),
            linear-gradient(225deg, rgba(165, 40, 40, 0.03) 25%, transparent 25%),
            linear-gradient(45deg, rgba(34, 42, 91, 0.025) 25%, transparent 25%),
            linear-gradient(315deg, rgba(230, 238, 255, 0.8) 25%, transparent 25%)`,
          backgroundSize: '84px 84px',
          backgroundPosition: '0 0, 42px 0, 42px -42px, 0 42px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 8px 24px rgba(34, 42, 91, 0.06)',
          border: '1px solid #E3E6EE',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        size: 'small',
      },
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
      },
    },
    MuiButtonGroup: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiIconButton: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiFormControl: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiInputBase: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiInputLabel: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiOutlinedInput: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiFilledInput: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiInput: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiSelect: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiChip: {
      defaultProps: {
        size: 'small',
      },
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
    MuiCheckbox: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiRadio: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiSwitch: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiTable: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiTableCell: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiFab: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiToggleButton: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiToggleButtonGroup: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiPagination: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiRating: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiSlider: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiAlert: {
      styleOverrides: {
        standard: {
          backgroundColor: banner,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorInherit: {
          backgroundColor: '#ffffff',
        },
      },
    },
  },
})

export const brandColors = {
  navy,
  maroon,
  banner,
  black: '#1A1A1A',
}

export default theme
