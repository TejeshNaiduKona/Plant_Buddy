import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { X, Plus, Search, Filter, Grid, List, Camera, Upload, Eye, Calendar, Droplets, Sun, AlertTriangle, CheckCircle, Heart, Trash2, Edit3, MoreVertical, Save, MapPin, Info, Scan, FileText, Download } from 'lucide-react';
import { Card, Button, FlexContainer, Title, Text } from '../styles/components';

const PlantsModal = styled.div`
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

const PlantsContent = styled.div`
  background: ${props => props.theme.colors.background.paper};
  border-radius: ${props => props.theme.borderRadius.lg};
  max-width: 1200px;
  width: 100%;
  max-height: 95vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
`;

const PlantsHeader = styled.div`
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
    transform: rotate(90deg);
  }
`;

const PlantsTitle = styled.h2`
  color: white;
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  z-index: 2;
  position: relative;
`;

const PlantsSubtitle = styled.p`
  color: rgba(255, 255, 255, 0.95);
  margin: 0.5rem 0 0 0;
  font-size: 0.95rem;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  z-index: 2;
  position: relative;
`;

const PlantsBody = styled.div`
  padding: ${props => props.theme.spacing.xl};
`;

const ToolsSection = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.xl};
  flex-wrap: wrap;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: column;
  }
`;

const SearchBar = styled.div`
  position: relative;
  flex: 1;
  min-width: 200px;
`;

const SearchInput = styled.input`
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

const SearchIcon = styled.div`
  position: absolute;
  left: ${props => props.theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  color: #718096;
`;

const ViewToggle = styled.div`
  display: flex;
  background: rgba(16, 185, 129, 0.1);
  border-radius: ${props => props.theme.borderRadius.md};
  overflow: hidden;
`;

const ViewButton = styled.button`
  background: ${props => props.active ? props.theme.colors.primary.main : 'transparent'};
  color: ${props => props.active ? 'white' : props.theme.colors.primary.main};
  border: none;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? props.theme.colors.primary.dark : 'rgba(16, 185, 129, 0.2)'};
  }
`;

const PlantsGrid = styled.div`
  display: grid;
  grid-template-columns: ${props => props.viewMode === 'grid' ? 'repeat(auto-fill, minmax(320px, 1fr))' : '1fr'};
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: ${props => props.viewMode === 'grid' ? 'repeat(auto-fill, minmax(280px, 1fr))' : '1fr'};
    gap: ${props => props.theme.spacing.md};
  }
`;

const PlantCard = styled.div`
  background: white;
  border: 2px solid rgba(16, 185, 129, 0.1);
  border-radius: ${props => props.theme.borderRadius.lg};
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    border-color: ${props => props.theme.colors.primary.main};
  }
`;

const PlantImage = styled.div`
  height: 220px;
  background: ${props => props.theme.colors.gradient.accent};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 4rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.8) 0%, rgba(5, 150, 105, 0.9) 100%);
    z-index: 1;
  }
  
  span {
    position: relative;
    z-index: 2;
  }
`;

const PlantStatus = styled.div`
  position: absolute;
  top: ${props => props.theme.spacing.md};
  right: ${props => props.theme.spacing.md};
  background: ${props => 
    props.status === 'healthy' ? '#10b981' : 
    props.status === 'diseased' ? '#ef4444' : 
    props.status === 'warning' ? '#f59e0b' : '#6b7280'};
  color: white;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  z-index: 3;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FavoriteButton = styled.button`
  position: absolute;
  top: ${props => props.theme.spacing.md};
  left: ${props => props.theme.spacing.md};
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: ${props => props.theme.borderRadius.full};
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 3;
  color: ${props => props.isFavorite ? '#ef4444' : '#6b7280'};

  &:hover {
    background: white;
    transform: scale(1.1);
  }
`;

const PlantInfo = styled.div`
  padding: ${props => props.theme.spacing.lg};
`;

const PlantHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const PlantName = styled.h3`
  color: ${props => props.theme.colors.text.primary};
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  line-height: 1.2;
`;

const PlantType = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  font-size: 0.9rem;
  margin: 0.25rem 0 0 0;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.text.secondary};
  cursor: pointer;
  padding: 0.25rem;
  border-radius: ${props => props.theme.borderRadius.sm};
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(16, 185, 129, 0.1);
    color: ${props => props.theme.colors.primary.main};
  }
`;

const PlantMeta = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.md};
  background: rgba(16, 185, 129, 0.05);
  border-radius: ${props => props.theme.borderRadius.md};
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.text.secondary};
  font-size: 0.85rem;
  
  svg {
    color: ${props => props.theme.colors.primary.main};
  }
`;

const PlantActions = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  background: ${props => props.variant === 'primary' ? props.theme.colors.gradient.primary : 'transparent'};
  color: ${props => props.variant === 'primary' ? 'white' : props.theme.colors.primary.main};
  border: ${props => props.variant === 'primary' ? 'none' : `1px solid ${props.theme.colors.primary.main}`};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex: 1;
  justify-content: center;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: ${props => props.theme.shadows.md};
    background: ${props => props.variant === 'primary' ? props.theme.colors.primary.dark : 'rgba(16, 185, 129, 0.1)'};
  }
`;

const StatsCard = styled.div`
  background: white;
  border: 2px solid rgba(16, 185, 129, 0.1);
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${props => props.theme.spacing.lg};
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary.main};
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  color: ${props => props.theme.colors.text.secondary};
  font-size: 0.9rem;
  font-weight: 500;
`;

const FilterSection = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.lg};
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  background: ${props => props.active ? props.theme.colors.primary.main : 'transparent'};
  color: ${props => props.active ? 'white' : props.theme.colors.text.secondary};
  border: 1px solid ${props => props.active ? props.theme.colors.primary.main : 'rgba(16, 185, 129, 0.3)'};
  border-radius: ${props => props.theme.borderRadius.full};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? props.theme.colors.primary.dark : 'rgba(16, 185, 129, 0.1)'};
    color: ${props => props.active ? 'white' : props.theme.colors.primary.main};
  }
`;

// Modal Components
const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  padding: ${props => props.theme.spacing.md};
`;

const ModalContent = styled.div`
  background: white;
  border-radius: ${props => props.theme.borderRadius.lg};
  max-width: ${props => props.size === 'large' ? '800px' : '500px'};
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
`;

const ModalHeader = styled.div`
  background: ${props => props.theme.colors.gradient.primary};
  color: white;
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.lg} ${props => props.theme.borderRadius.lg} 0 0;
  position: relative;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
`;

const ModalSubtitle = styled.p`
  margin: 0.5rem 0 0 0;
  opacity: 0.9;
  font-size: 0.95rem;
`;

const ModalBody = styled.div`
  padding: ${props => props.theme.spacing.xl};
`;

const FormGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${props => props.theme.spacing.sm};
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
`;

const Input = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  border: 2px solid rgba(16, 185, 129, 0.2);
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary.main};
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  border: 2px solid rgba(16, 185, 129, 0.2);
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary.main};
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: ${props => props.theme.spacing.md};
  border: 2px solid rgba(16, 185, 129, 0.2);
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary.main};
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.md};
`;

const DetailSection = styled.div`
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const DetailTitle = styled.h3`
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: ${props => props.theme.spacing.md};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.lg};
`;

const DetailCard = styled.div`
  background: rgba(16, 185, 129, 0.05);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.lg};
`;

const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.sm};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const DetailLabel = styled.span`
  font-weight: 600;
  color: ${props => props.theme.colors.text.secondary};
`;

const DetailValue = styled.span`
  color: ${props => props.theme.colors.text.primary};
  font-weight: 500;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  justify-content: flex-end;
  margin-top: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

// Scan Modal Components
const ScanContainer = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
`;

const ScanPreview = styled.div`
  width: 100%;
  max-width: 400px;
  height: 300px;
  border: 2px dashed rgba(16, 185, 129, 0.3);
  border-radius: ${props => props.theme.borderRadius.lg};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: ${props => props.theme.spacing.lg} auto;
  background: rgba(16, 185, 129, 0.05);
  position: relative;
  overflow: hidden;
`;

const ScanImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: ${props => props.theme.borderRadius.lg};
`;

const ScanPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.text.secondary};
`;

const FileInput = styled.input`
  display: none;
`;

const ScanResults = styled.div`
  margin-top: ${props => props.theme.spacing.xl};
  padding: ${props => props.theme.spacing.lg};
  background: rgba(16, 185, 129, 0.05);
  border-radius: ${props => props.theme.borderRadius.lg};
  border: 1px solid rgba(16, 185, 129, 0.2);
`;

const ResultItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.sm};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ResultLabel = styled.span`
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
`;

const ResultValue = styled.span`
  color: ${props => props.status === 'healthy' ? '#10b981' : 
               props.status === 'diseased' ? '#ef4444' : 
               props.status === 'warning' ? '#f59e0b' : props.theme.colors.text.secondary};
  font-weight: 500;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(16, 185, 129, 0.2);
  border-radius: ${props => props.theme.borderRadius.full};
  overflow: hidden;
  margin: ${props => props.theme.spacing.md} 0;
`;

const Progress = styled.div`
  height: 100%;
  background: ${props => props.theme.colors.gradient.primary};
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
`;

// Delete Confirmation Modal
const DeleteModal = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
`;

const DeleteIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: ${props => props.theme.borderRadius.full};
  background: rgba(239, 68, 68, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${props => props.theme.spacing.lg};
  color: #ef4444;
`;

const DeleteTitle = styled.h3`
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const DeleteMessage = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: ${props => props.theme.spacing.xl};
  line-height: 1.6;
`;

const PlantActionMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: ${props => props.theme.borderRadius.md};
  box-shadow: ${props => props.theme.shadows.lg};
  z-index: 10;
  min-width: 150px;
  overflow: hidden;
`;

const MenuOption = styled.button`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  color: ${props => props.danger ? '#ef4444' : props.theme.colors.text.primary};
  transition: background 0.3s ease;
  
  &:hover {
    background: ${props => props.danger ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)'};
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xxl};
  color: ${props => props.theme.colors.text.secondary};
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: ${props => props.theme.spacing.lg};
  opacity: 0.5;
`;

const Plants = ({ isOpen, onClose, user }) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Modal states
  const [showAddPlant, setShowAddPlant] = useState(false);
  const [showEditPlant, setShowEditPlant] = useState(false);
  const [showPlantDetails, setShowPlantDetails] = useState(false);
  const [showScanModal, setShowScanModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  
  // Scan state
  const [scanImage, setScanImage] = useState(null);
  const [scanResults, setScanResults] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  
  // Form state for add/edit plant
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    location: '',
    emoji: '🌱',
    wateringSchedule: '',
    notes: '',
    plantedDate: ''
  });

  // Enhanced mock plants data
  const [plants, setPlantsData] = useState([
    {
      id: 1,
      name: 'Heritage Tomato',
      type: 'Vegetable',
      status: 'healthy',
      lastScanned: '2 hours ago',
      location: 'Greenhouse A',
      emoji: '🍅',
      isFavorite: true,
      plantedDate: '2024-03-15',
      wateringSchedule: 'Every 2 days',
      healthScore: 95,
      notes: 'Growing beautifully, ready for harvest soon'
    },
    {
      id: 2,
      name: 'English Rose',
      type: 'Flower',
      status: 'diseased',
      lastScanned: '1 day ago',
      location: 'Garden B',
      emoji: '🌹',
      isFavorite: false,
      plantedDate: '2024-02-10',
      wateringSchedule: 'Daily',
      healthScore: 45,
      notes: 'Shows signs of black spot disease'
    },
    {
      id: 3,
      name: 'Sweet Basil',
      type: 'Herb',
      status: 'healthy',
      lastScanned: '3 hours ago',
      location: 'Kitchen Garden',
      emoji: '🌿',
      isFavorite: true,
      plantedDate: '2024-04-01',
      wateringSchedule: 'Every 3 days',
      healthScore: 88,
      notes: 'Perfect for cooking, very aromatic'
    },
    {
      id: 4,
      name: 'Honeycrisp Apple',
      type: 'Tree',
      status: 'warning',
      lastScanned: '1 week ago',
      location: 'Orchard',
      emoji: '🍎',
      isFavorite: false,
      plantedDate: '2023-11-20',
      wateringSchedule: 'Weekly',
      healthScore: 72,
      notes: 'Needs pruning and pest inspection'
    },
    {
      id: 5,
      name: 'Lavender Dreams',
      type: 'Herb',
      status: 'healthy',
      lastScanned: '5 hours ago',
      location: 'Aromatherapy Garden',
      emoji: '💜',
      isFavorite: true,
      plantedDate: '2024-01-20',
      wateringSchedule: 'Weekly',
      healthScore: 92,
      notes: 'Blooming beautifully, very fragrant'
    },
    {
      id: 6,
      name: 'Japanese Maple',
      type: 'Tree',
      status: 'healthy',
      lastScanned: '2 days ago',
      location: 'Front Yard',
      emoji: '�',
      isFavorite: false,
      plantedDate: '2023-09-10',
      wateringSchedule: 'Twice weekly',
      healthScore: 85,
      notes: 'Beautiful autumn colors developing'
    }
  ]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Close menu when clicking outside
  const handlePlantCardClick = (e) => {
    if (!e.target.closest('.menu-button')) {
      setActiveMenu(null);
    }
  };

  const toggleFavorite = (plantId) => {
    setPlantsData(plants.map(plant => 
      plant.id === plantId 
        ? { ...plant, isFavorite: !plant.isFavorite }
        : plant
    ));
  };

  // Modal handlers
  const handleAddPlant = () => {
    setFormData({
      name: '',
      type: '',
      location: '',
      emoji: '🌱',
      wateringSchedule: '',
      notes: '',
      plantedDate: ''
    });
    setShowAddPlant(true);
  };

  const handleEditPlant = (plant) => {
    setSelectedPlant(plant);
    setFormData({
      name: plant.name,
      type: plant.type,
      location: plant.location,
      emoji: plant.emoji,
      wateringSchedule: plant.wateringSchedule,
      notes: plant.notes,
      plantedDate: plant.plantedDate
    });
    setShowEditPlant(true);
  };

  const handleViewDetails = (plant) => {
    setSelectedPlant(plant);
    setShowPlantDetails(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    if (showAddPlant) {
      // Add new plant
      const newPlant = {
        id: Math.max(...plants.map(p => p.id)) + 1,
        ...formData,
        status: 'healthy',
        lastScanned: 'Just added',
        isFavorite: false,
        healthScore: 85
      };
      setPlantsData([...plants, newPlant]);
      setShowAddPlant(false);
    } else if (showEditPlant) {
      // Update existing plant
      setPlantsData(plants.map(plant => 
        plant.id === selectedPlant.id 
          ? { ...plant, ...formData }
          : plant
      ));
      setShowEditPlant(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const closeAllModals = () => {
    setShowAddPlant(false);
    setShowEditPlant(false);
    setShowPlantDetails(false);
    setShowScanModal(false);
    setShowDeleteModal(false);
    setSelectedPlant(null);
    setScanImage(null);
    setScanResults(null);
    setIsScanning(false);
    setScanProgress(0);
    setActiveMenu(null);
  };

  // Scan handlers
  const handleScanPlant = (plant) => {
    setSelectedPlant(plant);
    setShowScanModal(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setScanImage(e.target.result);
        performScan();
      };
      reader.readAsDataURL(file);
    }
  };

  const performScan = async () => {
    setIsScanning(true);
    setScanProgress(0);
    setScanResults(null);

    // Simulate scanning progress
    const progressInterval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Mock scan results
    const mockResults = [
      {
        status: 'healthy',
        confidence: 92,
        disease: null,
        healthScore: 95,
        recommendations: ['Continue current care routine', 'Monitor for seasonal changes']
      },
      {
        status: 'diseased',
        confidence: 87,
        disease: 'Leaf Spot Disease',
        healthScore: 45,
        recommendations: ['Remove affected leaves', 'Apply fungicide treatment', 'Improve air circulation']
      },
      {
        status: 'warning',
        confidence: 78,
        disease: 'Early Blight',
        healthScore: 65,
        recommendations: ['Reduce watering frequency', 'Apply preventive treatment', 'Monitor closely']
      }
    ];

    const result = mockResults[Math.floor(Math.random() * mockResults.length)];
    setScanResults(result);
    setIsScanning(false);

    // Update plant status based on scan results
    if (selectedPlant) {
      setPlantsData(plants.map(plant => 
        plant.id === selectedPlant.id 
          ? { 
              ...plant, 
              status: result.status,
              healthScore: result.healthScore,
              lastScanned: 'Just now',
              notes: result.disease ? `${plant.notes ? plant.notes + ' | ' : ''}Scan detected: ${result.disease}` : plant.notes
            }
          : plant
      ));
    }
  };

  // Delete handlers
  const handleDeletePlant = (plant) => {
    setSelectedPlant(plant);
    setShowDeleteModal(true);
    setActiveMenu(null);
  };

  const confirmDelete = () => {
    if (selectedPlant) {
      setPlantsData(plants.filter(plant => plant.id !== selectedPlant.id));
      setShowDeleteModal(false);
      setSelectedPlant(null);
    }
  };

  // Menu handlers
  const toggleMenu = (plantId) => {
    setActiveMenu(activeMenu === plantId ? null : plantId);
  };

  const filteredPlants = plants.filter(plant => {
    const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plant.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plant.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || plant.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy': return <CheckCircle size={14} />;
      case 'diseased': return <AlertTriangle size={14} />;
      case 'warning': return <AlertTriangle size={14} />;
      default: return <Eye size={14} />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'healthy': return 'Healthy';
      case 'diseased': return 'Needs Care';
      case 'warning': return 'Monitor';
      default: return 'Unknown';
    }
  };

  // Calculate statistics
  const totalPlants = plants.length;
  const healthyPlants = plants.filter(p => p.status === 'healthy').length;
  const diseasedPlants = plants.filter(p => p.status === 'diseased').length;
  const favoriteePlants = plants.filter(p => p.isFavorite).length;

  return (
    <PlantsModal onClick={handleBackdropClick}>
      <PlantsContent onClick={(e) => e.stopPropagation()}>
        <PlantsHeader>
          <CloseButton onClick={onClose}>
            <X size={20} />
          </CloseButton>
          <PlantsTitle>
            🌱 My Plant Collection
          </PlantsTitle>
          <PlantsSubtitle>
            Track, monitor, and care for your plants with AI-powered insights
          </PlantsSubtitle>
        </PlantsHeader>

        <PlantsBody>
          {/* Statistics Overview */}
          <StatsCard>
            <h3 style={{ marginBottom: '1rem', color: '#374151' }}>Garden Overview</h3>
            <StatsGrid>
              <StatItem>
                <StatNumber>{totalPlants}</StatNumber>
                <StatLabel>Total Plants</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>{healthyPlants}</StatNumber>
                <StatLabel>Healthy</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>{diseasedPlants}</StatNumber>
                <StatLabel>Need Care</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>{favoriteePlants}</StatNumber>
                <StatLabel>Favorites</StatLabel>
              </StatItem>
            </StatsGrid>
          </StatsCard>

          {/* Search and Controls */}
          <ToolsSection>
            <SearchBar>
              <SearchIcon>
                <Search size={18} />
              </SearchIcon>
              <SearchInput
                type="text"
                placeholder="Search plants by name, type, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchBar>
            
            <Button size="sm" onClick={handleAddPlant}>
              <Plus size={16} />
              Add Plant
            </Button>
            
            <ViewToggle>
              <ViewButton 
                active={viewMode === 'grid'} 
                onClick={() => setViewMode('grid')}
              >
                <Grid size={16} />
              </ViewButton>
              <ViewButton 
                active={viewMode === 'list'} 
                onClick={() => setViewMode('list')}
              >
                <List size={16} />
              </ViewButton>
            </ViewToggle>
          </ToolsSection>

          {/* Status Filters */}
          <FilterSection>
            <FilterButton 
              active={filterStatus === 'all'} 
              onClick={() => setFilterStatus('all')}
            >
              All Plants
            </FilterButton>
            <FilterButton 
              active={filterStatus === 'healthy'} 
              onClick={() => setFilterStatus('healthy')}
            >
              Healthy
            </FilterButton>
            <FilterButton 
              active={filterStatus === 'diseased'} 
              onClick={() => setFilterStatus('diseased')}
            >
              Need Care
            </FilterButton>
            <FilterButton 
              active={filterStatus === 'warning'} 
              onClick={() => setFilterStatus('warning')}
            >
              Monitor
            </FilterButton>
          </FilterSection>

          {/* Plants Grid */}
          {filteredPlants.length > 0 ? (
            <PlantsGrid viewMode={viewMode}>
              {filteredPlants.map((plant) => (
                <PlantCard key={plant.id} onClick={handlePlantCardClick}>
                  <PlantImage>
                    <span>{plant.emoji}</span>
                    <FavoriteButton 
                      isFavorite={plant.isFavorite}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(plant.id);
                      }}
                    >
                      <Heart size={16} fill={plant.isFavorite ? 'currentColor' : 'none'} />
                    </FavoriteButton>
                    <PlantStatus status={plant.status}>
                      {getStatusIcon(plant.status)}
                      {getStatusText(plant.status)}
                    </PlantStatus>
                  </PlantImage>
                  <PlantInfo>
                    <PlantHeader>
                      <div>
                        <PlantName>{plant.name}</PlantName>
                        <PlantType>{plant.type}</PlantType>
                      </div>
                      <div style={{ position: 'relative' }}>
                        <MenuButton 
                          className="menu-button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleMenu(plant.id);
                          }}
                        >
                          <MoreVertical size={16} />
                        </MenuButton>
                        {activeMenu === plant.id && (
                          <PlantActionMenu>
                            <MenuOption onClick={() => handleViewDetails(plant)}>
                              <Eye size={14} />
                              View Details
                            </MenuOption>
                            <MenuOption onClick={() => handleEditPlant(plant)}>
                              <Edit3 size={14} />
                              Edit Plant
                            </MenuOption>
                            <MenuOption onClick={() => handleScanPlant(plant)}>
                              <Scan size={14} />
                              Scan Plant
                            </MenuOption>
                            <MenuOption danger onClick={() => handleDeletePlant(plant)}>
                              <Trash2 size={14} />
                              Delete
                            </MenuOption>
                          </PlantActionMenu>
                        )}
                      </div>
                    </PlantHeader>
                    
                    <PlantMeta>
                      <MetaItem>
                        <Calendar size={14} />
                        <span>Planted {new Date(plant.plantedDate).toLocaleDateString()}</span>
                      </MetaItem>
                      <MetaItem>
                        <Droplets size={14} />
                        <span>{plant.wateringSchedule}</span>
                      </MetaItem>
                      <MetaItem>
                        <Sun size={14} />
                        <span>{plant.location}</span>
                      </MetaItem>
                      <MetaItem>
                        <CheckCircle size={14} />
                        <span>Health: {plant.healthScore}%</span>
                      </MetaItem>
                    </PlantMeta>
                    
                    <Text style={{ fontSize: '0.85rem', marginBottom: '1rem', fontStyle: 'italic' }}>
                      {plant.notes}
                    </Text>
                    
                    <PlantActions>
                      <ActionButton variant="primary" onClick={() => handleScanPlant(plant)}>
                        <Camera size={14} />
                        Scan
                      </ActionButton>
                      <ActionButton onClick={() => handleViewDetails(plant)}>
                        <Eye size={14} />
                        Details
                      </ActionButton>
                      <ActionButton onClick={() => handleEditPlant(plant)}>
                        <Edit3 size={14} />
                        Edit
                      </ActionButton>
                    </PlantActions>
                  </PlantInfo>
                </PlantCard>
              ))}
            </PlantsGrid>
          ) : (
            <EmptyState>
              <EmptyIcon>🌱</EmptyIcon>
              <h3>No plants found</h3>
              <Text>
                {searchTerm ? 
                  `No plants match "${searchTerm}". Try a different search term.` :
                  'Start building your plant collection by adding your first plant!'
                }
              </Text>
              <Button style={{ marginTop: '1rem' }} onClick={handleAddPlant}>
                <Plus size={16} />
                Add Your First Plant
              </Button>
            </EmptyState>
          )}
        </PlantsBody>
      </PlantsContent>

      {/* Add Plant Modal */}
      {showAddPlant && (
        <Modal onClick={closeAllModals}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <CloseButton onClick={closeAllModals}>
                <X size={20} />
              </CloseButton>
              <ModalTitle>Add New Plant</ModalTitle>
              <ModalSubtitle>Add a new plant to your collection</ModalSubtitle>
            </ModalHeader>
            <ModalBody>
              <form onSubmit={handleFormSubmit}>
                <FormRow>
                  <FormGroup>
                    <Label>Plant Name</Label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g., My Tomato Plant"
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Plant Type</Label>
                    <Select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select a type</option>
                      <option value="Vegetable">Vegetable</option>
                      <option value="Flower">Flower</option>
                      <option value="Herb">Herb</option>
                      <option value="Tree">Tree</option>
                      <option value="Houseplant">Houseplant</option>
                      <option value="Succulent">Succulent</option>
                    </Select>
                  </FormGroup>
                </FormRow>
                
                <FormRow>
                  <FormGroup>
                    <Label>Location</Label>
                    <Input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="e.g., Garden A, Kitchen"
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Planted Date</Label>
                    <Input
                      type="date"
                      name="plantedDate"
                      value={formData.plantedDate}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                </FormRow>

                <FormRow>
                  <FormGroup>
                    <Label>Emoji</Label>
                    <Select
                      name="emoji"
                      value={formData.emoji}
                      onChange={handleInputChange}
                    >
                      <option value="🌱">🌱 Seedling</option>
                      <option value="🍅">🍅 Tomato</option>
                      <option value="🌹">🌹 Rose</option>
                      <option value="🌿">🌿 Herb</option>
                      <option value="🍎">🍎 Apple</option>
                      <option value="💜">💜 Lavender</option>
                      <option value="🍁">🍁 Maple</option>
                      <option value="🌻">🌻 Sunflower</option>
                      <option value="🌵">🌵 Cactus</option>
                      <option value="🌺">🌺 Hibiscus</option>
                    </Select>
                  </FormGroup>
                  <FormGroup>
                    <Label>Watering Schedule</Label>
                    <Select
                      name="wateringSchedule"
                      value={formData.wateringSchedule}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select schedule</option>
                      <option value="Daily">Daily</option>
                      <option value="Every 2 days">Every 2 days</option>
                      <option value="Every 3 days">Every 3 days</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Twice weekly">Twice weekly</option>
                      <option value="Monthly">Monthly</option>
                    </Select>
                  </FormGroup>
                </FormRow>

                <FormGroup>
                  <Label>Notes</Label>
                  <TextArea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Add any notes about your plant..."
                  />
                </FormGroup>

                <ButtonGroup>
                  <Button type="button" variant="secondary" onClick={closeAllModals}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    <Save size={16} />
                    Add Plant
                  </Button>
                </ButtonGroup>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}

      {/* Edit Plant Modal */}
      {showEditPlant && selectedPlant && (
        <Modal onClick={closeAllModals}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <CloseButton onClick={closeAllModals}>
                <X size={20} />
              </CloseButton>
              <ModalTitle>Edit Plant</ModalTitle>
              <ModalSubtitle>Update {selectedPlant.name} information</ModalSubtitle>
            </ModalHeader>
            <ModalBody>
              <form onSubmit={handleFormSubmit}>
                <FormRow>
                  <FormGroup>
                    <Label>Plant Name</Label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Plant Type</Label>
                    <Select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="Vegetable">Vegetable</option>
                      <option value="Flower">Flower</option>
                      <option value="Herb">Herb</option>
                      <option value="Tree">Tree</option>
                      <option value="Houseplant">Houseplant</option>
                      <option value="Succulent">Succulent</option>
                    </Select>
                  </FormGroup>
                </FormRow>
                
                <FormRow>
                  <FormGroup>
                    <Label>Location</Label>
                    <Input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Planted Date</Label>
                    <Input
                      type="date"
                      name="plantedDate"
                      value={formData.plantedDate}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                </FormRow>

                <FormRow>
                  <FormGroup>
                    <Label>Emoji</Label>
                    <Select
                      name="emoji"
                      value={formData.emoji}
                      onChange={handleInputChange}
                    >
                      <option value="🌱">🌱 Seedling</option>
                      <option value="🍅">🍅 Tomato</option>
                      <option value="🌹">🌹 Rose</option>
                      <option value="🌿">🌿 Herb</option>
                      <option value="🍎">🍎 Apple</option>
                      <option value="💜">💜 Lavender</option>
                      <option value="🍁">🍁 Maple</option>
                      <option value="🌻">🌻 Sunflower</option>
                      <option value="🌵">🌵 Cactus</option>
                      <option value="🌺">🌺 Hibiscus</option>
                    </Select>
                  </FormGroup>
                  <FormGroup>
                    <Label>Watering Schedule</Label>
                    <Select
                      name="wateringSchedule"
                      value={formData.wateringSchedule}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="Daily">Daily</option>
                      <option value="Every 2 days">Every 2 days</option>
                      <option value="Every 3 days">Every 3 days</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Twice weekly">Twice weekly</option>
                      <option value="Monthly">Monthly</option>
                    </Select>
                  </FormGroup>
                </FormRow>

                <FormGroup>
                  <Label>Notes</Label>
                  <TextArea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Add any notes about your plant..."
                  />
                </FormGroup>

                <ButtonGroup>
                  <Button type="button" variant="secondary" onClick={closeAllModals}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    <Save size={16} />
                    Save Changes
                  </Button>
                </ButtonGroup>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}

      {/* Plant Details Modal */}
      {showPlantDetails && selectedPlant && (
        <Modal onClick={closeAllModals}>
          <ModalContent size="large" onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <CloseButton onClick={closeAllModals}>
                <X size={20} />
              </CloseButton>
              <ModalTitle>
                {selectedPlant.emoji} {selectedPlant.name}
              </ModalTitle>
              <ModalSubtitle>Complete plant information and care details</ModalSubtitle>
            </ModalHeader>
            <ModalBody>
              <DetailSection>
                <DetailTitle>
                  <Info size={20} />
                  Basic Information
                </DetailTitle>
                <DetailGrid>
                  <DetailCard>
                    <DetailItem>
                      <DetailLabel>Plant Name:</DetailLabel>
                      <DetailValue>{selectedPlant.name}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Type:</DetailLabel>
                      <DetailValue>{selectedPlant.type}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Status:</DetailLabel>
                      <DetailValue style={{ 
                        color: selectedPlant.status === 'healthy' ? '#10b981' : 
                               selectedPlant.status === 'diseased' ? '#ef4444' : '#f59e0b'
                      }}>
                        {getStatusText(selectedPlant.status)}
                      </DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Health Score:</DetailLabel>
                      <DetailValue>{selectedPlant.healthScore}%</DetailValue>
                    </DetailItem>
                  </DetailCard>
                  
                  <DetailCard>
                    <DetailItem>
                      <DetailLabel>Location:</DetailLabel>
                      <DetailValue>
                        <MapPin size={14} style={{ display: 'inline', marginRight: '4px' }} />
                        {selectedPlant.location}
                      </DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Planted Date:</DetailLabel>
                      <DetailValue>
                        <Calendar size={14} style={{ display: 'inline', marginRight: '4px' }} />
                        {new Date(selectedPlant.plantedDate).toLocaleDateString()}
                      </DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Watering:</DetailLabel>
                      <DetailValue>
                        <Droplets size={14} style={{ display: 'inline', marginRight: '4px' }} />
                        {selectedPlant.wateringSchedule}
                      </DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Last Scanned:</DetailLabel>
                      <DetailValue>{selectedPlant.lastScanned}</DetailValue>
                    </DetailItem>
                  </DetailCard>
                </DetailGrid>
              </DetailSection>

              <DetailSection>
                <DetailTitle>
                  <Edit3 size={20} />
                  Notes & Observations
                </DetailTitle>
                <DetailCard>
                  <Text style={{ margin: 0, lineHeight: 1.6 }}>
                    {selectedPlant.notes || 'No notes available for this plant.'}
                  </Text>
                </DetailCard>
              </DetailSection>

              <ButtonGroup>
                <Button variant="secondary" onClick={closeAllModals}>
                  Close
                </Button>
                <Button onClick={() => {
                  setShowPlantDetails(false);
                  handleEditPlant(selectedPlant);
                }}>
                  <Edit3 size={16} />
                  Edit Plant
                </Button>
              </ButtonGroup>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
      {/* Scan Plant Modal */}
      {showScanModal && selectedPlant && (
        <Modal onClick={closeAllModals}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <CloseButton onClick={closeAllModals}>
                <X size={20} />
              </CloseButton>
              <ModalTitle>
                <Scan size={20} style={{ display: 'inline', marginRight: '8px' }} />
                Scan {selectedPlant.name}
              </ModalTitle>
              <ModalSubtitle>Upload an image to analyze plant health</ModalSubtitle>
            </ModalHeader>
            <ModalBody>
              <ScanContainer>
                <ScanPreview>
                  {scanImage ? (
                    <ScanImage src={scanImage} alt="Plant scan" />
                  ) : (
                    <ScanPlaceholder>
                      <Camera size={48} />
                      <Text>Upload an image of your plant</Text>
                      <Button onClick={() => document.getElementById('scan-file-input').click()}>
                        <Upload size={16} />
                        Choose Image
                      </Button>
                    </ScanPlaceholder>
                  )}
                </ScanPreview>
                
                <FileInput
                  id="scan-file-input"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />

                {isScanning && (
                  <div>
                    <Text>Analyzing plant health...</Text>
                    <ProgressBar>
                      <Progress progress={scanProgress} />
                    </ProgressBar>
                    <Text style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                      {scanProgress}% complete
                    </Text>
                  </div>
                )}

                {scanResults && !isScanning && (
                  <ScanResults>
                    <h3 style={{ margin: '0 0 1rem 0', color: '#374151' }}>
                      <CheckCircle size={20} style={{ display: 'inline', marginRight: '8px', color: '#10b981' }} />
                      Scan Results
                    </h3>
                    
                    <ResultItem>
                      <ResultLabel>Health Status:</ResultLabel>
                      <ResultValue status={scanResults.status}>
                        {scanResults.status === 'healthy' ? 'Healthy' : 
                         scanResults.status === 'diseased' ? 'Disease Detected' : 'Needs Attention'}
                      </ResultValue>
                    </ResultItem>
                    
                    <ResultItem>
                      <ResultLabel>Confidence:</ResultLabel>
                      <ResultValue>{scanResults.confidence}%</ResultValue>
                    </ResultItem>
                    
                    <ResultItem>
                      <ResultLabel>Health Score:</ResultLabel>
                      <ResultValue>{scanResults.healthScore}%</ResultValue>
                    </ResultItem>
                    
                    {scanResults.disease && (
                      <ResultItem>
                        <ResultLabel>Detected Issue:</ResultLabel>
                        <ResultValue status="diseased">{scanResults.disease}</ResultValue>
                      </ResultItem>
                    )}
                    
                    {scanResults.recommendations && (
                      <div style={{ marginTop: '1rem' }}>
                        <ResultLabel style={{ display: 'block', marginBottom: '0.5rem' }}>
                          Recommendations:
                        </ResultLabel>
                        <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                          {scanResults.recommendations.map((rec, index) => (
                            <li key={index} style={{ marginBottom: '0.25rem', color: '#374151' }}>
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </ScanResults>
                )}

                <ButtonGroup>
                  <Button variant="secondary" onClick={closeAllModals}>
                    Close
                  </Button>
                  {scanResults && (
                    <Button onClick={() => {
                      // Generate scan report
                      const reportData = {
                        plant: selectedPlant.name,
                        date: new Date().toLocaleDateString(),
                        results: scanResults
                      };
                      console.log('Generating report:', reportData);
                      alert('Scan report generated! (Check console for details)');
                    }}>
                      <FileText size={16} />
                      Generate Report
                    </Button>
                  )}
                  {scanImage && !isScanning && !scanResults && (
                    <Button onClick={performScan}>
                      <Scan size={16} />
                      Analyze Plant
                    </Button>
                  )}
                </ButtonGroup>
              </ScanContainer>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedPlant && (
        <Modal onClick={closeAllModals}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalBody>
              <DeleteModal>
                <DeleteIcon>
                  <Trash2 size={32} />
                </DeleteIcon>
                <DeleteTitle>Delete Plant</DeleteTitle>
                <DeleteMessage>
                  Are you sure you want to delete <strong>{selectedPlant.name}</strong>? 
                  This action cannot be undone and all data associated with this plant will be permanently removed.
                </DeleteMessage>
                <ButtonGroup>
                  <Button variant="secondary" onClick={closeAllModals}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={confirmDelete}
                    style={{ 
                      background: '#ef4444',
                      '&:hover': { background: '#dc2626' }
                    }}
                  >
                    <Trash2 size={16} />
                    Delete Plant
                  </Button>
                </ButtonGroup>
              </DeleteModal>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </PlantsModal>
  );
};

export default Plants;
