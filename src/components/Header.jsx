import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Globe, Menu, X, User, LogIn, Leaf } from 'lucide-react';
import { IconButton, FlexContainer, Button } from '../styles/components';

const HeaderContainer = styled.header`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(16, 185, 129, 0.1);
  padding: ${props => props.theme.spacing.md} 0;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  font-size: 1.5rem;
  font-weight: 800;
  color: ${props => props.theme.colors.primary.main};
`;

const LogoIcon = styled.div`
  width: 32px;
  height: 32px;
  background: ${props => props.theme.colors.gradient.primary};
  border-radius: ${props => props.theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
`;

const Nav = styled.nav`
  display: none;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    padding: ${props => props.theme.spacing.lg};
    box-shadow: ${props => props.theme.shadows.lg};
    justify-content: flex-start;
    align-items: center;
    gap: ${props => props.theme.spacing.md};
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.lg};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const PlantsButton = styled.button`
  background: ${props => props.theme.colors.gradient.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 2px 4px rgba(16, 185, 129, 0.2);
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(16, 185, 129, 0.3);
    background: ${props => props.theme.colors.primary.dark};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    width: 100%;
    justify-content: center;
    margin: ${props => props.theme.spacing.sm} 0;
  }
`;

const NavLink = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.text.primary};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(16, 185, 129, 0.1);
    color: ${props => props.theme.colors.primary.main};
  }
`;

const LanguageSelect = styled.select`
  background: ${props => props.theme.colors.gradient.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  font-size: 0.9rem;
  cursor: pointer;
  
  option {
    background: white;
    color: ${props => props.theme.colors.text.primary};
  }
`;

const MobileMenuButton = styled(IconButton)`
  display: none;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: flex;
  }
`;

const AuthButtons = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    width: 100%;
    justify-content: center;
    margin-top: ${props => props.theme.spacing.md};
  }
`;

const ProfileButton = styled.button`
  background: ${props => props.theme.colors.gradient.primary};
  border: none;
  border-radius: ${props => props.theme.borderRadius.full};
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;

  &:hover {
    transform: scale(1.05);
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.text.primary};
  font-size: 0.9rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const Header = ({ onAboutClick, onFeaturesClick, user, onLoginClick, onProfileClick, onPlantsClick }) => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <HeaderContainer>
      <FlexContainer justify="space-between" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        <Logo>
          <LogoIcon>🌿</LogoIcon>
          {t('title')}
        </Logo>
        
        <Nav isOpen={isMenuOpen}>
          <NavLink onClick={onAboutClick}>{t('about')}</NavLink>
          <NavLink onClick={onFeaturesClick}>{t('features')}</NavLink>
          {user && (
            <PlantsButton onClick={onPlantsClick}>
              <Leaf size={16} />
              My Plants
            </PlantsButton>
          )}
          
          <FlexContainer align="center" gap="0.5rem">
            <Globe size={20} color="#059669" />
            <LanguageSelect 
              value={i18n.language} 
              onChange={(e) => changeLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <optgroup label="🇮🇳 Indian Languages">
                <option value="hi">हिंदी (Hindi)</option>
                <option value="ta">தமிழ் (Tamil)</option>
                <option value="te">తెలుగు (Telugu)</option>
                <option value="bn">বাংলা (Bengali)</option>
                <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
                <option value="gu">ગુજરાતી (Gujarati)</option>
                <option value="mr">मराठी (Marathi)</option>
              </optgroup>
              <optgroup label="🌍 International">
                <option value="es">Español</option>
                <option value="fr">Français</option>
              </optgroup>
            </LanguageSelect>
          </FlexContainer>
        </Nav>

        <RightSection>
          <NavLink onClick={onAboutClick}>{t('about')}</NavLink>
          <NavLink onClick={onFeaturesClick}>{t('features')}</NavLink>
          {user && (
            <PlantsButton onClick={onPlantsClick}>
              <Leaf size={16} />
              My Plants
            </PlantsButton>
          )}
          
          <FlexContainer align="center" gap="0.5rem">
            <Globe size={20} color="#059669" />
            <LanguageSelect 
              value={i18n.language} 
              onChange={(e) => changeLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <optgroup label="🇮🇳 Indian Languages">
                <option value="hi">हिंदी (Hindi)</option>
                <option value="ta">தமிழ் (Tamil)</option>
                <option value="te">తెలుగు (Telugu)</option>
                <option value="bn">বাংলা (Bengali)</option>
                <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
                <option value="gu">ગુજરાતી (Gujarati)</option>
                <option value="mr">मराठी (Marathi)</option>
              </optgroup>
              <optgroup label="🌍 International">
                <option value="es">Español</option>
                <option value="fr">Français</option>
              </optgroup>
            </LanguageSelect>
          </FlexContainer>

          <AuthButtons>
            {user ? (
              <>
                <UserInfo>
                  Welcome, {user.name || 'Plant Lover'}
                </UserInfo>
                <ProfileButton onClick={onProfileClick} title={`${user.name || 'Profile'}`}>
                  <User size={20} />
                </ProfileButton>
              </>
            ) : (
              <Button variant="secondary" size="sm" onClick={onLoginClick}>
                <LogIn size={16} />
                Sign In
              </Button>
            )}
          </AuthButtons>
        </RightSection>
        
        <MobileMenuButton onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </MobileMenuButton>
      </FlexContainer>
    </HeaderContainer>
  );
};

export default Header;
