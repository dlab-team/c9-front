import React from 'react';
import { Header } from '../components';
import { Footer } from '../components';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="container mx-auto">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
