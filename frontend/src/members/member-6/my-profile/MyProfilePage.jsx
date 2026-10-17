import React from 'react';
import PlaceholderPage from '../../../shared/components/PlaceholderPage.jsx';

export const MyProfilePage = () => {
  return (
    <PlaceholderPage
      title="My Profile"
      member="Member 6"
      section="User Portal"
      route="/portal/profile"
      description="Manage personal civilian details, national ID, uploaded documents (medical certificate, address proof), and contact information."
      mockEndpoints={['GET /api/portal/profile/me', 'PUT /api/portal/profile/me']}
    />
  );
};

export default MyProfilePage;
