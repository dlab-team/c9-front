import React from 'react';
import { Header } from '../components';
import { Footer } from '../components';
import { Sharedbar } from '../components';
import { Chatbox } from '../components';
import { SearchContextProvider } from '../context';

const Layout = ({ children }) => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <SearchContextProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Sharedbar description={'Innova XD '} />
          <Chatbox/> 
        </SearchContextProvider>
      </div>
    </>
  );
};

export default Layout;
