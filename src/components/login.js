import React, { useEffect, useState, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useRouter } from 'next/router';


function Login() {
  const [email, setEmail] = useState('');
  const [workspaceId, setWorkspaceID] = useState('');
  const [password, setPassword] = useState('');
  const [sessionId, setSessionID] = useState('');
  const [apiUrl, setApiUrl] = useState(''); // Add this line

  const passwordInputRef = useRef(null);
  const sessionIDInputRef = useRef(null);

  const router = useRouter();


  useEffect(() => {
    axios
      .post('/api/arenaenv', {})
      .then((response) => {
        const env = response.data.result;
        if ('API_URL' in env) {
          setEmail(env.API_EMAIL || '');
          setWorkspaceID(env.API_WORKSPACEID || '');
          setPassword(env.API_PASSWORD || '');
          setApiUrl(env.API_URL || ''); // Add this line
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    sessionIDInputRef.current.blur();
  }, []);

  const handleSignIn = () => {
    if (!email || !password || !workspaceId || !apiUrl) { // Update this line
      return;
    }

    axios
      .post('/api/arenalogin', {
        email: email,
        password: password,
        workspaceId: workspaceId,
        apiUrl: apiUrl, // Add this line
      })
      .then((response) => {
        const sessionId = response.data.arenaSessionId;
        setSessionID(sessionId);
        //sessionIDInputRef.current.focus();

        // Redirect to a new page with the session ID as a query parameter
        router.push({
          pathname: '/LandingPage',
          query: { sessionId }
        });


      })
      .catch((error) => {
        console.error(`POST /login error:`, error);
        passwordInputRef.current.focus();
      });
  };

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > :not(style)': {
          m: 1,
          width: '50ch',
        },
      }}
      noValidate
      autoComplete="off"
    >


<div style={{ width: '100%', textAlign: 'center' }}>
 

        <img className="responsive-image"   
                src="/assets/logos/arena-solutions-login.png" alt="Your description" 
            style={{ 
                maxWidth: '80%', 
                height: 'auto' 
            }}
        />
      </div>

      <h2 className="h4 mb-3 fw-normal text-custom" style={{ textAlign: 'center' }}>RESTAPI Sign In</h2>
      <TextField
        id="apiUrl"
        label="API URL"
        variant="outlined"
        value={apiUrl}
        onChange={(e) => setApiUrl(e.target.value)}
        required
      />
      <TextField
        id="email"
        label="Email address"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="email"
      />
      <TextField
        id="password"
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        inputRef={passwordInputRef}
      />
      <TextField
        id="workspaceId"
        label="Workspace ID"
        variant="outlined"
        value={workspaceId}
        onChange={(e) => setWorkspaceID(e.target.value)}
        required
      />
      <TextField
        id="sessionId"
        label="Session ID"
        variant="outlined"
        value={sessionId}
        InputProps={{
          readOnly: true,
          ref: sessionIDInputRef,
        }}
      />
      <div className="form-check text-start my-3">
        <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
        <label className="form-check-label" htmlFor="flexCheckDefault" style={{ color: 'black' }}>
          Remember me
        </label>
      </div>
      <Button id="signInButton" variant="contained" style=
      {{ 
        paddingTop: '10px', 
        paddingBottom: '10px',
        backgroundColor: '#6ebe4c', 
        color: 'white'
      }} 
      onClick={handleSignIn}>
        Sign in
      </Button>
      <style jsx>{`
  .responsive-image {
    width: 50%; /* this is the default size, it will apply to all screen sizes */
    max-width: 100%; /* ensure the image never stretches beyond its original size */
    padding-top: 50px; /* padding to the top */
  padding-bottom: 20px; /* padding to the bottom */

  }

  @media (min-width: 768px) {
    .responsive-image {
      width: 40%; /* scale down to 40% on medium screens */
    }
  }

  @media (min-width: 1024px) {
    .responsive-image {
      width: 30%; /* scale down to 30% on large screens */
    }
  }
`}</style>




    </Box>
  );
}

export default Login;
