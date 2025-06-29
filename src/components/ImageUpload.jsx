import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import { Card, Button, FlexContainer, Text } from '../styles/components';

const DropZone = styled.div`
  border: 2px dashed ${props => props.isDragOver ? props.theme.colors.primary.main : props.theme.colors.primary.light};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xxl};
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.isDragOver ? 'rgba(16, 185, 129, 0.05)' : 'transparent'};
  margin: ${props => props.theme.spacing.lg} 0;
  
  &:hover {
    border-color: ${props => props.theme.colors.primary.main};
    background: rgba(16, 185, 129, 0.05);
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const ImagePreview = styled.div`
  position: relative;
  margin: ${props => props.theme.spacing.lg} 0;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: cover;
  border-radius: ${props => props.theme.borderRadius.lg};
`;

const RemoveButton = styled.button`
  position: absolute;
  top: ${props => props.theme.spacing.sm};
  right: ${props => props.theme.spacing.sm};
  background: rgba(239, 68, 68, 0.9);
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.full};
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #dc2626;
  }
`;

const FileInfo = styled.div`
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid ${props => props.theme.colors.primary.light};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.md};
  margin: ${props => props.theme.spacing.md} 0;
  text-align: left;
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

const ImageUpload = ({ onImageUpload, disabled }) => {
  const { t } = useTranslation();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const acceptedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxSize = 10 * 1024 * 1024; // 10MB

  const validateFile = (file) => {
    if (!acceptedTypes.includes(file.type)) {
      setError('Invalid file type. Please upload JPG, PNG, or WEBP images.');
      return false;
    }
    
    if (file.size > maxSize) {
      setError('File too large. Please upload images smaller than 10MB.');
      return false;
    }
    
    setError(null);
    return true;
  };

  const handleFileSelect = (file) => {
    if (validateFile(file)) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleFileInput = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);
    
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const uploadFile = () => {
    if (selectedFile && onImageUpload) {
      onImageUpload(selectedFile);
    }
  };

  return (
    <Card>
      <Text>{t('uploadImage')}</Text>
      
      {!selectedFile ? (
        <DropZone
          isDragOver={isDragOver}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={openFileDialog}
        >
          <Upload size={64} color="#059669" style={{ marginBottom: '1rem' }} />
          <Text style={{ marginBottom: '0.5rem', fontSize: '1.1rem', fontWeight: 600 }}>
            {t('selectFile')}
          </Text>
          <Text style={{ marginBottom: 0, color: '#6b7280' }}>
            {t('supportedFormats')}
          </Text>
          <Text style={{ marginBottom: 0, color: '#6b7280', fontSize: '0.9rem' }}>
            Drag and drop or click to browse
          </Text>
        </DropZone>
      ) : (
        <ImagePreview>
          <PreviewImage src={previewUrl} alt="Selected plant" />
          <RemoveButton onClick={removeFile}>
            <X size={16} />
          </RemoveButton>
        </ImagePreview>
      )}
      
      {selectedFile && (
        <FileInfo>
          <strong>File:</strong> {selectedFile.name}<br />
          <strong>Size:</strong> {(selectedFile.size / 1024 / 1024).toFixed(2)} MB<br />
          <strong>Type:</strong> {selectedFile.type}
        </FileInfo>
      )}
      
      {error && (
        <ErrorMessage>{error}</ErrorMessage>
      )}
      
      <HiddenInput
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes.join(',')}
        onChange={handleFileInput}
      />
      
      {selectedFile && (
        <FlexContainer>
          <Button onClick={uploadFile} disabled={disabled}>
            <ImageIcon size={20} />
            {t('analyzeImage')}
          </Button>
        </FlexContainer>
      )}
    </Card>
  );
};

export default ImageUpload;
