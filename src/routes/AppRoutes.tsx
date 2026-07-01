import { BrowserRouter, Route, Routes } from "react-router-dom";

import { HomePage } from '../pages/HomePage'
import { LoginPage } from '../pages/LoginPage'
import { Profile } from '../pages/Profile'
import { Register } from "../pages/Register";
import { NavbarApp } from "../components/NavbarApp";
import ProtectedRoute from "../components/ProtectedRoute";
import {NewPost} from '../pages/NewPost';
import {FeedPage} from "../pages/FeedPage";
import PostDetail from "../pages/PostDetail";

function AppRoutes(){

    return (
    <BrowserRouter>
    <NavbarApp />
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />

        <Route path="/feed" element= {
            <ProtectedRoute>
                <FeedPage />
            </ProtectedRoute>
        } />

        <Route path="/profile" element={
            <ProtectedRoute>
                <Profile />
            </ProtectedRoute>} />
        
        <Route path="/new-post" element={
            <ProtectedRoute>
                <NewPost />
            </ProtectedRoute>} />
        <Route path="/post/:id" element={<PostDetail />}/>  
        
    </Routes>
    </BrowserRouter>
    )
}



export default AppRoutes 