import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="navbar sticky top-4 z-10 section-wrapper lg:px-4">
            <div className="navbar-start">
                <a href="/" className="navbar-brand hidden lg:block">
                    <span className="font-fascinate">MOMENTUM</span>
                    <i className="fas fa-caret-right"></i>
                    <span className="font-modak">Life</span>
                </a>

                <a href="/" className="navbar-brand lg:hidden">
                    <i className="fa-brands fa-files-pinwheel"></i>
                </a>
            </div>

            <div className="absolute left-1/2 -translate-x-1/2 flex flex-col text-center">
                <div className="font-extrabold text-sm lg:text-base leading-none">
                    {currentTime.toLocaleTimeString("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </div>

                <div className="font-extrabold hidden lg:block text-sm">
                    {currentTime.toLocaleDateString("en-GB", {
                        weekday: "long",
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                    })}
                </div>

                <div className="font-extrabold text-xs lg:text-sm lg:hidden">
                    {currentTime.toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                    })}
                </div>
            </div>

            <div className="navbar-end">
                <div className="dropdown dropdown-end">
                    <div
                        tabIndex={0}
                        role="button"
                        className="navbar-brand cursor-pointer"
                    >
                        <i className="fas fa-bars"></i>
                    </div>

                    <ul
                        tabIndex="-1"
                        className="dropdown-content menu dropdown-wrapper"
                    >
                        <div className="space-y-0.5">
                            <li className="menu-title">
                                <div className="flex items-center gap-2">
                                    <hr className="border w-full" />
                                    <span>PAGES</span>
                                    <hr className="border w-full" />
                                </div>
                            </li>
                            <li className="dropdown-item-wrapper">
                                <Link to="/">
                                    <i className="fas fa-house"></i>
                                    Dashboard
                                </Link>
                            </li>

                            <li className="dropdown-item-wrapper">
                                <Link to="/actions">
                                    <i className="fas fa-list-check"></i>
                                    Action Library
                                </Link>
                            </li>

                            <li className="dropdown-item-wrapper">
                                <Link to="/templates">
                                    <i className="fas fa-calendar-days"></i>
                                    Plan Templates
                                </Link>
                            </li>

                            <li className="dropdown-item-wrapper">
                                <Link to="/">
                                    <i className="fas fa-clock-rotate-left"></i>
                                    History
                                </Link>
                            </li>

                            <li className="dropdown-item-wrapper">
                                <Link to="/">
                                    <i className="fas fa-chart-column"></i>
                                    Statistics
                                </Link>
                            </li>
                        </div>

                        <div className="space-y-0.5">
                            <li className="menu-title">
                                <div className="flex items-center gap-2">
                                    <hr className="border w-full" />
                                    <span>MORE</span>
                                    <hr className="border w-full" />
                                </div>
                            </li>

                            <li className="dropdown-item-wrapper">
                                <Link to="/">
                                    <i className="fas fa-gear"></i>
                                    Settings
                                </Link>
                            </li>

                            <li className="dropdown-item-wrapper">
                                <a
                                    onClick={() => {
                                        localStorage.clear();
                                        window.location.reload();
                                    }}
                                >
                                    <i className="fas fa-trash"></i>
                                    Clear Data
                                </a>
                            </li>

                            <li className="dropdown-item-wrapper">
                                <Link to="/">
                                    <i className="fas fa-circle-info"></i>
                                    About
                                </Link>
                            </li>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Navbar;