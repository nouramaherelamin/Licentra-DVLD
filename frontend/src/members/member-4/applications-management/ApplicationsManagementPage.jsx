import React from 'react';
import PlaceholderPage from '../../../shared/components/PlaceholderPage.jsx';

export const ApplicationsManagementPage = () => {
  return (
    <PlaceholderPage
      title="Applications Management"
      member="Member 4"
      section="Admin Dashboard"
      route="/admin/applications"
      description="Review, approve, reject, and update applicant submissions across all license classes and application types."
      mockEndpoints={['GET /api/admin/applications', 'PATCH /api/admin/applications/:id/status']}
    />
  );
};

export default ApplicationsManagementPage;
