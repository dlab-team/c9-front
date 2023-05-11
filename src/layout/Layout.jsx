import React from "react";
import { Header } from "../components";
import { Footer }  from "../components";

const Layout = ({children}) => {
  return (
    <>
      <Header/>
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
