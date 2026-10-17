import React from 'react';
import PlaceholderPage from '../../../shared/components/PlaceholderPage.jsx';

export const PeopleManagementPage = () => {
  return (
    <PlaceholderPage
      title="People Management"
      member="Member 4"
      section="Admin Dashboard"
      route="/admin/people"
      description="Manage citizen and driver registries, national identity verification, contact profiles, and civilian records."
      mockEndpoints={['GET /api/admin/people', 'GET /api/admin/people/:id', 'POST /api/admin/people']}
    />
  );
};

export default PeopleManagementPage;
