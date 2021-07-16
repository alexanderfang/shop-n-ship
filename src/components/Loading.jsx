import React from 'react';
import { CircularProgress } from '@material-ui/core';

export default function Loading() {
    return (
        <div style={{ height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems:"center", backgroundColor:"rgba(184,184,184,0.8)", position: "absolute", zIndex: 2 }}>
            <CircularProgress 
                variant="determinate"
                size={40}
                thickness={4}
                value={100}
            />
        </div>
    )
}
