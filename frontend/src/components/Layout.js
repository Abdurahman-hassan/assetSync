import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import "../styles/Layout.css";

const Layout = ({children}) => {
    const [contentLoaded, setContentLoaded] = useState(false);

    useEffect(() => {
        setContentLoaded(false);
        const transformTimer = setTimeout(() => {
            setContentLoaded(true);
        }, 50); // Small delay to ensure DOM update

        return () => clearTimeout(transformTimer);
    }, [children]);

    return (
        <div className="layout">
            <Sidebar/>
            <main className={`main-content ${contentLoaded ? "loaded" : ""}`}>
                {children}
            </main>
        </div>
    );
};

export default Layout;