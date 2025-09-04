import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AppRoute from "./Routes/AppRoutes";
import { ClientId } from "./Base/Base";
import { AuthProvider } from "./Context/Auth";

function App() {
  return (
    <GoogleOAuthProvider clientId={ClientId}>
      <AuthProvider>
        <AppRoute />
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
