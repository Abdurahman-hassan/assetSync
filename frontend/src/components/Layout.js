import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import "../styles/Layout.css";

const Layout = ({children}) => {

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(false);
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, [children]);

    return (
        <div className="layout">
            <Sidebar/>
            <main className={`main-content ${isLoaded ? "loaded" : ""}`}>
                {children}
            </main>
        </div>
    )
}

export default Layout;
