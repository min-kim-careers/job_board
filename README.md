# Full-Stack Job Board

A full-stack job board application that integrates with job listing APIs to provide users with up-to-date job opportunities. Built with a FastAPI backend, MySQL database, and a React frontend using Next.js.

## Features

- **Backend:**
  - FastAPI for the RESTful API.
  - Integration with the **Adzuna API** for job listings.
  - Data stored in a **MySQL database**.
  - API endpoints for job search and retrieval.
  - Full **pagination** for job listings and search results.
  - Easy integration with additional job providers to expand the app's reach (future-proof for becoming a universal job wrapper).

- **Frontend:**
  - React-based frontend with **Next.js** for server-side rendering.
  - Dynamic job board listing with search functionality.
  - Pagination, filters, and job detail views.
  - **Tailwind CSS** for styling.
  - UI components built using **ShadCN** for a consistent design system.

- **Additional:**
  - Metrics dashboard for job board analytics.
  - Responsive design suitable for both desktop and mobile.

## Project Structure

### Backend (`juggle-api`)

- **app/api**: Contains API logic, including Adzuna integration.
- **app/database**: MySQL configuration and models.
- **app/routers**: Routes for job-related operations.
- **app/utils**: Helper functions and utilities.
- **requirements.txt**: List of Python dependencies.

### Frontend (`juggle-app`)

- **app**: Pages and layout for the job board.
- **components**: UI components such as job cards, pagination, and headers.
- **constants**: Constants for forms, options, and pagination.
- **shadcn**: UI components built using the ShadCN design system.
- **stores**: React stores for managing job and option data.
- **styles**: Global styles and Tailwind configuration.