import React from 'react';
import {Redirect} from "react-router-dom";

function ProtectedPath({children}) {
    let expires_at = localStorage.getItem('expires_at');
    expires_at = new Date(expires_at).getTime();
    const token = localStorage.getItem('token');
    const currentTime = new Date().getTime();

    if (expires_at <= currentTime || !expires_at || !token) {
        localStorage.clear();
        return <Redirect to='/'/>
    }

    return children;
}

export default ProtectedPath;