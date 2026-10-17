import React from 'react';
import PlaceholderPage from '../../../shared/components/PlaceholderPage.jsx';

export const SubmitApplicationPage = () => {
  return (
    <PlaceholderPage
      title="Submit Application"
      member="Member 6"
      section="User Portal"
      route="/portal/submit-application"
      description="Multi-step wizard to apply for new licenses, renewals, replacements, or international driving permits."
      mockEndpoints={['POST /api/portal/applications/submit', 'GET /api/license-classes', 'GET /api/services']}
    />
  );
};

export default SubmitApplicationPage;
