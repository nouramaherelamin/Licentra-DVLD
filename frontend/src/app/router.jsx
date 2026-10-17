import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

// Layouts
import PublicLayout from '../layouts/PublicLayout.jsx';
import AdminLayout from '../layouts/AdminLayout.jsx';
import UserLayout from '../layouts/UserLayout.jsx';

// Member 1 Pages (Public Core)
import HomePage from '../members/member-1/home/HomePage.jsx';
import AboutPage from '../members/member-1/about/AboutPage.jsx';
import ContactPage from '../members/member-1/contact/ContactPage.jsx';

// Member 2 Pages (Public Catalog & News)
import ServicesPage from '../members/member-2/services/ServicesPage.jsx';
import LicenseClassesPage from '../members/member-2/license-classes/LicenseClassesPage.jsx';
import DrivingTestsPage from '../members/member-2/driving-tests/DrivingTestsPage.jsx';
import NewsPage from '../members/member-2/news/NewsPage.jsx';

// Member 3 Pages (Admin Analytics & Settings)
import OverviewPage from '../members/member-3/overview/OverviewPage.jsx';
import ReportsSettingsPage from '../members/member-3/reports-settings/ReportsSettingsPage.jsx';

// Member 4 Pages (Admin Operations: People & Applications)
import PeopleManagementPage from '../members/member-4/people-management/PeopleManagementPage.jsx';
import ApplicationsManagementPage from '../members/member-4/applications-management/ApplicationsManagementPage.jsx';

// Member 5 Pages (Admin Operations: Licenses & Tests)
import LicenseManagementPage from '../members/member-5/license-management/LicenseManagementPage.jsx';
import TestsAppointmentsPage from '../members/member-5/tests-appointments/TestsAppointmentsPage.jsx';

// Member 6 Pages (User Portal: Profile & Application Filing)
import MyProfilePage from '../members/member-6/my-profile/MyProfilePage.jsx';
import SubmitApplicationPage from '../members/member-6/submit-application/SubmitApplicationPage.jsx';
import MyApplicationsPage from '../members/member-6/my-applications/MyApplicationsPage.jsx';

// Member 7 Pages (User Portal: Bookings, Licenses & Notifications)
import AppointmentsPage from '../members/member-7/appointments/AppointmentsPage.jsx';
import MyLicensesPage from '../members/member-7/my-licenses/MyLicensesPage.jsx';
import NotificationsPage from '../members/member-7/notifications/NotificationsPage.jsx';

export const router = createBrowserRouter([
  // 1. Public Website Routes (7 pages)
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'services', element: <ServicesPage /> },
      { path: 'license-classes', element: <LicenseClassesPage /> },
      { path: 'driving-tests', element: <DrivingTestsPage /> },
      { path: 'news', element: <NewsPage /> },
      { path: 'contact', element: <ContactPage /> },
    ],
  },

  // 2. Admin Dashboard Routes (6 pages)
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <OverviewPage /> },
      { path: 'people', element: <PeopleManagementPage /> },
      { path: 'applications', element: <ApplicationsManagementPage /> },
      { path: 'licenses', element: <LicenseManagementPage /> },
      { path: 'tests-appointments', element: <TestsAppointmentsPage /> },
      { path: 'reports-settings', element: <ReportsSettingsPage /> },
    ],
  },

  // 3. User Portal Routes (6 pages)
  {
    path: '/portal',
    element: <UserLayout />,
    children: [
      { index: true, element: <Navigate to="/portal/profile" replace /> },
      { path: 'profile', element: <MyProfilePage /> },
      { path: 'submit-application', element: <SubmitApplicationPage /> },
      { path: 'my-applications', element: <MyApplicationsPage /> },
      { path: 'appointments', element: <AppointmentsPage /> },
      { path: 'my-licenses', element: <MyLicensesPage /> },
      { path: 'notifications', element: <NotificationsPage /> },
    ],
  },

  // Catch-all route -> redirect to home
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

export default router;
