import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AppRoute from "./Routes/AppRoutes";
import { ClientId } from "./Base/Base";
import { AuthProvider } from "./Context/Auth";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    <GoogleOAuthProvider clientId={ClientId}>
      <AuthProvider>
        <AppRoute />
      </AuthProvider>
    </GoogleOAuthProvider>
    </>
  );
}

export default App;
