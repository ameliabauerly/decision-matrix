# Decision Matrix Program

A lightweight web application for making informed decisions using weighted criteria analysis. This tool helps you compare up to 3 alternatives against multiple criteria with customizable weights.

## Features

### ✅ Core Functionality
- **Criteria Management**: Add up to 10 decision criteria with custom weights
- **Alternatives Management**: Compare up to 3 alternatives
- **Scoring System**: Rate alternatives on a 1-5 scale against each criterion
- **Weighted Calculations**: Automatic calculation of weighted scores
- **Results Display**: Ranked results with detailed breakdown
- **PDF Export**: Export complete results to PDF

### 🎯 User Experience
- **Step-by-step wizard**: Intuitive 4-step process
- **Progress tracking**: Visual progress indicator
- **Responsive design**: Works on desktop and mobile devices
- **Clean interface**: Minimal, form-first design approach

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone or download the project
2. Navigate to the project directory:
   ```bash
   cd decision-matrix-app
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## How to Use

### Step 1: Define Criteria
- Add decision criteria (e.g., "Cost", "Quality", "Location")
- Assign weights to each criterion (percentages that should total 100%)
- Edit or remove criteria as needed

### Step 2: Define Alternatives
- Add up to 3 alternatives to compare
- Give each alternative a descriptive name
- Edit or remove alternatives as needed

### Step 3: Score Alternatives
- Rate each alternative against each criterion using a 1-5 scale:
  - 1 = Poor
  - 2 = Below Average
  - 3 = Average
  - 4 = Good
  - 5 = Excellent
- All scores must be completed before proceeding

### Step 4: View Results
- See ranked results with the best alternative highlighted
- View detailed scoring breakdown
- Export results to PDF for record-keeping
- Start a new decision matrix

## Technical Details

### Tech Stack
- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **PDF Export**: jsPDF with autoTable plugin
- **State Management**: React useState hooks

### Architecture
- **Client-side only**: No backend required
- **Local storage**: Data persists in browser session
- **Modular components**: Easy to extend and maintain
- **Type safety**: Full TypeScript implementation

### File Structure
```
src/
├── components/          # React components
│   ├── CriteriaStep.tsx
│   ├── AlternativesStep.tsx
│   ├── ScoringStep.tsx
│   └── ResultsStep.tsx
├── utils/              # Utility functions
│   ├── calculations.ts
│   └── pdfExport.ts
├── types.ts            # TypeScript type definitions
├── App.tsx             # Main application component
└── App.css             # Custom styles
```

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Limitations

- Maximum 10 criteria per decision matrix
- Maximum 3 alternatives per decision matrix
- Data is not persisted between browser sessions
- Single-user only (no collaboration features)

## Future Enhancements

- Save/load decision templates
- Data persistence with localStorage
- Charts and visualizations
- Multi-user collaboration
- Additional export formats (CSV, Excel)
- Advanced scoring methods

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

---

**Decision Matrix Tool** - Make informed decisions with weighted criteria analysis