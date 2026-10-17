import React from 'react';
import PlaceholderPage from '../../../shared/components/PlaceholderPage.jsx';

export const NewsPage = () => {
  return (
    <PlaceholderPage
      title="News & Articles"
      member="Member 2"
      section="Public Website"
      route="/news"
      description="Official news updates, traffic regulations announcements, driving safety tips, and operational department updates."
      mockEndpoints={['GET /api/news']}
    />
  );
};

export default NewsPage;
