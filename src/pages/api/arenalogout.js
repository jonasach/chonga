

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

 
  const arenaSessionId = req.headers['arena-session-id']; 
  
  const remoteApiResponse = await fetch('https://api.arenasolutions.com/v1/logout', {
    method: 'PUT', // Assuming it's a GET request
    headers: {
      'arena_session_id': arenaSessionId, // Passing the session ID as a header
    }
  });

  const data = await remoteApiResponse.json();

  // Check if the status is 400 and handle the error response
  if (remoteApiResponse.status === 400) {
    // Here you can extract the error details if you need to, or simply pass them through
    const errorResponse = {
      status: 400,
      errors: [
        {
          code: 4001,
          message: "Error.",
        }
      ],
    };

    res.status(400).json(errorResponse);
    return;
  }

  res.status(200).json(data);
}
