import React from 'react';
import PlaceholderPage from '../../../shared/components/PlaceholderPage.jsx';

export const MyLicensesPage = () => {
  return (
    <PlaceholderPage
      title="My Licenses & Digital ID"
      member="Member 7"
      section="User Portal"
      route="/portal/my-licenses"
      description="View issued digital driving licenses, validity status, QR verification codes, class permissions, and endorsement records."
      mockEndpoints={['GET /api/portal/licenses/my-licenses']}
    />
  );
};

export default MyLicensesPage;
