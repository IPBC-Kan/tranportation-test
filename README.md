# Note: This Doc file is not finished yet and may contain wrong information.

# 🚌 Transportation Test

This repository is a full-stack monorepo for a transportation management system, featuring an Azure AD-authenticated React frontend and a Node.js/Express backend. The project is structured for easy development, deployment, and extension.

---

## 📋 Table of Contents

-   [📁 Project Structure](#project-structure)
-   [✨ Features](#features)
-   [🚀 Getting Started](#getting-started)
    -   [📋 Prerequisites](#prerequisites)
    -   [📥 Clone and Install](#clone-and-install)
    -   [🔧 Environment Variables](#environment-variables)
-   [💻 Development](#development)
    -   [▶️ Running the Client](#running-the-client)
    -   [⚙️ Running the Server](#running-the-server)
-   [🔐 Authentication](#authentication)
-   [🎨 Frontend Overview](#frontend-overview)
-   [🗄️ Backend Overview](#backend-overview)
-   [🚀 Deployment](#deployment)
-   [🔧 Troubleshooting](#troubleshooting)
-   [📄 License](#license)

---

## 📁 Project Structure

```
.
├── README.md
├── client/
│   ├── README.md
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env
│   ├── .env.production
│   ├── public/
│   └── src/
│       ├── Auth/
│       ├── components/
│       ├── layout/
│       ├── pages/
│       ├── shared/
│       ├── store/
│       └── index.tsx
└── server/
    ├── README.md
    ├── package.json
    ├── tsconfig.json
    ├── .env
    ├── .env.production
    └── src/
        ├── interfaces/
        ├── models/
        ├── services/
        ├── utils/
        └── index.ts
```

---

## ✨ Features

-   **Azure AD Authentication** (MSAL) for secure login
-   **Role-based Access Control** (Admin/Users via Azure Groups)
-   **Trip and Line Management** (backend services for deployment, scheduling, etc.)
-   **Redux Toolkit** for state management (frontend)
-   **Persisted Redux Store** (with JWT token sync)
-   **Material UI** theming and custom layouts
-   **Responsive Design** (Sass/CSS)
-   **API Integration** with JWT token propagation

---

## 🚀 Getting Started

### 📋 Prerequisites

-   Node.js (v16+ recommended)
-   npm or yarn
-   Azure AD tenant (for authentication)
-   MongoDB (for backend data)

### 📥 Clone and Install

```sh
git clone https://github.com/your-username/transportation-test.git
cd transportation-test

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### 🔧 Environment Variables

Both `client` and `server` require `.env` files. Copy `.env` to `.env.production` and fill in the required values.

#### Example for `client/.env`:

```
REACT_APP_AZURE_CLIENT_ID=your-azure-client-id
REACT_APP_AZURE_TENANT_ID=your-tenant-id
REACT_APP_API_BASE_URL=http://localhost:5000
```

#### Example for `server/.env`:

```
MONGO_URI=mongodb://localhost:27017/transportation
PORT=5000
AZURE_CLIENT_ID=your-azure-client-id
AZURE_TENANT_ID=your-tenant-id
```

---

## 💻 Development

### ▶️ Running the Client

```sh
cd client
npm start
```

-   Runs on [http://localhost:3000](http://localhost:3000) by default.

### ⚙️ Running the Server

```sh
cd server
npm run dev
```

-   Runs on [http://localhost:5000](http://localhost:5000) by default.

---

## 🔐 Authentication

-   Uses [MSAL](https://github.com/AzureAD/microsoft-authentication-library-for-js) for Azure AD login.
-   See [`client/src/Auth/authConfig.ts`](client/src/Auth/authConfig.ts) for configuration.
-   Role-based access is managed via Azure AD Groups (see `groups` in auth config).

---

## 🎨 Frontend Overview

-   **Entry Point:** [`client/src/index.tsx`](client/src/index.tsx)
-   **State Management:** [`client/src/store/store.ts`](client/src/store/store.ts)
-   **Routing:** [`AppRouter`](client/src/AppRouter.tsx) (if present)
-   **Theming:** [`client/src/layout/theme/theme.ts`](client/src/layout/theme/theme.ts)
-   **Layouts:** [`client/src/layout/layouts/`](client/src/layout/layouts/)
-   **Pages:** [`client/src/pages/`](client/src/pages/)
-   **Shared Models/Enums:** [`client/src/shared/`](client/src/shared/)
-   **Authentication Guards:** [`client/src/Auth/ComponentGuard.tsx`](client/src/Auth/ComponentGuard.tsx)

### Main Components

-   **Main Page:** [`client/src/pages/Main/Main.tsx`](client/src/pages/Main/Main.tsx)
-   **Header/NavBar:** [`client/src/components/Header/Header.tsx`](client/src/components/Header/Header.tsx), [`client/src/components/Navbar/Navbar.tsx`](client/src/components/Navbar/Navbar.tsx)
-   **Layouts:** `MainLayout`, `AuthLayout` for protected and public routes

---

## 🗄️ Backend Overview

-   **Entry Point:** [`server/src/index.ts`](server/src/index.ts)
-   **Models:** [`server/src/models/`](server/src/models/)
-   **Interfaces:** [`server/src/interfaces/`](server/src/interfaces/)
-   **Services:** [`server/src/services/`](server/src/services/)
    -   Trip/Line deployment logic: [`deploymentService.ts`](server/src/services/deploymentService.ts)
-   **Utils:** [`server/src/utils/`](server/src/utils/)

### Key Backend Features

-   **Trip Deployment:** Automated and manual trip creation based on schedules and holidays
-   **Line Management:** CRUD operations for transportation lines
-   **Holiday Logic:** Determines trip deployment based on holiday type

---

## 🚀 Deployment

-   **Production builds:**

    -   Client: `npm run build` (outputs to `client/build`)
    -   Server: Use a process manager (e.g., PM2) or Docker for deployment

-   **Environment variables:**
    -   Set production values in `.env.production` for both client and server

---

## 🔧 Troubleshooting

-   **Authentication Issues:**

    -   Ensure Azure AD app registration is correct and redirect URIs are set
    -   Check group OIDs in `authConfig`

-   **CORS Errors:**

    -   Make sure backend allows requests from frontend origin

-   **Database Connection:**

    -   Verify `MONGO_URI` and MongoDB service status

-   **Token Sync:**
    -   Redux store and `appApiProvider` must be in sync (see `store.ts`)

---

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.

---

## 📚 Additional Resources

-   [Azure AD Documentation](https://docs.microsoft.com/en-us/azure/active-directory/)
-   [Redux Toolkit](https://redux-toolkit.js.org/)

---

## 🗃️ Data Structure

The transportation system uses MongoDB with Mongoose schemas to manage the following core entities:

### Users

-   **Purpose:** Store user information from Azure AD
-   **Fields:** `id`, `name`, `email`, `phone`
-   **Location:** [`server/src/models/User.model.ts`](server/src/models/User.model.ts)

### Lines

Transportation routes with stops, schedules, and driver assignments.

-   **Model:** [`server/src/models/Line.model.ts`](server/src/models/Line.model.ts)
-   **Interface:** [`server/src/interfaces/Line.ts`](server/src/interfaces/Line.ts)
-   **Service:** [`server/src/services/lineService.ts`](server/src/services/lineService.ts)

**Structure:**

```typescript
{
  name: string,              // Line name
  direction: 'pickup' | 'dropoff',
  stops: [                   // Array of stops
    {
      name: string,
      isBase: boolean,       // Main boarding point
      index: number,         // Stop order
      estimatedArrivalTime: number  // Minutes from start
    }
  ],
  schedule: [                // Weekly schedules
    {
      weekday: 'Sunday' | 'Monday' | ...,
      isSpacial: boolean,    // Special service (base stop only)
      cancellationTimeAllowed: number,  // Minutes before trip
      passengersNumberAllowed: number,
      driver: { name, phone, email },
      hour: number,          // Departure hour
      minute: number,        // Departure minute
      status: 'new' | 'deployed' | 'cancelled',
      isActive: boolean
    }
  ],
  isActive: boolean
}
```

### Trips

Individual scheduled trips based on line schedules.

-   **Model:** [`server/src/models/Trip.model.ts`](server/src/models/Trip.model.ts)
-   **Interface:** [`server/src/interfaces/Trip.ts`](server/src/interfaces/Trip.ts)
-   **Service:** [`server/src/services/tripService.ts`](server/src/services/tripService.ts)

**Structure:**

```typescript
{
  lineName: string,          // Reference to line
  date: Date,               // Trip date and time
  stops: [                  // Trip-specific stops
    {
      name: string,
      index?: number,
      estimatedArrivalTime?: Date,
      isBase: boolean
    }
  ],
  registrations: [          // User registrations
    {
      user: User,
      registrationDate: Date,
      isCancelled: boolean,
      cancellationDate?: Date,
      isLateCancellation?: boolean
    }
  ],
  chatMessages: [           // Trip communication
    {
      sender: User,
      message: string,
      timestamp: Date
    }
  ],
  isActive: boolean
}
```

### Holidays

Holiday definitions affecting trip deployment logic.

-   **Model:** [`server/src/models/Holiday.model.ts`](server/src/models/Holiday.model.ts)
-   **Interface:** [`server/src/interfaces/Holidays.ts`](server/src/interfaces/Holidays.ts)
-   **Service:** [`server/src/services/holidayService.ts`](server/src/services/holidayService.ts)

**Structure:**

```typescript
{
  date: Date,               // Holiday date
  name: string,            // Holiday name
  type: 0 | 1 | 2          // 0: Manual, 1: Holiday Eve, 2: Holiday
}
```

### Registrations

User trip registrations (embedded in Trip documents).

-   **Model:** [`server/src/models/Registration.model.ts`](server/src/models/Registration.model.ts)
-   **Interface:** [`server/src/interfaces/Registration.ts`](server/src/interfaces/Registration.ts)
-   **Service:** [`server/src/services/registrationService.ts`](server/src/services/registrationService.ts)

---

## 🔄 Deployment Progress System

The system includes sophisticated trip deployment logic that automatically creates trips based on schedules and holiday rules.

### Deployment Service

**Location:** [`server/src/services/deploymentService.ts`](server/src/services/deploymentService.ts)

### Deployment Methods

#### 1. Schedule-Based Deployment

**Function:** `deployByScheduleId(scheduleId: string)`

-   Deploys trips for a specific schedule over the next 8 days
-   Finds matching weekdays for the schedule
-   Creates trips with proper timing

#### 2. Date-Based Deployment

**Function:** `deployByDate(date: Date)`

-   Analyzes the target date for holiday status
-   Applies appropriate deployment strategy based on holiday type

### Holiday Deployment Logic

#### Regular Days (No Holiday)

-   **Action:** Deploy all line schedules for the specific day of week
-   **Function:** `deployForDayOfWeek(date: Date)`

#### Holiday Type 0 - Manual Deployment Required

-   **Action:** Return error message requiring manual intervention
-   **Use Case:** Yom Kippur and Yom Kippur eve - special religious observance requiring manual scheduling decisions
-   **Reason:** These holidays require specific transportation arrangements that cannot be automated

#### Holiday Type 1 - Holiday Eve

-   **Sunday-Friday:** Deploy using Friday schedules
-   **Saturday:** Deploy Saturday schedules with special deployment flag
-   **Functions:** `deployForFriday(date: Date)`, `deployForSaturday(date: Date, true)`

#### Holiday Type 2 - Holiday

-   **Next day is Holiday/Saturday:** Deploy Saturday schedules as special
-   **Next day is regular:** Deploy Saturday schedules normally
-   **Function:** `deployForSaturday(date: Date, deployAllAsSpecial?)`

### Trip Creation Logic

#### Regular Trips

-   **Stops:** All line stops with calculated arrival times
-   **Timing:** Based on `estimatedArrivalTime` from line stops

#### Special Trips (`isSpacial` or `deployAllAsSpecial`)

-   **Stops:** Only the base stop
-   **Use Case:** Limited service during holidays or special circumstances

### Deployment Response Format

```typescript
interface IDeploymentResponse {
    tripsCreated: boolean; // Success indicator
    message: string; // Human-readable result
    newTrips?: ITrip[]; // Created trip objects
}
```

### Service Functions Overview

| Service                  | Primary Functions                                     | Purpose                 |
| ------------------------ | ----------------------------------------------------- | ----------------------- |
| **Trip Service**         | `getAllTrips`, `createTrip`, `getTodayTrips`          | Trip CRUD operations    |
| **Line Service**         | `getAllLines`, `createLine`, schedule/stop management | Line configuration      |
| **Registration Service** | `registerToTrip`, `cancelRegistration`                | User trip bookings      |
| **Deployment Service**   | `deployByDate`, `deployByScheduleId`                  | Automated trip creation |
| **Holiday Service**      | `getAllHolidays`, `getHolidayByDate`                  | Holiday data management |

### Integration Points

-   **Frontend:** Trip display, registration forms, admin deployment controls
-   **Backend:** Automated scheduling, holiday processing, user management
-   **Database:** Consistent data model across all entities with proper relationships
