import React from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
import './Layouts.css';

export const UserLayout = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <Link to="/portal/profile" className="brand-container">
            <div className="brand-icon">L</div>
            <div>
              <div className="brand-title" style={{ color: '#FFFFFF' }}>Licentra</div>
              <div className="brand-subtitle" style={{ color: '#94A3B8' }}>Citizen Portal</div>
            </div>
          </Link>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/portal/profile" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            👤 My Profile
          </NavLink>
          <NavLink to="/portal/submit-application" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            📝 Submit Application
          </NavLink>
          <NavLink to="/portal/my-applications" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            📑 My Applications
          </NavLink>
          <NavLink to="/portal/appointments" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            📅 Appointments
          </NavLink>
          <NavLink to="/portal/my-licenses" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            🪪 My Licenses
          </NavLink>
          <NavLink to="/portal/notifications" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            🔔 Notifications
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <Link to="/" style={{ color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            &larr; Back to Public Website
          </Link>
        </div>
      </aside>

      {/* Main User Area */}
      <div className="dashboard-main">
        {/* Development Security Warning Banner */}
        <div className="dev-security-banner" role="alert">
          <div>
            <span className="security-tag" style={{ marginRight: '0.5rem' }}>Dev Mode Guard</span>
            <span><strong>Mock Identity Active (Noura Mohamed):</strong> Unauthenticated citizen session. <strong>Do NOT enter or store real personal data.</strong></span>
          </div>
          <span style={{ fontSize: '0.75rem', opacity: 0.9 }}>Phase 1 Development Prototype</span>
        </div>

        <header className="dashboard-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '1.125rem', fontWeight: '700', color: '#0F172A' }}>
              Citizen Self-Service Portal
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#2563EB', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.875rem' }}>
                N
              </div>
              <div>
                <div style={{ fontSize: '0.875rem', fontWeight: '600' }}>Noura Mohamed</div>
                <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Citizen Account</div>
              </div>
            </div>
          </div>
        </header>

        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
