import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { X, Leaf, Eye, Shield, Users, CheckCircle, ArrowRight } from 'lucide-react';
import { Card, Button, FlexContainer, Title } from '../styles/components';

const AboutModal = styled.div`
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

const AboutContent = styled.div`
  background: ${props => props.theme.colors.background.paper};
  border-radius: ${props => props.theme.borderRadius.lg};
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const AboutHeader = styled.div`
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

const AboutTitle = styled.h2`
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

const AboutSubtitle = styled.p`
  color: rgba(255, 255, 255, 0.95);
  margin: 0;
  font-size: 1.1rem;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  z-index: 2;
  position: relative;
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
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const AboutBody = styled.div`
  padding: ${props => props.theme.spacing.xl};
`;

const Section = styled.div`
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const SectionTitle = styled.h3`
  color: #2d3748;
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: ${props => props.theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`;

const SectionText = styled.p`
  color: #4a5568;
  font-size: 1rem;
  line-height: 1.7;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin: ${props => props.theme.spacing.xl} 0;
`;

const FeatureCard = styled.div`
  background: rgba(16, 185, 129, 0.05);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
    border-color: ${props => props.theme.colors.primary.main};
  }
`;

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: ${props => props.theme.borderRadius.full};
  background: ${props => props.theme.colors.gradient.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${props => props.theme.spacing.md};
  color: white;
`;

const FeatureTitle = styled.h4`
  color: #2d3748;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const FeatureText = styled.p`
  color: #4a5568;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
`;

const ImageGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.md};
  margin: ${props => props.theme.spacing.lg} 0;
`;

const DiseaseImage = styled.div`
  background: #f7fafc;
  border: 2px solid rgba(16, 185, 129, 0.3);
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.md};
  text-align: center;
  transition: all 0.3s ease;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  &:hover {
    border-color: ${props => props.theme.colors.primary.main};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
  }
  
  img {
    max-width: 100%;
    max-height: 80px;
    object-fit: contain;
    margin-bottom: ${props => props.theme.spacing.sm};
  }
`;

const DiseaseImageContainer = styled.div`
  width: 100%;
  height: 120px;
  border-radius: ${props => props.theme.borderRadius.md};
  overflow: hidden;
  margin-bottom: ${props => props.theme.spacing.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(16, 185, 129, 0.1);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 120px;
  background: ${props => props.theme.colors.gradient.accent};
  border-radius: ${props => props.theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.primary.dark};
  font-size: 2rem;
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const ImageTitle = styled.h5`
  color: #2d3748;
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0;
`;

const ImageCaption = styled.p`
  color: #4a5568;
  font-size: 0.8rem;
  font-weight: 500;
  margin: 0;
  text-align: center;
`;

const BenefitsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const BenefitItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.sm} 0;
  color: #4a5568;
  line-height: 1.6;
`;

const BenefitIcon = styled.div`
  width: 20px;
  height: 20px;
  border-radius: ${props => props.theme.borderRadius.full};
  background: ${props => props.theme.colors.primary.main};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
  margin-top: 2px;
`;

const About = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  const features = [
    {
      icon: <Eye size={24} />,
      title: t('smartDiseaseDetection'),
      description: t('smartDiseaseDetectionDesc')
    },
    {
      icon: <Leaf size={24} />,
      title: t('comprehensivePlantDatabase'),
      description: t('comprehensivePlantDatabaseDesc')
    },
    {
      icon: <Shield size={24} />,
      title: t('preventionTreatment'),
      description: t('preventionTreatmentDesc')
    },
    {
      icon: <Users size={24} />,
      title: t('forEveryone'),
      description: t('forEveryoneDesc')
    }
  ];

  const diseases = [
    { name: "Leaf Spot", emoji: "🍃", image: "/images/leaf-spot.svg" },
    { name: "Black Rot", emoji: "🍇", image: "/images/black-rot.svg" },
    { name: "Rust Disease", emoji: "🌱", image: "/images/rust-disease.svg" },
    { name: "Powdery Mildew", emoji: "🌿" },
    { name: "Blight", emoji: "🍅" },
    { name: "Mosaic Virus", emoji: "🥒" }
  ];

  const benefits = [
    "Identify diseases affecting leaves and fruits of everyday plants",
    "Understand the full life cycle of each disease for effective timing",
    "Get clear, actionable guidance for treatment and prevention",
    "Access organic and eco-friendly treatment recommendations",
    "Learn to spot early warning signs before diseases spread",
    "Receive expert advice tailored to your specific plant type"
  ];

  return (
    <AboutModal onClick={onClose}>
      <AboutContent onClick={(e) => e.stopPropagation()}>
        <AboutHeader>
          <CloseButton onClick={onClose}>
            <X size={20} />
          </CloseButton>
          <AboutTitle>
            🌿 Plant Buddy
          </AboutTitle>
          <AboutSubtitle>
            {t('smartCompanion')}
          </AboutSubtitle>
        </AboutHeader>

        <AboutBody>
          <Section>
            <SectionText style={{ fontSize: '1.1rem', fontWeight: 500 }}>
              Plant Buddy is your smart companion for healthy gardens, orchards, and indoor plants. 
              By combining state‑of‑the‑art image recognition with a comprehensive plant‑disease 
              knowledge base, Plant Buddy empowers hobbyists, small‑scale farmers, and gardeners to 
              maintain thriving, disease-free plants.
            </SectionText>
          </Section>

          <Section>
            <SectionTitle>
              <Shield size={24} />
              {t('keyFeatures')}
            </SectionTitle>
            <FeatureGrid>
              {features.map((feature, index) => (
                <FeatureCard key={index}>
                  <FeatureIcon>{feature.icon}</FeatureIcon>
                  <FeatureTitle>{feature.title}</FeatureTitle>
                  <FeatureText>{feature.description}</FeatureText>
                </FeatureCard>
              ))}
            </FeatureGrid>
          </Section>

          <Section>
            <SectionTitle>
              <Leaf size={24} />
              {t('whatPlantBuddyHelps')}
            </SectionTitle>
            <BenefitsList>
              {benefits.map((benefit, index) => (
                <BenefitItem key={index}>
                  <BenefitIcon>
                    <CheckCircle size={12} />
                  </BenefitIcon>
                  {benefit}
                </BenefitItem>
              ))}
            </BenefitsList>
          </Section>

          <Section>
            <SectionTitle>
              <Eye size={24} />
              {t('commonDiseases')}
            </SectionTitle>
            <SectionText>
              Whether you're noticing yellow spots on your rose leaves, black rot on your grapes, 
              or suspect rust on your beans, Plant Buddy gives you clear, actionable guidance.
            </SectionText>
            <ImageGallery>
              {diseases.map((disease, index) => (
                <DiseaseImage key={index}>
                  {disease.image ? (
                    <DiseaseImageContainer>
                      <img src={disease.image} alt={disease.name} />
                    </DiseaseImageContainer>
                  ) : (
                    <ImagePlaceholder>
                      {disease.emoji}
                    </ImagePlaceholder>
                  )}
                  <ImageTitle>{disease.name}</ImageTitle>
                  <ImageCaption>
                    {disease.image ? t('imageAvailable') : t('imageNotAvailable')}
                  </ImageCaption>
                </DiseaseImage>
              ))}
            </ImageGallery>
          </Section>

          <Section>
            <SectionTitle>
              <Users size={24} />
              {t('perfectFor')}
            </SectionTitle>
            <FeatureGrid>
              <FeatureCard>
                <FeatureIcon>🏡</FeatureIcon>
                <FeatureTitle>{t('homeGardeners')}</FeatureTitle>
                <FeatureText>
                  {t('homeGardenersDesc')}
                </FeatureText>
              </FeatureCard>
              <FeatureCard>
                <FeatureIcon>🚜</FeatureIcon>
                <FeatureTitle>{t('smallScaleFarmers')}</FeatureTitle>
                <FeatureText>
                  {t('smallScaleFarmersDesc')}
                </FeatureText>
              </FeatureCard>
              <FeatureCard>
                <FeatureIcon>🌳</FeatureIcon>
                <FeatureTitle>{t('orchardOwners')}</FeatureTitle>
                <FeatureText>
                  {t('orchardOwnersDesc')}
                </FeatureText>
              </FeatureCard>
            </FeatureGrid>
          </Section>

          <Section style={{ marginBottom: 0 }}>
            <FlexContainer>
              <Button onClick={onClose}>
                <ArrowRight size={20} />
                {t('getStartedNow')}
              </Button>
            </FlexContainer>
          </Section>
        </AboutBody>
      </AboutContent>
    </AboutModal>
  );
};

export default About;
