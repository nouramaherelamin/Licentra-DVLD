import React from 'react';
import PlaceholderPage from '../../../shared/components/PlaceholderPage.jsx';

export const AboutPage = () => {
  return (
    <PlaceholderPage
      title="About Licentra"
      member="Member 1"
      section="Public Website"
      route="/about"
      description="Department mission, vision, values, road safety objectives, and history of licensing operations."
      mockEndpoints={['/api/health']}
    />
  );
};

export default AboutPage;
