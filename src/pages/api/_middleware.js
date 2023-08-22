import session from 'next-session';

export default session({
  // Your session options here
  secret: 'your-secret-key',
  cookie: {
    // Cookie options
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
});
