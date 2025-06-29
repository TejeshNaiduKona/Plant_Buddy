import React, { useRef, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Webcam from 'react-webcam';
import styled from 'styled-components';
import { Camera, RotateCcw, Check, X } from 'lucide-react';
import { Card, Button, FlexContainer, Text } from '../styles/components';

const CameraContainer = styled.div`
  position: relative;
  border-radius: ${props => props.theme.borderRadius.lg};
  overflow: hidden;
  background: #000;
  margin: ${props => props.theme.spacing.lg} 0;
`;

const WebcamStyled = styled(Webcam)`
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: cover;
`;

const CameraOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px dashed rgba(255, 255, 255, 0.8);
  width: 80%;
  height: 80%;
  border-radius: ${props => props.theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: white;
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
`;

const ErrorMessage = styled.div`
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid #ef4444;
  color: #dc2626;
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  text-align: center;
  margin: ${props => props.theme.spacing.md} 0;
`;

const CapturedImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: cover;
  border-radius: ${props => props.theme.borderRadius.lg};
`;

const CameraCapture = ({ onImageCapture, disabled }) => {
  const { t } = useTranslation();
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  const [hasPermission, setHasPermission] = useState(false);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "environment" // Use back camera on mobile
  };

  const handleUserMedia = useCallback(() => {
    setHasPermission(true);
    setCameraError(null);
  }, []);

  const handleUserMediaError = useCallback((error) => {
    console.error('Camera error:', error);
    setHasPermission(false);
    if (error.name === 'NotAllowedError') {
      setCameraError(t('cameraPermissionDenied'));
    } else {
      setCameraError(t('cameraNotSupported'));
    }
  }, [t]);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  }, [webcamRef]);

  const retake = useCallback(() => {
    setCapturedImage(null);
  }, []);

  const confirmCapture = useCallback(() => {
    if (capturedImage && onImageCapture) {
      // Convert data URL to File object
      fetch(capturedImage)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
          onImageCapture(file);
        });
    }
  }, [capturedImage, onImageCapture]);

  if (cameraError) {
    return (
      <Card>
        <ErrorMessage>
          <Camera size={48} style={{ margin: '0 auto 1rem', display: 'block' }} />
          {cameraError}
        </ErrorMessage>
      </Card>
    );
  }

  return (
    <Card>
      <Text>{t('scanWithCamera')}</Text>
      
      <CameraContainer>
        {capturedImage ? (
          <CapturedImage src={capturedImage} alt="Captured plant" />
        ) : (
          <>
            <WebcamStyled
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              onUserMedia={handleUserMedia}
              onUserMediaError={handleUserMediaError}
            />
            {!hasPermission && (
              <CameraOverlay>
                <Camera size={64} style={{ marginBottom: '1rem' }} />
                <Text style={{ color: 'white', marginBottom: 0 }}>
                  Waiting for camera permission...
                </Text>
              </CameraOverlay>
            )}
          </>
        )}
      </CameraContainer>
      
      <FlexContainer>
        {capturedImage ? (
          <>
            <Button onClick={retake} variant="secondary" disabled={disabled}>
              <RotateCcw size={20} />
              {t('retakePhoto')}
            </Button>
            <Button onClick={confirmCapture} disabled={disabled}>
              <Check size={20} />
              {t('analyzeImage')}
            </Button>
          </>
        ) : (
          <Button onClick={capture} disabled={!hasPermission || disabled}>
            <Camera size={20} />
            {t('takePhoto')}
          </Button>
        )}
      </FlexContainer>
    </Card>
  );
};

export default CameraCapture;
