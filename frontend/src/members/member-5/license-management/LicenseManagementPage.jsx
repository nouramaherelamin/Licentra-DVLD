import React from 'react';
import PlaceholderPage from '../../../shared/components/PlaceholderPage.jsx';

export const LicenseManagementPage = () => {
  return (
    <PlaceholderPage
      title="License Management"
      member="Member 5"
      section="Admin Dashboard"
      route="/admin/licenses"
      description="Manage issued licenses, validity checks, license suspensions, detentions, fine settlements, and international permit verifications."
      mockEndpoints={['GET /api/admin/licenses', 'POST /api/admin/licenses/:id/detain']}
    />
  );
};

export default LicenseManagementPage;
