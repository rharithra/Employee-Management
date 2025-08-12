# 🏢 Employee Management System

A comprehensive **Employee Management System** that combines **Leave Management**, **Payroll Management**, **Performance Goals**, **KPI Tracking**, and **Attendance Management** into a single, powerful HR solution.

## ✨ Features

### 🔐 Authentication & Authorization
- **Multi-role system**: Employee, Manager, Admin
- **JWT-based authentication**
- **Role-based access control**
- **Secure password handling**
- **Auto-logout on unauthorized access**

### 📅 Leave Management
- **Leave request submission** with validation
- **Leave approval workflow** (Manager/Admin)
- **Leave balance tracking** with automatic deduction
- **Multiple leave types**: Annual, Sick, Personal, Maternity, Paternity
- **Leave history** and status tracking
- **Single-day leave support**
- **Email notifications** for leave status changes
- **Real-time notifications** for instant updates

### 💰 Payroll Management
- **Automated payroll generation** with leave integration
- **Advanced salary structure** (Basic, HRA, DA, TA, PF, Tax, Performance Incentive, Special/Medical/Conveyance/Food/Other Allowances)
- **KPI-based performance incentives** with 4-category evaluation
- **Leave deduction calculation** from salary
- **Payroll history** and detailed breakdown
- **Currency formatting** (INR)
- **PDF payslip generation** and download
- **Payroll statistics** and analytics
- **Real-time payroll updates**

### 🎯 Performance Management
- **Goal assignment** by managers/admins
- **Goal progress tracking** by employees
- **Real-time goal notifications** (assignment & completion)
- **Goal categories** and priority levels
- **Performance KPI system** with 4 evaluation areas:
  - Quality Performance (25%)
  - Productivity (25%)
  - Team Collaboration (25%)
  - Goal Achievement (25%)
- **Automated incentive calculation** based on KPI scores
- **Goal completion alerts** to managers
- **Visual progress tracking** with status indicators

### 🕒 Attendance Management
- **Daily check-in/check-out** functionality
- **Attendance history** and statistics
- **Working hours calculation**
- **Attendance integration** with payroll
- **Real-time attendance status**
- **Monthly attendance overview**
- **Attendance validation** (prevent duplicate check-ins)

### 👥 Employee Management
- **Employee profiles** with complete information
- **Department management**
- **Manager assignment** and team structure
- **Advanced salary configuration** per employee
- **Bank details** and payroll information
- **User registration** with role-based access

### 📊 Dashboard & Analytics
- **Real-time statistics** for leaves and payroll
- **Leave balance visualization**
- **Payroll overview** for managers/admins
- **Goal progress tracking**
- **Attendance overview** with background cards
- **Quick action buttons**
- **Role-based dashboard content**

### 🔔 Real-time Notifications
- **Socket.IO-powered** real-time updates
- **In-app notifications** with notification bell
- **Email notifications** for leave requests and approvals
- **Goal assignment notifications**
- **Goal completion alerts**
- **Toast notifications** for user feedback
- **Notification bell** with unread count and connection status
- **Dynamic notification positioning** to prevent cutoff

### 💾 Data Persistence
- **File-based data storage** (JSON files in `/server/data/`)
- **Automatic data saving** on all operations
- **Graceful shutdown handling** with data preservation
- **Auto-save functionality** every 5 minutes
- **Data recovery** on server restart

## 🛠️ Technology Stack

### Backend
- **Node.js** with Express.js
- **Socket.IO** for real-time notifications
- **JWT** for authentication
- **Nodemailer** for email notifications
- **File-based data store** with JSON persistence
- **CORS** enabled for frontend integration

### Frontend
- **React 18** with functional components
- **React Router** for navigation
- **React Query** for data fetching and caching
- **Socket.IO Client** for real-time updates
- **React Hook Form** for form management
- **Tailwind CSS** for styling
- **Heroicons** for icons
- **React Hot Toast** for notifications
- **Date-fns** for date manipulation
- **jsPDF & html2canvas** for PDF generation

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd Leave-Management/Leave-Management
```

2. **Install dependencies**
```bash
npm install
cd client && npm install
cd ..
```

3. **Set up environment variables**
Create a `.env` file in the root directory:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
PORT=5001
JWT_SECRET=your-super-secure-jwt-secret-key
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development
```

4. **Start the application**
```bash
# Start backend server
npm run backend

# In another terminal, start frontend
cd client && npm start
```

5. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5001

## 👤 Demo Users

| Role | Email | Password | Access |
|------|-------|----------|---------|
| Admin | admin@company.com | password123 | Full access + KPI management |
| Manager | manager@company.com | password123 | Team management + Goal assignment |
| Employee | employee@company.com | password123 | Leave requests + Goal updates |

## 📋 User Roles & Permissions

### 👨‍💼 Admin
- **Full system access**
- **User management** (create, edit, delete)
- **Department management**
- **Leave type configuration**
- **Payroll generation** for all employees
- **KPI configuration** and incentive calculation
- **Goal management** for all employees
- **System statistics**
- **Email configuration**

### 👨‍💻 Manager
- **Team management** (view team members)
- **Leave approval** for team members
- **Payroll generation** for team members
- **Goal assignment** to team members
- **KPI evaluation** for team members
- **Goal completion notifications**
- **Team statistics**

### 👷 Employee
- **Leave request submission**
- **View own leave history**
- **View own payroll** (if generated)
- **Goal progress updates**
- **Performance self-assessment**
- **Attendance tracking**
- **Profile management**
- **Real-time notifications**

## 🎯 Performance Management Features

### Goal Management
- **Goal Assignment**: Managers can assign goals to team members
- **Progress Tracking**: Employees update goal progress (0-100%)
- **Status Management**: Pending → In Progress → Completed
- **Priority Levels**: High, Medium, Low with color coding
- **Category Organization**: Project Management, Professional Development, Sales, etc.
- **Due Date Tracking** with overdue indicators
- **Notes Support**: Progress comments and updates

### KPI System
- **4-Category Evaluation**:
  1. **Quality Performance** (25% weight)
  2. **Productivity** (25% weight)
  3. **Team Collaboration** (25% weight)
  4. **Goal Achievement** (25% weight)
- **Real-time Calculation**: Automatic total KPI scoring
- **Performance Incentives**: Calculated based on KPI scores
- **Configurable Rates**: Base incentive rate and maximum caps
- **Performance Ratings**: Excellent (80%+), Good (60-79%), Needs Improvement (<60%)

### Notifications
- **Goal Assignment**: Employee receives notification when goal is assigned
- **Goal Completion**: Manager receives notification when employee completes goal
- **Real-time Updates**: Instant notifications via Socket.IO
- **Email Integration**: Email notifications for important updates

## 💼 Enhanced Payroll Features

### Advanced Salary Components
- **Basic Salary**: Base compensation
- **HRA**: House Rent Allowance
- **DA**: Dearness Allowance  
- **TA**: Transport Allowance
- **Performance Incentive**: KPI-based variable component
- **Special Allowance**: Additional allowances
- **Medical Allowance**: Health benefits
- **Conveyance Allowance**: Transport benefits
- **Food Allowance**: Meal benefits
- **Other Allowances**: Miscellaneous benefits
- **PF**: Provident Fund (deduction)
- **Tax**: Income Tax (deduction)

### KPI-Based Incentive Calculation
1. **KPI Evaluation**: 4-category performance assessment
2. **Total KPI Score**: Weighted average calculation
3. **Incentive Amount**: (Total KPI ÷ 100) × Base Rate × 100
4. **Capped Amount**: Respects maximum incentive limits
5. **Auto-Integration**: Seamlessly added to payroll

### Payroll Generation
- **Monthly payroll** generation
- **Leave integration** (automatic deduction)
- **Working days** calculation
- **KPI incentives** included
- **PDF payslip generation**
- **Detailed breakdown** with earnings and deductions

## 📧 Email Notifications

### Email Templates
- **Leave Request**: Manager notification when employee submits
- **Leave Approved**: Employee notification when approved
- **Leave Rejected**: Employee notification with reason
- **Goal Assignment**: Employee notification for new goals
- **Goal Completion**: Manager notification when goals completed

### Email Setup
1. **Enable 2FA** on your Gmail account
2. **Generate App Password** for mail access
3. **Update .env** with email credentials
4. **Test email** functionality with auto-verification

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration (public)
- `GET /api/auth/me` - Get current user

### Leave Management
- `GET /api/leaves` - Get leave requests
- `POST /api/leaves` - Submit leave request
- `PUT /api/leaves/:id/approve` - Approve/reject leave
- `GET /api/leaves/stats` - Leave statistics

### Payroll Management
- `GET /api/payroll` - Get payroll history
- `POST /api/payroll/generate` - Generate payroll
- `GET /api/payroll/:id` - Get payroll details
- `GET /api/payroll/stats` - Payroll statistics

### User Management
- `GET /api/users` - Get users
- `POST /api/users` - Create user (admin only)
- `PUT /api/users/:id` - Update user
- `PUT /api/users/:id/salary` - Update salary with KPI

### Performance Goals
- `GET /api/performance-goals` - Get goals (role-filtered)
- `POST /api/performance-goals` - Create goal (manager/admin)
- `PUT /api/performance-goals/:id` - Update goal progress
- `DELETE /api/performance-goals/:id` - Delete goal

### Notifications
- `GET /api/notifications` - Get notifications
- `PUT /api/notifications/:id/read` - Mark as read
- `GET /api/notifications/unread-count` - Get unread count

### Attendance
- `POST /api/attendance/checkin` - Check in
- `POST /api/attendance/checkout` - Check out
- `GET /api/attendance` - Get attendance history

## 📱 Features by Role

### Employee Features
- ✅ Submit leave requests
- ✅ View leave balance
- ✅ Track request status
- ✅ View payroll (if generated)
- ✅ **Update goal progress**
- ✅ **View assigned goals**
- ✅ **Attendance check-in/out**
- ✅ **Real-time notifications**
- ✅ **PDF payslip download**

### Manager Features
- ✅ Approve/reject team leave requests
- ✅ View team statistics
- ✅ Generate payroll for team
- ✅ **Assign goals to team members**
- ✅ **Configure KPI scores**
- ✅ **Goal completion notifications**
- ✅ Manage team members
- ✅ Receive leave notifications

### Admin Features
- ✅ Full user management
- ✅ Department management
- ✅ Leave type configuration
- ✅ Generate payroll for all employees
- ✅ **System-wide goal management**
- ✅ **KPI system configuration**
- ✅ **Performance analytics**
- ✅ System-wide statistics
- ✅ Email configuration

## 🎨 UI/UX Features

### Modern Design
- **Responsive layout** (mobile-friendly)
- **Clean, professional** interface
- **Intuitive navigation**
- **Consistent styling** with Tailwind CSS
- **Color-coded indicators** for status and priority
- **Progress bars** with dynamic colors
- **Modal dialogs** for complex interactions

### User Experience
- **Real-time updates** with React Query and Socket.IO
- **Loading states** and error handling
- **Toast notifications** for feedback
- **Form validation** and error messages
- **Confirmation dialogs** for important actions
- **Dynamic dropdown positioning** to prevent cutoff
- **Auto-refresh** for real-time data

### Accessibility
- **Keyboard navigation** support
- **Screen reader** friendly
- **High contrast** color scheme
- **Responsive design** for all devices
- **Clear visual indicators** for status and actions

## 🔒 Security Features

### Authentication
- **JWT tokens** for session management
- **Role-based access** control
- **Secure API endpoints**
- **Auto-logout** on token expiry
- **Protected routes** with role validation

### Data Protection
- **Input validation** on all forms
- **XSS protection**
- **CORS configuration**
- **File-based storage** security
- **Environment variable protection**

## 📊 System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Data Store    │
│   (React)       │◄──►│   (Node.js)     │◄──►│   (JSON Files)  │
│                 │    │                 │    │                 │
│ • User Interface│    │ • API Routes    │    │ • Users         │
│ • Real-time UI  │    │ • Auth Middleware│   │ • Leaves        │
│ • State Mgmt    │    │ • Socket.IO     │   │ • Payrolls      │
│ • Routing       │    │ • Business Logic│   │ • Goals         │
│ • Components    │    │ • Email Service │   │ • Notifications │
│ • PDF Generation│    │ • File Persist. │   │ • Attendance    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Deployment

### Local Development
1. **Environment variables** configuration
2. **Email service** setup (Gmail App Password)
3. **Port configuration** (Backend: 5001, Frontend: 3000)

### Production Setup (Render)
- **Complete deployment guide**: See `RENDER_DEPLOYMENT.md`
- **Environment variables** configuration
- **Email service** configuration
- **CORS** setup for production URLs
- **Data persistence** with file storage

### Docker Deployment
```dockerfile
# Backend Dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5001
CMD ["npm", "run", "backend"]
```

## 📚 Additional Documentation

- **`RENDER_DEPLOYMENT.md`**: Complete deployment guide for Render.com
- **`EMAIL_SETUP.md`**: Detailed email configuration instructions
- **`ATTENDANCE_FEATURES.md`**: Attendance system documentation
- **`PDF_FEATURES.md`**: PDF generation capabilities
- **`SALARY_MANAGEMENT_GUIDE.md`**: Comprehensive salary management guide

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes
4. **Test** thoroughly
5. **Submit** a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- **Email**: support@company.com
- **Documentation**: [Wiki Link]
- **Issues**: [GitHub Issues]

---

**Built with ❤️ using React, Node.js, Socket.IO, and Tailwind CSS** 