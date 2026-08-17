import { useEffect, useState } from "react";

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
                    <span className="font-lobster">Life</span>
                </a>

                <a href="/" className="navbar-brand-small lg:hidden">
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

                <div className="font-extrabold hidden lg:block text-base leading-none">
                    {currentTime.toLocaleDateString("en-GB", {
                        weekday: "long",
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                    })}
                </div>

                <div className="font-extrabold text-sm lg:hidden leading-none">
                    {currentTime.toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                    })}
                </div>
            </div>

            <div className="navbar-end">
                <a href="/" className="navbar-brand-small">
                    <i className="fas fa-circle-user"></i>
                </a>
            </div>
        </div>
    );
}

export default Navbar;