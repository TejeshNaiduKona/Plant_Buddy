import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { 
  X, 
  Camera, 
  Upload, 
  Eye, 
  BookOpen, 
  Play, 
  Calendar, 
  Search,
  ChevronRight,
  Zap,
  Shield,
  Target,
  Database,
  Clock,
  Microscope,
  Leaf,
  AlertTriangle,
  CheckCircle,
  ArrowLeft,
  Info,
  Users,
  Globe
} from 'lucide-react';
import { Card, Button, FlexContainer, Title } from '../styles/components';

// Add global animation styles
const GlobalAnimations = `
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

// Inject styles if not already present
if (!document.querySelector('#plant-buddy-animations')) {
  const style = document.createElement('style');
  style.id = 'plant-buddy-animations';
  style.textContent = GlobalAnimations;
  document.head.appendChild(style);
}

const FeaturesModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${props => props.theme.spacing.md};
  overflow-y: auto;
`;

const FeaturesContent = styled.div`
  background: ${props => props.theme.colors.background.paper};
  border-radius: ${props => props.theme.borderRadius.lg};
  max-width: 1000px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const FeaturesHeader = styled.div`
  background: #059669;
  background: ${props => props.theme.colors.gradient.primary};
  color: white;
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.lg} ${props => props.theme.borderRadius.lg} 0 0;
  position: relative;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const FeaturesTitle = styled.h2`
  color: white;
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  z-index: 2;
  position: relative;
  margin-bottom: 0.5rem;
  text-align: left;
`;

const FeaturesSubtitle = styled.p`
  color: rgba(255, 255, 255, 0.95);
  margin: 0;
  font-size: 1.1rem;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  z-index: 2;
  position: relative;
`;

const BackButton = styled.button`
  position: absolute;
  top: ${props => props.theme.spacing.lg};
  left: ${props => props.theme.spacing.lg};
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: ${props => props.theme.borderRadius.full};
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${props => props.theme.spacing.lg};
  right: ${props => props.theme.spacing.lg};
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: ${props => props.theme.borderRadius.full};
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const FeaturesBody = styled.div`
  padding: ${props => props.theme.spacing.xl};
`;

const FeatureSection = styled.div`
  margin-bottom: ${props => props.theme.spacing.xxl};
  border-bottom: 1px solid rgba(16, 185, 129, 0.1);
  padding-bottom: ${props => props.theme.spacing.xl};
  
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  color: #2d3748;
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: ${props => props.theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`;

const SectionDescription = styled.p`
  color: #4a5568;
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin: ${props => props.theme.spacing.lg} 0;
`;

const FeatureCard = styled.div`
  background: rgba(16, 185, 129, 0.05);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.lg};
    border-color: ${props => props.theme.colors.primary.main};
  }
`;

const FeatureIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: ${props => props.theme.borderRadius.lg};
  background: ${props => props.theme.colors.gradient.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${props => props.theme.spacing.md};
  color: white;
`;

const FeatureTitle = styled.h3`
  color: #2d3748;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const FeatureDescription = styled.p`
  color: #4a5568;
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
`;

const StepsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
  margin: ${props => props.theme.spacing.lg} 0;
`;

const StepItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.md};
  background: rgba(16, 185, 129, 0.05);
  border-radius: ${props => props.theme.borderRadius.md};
  border-left: 4px solid ${props => props.theme.colors.primary.main};
`;

const StepNumber = styled.div`
  width: 30px;
  height: 30px;
  border-radius: ${props => props.theme.borderRadius.full};
  background: ${props => props.theme.colors.primary.main};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
  flex-shrink: 0;
`;

const StepContent = styled.div`
  flex: 1;
`;

const StepTitle = styled.h4`
  color: #2d3748;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const StepText = styled.p`
  color: #4a5568;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
`;

const HighlightBox = styled.div`
  background: ${props => props.theme.colors.gradient.accent};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  margin: ${props => props.theme.spacing.lg} 0;
  border: 2px solid ${props => props.theme.colors.primary.light};
`;

const HighlightTitle = styled.h3`
  color: #2d3748;
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: ${props => props.theme.spacing.md};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`;

const BenefitsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: ${props => props.theme.spacing.md} 0;
`;

const BenefitItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.xs} 0;
  color: #4a5568;
  line-height: 1.6;
`;

const BenefitIcon = styled.div`
  width: 18px;
  height: 18px;
  border-radius: ${props => props.theme.borderRadius.full};
  background: ${props => props.theme.colors.primary.main};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
  margin-top: 2px;
`;

const Features = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [selectedFeature, setSelectedFeature] = useState(null);

  if (!isOpen) return null;

  const mainFeatures = [
    {
      id: 'instantDetection',
      icon: <Zap size={24} />,
      title: 'Instant Disease Detection',
      description: 'Get immediate, AI-powered disease diagnosis with confidence scores and reference comparisons.',
      shortDesc: 'Upload a photo and get instant AI diagnosis'
    },
    {
      id: 'diseaseProfiles',
      icon: <BookOpen size={24} />,
      title: 'Comprehensive Disease Profiles',
      description: 'Detailed information with symptom galleries, lifecycle diagrams, and environmental data.',
      shortDesc: 'Explore detailed disease information and galleries'
    },
    {
      id: 'interactiveVisualizations',
      icon: <Play size={24} />,
      title: 'Interactive Lifecycle Visualizations',
      description: 'Animated timelines and interactive elements showing disease development and spread.',
      shortDesc: 'Watch animated disease progression timelines'
    },
    {
      id: 'treatmentPlans',
      icon: <Shield size={24} />,
      title: 'Personalized Treatment Plans',
      description: 'Customized organic and chemical treatment options with timing and safety guidelines.',
      shortDesc: 'Get personalized treatment recommendations'
    },
    {
      id: 'diseaseLibrary',
      icon: <Search size={24} />,
      title: 'Disease Library & Search',
      description: 'Comprehensive searchable database organized by species, symptoms, and pathogens.',
      shortDesc: 'Search extensive disease database'
    }
  ];

  const getFeatureDetails = (featureId) => {
    const details = {
      instantDetection: {
        icon: <Zap size={32} />,
        title: 'Instant Disease Detection',
        subtitle: 'AI-Powered Plant Health Analysis',
        sections: [
          {
            title: 'Key Capabilities',
            icon: <Target size={20} />,
            content: (
              <FeatureGrid>
                <FeatureCard>
                  <FeatureIcon><CheckCircle size={20} /></FeatureIcon>
                  <FeatureTitle>95%+ Accuracy</FeatureTitle>
                  <FeatureDescription>Professional-grade accuracy with confidence scoring for reliable results.</FeatureDescription>
                </FeatureCard>
                <FeatureCard>
                  <FeatureIcon><Clock size={20} /></FeatureIcon>
                  <FeatureTitle>Real-time Results</FeatureTitle>
                  <FeatureDescription>Get instant diagnosis within 2-3 seconds of image upload.</FeatureDescription>
                </FeatureCard>
                <FeatureCard>
                  <FeatureIcon><Camera size={20} /></FeatureIcon>
                  <FeatureTitle>Multiple Formats</FeatureTitle>
                  <FeatureDescription>Support for JPG, PNG, WEBP with drag-and-drop functionality.</FeatureDescription>
                </FeatureCard>
                <FeatureCard>
                  <FeatureIcon><Globe size={20} /></FeatureIcon>
                  <FeatureTitle>Multi-language</FeatureTitle>
                  <FeatureDescription>Results available in 12 languages including regional Indian languages.</FeatureDescription>
                </FeatureCard>
              </FeatureGrid>
            )
          }
        ]
      },
      diseaseProfiles: {
        icon: <BookOpen size={32} />,
        title: 'Comprehensive Disease Profiles',
        subtitle: 'Complete Disease Information Database',
        sections: [
          {
            title: 'Disease Information Coverage',
            icon: <Info size={20} />,
            content: (
              <BenefitsList>
                <BenefitItem>
                  <BenefitIcon><Eye size={12} /></BenefitIcon>
                  High-resolution symptom galleries showing disease progression from early to advanced stages
                </BenefitItem>
                <BenefitItem>
                  <BenefitIcon><Microscope size={12} /></BenefitIcon>
                  Detailed lifecycle diagrams illustrating pathogen development and reproduction cycles
                </BenefitItem>
                <BenefitItem>
                  <BenefitIcon><Database size={12} /></BenefitIcon>
                  Comprehensive host range information covering affected plant species and varieties
                </BenefitItem>
                <BenefitItem>
                  <BenefitIcon><Calendar size={12} /></BenefitIcon>
                  Seasonal risk factors and climatic preferences for disease development
                </BenefitItem>
                <BenefitItem>
                  <BenefitIcon><AlertTriangle size={12} /></BenefitIcon>
                  Environmental conditions favoring disease outbreak and spread patterns
                </BenefitItem>
              </BenefitsList>
            )
          },
          {
            title: 'Visual Learning Tools',
            icon: <Eye size={20} />,
            content: (
              <FeatureGrid>
                <FeatureCard>
                  <FeatureIcon><Camera size={20} /></FeatureIcon>
                  <FeatureTitle>Symptom Gallery</FeatureTitle>
                  <FeatureDescription>Professional photos showing symptoms at different growth stages and severity levels.</FeatureDescription>
                </FeatureCard>
                <FeatureCard>
                  <FeatureIcon><Play size={20} /></FeatureIcon>
                  <FeatureTitle>Progression Videos</FeatureTitle>
                  <FeatureDescription>Time-lapse videos showing how diseases develop and spread over time.</FeatureDescription>
                </FeatureCard>
                <FeatureCard>
                  <FeatureIcon><Microscope size={20} /></FeatureIcon>
                  <FeatureTitle>Microscopic Views</FeatureTitle>
                  <FeatureDescription>Detailed microscopic images of pathogens, spores, and infection structures.</FeatureDescription>
                </FeatureCard>
              </FeatureGrid>
            )
          }
        ]
      },
      interactiveVisualizations: {
        icon: <Play size={32} />,
        title: 'Interactive Lifecycle Visualizations',
        subtitle: 'Animated Disease Development Timelines',
        sections: [
          {
            title: 'Animation Features',
            icon: <Play size={20} />,
            content: (
              <StepsList>
                <StepItem>
                  <StepNumber><Leaf size={16} /></StepNumber>
                  <StepContent>
                    <StepTitle>Spore Formation & Dispersal</StepTitle>
                    <StepText>Watch how pathogens form spores and spread through wind, water, or insect vectors in detailed animations.</StepText>
                  </StepContent>
                </StepItem>
                <StepItem>
                  <StepNumber><Target size={16} /></StepNumber>
                  <StepContent>
                    <StepTitle>Infection Process</StepTitle>
                    <StepText>Interactive sequences showing how pathogens penetrate plant tissues and establish infections.</StepText>
                  </StepContent>
                </StepItem>
                <StepItem>
                  <StepNumber><Clock size={16} /></StepNumber>
                  <StepContent>
                    <StepTitle>Disease Development</StepTitle>
                    <StepText>Visualize symptom appearance, pathogen multiplication, and damage progression over time.</StepText>
                  </StepContent>
                </StepItem>
                <StepItem>
                  <StepNumber><ChevronRight size={16} /></StepNumber>
                  <StepContent>
                    <StepTitle>Reproduction Cycle</StepTitle>
                    <StepText>Interactive diagrams showing sporulation, secondary infections, and disease spread patterns.</StepText>
                  </StepContent>
                </StepItem>
              </StepsList>
            )
          },
          {
            title: 'Interactive Elements',
            icon: <Target size={20} />,
            content: (
              <HighlightBox>
                <HighlightTitle>
                  <Play size={20} />
                  Click & Learn Features
                </HighlightTitle>
                <BenefitsList>
                  <BenefitItem>
                    <BenefitIcon><Info size={12} /></BenefitIcon>
                    Interactive tooltips explaining key disease milestones and biological processes
                  </BenefitItem>
                  <BenefitItem>
                    <BenefitIcon><Clock size={12} /></BenefitIcon>
                    Timeline controls to pause, rewind, and explore specific infection stages
                  </BenefitItem>
                  <BenefitItem>
                    <BenefitIcon><AlertTriangle size={12} /></BenefitIcon>
                    Critical intervention points highlighted for optimal treatment timing
                  </BenefitItem>
                  <BenefitItem>
                    <BenefitIcon><Calendar size={12} /></BenefitIcon>
                    Environmental factor overlays showing temperature, humidity, and seasonal influences
                  </BenefitItem>
                </BenefitsList>
              </HighlightBox>
            )
          }
        ]
      },
      treatmentPlans: {
        icon: <Shield size={32} />,
        title: 'Personalized Treatment Plans',
        subtitle: 'Customized Disease Management Solutions',
        sections: [
          {
            title: 'Treatment Options',
            icon: <Shield size={20} />,
            content: (
              <FeatureGrid>
                <FeatureCard>
                  <FeatureIcon><Leaf size={20} /></FeatureIcon>
                  <FeatureTitle>Organic Methods</FeatureTitle>
                  <FeatureDescription>Natural treatments using botanical extracts, beneficial microorganisms, and eco-friendly solutions.</FeatureDescription>
                </FeatureCard>
                <FeatureCard>
                  <FeatureIcon><Zap size={20} /></FeatureIcon>
                  <FeatureTitle>Chemical Controls</FeatureTitle>
                  <FeatureDescription>Targeted fungicides and bactericides with precise dosage recommendations and safety protocols.</FeatureDescription>
                </FeatureCard>
                <FeatureCard>
                  <FeatureIcon><Users size={20} /></FeatureIcon>
                  <FeatureTitle>Cultural Practices</FeatureTitle>
                  <FeatureDescription>Preventive measures including crop rotation, sanitation, and resistant variety selection.</FeatureDescription>
                </FeatureCard>
              </FeatureGrid>
            )
          },
          {
            title: 'Smart Scheduling',
            icon: <Calendar size={20} />,
            content: (
              <div>
                <BenefitsList>
                  <BenefitItem>
                    <BenefitIcon><Calendar size={12} /></BenefitIcon>
                    Automated treatment reminders based on disease development stages and weather conditions
                  </BenefitItem>
                  <BenefitItem>
                    <BenefitIcon><Clock size={12} /></BenefitIcon>
                    Optimal application timing recommendations considering pathogen lifecycle and plant growth
                  </BenefitItem>
                  <BenefitItem>
                    <BenefitIcon><AlertTriangle size={12} /></BenefitIcon>
                    Safety interval tracking for harvest timing and worker protection protocols
                  </BenefitItem>
                  <BenefitItem>
                    <BenefitIcon><Target size={12} /></BenefitIcon>
                    Resistance management strategies with rotation schedules for chemical treatments
                  </BenefitItem>
                </BenefitsList>
                <HighlightBox>
                  <HighlightTitle>
                    <Calendar size={20} />
                    Never Miss a Treatment
                  </HighlightTitle>
                  <StepText>
                    Set up automated reminders for fungicide applications, cultural measures, and monitoring schedules. 
                    Get push notifications based on weather forecasts and disease pressure models.
                  </StepText>
                </HighlightBox>
              </div>
            )
          }
        ]
      },
      diseaseLibrary: {
        icon: <Search size={32} />,
        title: 'Disease Library & Search',
        subtitle: 'Comprehensive Plant Disease Database',
        sections: [
          {
            title: 'Search & Browse Capabilities',
            icon: <Search size={20} />,
            content: (
              <FeatureGrid>
                <FeatureCard>
                  <FeatureIcon><Database size={20} /></FeatureIcon>
                  <FeatureTitle>Plant Species Filter</FeatureTitle>
                  <FeatureDescription>Browse diseases by specific crops: tomato, potato, citrus, rice, wheat, and 100+ other species.</FeatureDescription>
                </FeatureCard>
                <FeatureCard>
                  <FeatureIcon><Eye size={20} /></FeatureIcon>
                  <FeatureTitle>Symptom Search</FeatureTitle>
                  <FeatureDescription>Find diseases by visual symptoms: spots, wilting, yellowing, rotting, and other characteristics.</FeatureDescription>
                </FeatureCard>
                <FeatureCard>
                  <FeatureIcon><Microscope size={20} /></FeatureIcon>
                  <FeatureTitle>Pathogen Categories</FeatureTitle>
                  <FeatureDescription>Filter by pathogen type: fungi, bacteria, viruses, nematodes, and physiological disorders.</FeatureDescription>
                </FeatureCard>
                <FeatureCard>
                  <FeatureIcon><Globe size={20} /></FeatureIcon>
                  <FeatureTitle>Regional Data</FeatureTitle>
                  <FeatureDescription>Location-specific disease prevalence and seasonal occurrence patterns for your area.</FeatureDescription>
                </FeatureCard>
              </FeatureGrid>
            )
          },
          {
            title: 'Advanced Features',
            icon: <Database size={20} />,
            content: (
              <div>
                <BenefitsList>
                  <BenefitItem>
                    <BenefitIcon><AlertTriangle size={12} /></BenefitIcon>
                    Severity level indicators from minor aesthetic damage to crop-threatening diseases
                  </BenefitItem>
                  <BenefitItem>
                    <BenefitIcon><Calendar size={12} /></BenefitIcon>
                    Seasonal occurrence patterns and risk prediction models for proactive management
                  </BenefitItem>
                  <BenefitItem>
                    <BenefitIcon><Users size={12} /></BenefitIcon>
                    Economic impact assessments showing potential yield losses and control costs
                  </BenefitItem>
                  <BenefitItem>
                    <BenefitIcon><CheckCircle size={12} /></BenefitIcon>
                    Quarantine status and regulatory information for exotic and emerging diseases
                  </BenefitItem>
                </BenefitsList>
                <HighlightBox>
                  <HighlightTitle>
                    <Database size={20} />
                    Comprehensive Coverage
                  </HighlightTitle>
                  <StepText>
                    Access detailed profiles for 500+ plant diseases affecting major crops worldwide. 
                    Database includes both common diseases and emerging threats with regular updates from plant pathology experts.
                  </StepText>
                </HighlightBox>
              </div>
            )
          }
        ]
      }
    };
    return details[featureId];
  };

  const handleFeatureClick = (featureId) => {
    setSelectedFeature(featureId);
  };

  const handleBackClick = () => {
    setSelectedFeature(null);
  };

  const renderDetailedView = () => {
    if (!selectedFeature) return null;
    
    const details = getFeatureDetails(selectedFeature);
    
    return (
      <div style={{ animation: 'slideIn 0.3s ease-out' }}>
        <FeatureSection>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <FeatureIcon style={{ width: '80px', height: '80px', fontSize: '2rem' }}>
              {details.icon}
            </FeatureIcon>
            <div>
              <SectionTitle style={{ margin: 0, fontSize: '2.2rem' }}>
                {details.title}
              </SectionTitle>
              <SectionDescription style={{ margin: '0.5rem 0 0 0', fontSize: '1.1rem', opacity: 0.8 }}>
                {details.subtitle}
              </SectionDescription>
            </div>
          </div>
          
          {details.sections.map((section, index) => (
            <div key={index} style={{ marginBottom: '2.5rem' }}>
              <SectionTitle style={{ fontSize: '1.4rem', marginBottom: '1.5rem' }}>
                {section.icon}
                {section.title}
              </SectionTitle>
              {section.content}
            </div>
          ))}
          
          <FlexContainer style={{ marginTop: '2rem' }}>
            <Button onClick={handleBackClick}>
              ← Back to All Features
            </Button>
            <Button onClick={onClose}>
              Start Using Plant Buddy
            </Button>
          </FlexContainer>
        </FeatureSection>
      </div>
    );
  };

  return (
    <FeaturesModal onClick={onClose}>
      <FeaturesContent onClick={(e) => e.stopPropagation()}>
        <FeaturesHeader>
          <CloseButton onClick={onClose}>
            <X size={20} />
          </CloseButton>
          
          {selectedFeature && (
            <BackButton onClick={handleBackClick}>
              <ArrowLeft size={20} />
            </BackButton>
          )}
          
          <FeaturesTitle>
            🚀 {selectedFeature ? getFeatureDetails(selectedFeature).title : 'Plant Buddy Features'}
          </FeaturesTitle>
          <FeaturesSubtitle>
            {selectedFeature ? getFeatureDetails(selectedFeature).subtitle : 'Comprehensive Plant Disease Detection & Management Tools'}
          </FeaturesSubtitle>
        </FeaturesHeader>

        <FeaturesBody>
          {selectedFeature ? (
            renderDetailedView()
          ) : (
            <>
              <SectionDescription style={{ textAlign: 'center', fontSize: '1.1rem', marginBottom: '2rem' }}>
                Click on any feature below to explore detailed capabilities and see how Plant Buddy revolutionizes plant disease management.
              </SectionDescription>
              
              <FeatureGrid style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                {mainFeatures.map((feature) => (
                  <FeatureCard 
                    key={feature.id} 
                    onClick={() => handleFeatureClick(feature.id)}
                    style={{ 
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      border: '2px solid rgba(16, 185, 129, 0.2)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.borderColor = 'rgba(16, 185, 129, 0.5)';
                      e.target.style.transform = 'translateY(-8px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.borderColor = 'rgba(16, 185, 129, 0.2)';
                      e.target.style.transform = 'translateY(-4px)';
                    }}
                  >
                    <FeatureIcon style={{ marginBottom: '1rem' }}>
                      {feature.icon}
                    </FeatureIcon>
                    <FeatureTitle style={{ fontSize: '1.3rem', marginBottom: '0.8rem' }}>
                      {feature.title}
                    </FeatureTitle>
                    <FeatureDescription style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
                      {feature.description}
                    </FeatureDescription>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      color: 'rgba(16, 185, 129, 1)', 
                      fontWeight: '600',
                      fontSize: '0.9rem'
                    }}>
                      Click to explore <ChevronRight size={16} style={{ marginLeft: '0.5rem' }} />
                    </div>
                  </FeatureCard>
                ))}
              </FeatureGrid>
              
              <FlexContainer style={{ marginTop: '2.5rem' }}>
                <Button onClick={onClose}>
                  Start Using Plant Buddy
                </Button>
              </FlexContainer>
            </>
          )}
        </FeaturesBody>
      </FeaturesContent>
    </FeaturesModal>
  );
};

export default Features;
