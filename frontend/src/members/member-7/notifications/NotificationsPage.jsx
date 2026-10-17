import React from 'react';
import PlaceholderPage from '../../../shared/components/PlaceholderPage.jsx';

export const NotificationsPage = () => {
  return (
    <PlaceholderPage
      title="Notifications & Alerts"
      member="Member 7"
      section="User Portal"
      route="/portal/notifications"
      description="View appointment reminders, application approval updates, test result alerts, and official department notices."
      mockEndpoints={['GET /api/portal/notifications', 'PATCH /api/portal/notifications/:id/read']}
    />
  );
};

export default NotificationsPage;
