# ParkirPintar - Smart Parking App

## Project Overview
ParkirPintar is a React-based web application for managing car parking spaces. It allows users to view a real-time parking map, book available spots, and manage active parking sessions.

### Main Technologies
- **Frontend Framework:** React 19 (TypeScript)
- **Build Tool:** Vite
- **Canvas Rendering:** Konva.js & react-konva (for the interactive parking map)
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide-react
- **Date Handling:** date-fns
- **Persistence:** LocalStorage

### Architecture
- **State Management:** Custom hook `useParkingData` in `src/hooks/useParkingData.ts` handles all business logic, spot state, and localStorage persistence.
- **Components:**
  - `ParkingMap`: Interactive SVG/Canvas map for spot selection.
  - `BookingForm`: Form for creating new parking sessions.
  - `BookingDetails`: Real-time session monitoring with countdown timer and overtime tracking.
- **Types:** Centralized TypeScript interfaces in `src/types/index.ts`.

## Building and Running

### Development
To start the development server:
```bash
npm run dev
```

### Build
To create a production build:
```bash
npm run build
```

### Linting
To run the linter:
```bash
npm run lint
```

### Preview
To preview the production build locally:
```bash
npm run preview
```

## Development Conventions

### Coding Style
- **TypeScript:** Strict type checking is enabled. Use interfaces defined in `src/types/index.ts`.
- **Styling:** Utility-first CSS using Tailwind CSS v4. Prefer classes over custom CSS.
- **Icons:** Use `lucide-react` for consistent iconography.
- **Dates:** Use `date-fns` for all date/time manipulations and formatting.

### Component Structure
- Keep components small and focused.
- Business logic and persistent state should remain in `useParkingData` to ensure a single source of truth.
- Use `react-konva` for map-related interactions to maintain performance.

### Persistence
- All application state (parking spots and active booking) is persisted in `localStorage` under the keys `parking_spots` and `current_booking`.

## Feature Roadmap (TODO)
- [ ] Implement search/filter for parking spots by ID or zone. (Partially implemented in UI).
- [ ] Add support for different vehicle sizes/types.
- [ ] Implement a history of previous parking sessions.
- [ ] Add unit and integration tests (e.g., Vitest).
