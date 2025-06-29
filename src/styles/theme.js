export const theme = {
  colors: {
    primary: {
      light: '#10b981',
      main: '#059669',
      dark: '#047857',
      darker: '#065f46'
    },
    secondary: {
      light: '#34d399',
      main: '#10b981',
      dark: '#059669'
    },
    gradient: {
      primary: 'linear-gradient(135deg, #10b981 0%,rgb(33, 175, 135) 100%)',
      secondary: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
      accent: 'linear-gradient(135deg, #6ee7b7 0%, #34d399 100%)'
    },
    background: {
      main: '#f0fdf4',
      secondary: '#ecfdf5',
      paper: '#ffffff'
    },
    text: {
      primary: '#047857',
      secondary: '#065f46',
      light: '#6b7280'
    },
    status: {
      healthy: '#10b981',
      diseased: '#ef4444',
      unknown: '#f59e0b'
    }
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    large: '1200px'
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem'
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px'
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
  }
};
