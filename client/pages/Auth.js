import * as React from 'react'
import Card from '@mui/material/Card';

import Login from '../components/Login'
import Registration from '../components/Registration'

function Auth({ logIn = () => {} }) {
  const [showRegister, setShowRegister] = React.useState(false)
  return (
      <div className="auth-container bg-secondary">
        <Card sx={{ maxWidth: 550, minHeight: 500, mt: 4 }}>
        {
          showRegister ? 
          <Registration setShowRegister={setShowRegister} />
          :
          <Login setShowRegister={setShowRegister} />
        }
        </Card>
      </div>
  )
}

export default Auth
