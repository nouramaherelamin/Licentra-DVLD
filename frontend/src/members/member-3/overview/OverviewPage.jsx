import React from 'react';
import PlaceholderPage from '../../../shared/components/PlaceholderPage.jsx';

export const OverviewPage = () => {
  return (
    <PlaceholderPage
      title="Admin Overview & Statistics"
      member="Member 3"
      section="Admin Dashboard"
      route="/admin"
      description="Executive KPI dashboard tracking total applications, issued licenses, scheduled tests, pass rates, and license class distribution."
      mockEndpoints={['GET /api/admin/analytics/overview']}
    />
  );
};

export default OverviewPage;
