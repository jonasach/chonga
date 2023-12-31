export default async function handler(req, res) {

  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const arenaSessionId = req.headers['arena-session-id']; 
  const endpointName = req.query.endpoint; 
  const guid = req.query.guid; // Extract the guid from query parameters

  if (!guid) {
    res.status(400).json({ message: 'GUID is required' });
    return;
  }

  if (!arenaSessionId || !endpointName) {
    res.status(400).json({ message: 'arena2.get:Session ID and endpoint name are required' });
    return;
  }

  // Construct the URL based on the endpoint name
  const remoteApiUrl = `https://api.arenasolutions.com/v1/${endpointName}/${guid}`;

  // Call the remote API endpoint, passing the session ID as a header
  const remoteApiResponse = await fetch(remoteApiUrl, {
    method: 'GET', // Assuming it's a GET request
    headers: {
      'arena_session_id': arenaSessionId, // Passing the session ID as a header
    },
  });

  const data = await remoteApiResponse.json();
  res.status(200).json(data);
}
