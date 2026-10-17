import React from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
import './Layouts.css';

export const PublicLayout = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Top emergency and info bar */}
      <header className="public-topbar">
        <div>
          <span>📞 +20 123 456 7890</span> &nbsp;|&nbsp; <span>✉️ info@licentra.gov.eg</span> &nbsp;|&nbsp; <span>📍 Cairo, Egypt</span>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link to="/portal/profile" style={{ color: '#F87171', fontWeight: 600 }}>
            User Portal
          </Link>
          <span>|</span>
          <Link to="/admin" style={{ color: '#F87171', fontWeight: 600 }}>
            Admin Dashboard
          </Link>
        </div>
      </header>

      {/* Main Navigation Bar */}
      <nav className="public-navbar">
        <Link to="/" className="brand-container">
          <div className="brand-icon">L</div>
          <div>
            <div className="brand-title">Licentra</div>
            <div className="brand-subtitle">Driving &amp; Vehicle License Dept.</div>
          </div>
        </Link>

        <div className="nav-links">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
            Home
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>
            About
          </NavLink>
          <NavLink to="/services" className={({ isActive }) => (isActive ? 'active' : '')}>
            Services
          </NavLink>
          <NavLink to="/license-classes" className={({ isActive }) => (isActive ? 'active' : '')}>
            License Classes
          </NavLink>
          <NavLink to="/driving-tests" className={({ isActive }) => (isActive ? 'active' : '')}>
            Driving Tests
          </NavLink>
          <NavLink to="/news" className={({ isActive }) => (isActive ? 'active' : '')}>
            News
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>
            Contact
          </NavLink>
        </div>

        <div>
          <Link to="/portal/submit-application" className="nav-cta">
            Apply Now &rarr;
          </Link>
        </div>
      </nav>

      {/* Main Page Body */}
      <main style={{ flexGrow: 1 }}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="public-footer">
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.25rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>
              Licentra
            </div>
            <div style={{ maxWidth: '300px', fontSize: '0.875rem' }}>
              Official Driving &amp; Vehicle License Department platform providing fast, secure license issuance, tests, and renewals.
            </div>
          </div>
          <div>
            <div style={{ fontWeight: 700, color: '#FFFFFF', marginBottom: '0.5rem' }}>Quick Navigation</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.875rem' }}>
              <Link to="/">Home</Link>
              <Link to="/services">Services</Link>
              <Link to="/license-classes">License Classes</Link>
              <Link to="/contact">Contact Support</Link>
            </div>
          </div>
          <div>
            <div style={{ fontWeight: 700, color: '#FFFFFF', marginBottom: '0.5rem' }}>Portals</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.875rem' }}>
              <Link to="/portal/profile">Citizen User Portal</Link>
              <Link to="/admin">Admin Dashboard</Link>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #1E293B', marginTop: '2rem', paddingTop: '1.5rem', textAlign: 'center', fontSize: '0.8125rem' }}>
          &copy; {new Date().getFullYear()} Licentra. All rights reserved. Built with Feature-Based Monorepo Architecture.
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
