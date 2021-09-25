import * as React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Login from '../components/Login'
import Registration from '../components/Registration'

function Auth({ logIn = () => {} }) {
  const [showRegister, setShowRegister] = React.useState(false)
  return (
    <div className="auth-container">
      <Card sx={{ maxWidth: 550, minHeight: 500 }}>
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
