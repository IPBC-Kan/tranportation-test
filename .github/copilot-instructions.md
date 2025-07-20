# GitHub Copilot Repository Instructions

## Project Overview

Transportation management system built with React, custom Redux implementation (QuickStore), Node.js, Express, and MongoDB. Features include trip management, line scheduling, and user registration.

## Redux Implementation

This project uses a custom Redux implementation with QuickStore for state management:

### State Structure

-   **State Definition**: Located in `client/src/store/state.ts`
-   **Store Creation**: Uses `createQuickStore` factory in `client/src/store/store.ts`
-   **State Types**: Three main types supported:
    -   `createValueState<T>` - for primitive values (string, boolean, number)
    -   `createObjectState<T>` - for complex objects
    -   `createArrayState<T>` - for arrays

### Available Actions by Data Type

**Value State Actions** (boolean, string, number):

-   `set(value)` - Set the value
-   `clear()` - Clear/reset the value

**Object State Actions**:

-   `set(object)` - Replace entire object
-   `clear()` - Clear the object
-   `partialUpdate(partial)` - Update specific properties

**Array State Actions**:

-   `set(array)` - Replace entire array
-   `clear()` - Clear the array
-   `push(item)` - Add item to end
-   `remove(item)` - Remove specific item
-   `removeByIndex(index)` - Remove by index
-   `removeWhere(condition)` - Remove items matching condition
-   `updateWhere(item, condition)` - Update items matching condition
-   `partialUpdateWhere(partial, condition)` - Partial update matching items
-   `upsert(item, condition)` - Insert or update based on condition
-   `setItem(item, index)` - Set item at specific index

### Usage Pattern

```typescript
// Import actions directly - no dispatch needed
import { actions } from 'store/store';

// Update state directly
actions.lines.set(newLines);
actions.user.partialUpdate({ name: 'John' });
actions.trips.removeWhere((trip) => trip.id === tripId);
```

### Selectors

-   **Location**: `client/src/store/selectors/`
-   **Rule**: Always use selectors, never access state directly
-   **Pattern**: Use `useSelector` with imported selectors only
-   **Logic**: Put complex logic in selectors, keep components simple

```typescript
// Good - use selectors
import { useSelector } from 'react-redux';
import { getCurrentUser } from 'store/selectors/user.selector';

const user = useSelector(getCurrentUser);

// Bad - direct state access
const user = useSelector((state) => state.user);
```

## Creating and Handling Requests

### Client Side

#### API Services Structure

-   **Location**: `client/src/api/` (e.g., `line.service.ts`, `trip.service.ts`)
-   **Base Class**: Services extend `QuickApiServiceBase`
-   **Methods**: Built-in methods for `get`, `post`, `put`, `delete` operations
-   **Error Handling**: Automatic error handling with meaningful messages

#### Request Flow Pattern

1. **Call API Service** - Use service methods in components/hooks
2. **Handle Response** - Process successful responses
3. **Update Store** - Use actions to update state directly
4. **Error Handling** - Handle errors with user-friendly messages

```typescript
// Example service usage
import { useEffect } from 'react';
import { lineService } from 'api/line.service';
import { actions } from 'store/store';

const useLoadLines = () => {
    useEffect(() => {
        const loadLines = async () => {
            try {
                const lines = await lineService.getAllLines();
                actions.lines.set(lines);
            } catch (error) {
                console.error('Failed to load lines:', error);
                actions.lines.set([]);
            }
        };

        loadLines();
    }, []);
};
```

#### Service Implementation Example

```typescript
// client/src/api/example.service.ts
import { QuickApiServiceBase, QuickConsoleLogger } from 'hooks/services';
import { appApiProvider } from './axiosApiProvider';

class ExampleService extends QuickApiServiceBase {
    constructor() {
        super(new QuickConsoleLogger('ExampleService'), appApiProvider, 'example', 'Example');
    }

    async getAll() {
        return this.getOrThrow({ url: '/' });
    }

    async create(data) {
        return this.postOrThrow(data, { url: '/' });
    }

    async update(id, data) {
        return this.putOrThrow(data, { url: `/${id}` });
    }

    async delete(id) {
        return this.deleteOrThrow({ url: `/${id}` });
    }
}

export const exampleService = new ExampleService();
```

### Server Side

#### Structure

-   **App Structure**: `app.ts` → `routes` → `controllers` → `services`
-   **HTTP Methods**: Use GET, POST, PUT, DELETE
-   **Status Codes**: Always use 200 for successful requests
-   **URL Design**: Keep URLs simple, avoid complex query params

#### Controller Pattern

```typescript
// server/src/controllers/example.controller.ts
import { Request, Response } from 'express';
import * as exampleService from '../services/exampleService';

export const getAll = async (req: Request, res: Response) => {
    try {
        const data = await exampleService.getAll();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch data' });
    }
};

export const create = async (req: Request, res: Response) => {
    try {
        const data = await exampleService.create(req.body);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create item' });
    }
};
```

#### Service Layer

-   **Location**: `server/src/services/`
-   **Responsibility**: Handle business logic and database operations
-   **Error Handling**: Throw meaningful errors that controllers can handle

#### Route Structure

```typescript
// server/src/routes/example.routes.ts
import { Router } from 'express';
import * as exampleController from '../controllers/example.controller';

const router = Router();

router.get('/', exampleController.getAll);
router.post('/', exampleController.create);
router.put('/:id', exampleController.update);
router.delete('/:id', exampleController.delete);

export default router;
```

## Component Structure

Components follow a specific folder structure:

```
components/
  ComponentName/
    ComponentName.tsx
    ComponentName.scss
```

### Rules:

-   Each component has its own folder
-   Component file matches folder name
-   SCSS file for styling in same folder
-   Keep components simple - move complex logic to selectors or services

## Development & Contribution

### Setup

1. Clone the repository
2. Install dependencies: `npm install` in both `client` and `server` folders
3. Start development: `npm run dev` in both folders

### Best Practices

-   Follow the established patterns for Redux state management
-   Use selectors for all state access
-   Keep components simple and focused
-   Use services for API calls
-   Always handle errors gracefully
-   Follow the folder structure conventions

### Code Style

-   Use TypeScript for type safety
-   Follow existing naming conventions
-   Write meaningful commit messages
-   Submit pull requests for review
