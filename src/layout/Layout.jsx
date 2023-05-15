import React from 'react';
import { Header } from '../components';
import { Footer } from '../components';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow flex justify-center mb-10" style={{ width: '100%' }}>{children}</main>
    {/* se ajusta el layout para que el footer no tape el contenido y se ubiquen de manera central los componentes */}
    <Footer />
  </div>
  );
};



export default Layout;
