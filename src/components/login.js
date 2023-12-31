import React, { useState, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useRouter } from 'next/router';

function Login() {
  const [email, setEmail] = useState('');
  const [workspaceId, setWorkspaceID] = useState('');
  const [password, setPassword] = useState('');
  const [apiUrl, setApiUrl] = useState('');
  const [arenaSessionId, setArenaSessionId] = useState('');
  const [error, setError] = useState(null);
  const passwordInputRef = useRef(null);
  const sessionIDInputRef = useRef(null);
  const router = useRouter();

  const [getNewSessionId, setGetNewSessionId] = useState(true);

  useEffect(() => {
    axios
      .post('/api/arenaenv', {})
      .then((response) => {
        const env = response.data.result;
        if ('API_URL' in env) {
          setEmail(env.API_EMAIL || '');
          setWorkspaceID(env.API_WORKSPACEID || '');
          setPassword(env.API_PASSWORD || '');
          setApiUrl(env.API_URL || '');
        }
      })
      .catch((error) => {
        console.error(error);
      });

    sessionIDInputRef.current.blur();


   
  }, []);

  const handleSignIn = () => {

    if (!email || !password || !workspaceId || !apiUrl) {
      return;
    }
  
    setError(null);
  
    axios
      .post('/api/arenalogin', {
        email: email,
        password: password,
        workspaceId: workspaceId,
        apiUrl: apiUrl,
      })
      .then((response) => {
        if (response.status === 400) {
          setError(response.data.errors[0].message);
          return;
        }

        const sessionId = response.data.arenaSessionId;
        setArenaSessionId(sessionId);
  
        router.push({
          pathname: '/home',
          query: {
            arenaSessionId: sessionId,
            email: email,
          },
        });

      })
      .catch((error) => {
        console.error(`POST /login error:`, error);
        setError('email or password invalid please try again');
        passwordInputRef.current.focus();
      });
  };
  
  return (
    <Box
      component="form"
      sx={{
        paddingTop: '50px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > :not(style)': {
          m: 1,
          width: '40ch',
        },
      }}
      noValidate
      autoComplete="off"
    >
      <div style={{ width: '80%', textAlign: 'center' }}>

      <img src="/assets/logos/ptc2.svg" alt="" style={{ maxWidth: "100%", height: "auto" }} />

      </div>
      <h2 className="h4 mb-3 fw-normal text-custom" style={{ textAlign: 'center' }}>
        FTLDP 2023 - US Team 5
      </h2>
      <TextField
        id="apiUrl"
        label="API URL"
        variant="filled"
        value={apiUrl}
        onChange={(e) => setApiUrl(e.target.value)}
        required
      />
      <TextField
        id="email"
        label="Email address"
        variant="filled"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="email"
      />
      <TextField
        id="password"
        label="Password"
        type="password"
        autoComplete="current-password" 
        variant="filled"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        inputRef={passwordInputRef}
      />
      <TextField
        id="workspaceId"
        label="Workspace ID"
        variant="filled"
        value={workspaceId}
        onChange={(e) => setWorkspaceID(e.target.value)}
        required
      />
      <TextField
        id="sessionId"
        label="Session ID"
        variant="filled"
        value={arenaSessionId}
        InputProps={{
          readOnly: true,
          ref: sessionIDInputRef,
        }}
      />
      <div className="form-check text-start my-3">
        <input
          className="form-check-input"
          type="checkbox"
          checked={getNewSessionId}
          onChange={(e) => setGetNewSessionId(e.target.checked)}
          id="getNewSessionId"
        />
        <label className="form-check-label" htmlFor="getNewSessionId">
          Get New Session ID
        </label>
        {error && <div className="error" style={{ color: 'red' }}>{error}</div>}
      </div>
      <Button
        id="signInButton"
        variant="contained"
        style={{ paddingTop: '10px', paddingBottom: '10px', backgroundColor: '#6ebe4c', color: 'white' }}
        onClick={handleSignIn}
      >
        Sign in
      </Button>
    </Box>
  );
}

export default Login;
