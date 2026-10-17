import React from 'react';
import PlaceholderPage from '../../../shared/components/PlaceholderPage.jsx';

export const MyApplicationsPage = () => {
  return (
    <PlaceholderPage
      title="My Applications"
      member="Member 6"
      section="User Portal"
      route="/portal/my-applications"
      description="Track the status of all submitted license applications, review stage progress, and fee payment receipts."
      mockEndpoints={['GET /api/portal/applications/my-applications']}
    />
  );
};

export default MyApplicationsPage;
