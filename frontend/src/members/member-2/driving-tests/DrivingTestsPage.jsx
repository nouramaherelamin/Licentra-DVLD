import React from 'react';
import PlaceholderPage from '../../../shared/components/PlaceholderPage.jsx';

export const DrivingTestsPage = () => {
  return (
    <PlaceholderPage
      title="Driving Tests Guide"
      member="Member 2"
      section="Public Website"
      route="/driving-tests"
      description="Public guide on mandatory examinations: Vision Test, Traffic Signs & Theory Test, and Street Practical Driving Test."
      mockEndpoints={['GET /api/services/srv-001']}
    />
  );
};

export default DrivingTestsPage;
