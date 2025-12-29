# Plant Buddy 🌿

An AI-powered plant disease detection webapp built with React. Detect plant diseases quickly and accurately using advanced AI technology through camera capture or image upload.

## Features

- 📷 **Real-time Camera Scanning** - Use your device camera to capture plant images
- 📁 **Image Upload** - Upload existing plant photos from your device
- 🤖 **AI-Powered Analysis** - Advanced machine learning for accurate disease detection
- 🌍 **Multi-language Support** - Available in English, Spanish, and French
- 📱 **Responsive Design** - Works seamlessly on mobile and desktop
- 🎨 **Beautiful UI** - Modern gradient green theme with smooth animations
- ⚡ **Instant Results** - Get immediate analysis with confidence scores
- 💡 **Smart Recommendations** - Receive actionable care advice

## Technology Stack

- **Frontend**: React 18 with Vite
- **Styling**: Styled Components with custom theme
- **Camera**: react-webcam for device camera integration
- **Internationalization**: react-i18next for multi-language support
- **Icons**: Lucide React for modern iconography
- **State Management**: React hooks

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd plant-buddy
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.jsx      # Navigation header
│   ├── CameraCapture.jsx # Camera functionality
│   ├── ImageUpload.jsx  # File upload component
│   ├── AnalysisResult.jsx # Results display
│   └── LoadingScreen.jsx # Loading animation
├── styles/             # Styled components
│   ├── theme.js       # Design system theme
│   └── components.js  # Reusable styled components
├── locales/           # Translation files
│   ├── en.json       # English translations
│   ├── es.json       # Spanish translations
│   └── fr.json       # French translations
├── i18n.js           # Internationalization config
├── App.jsx           # Main app component
└── main.jsx          # App entry point
```

## Supported Languages

- 🇺🇸 English
- �🇳 **Indian Languages:**
  - हिंदी (Hindi)
  - தமிழ் (Tamil) 
  - తెలుగు (Telugu)
  - বাংলা (Bengali)
  - ਪੰਜਾਬੀ (Punjabi)
  - ગુજરાતી (Gujarati)
  - मराठी (Marathi)
- �🇪🇸 Español (Spanish)
- 🇫🇷 Français (French)

## How It Works

1. **Capture/Upload**: Take a photo with your camera or upload an existing image
2. **AI Analysis**: Our advanced AI analyzes the image for disease detection
3. **Results**: Get instant results with health status, confidence scores, and recommendations
4. **Action**: Follow personalized care recommendations for your plant

## Features in Detail

### Camera Integration
- Real-time camera preview
- Support for both front and rear cameras
- High-quality image capture
- Error handling for camera permissions

### Image Upload
- Drag and drop functionality
- Support for multiple image formats (JPG, PNG, WEBP)
- File size validation
- Image preview before analysis

### AI Analysis
- Mock AI analysis for demonstration (ready for real AI integration)
- Confidence scoring
- Disease identification
- Health assessment
- Care recommendations

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimization
- Touch-friendly interface
- Smooth animations and transitions

## Browser Compatibility 

- Chrome 70+

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Future Enhancements

- Real AI/ML model integration
- Plant species identification
- Care tracking and reminders
- Community features
- Export analysis reports
- Offline mode support
---

Built with ❤️ for plant lovers everywhere+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:


- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

