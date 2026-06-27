import { BrowserRouter, Route, Routes } from "react-router-dom";

import { HomePage } from '../pages/HomePage'
import { LoginPage } from '../pages/LoginPage'
import { Profile } from '../pages/Profile'
import { Register } from "../pages/Register";
import { NavbarApp } from "../components/NavbarApp";

function AppRoutes(){

    return (
    <BrowserRouter>
    <NavbarApp />
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
         {/*<Route path="/post/:id" element={<PostDetail />} />
        <Route path="/new-post" element={<NewPost />} />*/}
    </Routes>
    </BrowserRouter>
    )
}



export default AppRoutes 