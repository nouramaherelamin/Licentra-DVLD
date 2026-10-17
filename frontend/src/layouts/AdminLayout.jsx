import React from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
import './Layouts.css';

export const AdminLayout = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <Link to="/admin" className="brand-container">
            <div className="brand-icon">L</div>
            <div>
              <div className="brand-title" style={{ color: '#FFFFFF' }}>Licentra</div>
              <div className="brand-subtitle" style={{ color: '#94A3B8' }}>Admin Center</div>
            </div>
          </Link>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/admin" end className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            📊 Overview &amp; Statistics
          </NavLink>
          <NavLink to="/admin/people" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            👥 People Management
          </NavLink>
          <NavLink to="/admin/applications" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            📄 Applications Management
          </NavLink>
          <NavLink to="/admin/licenses" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            🪪 License Management
          </NavLink>
          <NavLink to="/admin/tests-appointments" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            📅 Tests &amp; Appointments
          </NavLink>
          <NavLink to="/admin/reports-settings" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            ⚙️ Reports &amp; Settings
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <Link to="/" style={{ color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            &larr; Back to Public Website
          </Link>
        </div>
      </aside>

      {/* Main Admin Area */}
      <div className="dashboard-main">
        {/* Development Security Warning Banner */}
        <div className="dev-security-banner" role="alert">
          <div>
            <span className="security-tag" style={{ marginRight: '0.5rem' }}>Dev Mode Guard</span>
            <span><strong>Mock Identity Active (System Administrator):</strong> Unauthenticated prototype console. <strong>Do NOT process or store real citizen records.</strong></span>
          </div>
          <span style={{ fontSize: '0.75rem', opacity: 0.9 }}>Phase 1 Development Prototype</span>
        </div>

        <header className="dashboard-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '1.125rem', fontWeight: '700', color: '#0F172A' }}>
              Licentra Operations Console
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <span style={{ fontSize: '0.875rem', color: '#64748B' }}>
              Tue, 15 Oct 2024
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#DC2626', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.875rem' }}>
                A
              </div>
              <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>System Administrator</span>
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

export default AdminLayout;
