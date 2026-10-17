import React from 'react';
import PlaceholderPage from '../../../shared/components/PlaceholderPage.jsx';

export const ContactPage = () => {
  return (
    <PlaceholderPage
      title="Contact Licentra"
      member="Member 1"
      section="Public Website"
      route="/contact"
      description="Public inquiries form, support hotline, traffic department branch locations, and office working hours."
      mockEndpoints={['POST /api/contact', 'GET /api/contact']}
    />
  );
};

export default ContactPage;
