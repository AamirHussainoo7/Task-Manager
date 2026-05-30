# TaskFlow — Full Stack Task Manager

A production-quality Kanban-style task management application built with Django, React, and PostgreSQL. Designed with a clean, modern SaaS aesthetic inspired by Linear, Notion, and Vercel.

![TaskFlow](https://img.shields.io/badge/TaskFlow-v1.0-3b82f6?style=for-the-badge)
![Django](https://img.shields.io/badge/Django-5.x-092E20?style=flat-square&logo=django)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=flat-square&logo=postgresql)
![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss)

## 🌐 Live Demo

| Service | URL |
|---------|-----|
| **Frontend (Vercel)** | [https://task-manager-teal-seven.vercel.app](https://task-manager-teal-seven.vercel.app) |
| **Backend API (Render)** | [https://task-manager-kz1c.onrender.com](https://task-manager-kz1c.onrender.com/api/auth/register/) |

> **Note:** The backend is hosted on Render's free tier and may take ~30-60 seconds to wake up on the first request after inactivity.

---

## Features

- **JWT Authentication** — Secure register, login, and token refresh flow
- **Kanban Board** — Drag-and-drop task management across Todo, In Progress, and Done
- **Task Management** — Full CRUD with title, description, priority, due dates, and stage
- **Dashboard Statistics** — Real-time task counts and completion metrics
- **Search & Filter** — Search tasks and filter by stage via sidebar
- **Dark / Light Mode** — System-aware theme with manual toggle
- **Responsive Design** — Mobile-first layout with collapsible sidebar
- **Skeleton Loaders** — Smooth loading states across the board
- **Optimistic Updates** — Instant UI feedback on drag-and-drop and delete
- **Toast Notifications** — Non-intrusive success/error feedback
- **Form Validation** — Client-side and server-side validation

---

## Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 19 | UI framework |
| Vite | Build tool & dev server |
| Tailwind CSS v4 | Utility-first styling |
| React Router v7 | Client-side routing |
| Axios | HTTP client |
| @hello-pangea/dnd | Drag-and-drop |
| Framer Motion | Animations |
| Lucide React | Icons |
| react-hot-toast | Notifications |
| date-fns | Date formatting |

### Backend
| Technology | Purpose |
|------------|---------|
| Django 5.x | Web framework |
| Django REST Framework | REST API |
| SimpleJWT | JWT authentication |
| django-cors-headers | CORS handling |
| django-filter | Query filtering |
| psycopg2-binary | PostgreSQL driver |
| WhiteNoise | Static file serving |
| Gunicorn | WSGI server |

### Database
| Technology | Purpose |
|------------|---------|
| PostgreSQL | Primary database |

---

## Project Structure

```
Task Manager/
├── backend/
│   ├── config/             # Django project settings
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   └── asgi.py
│   ├── accounts/           # Authentication app
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── urls.py
│   ├── tasks/              # Task management app
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   ├── filters.py
│   │   └── admin.py
│   ├── manage.py
│   ├── requirements.txt
│   ├── Procfile
│   └── build.sh
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/         # Button, Input, Modal, Loader, EmptyState
│   │   │   ├── layout/     # Navbar, Sidebar
│   │   │   └── tasks/      # TaskCard, TaskColumn, TaskBoard, TaskForm, StatsCards
│   │   ├── pages/          # LoginPage, RegisterPage, DashboardPage
│   │   ├── hooks/          # useTasks
│   │   ├── services/       # api, authService, taskService
│   │   ├── context/        # AuthContext, ThemeContext
│   │   ├── utils/          # constants, helpers
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vite.config.js
│   ├── vercel.json
│   └── package.json
└── README.md
```

---

## Setup Instructions

### Prerequisites
- Python 3.10+
- Node.js 18+
- PostgreSQL 14+

### 1. Clone the repository
```bash
git clone <repo-url>
cd "Task Manager"
```

### 2. Backend Setup

```bash
cd backend

# Create and activate virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Create PostgreSQL database
psql -U postgres
CREATE DATABASE taskmanager_db;
\q

# Configure environment variables
copy .env.example .env
# Edit .env with your PostgreSQL credentials

# Run migrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser

# Start the server
python manage.py runserver
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Configure environment variables
copy .env.example .env

# Start the dev server
npm run dev
```

### 4. Open the app
Navigate to `http://localhost:5173`

---

## Environment Variables

### Backend (`backend/.env`)
| Variable | Description | Default |
|----------|-------------|---------|
| `SECRET_KEY` | Django secret key | — |
| `DEBUG` | Debug mode | `True` |
| `ALLOWED_HOSTS` | Allowed hosts (CSV) | `localhost,127.0.0.1` |
| `DATABASE_URL` | PostgreSQL connection string (production) | — |
| `DB_NAME` | PostgreSQL database name (local dev) | `taskmanager_db` |
| `DB_USER` | Database user (local dev) | `postgres` |
| `DB_PASSWORD` | Database password (local dev) | `postgres` |
| `DB_HOST` | Database host (local dev) | `localhost` |
| `DB_PORT` | Database port (local dev) | `5432` |
| `CORS_ALLOWED_ORIGINS` | Allowed CORS origins (CSV) | `http://localhost:5173` |

> When `DATABASE_URL` is set (production), it takes precedence over individual `DB_*` variables. In local development, leave `DATABASE_URL` unset and use the `DB_*` variables instead.

### Frontend (`frontend/.env`)
| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:8000` |

---

## API Endpoints

### Authentication
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register/` | Create a new user | No |
| POST | `/api/auth/login/` | Obtain JWT tokens | No |
| POST | `/api/auth/token/refresh/` | Refresh access token | No |
| GET | `/api/auth/profile/` | Get user profile | Yes |

### Tasks
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/tasks/` | List all tasks (filterable) | Yes |
| POST | `/api/tasks/` | Create a task | Yes |
| GET | `/api/tasks/{id}/` | Get a task | Yes |
| PUT | `/api/tasks/{id}/` | Update a task | Yes |
| PATCH | `/api/tasks/{id}/` | Partial update | Yes |
| DELETE | `/api/tasks/{id}/` | Delete a task | Yes |
| PATCH | `/api/tasks/{id}/stage/` | Update stage (drag-and-drop) | Yes |
| POST | `/api/tasks/reorder/` | Batch reorder tasks | Yes |
| GET | `/api/tasks/statistics/` | Dashboard statistics | Yes |

### Query Parameters (GET /api/tasks/)
| Param | Description |
|-------|-------------|
| `stage` | Filter by stage: `TODO`, `IN_PROGRESS`, `DONE` |
| `priority` | Filter by priority: `LOW`, `MEDIUM`, `HIGH`, `URGENT` |
| `search` | Search by title (case-insensitive) |
| `ordering` | Sort by: `created_at`, `-created_at`, `priority`, `due_date` |

---

## Technical Decisions

| Decision | Rationale |
|----------|-----------|
| **Django default User model** | Sufficient for this scope. Custom model can be added later without migration pain if extended via OneToOne profile. |
| **SimpleJWT with rotation** | Refresh token rotation improves security. Tokens stored in localStorage for simplicity (HttpOnly cookies are better for production). |
| **`@hello-pangea/dnd`** | Actively maintained fork of `react-beautiful-dnd`. Stable API, great accessibility support. |
| **Tailwind CSS v4** | Latest version with native CSS theme configuration. No PostCSS plugin needed — uses Vite plugin directly. |
| **Context API over Redux** | App state is simple enough that Context + hooks avoids unnecessary boilerplate. |
| **Optimistic updates** | Drag-and-drop and delete operations update UI instantly, then sync with the server in background. |
| **Position field on Task** | Enables drag-and-drop reordering within columns without rewriting entire column positions. |

---

## Assumptions

- PostgreSQL is the primary database (no SQLite fallback in production)
- Single-user task ownership — no team/shared task features
- JWT tokens stored in localStorage (acceptable for this scope)
- No email verification on registration
- No password reset flow

---

## Tradeoffs

| Tradeoff | Context |
|----------|---------|
| localStorage for tokens | Simpler than HttpOnly cookies but vulnerable to XSS. Acceptable for a portfolio project. |
| No WebSocket/SSE | Real-time updates would be ideal for multi-device sync but adds complexity. |
| Client-side search | Search is done on already-fetched tasks for speed. Server-side search available via query params. |
| Confirm dialog for delete | Uses `window.confirm` instead of a custom modal for simplicity. |

---

## Future Improvements

- [ ] Team workspaces and task sharing
- [ ] WebSocket-based real-time updates
- [ ] Activity/audit log per task
- [ ] File attachments
- [ ] Task comments and mentions
- [ ] Email notifications for due dates
- [ ] OAuth login (Google, GitHub)
- [ ] HttpOnly cookie-based auth for production
- [ ] Unit and integration tests
- [ ] CI/CD pipeline

---

## Deployment

The application is deployed as a **monorepo** with the frontend and backend deployed separately:

### Frontend → Vercel

1. Import the GitHub repository on [Vercel](https://vercel.com)
2. Set the **Root Directory** to `frontend`
3. Framework preset: **Vite** (auto-detected)
4. Add environment variable:
   - `VITE_API_URL` = `https://task-manager-kz1c.onrender.com`
5. Deploy — Vercel handles `npm run build` automatically

### Backend → Render

1. Create a **Web Service** on [Render](https://render.com) from the same GitHub repo
2. Set the **Root Directory** to `backend`
3. Runtime: **Python 3**
4. Build command: `./build.sh`
5. Start command: `gunicorn config.wsgi:application`
6. Add environment variables:

| Key | Value |
|-----|-------|
| `SECRET_KEY` | A strong random string |
| `DEBUG` | `False` |
| `ALLOWED_HOSTS` | `task-manager-kz1c.onrender.com,.onrender.com` |
| `DATABASE_URL` | PostgreSQL connection string from Neon |
| `CORS_ALLOWED_ORIGINS` | `https://task-manager-teal-seven.vercel.app` |
| `PYTHON_VERSION` | `3.12.0` |

### Database → Neon (Free PostgreSQL)

1. Create a free PostgreSQL database on [Neon](https://neon.tech)
2. Copy the connection string (e.g., `postgresql://user:pass@host/db?sslmode=require`)
3. Set it as the `DATABASE_URL` environment variable on Render

> **Why Neon instead of Render PostgreSQL?** Render's free tier limits you to one PostgreSQL database. Neon provides a free-tier PostgreSQL with 0.5 GB storage and is purpose-built for serverless workloads.

---

## License

MIT
