import React from 'react';
import PlaceholderPage from '../../../shared/components/PlaceholderPage.jsx';

export const LicenseClassesPage = () => {
  return (
    <PlaceholderPage
      title="License Classes"
      member="Member 2"
      section="Public Website"
      route="/license-classes"
      description="Detailed catalog of the 7 driving license categories, eligibility criteria, minimum age requirements, validity periods, and issuance fees."
      mockEndpoints={['GET /api/license-classes']}
    />
  );
};

export default LicenseClassesPage;
