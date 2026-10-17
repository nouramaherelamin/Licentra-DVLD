import React from 'react';
import PlaceholderPage from '../../../shared/components/PlaceholderPage.jsx';

export const HomePage = () => {
  return (
    <PlaceholderPage
      title="Public Home"
      member="Member 1"
      section="Public Website"
      route="/"
      description="Landing page showcasing hero banner, driving services shortcuts, how it works, and testimonials."
      mockEndpoints={['/api/services', '/api/license-classes', '/api/news']}
    />
  );
};

export default HomePage;
