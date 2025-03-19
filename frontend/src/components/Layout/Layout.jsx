import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import "./Layout.css";
import Footer from "../Footer/Footer";

const Layout = () => {
  return (
    <div className="layout-container">
      <div className="inner-layout">
        <Header />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
