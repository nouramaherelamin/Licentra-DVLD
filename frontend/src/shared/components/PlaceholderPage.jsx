import React from 'react';

export const PlaceholderPage = ({
  title,
  member,
  section,
  route,
  description,
  mockEndpoints = [],
}) => {
  return (
    <div style={{ padding: '2rem 1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          padding: '2.5rem',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
          border: '1px solid #E2E8F0',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <span className="badge badge-primary">
            {section || 'Portal'}
          </span>
          <span className="badge badge-info">
            {member || 'Assigned Member'}
          </span>
          <span className="badge badge-success">
            Architecture Ready
          </span>
        </div>

        <h1 style={{ fontSize: '1.875rem', fontWeight: '700', color: '#0F172A', marginBottom: '0.5rem' }}>
          {title}
        </h1>

        <p style={{ color: '#64748B', fontSize: '1rem', marginBottom: '1.5rem' }}>
          {description || `Placeholder view for ${title}. Ready for feature-level development.`}
        </p>

        <div
          style={{
            backgroundColor: '#F8FAFC',
            borderRadius: '12px',
            padding: '1.25rem',
            border: '1px dashed #CBD5E1',
            marginBottom: '1.5rem',
          }}
        >
          <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#475569', marginBottom: '0.5rem' }}>
            Routing & Ownership Details:
          </div>
          <ul style={{ listStyleType: 'none', padding: 0, fontSize: '0.875rem', color: '#334155' }}>
            <li style={{ marginBottom: '0.35rem' }}>
              <strong>Route Path:</strong> <code>{route}</code>
            </li>
            <li style={{ marginBottom: '0.35rem' }}>
              <strong>Owner Folder:</strong> <code>frontend/src/members/{member.toLowerCase().replace(' ', '-')}/</code>
            </li>
            {mockEndpoints.length > 0 && (
              <li>
                <strong>Associated API Endpoints:</strong>
                <div style={{ marginTop: '0.25rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {mockEndpoints.map((ep, idx) => (
                    <code key={idx} style={{ background: '#E2E8F0', padding: '0.15rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}>
                      {ep}
                    </code>
                  ))}
                </div>
              </li>
            )}
          </ul>
        </div>

        <div style={{ fontSize: '0.875rem', color: '#94A3B8' }}>
          Note: This page is an isolated architecture placeholder. Team members can build UI components, hooks, and sub-views within their member folder without modifying other members' features.
        </div>
      </div>
    </div>
  );
};

export default PlaceholderPage;
