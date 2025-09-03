import React from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google';
import AppRoute from './Routes/AppRoutes'
import { ClientId } from './Base/Base'

function App() {
  return (
    <GoogleOAuthProvider clientId={ClientId}>
      <AppRoute/>
    </GoogleOAuthProvider>
  )
}

export default App