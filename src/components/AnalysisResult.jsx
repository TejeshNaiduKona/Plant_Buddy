import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { CheckCircle, AlertTriangle, HelpCircle, Leaf, Shield, TrendingUp, RotateCcw, FileText } from 'lucide-react';
import { Card, FlexContainer, StatusBadge, Button } from '../styles/components';

const ResultContainer = styled.div`
  background: ${props => props.theme.colors.background.paper};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  margin: ${props => props.theme.spacing.lg} 0;
  box-shadow: ${props => props.theme.shadows.lg};
`;

const ResultImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: ${props => props.theme.borderRadius.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ResultHeader = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const ResultTitle = styled.h2`
  background: ${props => props.theme.colors.gradient.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ConfidenceBar = styled.div`
  width: 100%;
  height: 12px;
  background: rgba(16, 185, 129, 0.1);
  border-radius: ${props => props.theme.borderRadius.full};
  overflow: hidden;
  margin: ${props => props.theme.spacing.sm} 0;
`;

const ConfidenceFill = styled.div`
  height: 100%;
  background: ${props => props.theme.colors.gradient.primary};
  width: ${props => props.confidence}%;
  transition: width 0.5s ease;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin: ${props => props.theme.spacing.xl} 0;
`;

const InfoCard = styled.div`
  background: rgba(16, 185, 129, 0.05);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  text-align: center;
`;

const InfoIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${props => props.theme.borderRadius.full};
  background: ${props => props.theme.colors.gradient.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${props => props.theme.spacing.md};
  color: white;
`;

const InfoTitle = styled.h3`
  color: ${props => props.theme.colors.text.primary};
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const InfoText = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
`;

const RecommendationsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const RecommendationItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.sm} 0;
  border-bottom: 1px solid rgba(16, 185, 129, 0.1);
  
  &:last-child {
    border-bottom: none;
  }
`;

const RecommendationIcon = styled.div`
  width: 20px;
  height: 20px;
  border-radius: ${props => props.theme.borderRadius.full};
  background: ${props => props.theme.colors.primary.main};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.8rem;
  font-weight: 600;
  flex-shrink: 0;
  margin-top: 2px;
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  justify-content: center;
  margin: ${props => props.theme.spacing.xl} 0 ${props => props.theme.spacing.lg} 0;
  flex-wrap: wrap;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
  }
`;

const ActionButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  min-width: 140px;
  justify-content: center;
  font-weight: 600;
  
  &.recheck {
    background: ${props => props.theme.colors.gradient.secondary};
    border: none;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: ${props => props.theme.shadows.lg};
    }
  }
  
  &.pdf-generate {
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    border: none;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(245, 158, 11, 0.3);
    }
  }
`;

const getStatusIcon = (status) => {
  switch (status) {
    case 'healthy':
      return <CheckCircle size={24} />;
    case 'diseased':
      return <AlertTriangle size={24} />;
    default:
      return <HelpCircle size={24} />;
  }
};

const getStatusText = (status, t) => {
  switch (status) {
    case 'healthy':
      return t('healthy');
    case 'diseased':
      return t('diseased');
    default:
      return t('unknown');
  }
};

const mockRecommendations = {
  healthy: {
    en: [
      "Continue current care routine",
      "Monitor regularly for any changes",
      "Maintain proper watering schedule",
      "Ensure adequate light exposure"
    ],
    hi: [
      "वर्तमान देखभाल की दिनचर्या जारी रखें",
      "नियमित रूप से किसी भी बदलाव पर नजर रखें",
      "उचित पानी देने का कार्यक्रम बनाए रखें",
      "पर्याप्त प्रकाश सुनिश्चित करें"
    ],
    ta: [
      "தற்போதைய பராமரிப்பு வழக்கத்தைத் தொடரவும்",
      "மாற்றங்களுக்கு தொடர்ந்து கண்காணிக்கவும்",
      "சரியான நீர்ப்பாசன அட்டவணையை பராமரிக்கவும்",
      "போதுமான வெளிச்சத்தை உறுதிப்படுத்தவும்"
    ]
  },
  diseased: {
    en: [
      "Remove affected leaves immediately",
      "Improve air circulation around plant",
      "Reduce watering frequency",
      "Consider fungicide treatment",
      "Isolate from other plants"
    ],
    hi: [
      "प्रभावित पत्तियों को तुरंत हटा दें",
      "पौधे के आसपास हवा का संचार बेहतर बनाएं",
      "पानी देने की आवृत्ति कम करें",
      "कवकनाशी उपचार पर विचार करें",
      "अन्य पौधों से अलग करें"
    ],
    ta: [
      "பாதிக்கப்பட்ட இலைகளை உடனே அகற்றவும்",
      "செடியைச் சுற்றி காற்று புழக்கத்தை மேம்படுத்தவும்",
      "நீர்ப்பாசன அளவைக் குறைக்கவும்",
      "பூஞ்சைக் கொல்லி சிகிச்சையைக் கருத்தில் கொள்ளவும்",
      "மற்ற செடிகளிலிருந்து தனிமைப்படுத்தவும்"
    ]
  },
  unknown: {
    en: [
      "Take additional photos in better lighting",
      "Monitor plant for symptoms",
      "Consult with plant expert if concerned",
      "Check care requirements for this plant species"
    ],
    hi: [
      "बेहतर प्रकाश में अतिरिक्त फोटो लें",
      "लक्षणों के लिए पौधे की निगरानी करें",
      "चिंता होने पर पौधे के विशेषज्ञ से सलाह लें",
      "इस पौधे की प्रजाति की देखभाल आवश्यकताओं की जांच करें"
    ],
    ta: [
      "சிறந்த வெளிச்சத்தில் கூடுதல் புகைப்படங்கள் எடுக்கவும்",
      "அறிகுறிகளுக்கு செடியைக் கண்காணிக்கவும்",
      "கவலை இருந்தால் தாவர வல்லுநரைக் கலந்தாலோசிக்கவும்",
      "இந்த தாவர இனத்திற்கான பராமரிப்பு தேவைகளைச் சரிபார்க்கவும்"
    ]
  }
};

const AnalysisResult = ({ result, imageUrl, onRecheck }) => {
  const { t, i18n } = useTranslation();

  if (!result) return null;

  const { status, confidence, diseaseName, healthScore } = result;
  const currentLang = i18n.language;
  
  // Get recommendations in current language, fallback to English
  const getRecommendations = (status, lang) => {
    const recommendations = mockRecommendations[status];
    return recommendations[lang] || recommendations['en'] || mockRecommendations.unknown['en'];
  };
  
  const recommendations = getRecommendations(status, currentLang);

  // PDF Generation function
  const generatePDF = () => {
    // Create a simplified report content
    const reportContent = `
PLANT BUDDY - ANALYSIS REPORT
${new Date().toLocaleDateString()}

PLANT HEALTH STATUS: ${getStatusText(status, t).toUpperCase()}
CONFIDENCE LEVEL: ${confidence}%
${diseaseName ? `DISEASE DETECTED: ${diseaseName}` : ''}
HEALTH SCORE: ${healthScore || Math.floor(confidence)}%

RECOMMENDATIONS:
${recommendations.map((rec, index) => `${index + 1}. ${rec}`).join('\n')}

ANALYSIS DETAILS:
- Overall Condition: ${status === 'healthy' ? 'Good' : status === 'diseased' ? 'Requires Attention' : 'Unclear'}
- Confidence Level: ${confidence >= 90 ? 'Very High' : confidence >= 70 ? 'High' : confidence >= 50 ? 'Moderate' : 'Low'}
- Action Required: ${status === 'healthy' ? 'Continue monitoring' : status === 'diseased' ? 'Immediate attention needed' : 'Monitor closely'}

Generated by Plant Buddy AI
Visit: https://plantbuddy.app
    `.trim();

    // Create and download the text file (simulating PDF)
    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `plant-analysis-report-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleRecheck = () => {
    if (onRecheck) {
      onRecheck();
    }
  };

  return (
    <ResultContainer>
      <ResultHeader>
        <ResultTitle>{t('results')}</ResultTitle>
        {imageUrl && <ResultImage src={imageUrl} alt="Analyzed plant" />}
      </ResultHeader>

      <StatusContainer>
        <StatusBadge status={status}>
          {getStatusIcon(status)}
          {getStatusText(status, t)}
        </StatusBadge>
      </StatusContainer>

      <div>
        <FlexContainer justify="space-between" style={{ marginBottom: '0.5rem' }}>
          <span style={{ fontWeight: 600 }}>{t('confidence')}:</span>
          <span>{confidence}%</span>
        </FlexContainer>
        <ConfidenceBar>
          <ConfidenceFill confidence={confidence} />
        </ConfidenceBar>
      </div>

      {diseaseName && (
        <div style={{ textAlign: 'center', margin: '1rem 0' }}>
          <strong>Disease Detected: </strong>{diseaseName}
        </div>
      )}

      <ActionButtonsContainer>
        <ActionButton 
          className="recheck" 
          onClick={handleRecheck}
          title="Take another photo for re-analysis"
        >
          <RotateCcw size={18} />
          Recheck
        </ActionButton>
        
        <ActionButton 
          className="pdf-generate" 
          onClick={generatePDF}
          title="Download analysis report"
        >
          <FileText size={18} />
          Generate Report
        </ActionButton>
      </ActionButtonsContainer>

      <InfoGrid>
        <InfoCard>
          <InfoIcon>
            <Leaf size={24} />
          </InfoIcon>
          <InfoTitle>Plant Health</InfoTitle>
          <InfoText>
            Overall health score: {healthScore || Math.floor(confidence)}%
            <br />
            {status === 'healthy' ? 'Your plant appears to be in good condition.' : 
             status === 'diseased' ? 'Signs of disease detected. Take action.' : 
             'Unable to determine health status clearly.'}
          </InfoText>
        </InfoCard>

        <InfoCard>
          <InfoIcon>
            <Shield size={24} />
          </InfoIcon>
          <InfoTitle>Analysis Confidence</InfoTitle>
          <InfoText>
            {confidence >= 90 ? 'Very High' : 
             confidence >= 70 ? 'High' : 
             confidence >= 50 ? 'Moderate' : 'Low'} confidence level
            <br />
            {confidence >= 70 ? 'Results are reliable.' : 'Consider taking another photo for better accuracy.'}
          </InfoText>
        </InfoCard>

        <InfoCard>
          <InfoIcon>
            <TrendingUp size={24} />
          </InfoIcon>
          <InfoTitle>Next Steps</InfoTitle>
          <InfoText>
            {status === 'healthy' ? 'Continue monitoring and maintain current care.' : 
             status === 'diseased' ? 'Immediate attention required to prevent spread.' : 
             'Monitor closely and consider expert consultation.'}
          </InfoText>
        </InfoCard>
      </InfoGrid>

      <Card style={{ marginTop: '2rem' }}>
        <InfoTitle style={{ textAlign: 'center', marginBottom: '1rem' }}>
          {t('recommendations')}
        </InfoTitle>
        <RecommendationsList>
          {recommendations.map((recommendation, index) => (
            <RecommendationItem key={index}>
              <RecommendationIcon>{index + 1}</RecommendationIcon>
              <InfoText style={{ margin: 0, textAlign: 'left' }}>
                {recommendation}
              </InfoText>
            </RecommendationItem>
          ))}
        </RecommendationsList>
      </Card>

      <ActionButtonsContainer>
        <ActionButton className="recheck" onClick={() => window.location.reload()}>
          <RotateCcw size={16} />
          {t('recheck')}
        </ActionButton>
        <ActionButton className="pdf-generate" onClick={() => alert('PDF Report Generated!')}>
          <FileText size={16} />
          {t('generate_pdf')}
        </ActionButton>
      </ActionButtonsContainer>
    </ResultContainer>
  );
};

export default AnalysisResult;
