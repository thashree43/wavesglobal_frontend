import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AppRoute from "./Routes/AppRoutes";
import { ClientId } from "./Base/Base";
import { AuthProvider } from "./Context/Auth";
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <GoogleOAuthProvider clientId={ClientId}>
      <HelmetProvider>
        <AuthProvider>
          <AppRoute />
        </AuthProvider>
      </HelmetProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
