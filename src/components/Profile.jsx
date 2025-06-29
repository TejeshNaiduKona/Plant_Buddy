import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { X, User, Mail, Calendar, Settings, LogOut } from 'lucide-react';
import { Card, Button, FlexContainer, Title, Text } from '../styles/components';

const ProfileModal = styled.div`
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

const ProfileContent = styled.div`
  background: ${props => props.theme.colors.background.paper};
  border-radius: ${props => props.theme.borderRadius.lg};
  max-width: 450px;
  width: 100%;
  position: relative;
  box-shadow: ${props => props.theme.shadows.xl};
`;

const ProfileHeader = styled.div`
  background: ${props => props.theme.colors.gradient.primary};
  color: white;
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.lg} ${props => props.theme.borderRadius.lg} 0 0;
  text-align: center;
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
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: rotate(90deg);
  }
`;

const ProfileBody = styled.div`
  padding: ${props => props.theme.spacing.xl};
`;

const ProfileAvatar = styled.div`
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: ${props => props.theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${props => props.theme.spacing.lg};
  font-size: 2rem;
  color: white;
`;

const ProfileInfo = styled.div`
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.md} 0;
  border-bottom: 1px solid rgba(16, 185, 129, 0.1);
  
  &:last-child {
    border-bottom: none;
  }
  
  svg {
    color: ${props => props.theme.colors.primary.main};
    flex-shrink: 0;
  }
`;

const InfoLabel = styled.span`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: 0.25rem;
  display: block;
`;

const InfoValue = styled.span`
  font-size: 1rem;
  color: ${props => props.theme.colors.text.primary};
  font-weight: 500;
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.xl};
`;

const Profile = ({ isOpen, onClose, user, onLogout }) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleLogout = () => {
    onLogout();
    onClose();
  };

  return (
    <ProfileModal onClick={handleBackdropClick}>
      <ProfileContent>
        <ProfileHeader>
          <CloseButton onClick={onClose}>
            <X size={20} />
          </CloseButton>
          <ProfileAvatar>
            <User size={32} />
          </ProfileAvatar>
          <Title style={{ color: 'white', margin: 0, fontSize: '1.5rem' }}>
            {user?.name || 'Plant Lover'}
          </Title>
          <Text style={{ color: 'rgba(255, 255, 255, 0.8)', margin: '0.5rem 0 0' }}>
            Member since {new Date().toLocaleDateString()}
          </Text>
        </ProfileHeader>

        <ProfileBody>
          <ProfileInfo>
            <InfoItem>
              <User size={20} />
              <div>
                <InfoLabel>Full Name</InfoLabel>
                <InfoValue>{user?.name || 'Plant Lover'}</InfoValue>
              </div>
            </InfoItem>

            <InfoItem>
              <Mail size={20} />
              <div>
                <InfoLabel>Email Address</InfoLabel>
                <InfoValue>{user?.email || 'user@plantbuddy.com'}</InfoValue>
              </div>
            </InfoItem>

            <InfoItem>
              <Calendar size={20} />
              <div>
                <InfoLabel>Member Since</InfoLabel>
                <InfoValue>{new Date().toLocaleDateString()}</InfoValue>
              </div>
            </InfoItem>
          </ProfileInfo>

          <ActionButtons>
            <Button variant="secondary" style={{ justifyContent: 'flex-start', gap: '0.75rem' }}>
              <Settings size={18} />
              Account Settings
            </Button>
            
            <Button 
              onClick={handleLogout}
              style={{ 
                background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                justifyContent: 'flex-start', 
                gap: '0.75rem' 
              }}
            >
              <LogOut size={18} />
              Sign Out
            </Button>
          </ActionButtons>
        </ProfileBody>
      </ProfileContent>
    </ProfileModal>
  );
};

export default Profile;
