import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';

function Layout() {
  const [backgroundStyle, setBackgroundStyle] = useState(
    'linear-gradient(to right, #1e3c72, #2a5298)' // Default gradient
  );

  return (
    <div
      style={{
        background: backgroundStyle,
        transition: 'background 0.5s ease',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header />
      <Outlet context={{ setBackgroundStyle }} />
      <Footer />
    </div>
  );
}

export default Layout;
