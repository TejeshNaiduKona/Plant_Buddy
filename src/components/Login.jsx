import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { X, User, Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { Card, Button, FlexContainer, Title } from '../styles/components';

const LoginModal = styled.div`
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

const LoginContent = styled.div`
  background: ${props => props.theme.colors.background.paper};
  border-radius: ${props => props.theme.borderRadius.lg};
  max-width: 400px;
  width: 100%;
  position: relative;
  box-shadow: ${props => props.theme.shadows.xl};
`;

const LoginHeader = styled.div`
  background: #059669;
  background: ${props => props.theme.colors.gradient.primary};
  color: white;
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.lg} ${props => props.theme.borderRadius.lg} 0 0;
  text-align: center;
  position: relative;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

const LoginTitle = styled.h2`
  color: white;
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  z-index: 2;
  position: relative;
`;

const LoginSubtitle = styled.p`
  color: rgba(255, 255, 255, 0.95);
  margin: 0.5rem 0 0 0;
  font-size: 0.95rem;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  z-index: 2;
  position: relative;
`;

const LoginBody = styled.div`
  padding: ${props => props.theme.spacing.xl};
`;

const FormGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const Label = styled.label`
  display: block;
  color: #2d3748;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const InputContainer = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.md} ${props => props.theme.spacing.md} 3rem;
  border: 2px solid rgba(16, 185, 129, 0.2);
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary.main};
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }
  
  &::placeholder {
    color: #a0aec0;
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: ${props => props.theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  color: #718096;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: ${props => props.theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #718096;
  cursor: pointer;
  
  &:hover {
    color: ${props => props.theme.colors.primary.main};
  }
`;

const SubmitButton = styled(Button)`
  width: 100%;
  background: ${props => props.theme.colors.gradient.primary};
  border: none;
  padding: ${props => props.theme.spacing.md};
  font-size: 1rem;
  font-weight: 600;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const SwitchText = styled.p`
  text-align: center;
  color: #4a5568;
  margin-top: ${props => props.theme.spacing.lg};
  
  a {
    color: ${props => props.theme.colors.primary.main};
    text-decoration: none;
    font-weight: 600;
    cursor: pointer;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Login = ({ isOpen, onClose, onSwitchToSignUp, onSuccess }) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock login - in real app, validate credentials here
    if (formData.email && formData.password) {
      const mockUser = {
        id: 1,
        name: formData.email.split('@')[0],
        email: formData.email,
        joinDate: new Date().toISOString(),
        analysisCount: Math.floor(Math.random() * 50) + 1
      };
      onSuccess(mockUser);
      onClose();
    }
  };

  return (
    <LoginModal onClick={onClose}>
      <LoginContent onClick={(e) => e.stopPropagation()}>
        <LoginHeader>
          <CloseButton onClick={onClose}>
            <X size={20} />
          </CloseButton>
          <LoginTitle>
            Welcome Back
          </LoginTitle>
          <LoginSubtitle>
            Sign in to your Plant Buddy account
          </LoginSubtitle>
        </LoginHeader>

        <LoginBody>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="email">Email Address</Label>
              <InputContainer>
                <InputIcon>
                  <Mail size={18} />
                </InputIcon>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </InputContainer>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <InputContainer>
                <InputIcon>
                  <Lock size={18} />
                </InputIcon>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <PasswordToggle
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </PasswordToggle>
              </InputContainer>
            </FormGroup>

            <SubmitButton type="submit">
              Sign In
            </SubmitButton>
          </form>

          <SwitchText>
            Don't have an account?{' '}
            <a onClick={onSwitchToSignUp}>
              Sign up here
            </a>
          </SwitchText>
        </LoginBody>
      </LoginContent>
    </LoginModal>
  );
};

export default Login;
