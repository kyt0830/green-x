import { Routes, Route } from "react-router";
import Home from "../routes/Home";
import Auth from "../routes/Auth";
// import { useState } from "react";
import Menu from "./Nav";
import Profile from "../routes/Profile"
const Router = (props) => {
    return (
        <>
            {props.isLoggedIn && <Menu />}
            <Routes>
                {
                    props.isLoggedIn ?
                        <>
                            <Route path="/" element={<Home />} />
                            <Route path="/Profile" element={<Profile />} />
                        </>
                        :
                        <Route path="/" element={<Auth />} />
                }
            </Routes>
        </>

    )
}

export default Router;