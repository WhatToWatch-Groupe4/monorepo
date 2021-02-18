import logo from "../assets/logo.svg";
import clapperboard from "../assets/icons/clapperboard.png";
import clock from "../assets/icons/clock.png";
import binoculars from "../assets/icons/binoculars.png";
import React from "react";

function SideMenu() {
    return (
        <div className="w-32 bg-black-20 h-screen fixed">
            <img src={logo} alt="logo" className="p-6" />
            <div className="h-0.5 bg-white opacity-40 w-16 m-auto my-4"/>
            <div className="menu">
                <img src={clapperboard} alt="logo" className="m-auto px-11 py-6 opacity-50 hover:opacity-100 cursor-pointer" />
                <img src={clock} alt="logo" className="m-auto px-11 py-6 opacity-50 hover:opacity-100 cursor-pointer" />
                <img src={binoculars} alt="logo" className="m-auto px-11 py-6 opacity-50 hover:opacity-100 cursor-pointer" />
            </div>
        </div>
    );
}

export default SideMenu;
