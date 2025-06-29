import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from 'styled-components';
import { Camera, Upload, ArrowLeft } from 'lucide-react';
import { theme } from './styles/theme';
import { 
  GradientBackground, 
  Container, 
  Card, 
  Title, 
  Subtitle, 
  Text, 
  Button, 
  FlexContainer,
  Grid
} from './styles/components';
import Header from './components/Header';
import CameraCapture from './components/CameraCapture';
import ImageUpload from './components/ImageUpload';
import AnalysisResult from './components/AnalysisResult';
import LoadingScreen from './components/LoadingScreen';
import About from './components/About';
import Features from './components/Features';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import Plants from './components/Plants';
import './i18n';

// Mock AI analysis function
const mockAnalyzeImage = async (imageFile) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Mock analysis results
  const mockResults = [
    {
      status: 'healthy',
      confidence: 92,
      diseaseName: null,
      healthScore: 95
    },
    {
      status: 'diseased',
      confidence: 87,
      diseaseName: 'Leaf Spot Disease',
      healthScore: 45
    },
    {
      status: 'diseased',
      confidence: 78,
      diseaseName: 'Powdery Mildew',
      healthScore: 35
    }
  ];
  
  // Return random result for demo
  return mockResults[Math.floor(Math.random() * mockResults.length)];
};

function App() {
  const { t } = useTranslation();
  const [currentView, setCurrentView] = useState('home'); // 'home', 'camera', 'upload', 'loading', 'results'
  const [analysisResult, setAnalysisResult] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [loadingStep, setLoadingStep] = useState(1);
  const [showAbout, setShowAbout] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  
  // Authentication states
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showPlants, setShowPlants] = useState(false);

  const handleImageAnalysis = async (imageFile) => {
    try {
      setCurrentImage(URL.createObjectURL(imageFile));
      setCurrentView('loading');
      setLoadingStep(1);
      
      // Simulate loading steps
      setTimeout(() => setLoadingStep(2), 1000);
      setTimeout(() => setLoadingStep(3), 2000);
      
      const result = await mockAnalyzeImage(imageFile);
      setAnalysisResult(result);
      setCurrentView('results');
    } catch (error) {
      console.error('Analysis error:', error);
      // Handle error - could show error message
      setCurrentView('home');
    }
  };

  const goBack = () => {
    setCurrentView('home');
    setAnalysisResult(null);
    setCurrentImage(null);
    setLoadingStep(1);
  };

  const handleAboutClick = () => {
    setShowAbout(true);
  };

  const handleAboutClose = () => {
    setShowAbout(false);
  };

  const handleFeaturesClick = () => {
    setShowFeatures(true);
  };

  const handleFeaturesClose = () => {
    setShowFeatures(false);
  };

  const handleRecheck = () => {
    // Clear current results and go back to home to start fresh analysis
    setAnalysisResult(null);
    setCurrentImage(null);
    setLoadingStep(1);
    setCurrentView('home');
  };

  // Authentication handlers
  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleSignUpClick = () => {
    setShowSignUp(true);
  };

  const handleProfileClick = () => {
    setShowProfile(true);
  };

  const handlePlantsClick = () => {
    setShowPlants(true);
  };

  const handleLoginClose = () => {
    setShowLogin(false);
  };

  const handleSignUpClose = () => {
    setShowSignUp(false);
  };

  const handleProfileClose = () => {
    setShowProfile(false);
  };

  const handlePlantsClose = () => {
    setShowPlants(false);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setShowLogin(false);
    setShowSignUp(false);
  };

  const handleSignUpSuccess = (userData) => {
    setUser(userData);
    setShowLogin(false);
    setShowSignUp(false);
  };

  const handleLogout = () => {
    setUser(null);
    setShowProfile(false);
  };

  const handleSwitchToSignUp = () => {
    setShowLogin(false);
    setShowSignUp(true);
  };

  const handleSwitchToLogin = () => {
    setShowSignUp(false);
    setShowLogin(true);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'camera':
        return (
          <Container>
            <Button 
              onClick={goBack} 
              variant="secondary" 
              style={{ alignSelf: 'flex-start', marginBottom: '1rem' }}
            >
              <ArrowLeft size={20} />
              {t('back')}
            </Button>
            <CameraCapture 
              onImageCapture={handleImageAnalysis}
              disabled={currentView === 'loading'}
            />
          </Container>
        );
      
      case 'upload':
        return (
          <Container>
            <Button 
              onClick={goBack} 
              variant="secondary" 
              style={{ alignSelf: 'flex-start', marginBottom: '1rem' }}
            >
              <ArrowLeft size={20} />
              {t('back')}
            </Button>
            <ImageUpload 
              onImageUpload={handleImageAnalysis}
              disabled={currentView === 'loading'}
            />
          </Container>
        );
      
      case 'loading':
        return (
          <Container>
            <Card>
              <LoadingScreen step={loadingStep} />
            </Card>
          </Container>
        );
      
      case 'results':
        return (
          <Container>
            <Button 
              onClick={goBack} 
              variant="secondary" 
              style={{ alignSelf: 'flex-start', marginBottom: '1rem' }}
            >
              <ArrowLeft size={20} />
              {t('back')}
            </Button>
            <AnalysisResult result={analysisResult} imageUrl={currentImage} onRecheck={handleRecheck} />
          </Container>
        );
      
      default:
        return (
          <Container>
            <Card style={{ textAlign: 'center', marginTop: '2rem' }}>
              <Title>{t('welcome')}</Title>
              <Subtitle>{t('subtitle')}</Subtitle>
              <Text>{t('description')}</Text>
              
              <Grid style={{ marginTop: '2rem' }}>
                <Card style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📷</div>
                  <h3 style={{ color: theme.colors.text.primary, marginBottom: '1rem' }}>
                    {t('scanWithCamera')}
                  </h3>
                  <Text style={{ marginBottom: '1.5rem' }}>
                   your device camera to capture a photo of your plant in real-time.
                  </Text>
                  <Button onClick={() => setCurrentView('camera')}>
                    <Camera size={20} />
                    {t('scanWithCamera')}
                  </Button>
                </Card>
                
                <Card style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📁</div>
                  <h3 style={{ color: theme.colors.text.primary, marginBottom: '1rem' }}>
                    {t('uploadImage')}
                  </h3>
                  <Text style={{ marginBottom: '1.5rem' }}>
                    Upload an existing image of your plant from your device gallery.
                  </Text>
                  <Button onClick={() => setCurrentView('upload')} variant="secondary">
                    <Upload size={20} />
                    {t('uploadImage')}
                  </Button>
                </Card>
              </Grid>
            </Card>
            
            {/* Features Section */}
            <Card style={{ marginTop: '3rem' }}>
              <Title style={{ fontSize: '2rem', marginBottom: '2rem' }}>
                {t('features')}
              </Title>
              <Grid>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🤖</div>
                  <h3 style={{ color: theme.colors.text.primary, marginBottom: '0.5rem' }}>
                    AI-Powered Detection
                  </h3>
                  <Text style={{ marginBottom: 0 }}>
                    Advanced machine learning algorithms for accurate plant disease detection.
                  </Text>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⚡</div>
                  <h3 style={{ color: theme.colors.text.primary, marginBottom: '0.5rem' }}>
                    Instant Results
                  </h3>
                  <Text style={{ marginBottom: 0 }}>
                    Get immediate analysis results with confidence scores and recommendations.
                  </Text>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🌍</div>
                  <h3 style={{ color: theme.colors.text.primary, marginBottom: '0.5rem' }}>
                    Multi-Language
                  </h3>
                  <Text style={{ marginBottom: 0 }}>
                    Available in multiple languages for users worldwide.
                  </Text>
                </div>
              </Grid>
            </Card>
          </Container>
        );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <GradientBackground>
        <Header 
          onAboutClick={handleAboutClick} 
          onFeaturesClick={handleFeaturesClick}
          user={user}
          onLoginClick={handleLoginClick}
          onProfileClick={handleProfileClick}
          onPlantsClick={handlePlantsClick}
        />
        {renderContent()}
        <About isOpen={showAbout} onClose={handleAboutClose} />
        <Features isOpen={showFeatures} onClose={handleFeaturesClose} />
        <Login 
          isOpen={showLogin} 
          onClose={handleLoginClose}
          onSuccess={handleLoginSuccess}
          onSwitchToSignUp={handleSwitchToSignUp}
        />
        <SignUp 
          isOpen={showSignUp} 
          onClose={handleSignUpClose}
          onSuccess={handleSignUpSuccess}
          onSwitchToLogin={handleSwitchToLogin}
        />        <Profile 
          isOpen={showProfile} 
          onClose={handleProfileClose}
          user={user}
          onLogout={handleLogout}
        />
        <Plants 
          isOpen={showPlants} 
          onClose={handlePlantsClose}
          user={user}
        />
      </GradientBackground>
    </ThemeProvider>
  );
}

export default App;
