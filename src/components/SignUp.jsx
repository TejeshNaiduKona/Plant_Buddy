import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { X, User, Lock, Mail, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Card, Button, FlexContainer, Title } from '../styles/components';
import { auth, googleProvider } from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';

const SignupModal = styled.div`
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

const SignupContent = styled.div`
  background: ${props => props.theme.colors.background.paper};
  border-radius: ${props => props.theme.borderRadius.lg};
  max-width: 400px;
  width: 100%;
  position: relative;
  box-shadow: ${props => props.theme.shadows.xl};
`;

const SignupHeader = styled.div`
  background: #10b981;
  background: ${props => props.theme.colors.gradient.secondary};
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

const SignupTitle = styled.h2`
  color: white;
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  z-index: 2;
  position: relative;
`;

const SignupSubtitle = styled.p`
  color: rgba(255, 255, 255, 0.95);
  margin: 0.5rem 0 0 0;
  font-size: 0.95rem;
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

const SignupBody = styled.div`
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
  background: ${props => props.theme.colors.gradient.secondary};
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

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: ${props => props.theme.spacing.lg} 0;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(16, 185, 129, 0.2);
  }
  
  span {
    padding: 0 ${props => props.theme.spacing.md};
    color: #718096;
    font-size: 0.9rem;
  }
`;

const GoogleButton = styled.button`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  border: 2px solid rgba(16, 185, 129, 0.2);
  border-radius: ${props => props.theme.borderRadius.md};
  background: white;
  color: #374151;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.md};
  
  &:hover {
    border-color: ${props => props.theme.colors.primary.main};
    background: rgba(16, 185, 129, 0.05);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  color: #dc2626;
  font-size: 0.9rem;
`;

const LoadingSpinner = styled.div`
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 2px solid white;
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const SignUp = ({ isOpen, onClose, onSwitchToLogin, onSuccess }) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      setLoading(false);
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      
      // Update the user's display name
      await updateProfile(user, {
        displayName: formData.name
      });
      
      const userData = {
        id: user.uid,
        name: formData.name,
        email: user.email,
        photoURL: user.photoURL,
        joinDate: user.metadata.creationTime,
        analysisCount: 0,
        isFirebaseUser: true
      };
      
      onSuccess(userData);
    } catch (error) {
      console.error('Sign-up error:', error);
      setError(getErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    setError('');

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      const userData = {
        id: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        joinDate: user.metadata.creationTime,
        analysisCount: 0,
        isFirebaseUser: true
      };
      
      onSuccess(userData);
    } catch (error) {
      console.error('Google sign-up error:', error);
      setError(getErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'An account with this email already exists.';
      case 'auth/invalid-email':
        return 'Invalid email address format.';
      case 'auth/operation-not-allowed':
        return 'Email/password accounts are not enabled.';
      case 'auth/weak-password':
        return 'Password is too weak. Please choose a stronger password.';
      case 'auth/popup-closed-by-user':
        return 'Sign-up was cancelled.';
      default:
        return 'An error occurred during sign-up. Please try again.';
    }
  };

  return (
    <SignupModal onClick={onClose}>
      <SignupContent onClick={(e) => e.stopPropagation()}>
        <SignupHeader>
          <CloseButton onClick={onClose}>
            <X size={20} />
          </CloseButton>
          <SignupTitle>
            Join Plant Buddy
          </SignupTitle>
          <SignupSubtitle>
            Create your account to get started
          </SignupSubtitle>
        </SignupHeader>

        <SignupBody>
          {error && (
            <ErrorMessage>
              <AlertCircle size={18} />
              {error}
            </ErrorMessage>
          )}

          <GoogleButton onClick={handleGoogleSignUp} disabled={loading}>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            )}
            Continue with Google
          </GoogleButton>

          <Divider>
            <span>or</span>
          </Divider>

          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="name">Full Name</Label>
              <InputContainer>
                <InputIcon>
                  <User size={18} />
                </InputIcon>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                />
              </InputContainer>
            </FormGroup>

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
                  disabled={loading}
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
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  minLength={6}
                  disabled={loading}
                />
                <PasswordToggle
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </PasswordToggle>
              </InputContainer>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <InputContainer>
                <InputIcon>
                  <Lock size={18} />
                </InputIcon>
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  minLength={6}
                  disabled={loading}
                />
                <PasswordToggle
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={loading}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </PasswordToggle>
              </InputContainer>
            </FormGroup>

            <SubmitButton type="submit" disabled={loading}>
              {loading ? <LoadingSpinner /> : 'Create Account'}
            </SubmitButton>
          </form>

          <SwitchText>
            Already have an account?{' '}
            <a onClick={onSwitchToLogin}>
              Sign in here
            </a>
          </SwitchText>
        </SignupBody>
      </SignupContent>
    </SignupModal>
  );
};

export default SignUp;
