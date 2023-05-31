import React from 'react';
import { Header } from '../components';
import { Footer } from '../components';
import { Sharedbar } from '../components';

const Layout = ({ children }) => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Sharedbar />
      </div>
    </>
  );
};

export default Layout;
