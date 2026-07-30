# Car Dealership Management System

Front-end application for managing a car dealership inventory. The app supports JWT login, registration, protected routes, role-based access control, vehicle CRUD, search, purchase, restock, and vehicle detail views.

## Features

- JWT login and customer registration
- Protected, public, and admin-only routes
- Vehicle creation, editing, listing, and details
- Vehicle search
- Purchase and restock actions
- Loading states, inline validation feedback, and success alerts
- Responsive Tailwind UI with accessible controls
- Vitest and React Testing Library coverage

## Technologies Used

- React 19
- Vite
- Tailwind CSS
- React Router
- Axios
- Vitest
- Testing Library

## Installation

Install dependencies from the frontend directory:

```bash
npm install
```

## Running the Backend

Start the backend API from the repository root according to the backend project instructions. The frontend expects the API to be available at:

```text
http://localhost:8000/api/v1
```

## Running the Frontend

From the frontend directory:

```bash
npm run dev
```

## Running Tests

From the frontend directory:

```bash
npm test
```

## Folder Structure

```text
frontend/
	src/
		api/
		components/
		pages/
		utils/
		App.jsx
		index.css
		main.jsx
```

## API Assumptions

- Authentication uses a JWT access token stored in local storage.
- The backend exposes `/auth/login`, `/auth/register`, `/vehicles`, and inventory action endpoints under `/api/v1`.
- Vehicle objects include `id`, `make`, `model`, `year`, `category`, `price`, and `stock`.

## Screenshots

Add application screenshots here.

## Future Improvements

- Add toast notifications for non-blocking feedback
- Add pagination or infinite scrolling for large inventories
- Add server-side filtering and sorting
- Expand accessibility checks with automated audits
- Add form-level schema validation for richer error messaging
