import React from 'react';
import PlaceholderPage from '../../../shared/components/PlaceholderPage.jsx';

export const AppointmentsPage = () => {
  return (
    <PlaceholderPage
      title="My Appointments & Bookings"
      member="Member 7"
      section="User Portal"
      route="/portal/appointments"
      description="Book new vision, theory, or practical driving tests, view scheduled dates, and download appointment appointment slips."
      mockEndpoints={['GET /api/portal/appointments/my-appointments', 'POST /api/portal/appointments/book']}
    />
  );
};

export default AppointmentsPage;
