import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { LoadingSpinner } from '../styles/components';

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.xxl};
  text-align: center;
`;

const LoadingText = styled.p`
  color: ${props => props.theme.colors.text.primary};
  font-size: 1.1rem;
  font-weight: 600;
  margin: ${props => props.theme.spacing.lg} 0 ${props => props.theme.spacing.sm};
`;

const LoadingSubtext = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  font-size: 0.9rem;
  margin: 0;
  max-width: 300px;
`;

const ProgressSteps = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  margin: ${props => props.theme.spacing.xl} 0;
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  opacity: ${props => props.active ? 1 : 0.5};
  transition: opacity 0.3s ease;
`;

const StepIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.active 
    ? props.theme.colors.gradient.primary 
    : 'rgba(16, 185, 129, 0.2)'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.active ? 'white' : props.theme.colors.primary.main};
  font-weight: 600;
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const StepText = styled.span`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.text.secondary};
`;

const LoadingScreen = ({ step = 1 }) => {
  const { t } = useTranslation();

  const steps = [
    { id: 1, text: 'Processing Image' },
    { id: 2, text: 'AI Analysis' },
    { id: 3, text: 'Generating Results' }
  ];

  return (
    <LoadingContainer>
      <LoadingSpinner />
      <LoadingText>{t('analyzing')}</LoadingText>
      <LoadingSubtext>
        Our AI is analyzing your plant image to detect any diseases or health issues. This may take a few moments.
      </LoadingSubtext>
      
      <ProgressSteps>
        {steps.map((stepItem) => (
          <Step key={stepItem.id} active={step >= stepItem.id}>
            <StepIcon active={step >= stepItem.id}>
              {step > stepItem.id ? '✓' : stepItem.id}
            </StepIcon>
            <StepText>{stepItem.text}</StepText>
          </Step>
        ))}
      </ProgressSteps>
    </LoadingContainer>
  );
};

export default LoadingScreen;
