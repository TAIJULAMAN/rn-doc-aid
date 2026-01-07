# 🏥 Doc Aid - Doctor Appointment & Telehealth App

A modern, feature-rich React Native mobile application for booking doctor appointments and telehealth consultations. Built with Expo, TypeScript, and a clean medical aesthetic.

## ✨ Features

### 🎯 Core Features
- **Onboarding Experience**: Beautiful animated slides introducing app features
- **Doctor Discovery**: Browse top doctors with specialty filtering
- **Smart Booking System**: 
  - Interactive calendar strip for date selection
  - Time slot grid organized by Morning/Afternoon/Evening
  - Automatic disabling of past time slots
  - Real-time availability checking
- **Doctor Profiles**: Comprehensive profiles with stats, reviews, and experience
- **Payment Options**: Choose between Pay at Clinic or Pay Online
- **Animated UI**: Smooth transitions and micro-interactions throughout

### 🎨 Design System
- **Theme**: Medical Clean aesthetic
- **Primary Color**: Blue (#2E86DE)
- **UI Elements**: Rounded corners, soft shadows, gradient headers
- **Typography**: Clear, accessible font hierarchy
- **Animations**: React Native Reanimated for smooth 60fps animations

## 🏗️ Architecture

### Folder Structure
```
src/
├── components/          # Shared components
│   ├── Button.tsx
│   ├── Card.tsx
│   └── DoctorCard.tsx
├── features/           # Feature-based modules
│   ├── auth/
│   │   └── screens/
│   │       └── OnboardingScreen.tsx
│   ├── home/
│   │   └── screens/
│   │       └── HomeScreen.tsx
│   ├── doctors/
│   │   └── screens/
│   │       └── DoctorDetailScreen.tsx
│   └── booking/
│       └── components/
│           ├── CalendarStrip.tsx
│           └── TimeSlotGrid.tsx
├── navigation/         # Navigation setup
│   └── AppNavigator.tsx
├── types/             # TypeScript interfaces
│   └── index.ts
├── theme/             # Design system
│   └── index.ts
├── constants/         # Mock data & constants
│   └── mockData.ts
└── utils/             # Utility functions
    └── timeSlotUtils.ts
```

### Data Models

#### Doctor Model
```typescript
interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  photo: string;
  rating: number;
  reviewCount: number;
  patientsTreated: number;
  consultationFee: number;
  about: string;
  availability: Record<string, string[]>; // Day-wise time slots
  reviews: Review[];
}
```

#### Appointment Model
```typescript
interface Appointment {
  id: string;
  doctorId: string;
  patientId: string;
  dateTime: Date;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  type: 'video' | 'offline';
  paymentMode: 'clinic' | 'online';
  prescriptionUrl?: string;
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (or Expo Go app on physical device)

### Installation

1. **Clone the repository**
```bash
cd c:\Projects\rn-doctor-appointment-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npx expo start
```

4. **Run on your device**
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app on physical device

## 📦 Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: React Navigation (Stack Navigator)
- **Animations**: React Native Reanimated
- **Date Handling**: date-fns & date-fns-tz
- **UI Components**: Custom components with Expo Linear Gradient

## 🎯 Key Components

### CalendarStrip
Horizontal scrolling date picker showing the next 14 days with:
- Current day indicator
- Selected date highlighting
- Smooth scroll animations
- Date formatting

### TimeSlotGrid
Intelligent time slot display with:
- Categorization (Morning/Afternoon/Evening)
- Past slot disabling logic
- Selected slot highlighting
- Empty state handling

### DoctorDetailScreen
Comprehensive booking interface featuring:
- Gradient header with doctor photo
- Stats cards (Experience, Patients, Rating)
- About section
- Calendar + Time slot selection
- Payment mode toggle
- Consultation fee display
- Patient reviews

## 🔧 Booking Logic

The app uses sophisticated time slot generation:

```typescript
// Generate slots for a specific date
const timeSlots = generateTimeSlots(selectedDate, doctor.availability);

// Categorize by time of day
const { morning, afternoon, evening } = categorizeTimeSlots(timeSlots);

// Past slots are automatically disabled if date is today
```

## 📱 Mock Data

The app includes 5 mock doctors across specialties:
- 🫀 Dr. Sarah Johnson - Cardiologist
- 🦷 Dr. Michael Chen - Dentist
- 🧴 Dr. Priya Sharma - Dermatologist
- 👶 Dr. James Williams - Pediatrician
- 🧠 Dr. Amanda Rodriguez - Neurologist

Each doctor has:
- Unique availability schedules
- Patient reviews
- Realistic stats and pricing

## 🎨 UI Highlights

- **Gradient Headers**: Eye-catching blue gradients
- **Smooth Animations**: FadeIn, FadeInDown, FadeInRight effects
- **Interactive Elements**: Hover states and touch feedback
- **Responsive Design**: Adapts to different screen sizes
- **Accessibility**: Clear contrast and readable typography

## 🔮 Future Enhancements

- [ ] User authentication (Phone OTP, Email)
- [ ] Patient profile management
- [ ] Appointment history and management
- [ ] Video consultation integration
- [ ] Prescription viewer
- [ ] Push notifications
- [ ] Backend API integration
- [ ] Payment gateway integration
- [ ] Doctor search and filtering
- [ ] Favorite doctors
- [ ] Appointment reminders

## 📄 License

This project is created for demonstration purposes.

## 👨‍💻 Developer Notes

### Time Slot Logic
The `timeSlotUtils.ts` file contains all booking logic:
- `generateTimeSlots()`: Creates slots from doctor availability
- `categorizeTimeSlots()`: Groups by time of day
- `formatTime12Hour()`: Converts 24h to 12h format
- `hasAvailability()`: Checks if doctor is available on a date
- `getNextAvailableSlot()`: Finds next open appointment

### Theme Customization
All design tokens are in `src/theme/index.ts`:
- Colors
- Spacing scale
- Border radius values
- Typography styles
- Shadow definitions

### Adding New Doctors
Update `src/constants/mockData.ts` with the doctor object following the `Doctor` interface.

---

**Built with ❤️ using React Native Expo**
