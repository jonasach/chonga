import React, { useEffect, useState, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import axios from 'axios';
import makeApiCall from './app';

const apiUrl = 'http://localhost:3000';
const endpoint = 'generic';

function LoginForm() {
  // State variables for form fields and other data
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [workspaceId, setWorkspaceID] = useState('');
  const [password, setPassword] = useState('');
  const [sessionId, setSessionID] = useState('');

  // Ref for the password input field
  const passwordInputRef = useRef(null);

  // Ref for the session ID input field
  const sessionIDInputRef = useRef(null);

  // Fetch default environment variables on component mount
  useEffect(() => {
    const apiUrl = 'http://localhost:3000';

    axios
      .post(apiUrl + '/env', {})
      .then((response) => {
        const env = response.data.result;
        if ('API_URL' in env) {
          setUrl(env.API_URL || '');
          setEmail(env.API_EMAIL || '');
          setWorkspaceID(env.API_WORKSPACEID || '');
          setPassword(env.API_PASSWORD || '');
        } else {
          setUrl(window.location.href);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Blur the session ID field on component mount
  useEffect(() => {
    sessionIDInputRef.current.blur();
  }, []);

  // Handle sign-in button click
  const handleSignIn = () => {
    if (!email || !password || !url || !workspaceId) {
      return;
    }
    const apiUrl = url;
    const loginRequestData = {
      apiurl: apiUrl,
      endpoint: 'login',
      method: 'POST',
      body: {
        email: email,
        password: password,
        workspaceId: workspaceId,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    };

    makeApiCall(loginRequestData)
      .then((response) => {
        const sessionId = response.arenaSessionId;
        setSessionID(sessionId);
        sessionIDInputRef.current.focus();
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
      <h2 className="h4 mb-3 fw-normal text-custom">Please sign in</h2>
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
        id="url"
        label="API Url"
        variant="outlined"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
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
        <label className="form-check-label" htmlFor="flexCheckDefault">
          Remember me
        </label>
      </div>
      <Button id="signInButton" variant="contained" onClick={handleSignIn}>
        Sign in
      </Button>
    </Box>
  );
}

export default LoginForm;
