import React from 'react';
import PlaceholderPage from '../../../shared/components/PlaceholderPage.jsx';

export const ServicesPage = () => {
  return (
    <PlaceholderPage
      title="Driving License Services"
      member="Member 2"
      section="Public Website"
      route="/services"
      description="Overview of all citizen driving services: first license, renewal, lost replacement, international permit, and detained license release."
      mockEndpoints={['GET /api/services', 'GET /api/services/:id']}
    />
  );
};

export default ServicesPage;
