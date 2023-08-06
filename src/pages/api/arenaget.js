export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const sessionId = req.headers['arena_session_id'];
  const endpointName = req.query.endpoint; // Retrieve endpoint name from query

  if (!sessionId || !endpointName) {
    res.status(400).json({ message: 'Session ID and endpoint name are required' });
    return;
  }

  // Construct the URL based on the endpoint name
  const remoteApiUrl = `https://api.arenasolutions.com/v1/${endpointName}`;

console.log(remoteApiUrl)

  // Call the remote API endpoint, passing the session ID as a header
  const remoteApiResponse = await fetch(remoteApiUrl, {
    method: 'GET', // Assuming it's a GET request
    headers: {
      'arena_session_id': sessionId, // Passing the session ID as a header
    },
  });

  const data = await remoteApiResponse.json();
  console.log(data);
  res.status(200).json(data);
}
