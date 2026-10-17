import React from 'react';
import PlaceholderPage from '../../../shared/components/PlaceholderPage.jsx';

export const TestsAppointmentsPage = () => {
  return (
    <PlaceholderPage
      title="Tests & Appointments"
      member="Member 5"
      section="Admin Dashboard"
      route="/admin/tests-appointments"
      description="Administrative calendar for vision, theory, and practical driving test appointments, slot capacities, and examiner score entry."
      mockEndpoints={['GET /api/admin/tests/appointments', 'POST /api/admin/tests/appointments/:id/result']}
    />
  );
};

export default TestsAppointmentsPage;
