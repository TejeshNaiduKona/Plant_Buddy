import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.md};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 0 ${props => props.theme.spacing.sm};
  }
`;

export const GradientBackground = styled.div`
  background: ${props => props.theme.colors.gradient.primary};
  min-height: 100vh;
`;

export const Card = styled.div`
  background: ${props => props.theme.colors.background.paper};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.lg};
  padding: ${props => props.theme.spacing.xl};
  margin: ${props => props.theme.spacing.md} 0;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.lg};
    margin: ${props => props.theme.spacing.sm} 0;
  }
`;

export const Button = styled.button`
  background: ${props => props.variant === 'secondary' 
    ? props.theme.colors.gradient.secondary 
    : props.theme.colors.gradient.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => {
    if (props.size === 'sm') return `${props.theme.spacing.sm} ${props.theme.spacing.md}`;
    return `${props.theme.spacing.md} ${props.theme.spacing.xl}`;
  }};
  font-size: ${props => props.size === 'sm' ? '0.875rem' : '1rem'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  min-height: ${props => props.size === 'sm' ? '36px' : '48px'};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
    font-size: 0.9rem;
  }
`;

export const IconButton = styled(Button)`
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.full};
  min-height: auto;
  width: 48px;
  height: 48px;
`;

export const Input = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  border: 2px solid ${props => props.theme.colors.primary.light};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary.main};
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }
`;

export const Title = styled.h1`
  background: ${props => props.theme.colors.gradient.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 2.5rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.sm};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

export const Subtitle = styled.h2`
  color: ${props => props.theme.colors.text.secondary};
  font-size: 1.25rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.1rem;
  }
`;

export const Text = styled.p`
  color: ${props => props.theme.colors.text.primary};
  font-size: 1rem;
  line-height: 1.6;
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.lg};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 0.9rem;
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  align-items: ${props => props.align || 'center'};
  justify-content: ${props => props.justify || 'center'};
  flex-wrap: ${props => props.wrap || 'nowrap'};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: ${props => props.mobileDirection || 'column'};
    gap: ${props => props.theme.spacing.sm};
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.md};
  }
`;

export const LoadingSpinner = styled.div`
  border: 4px solid rgba(16, 185, 129, 0.1);
  border-left: 4px solid ${props => props.theme.colors.primary.main};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const StatusBadge = styled.div`
  background: ${props => {
    switch(props.status) {
      case 'healthy': return props.theme.colors.status.healthy;
      case 'diseased': return props.theme.colors.status.diseased;
      default: return props.theme.colors.status.unknown;
    }
  }};
  color: white;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 0.875rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
`;
