export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const arenaSessionId = req.headers['arena-session-id']; 
  const endpointName = req.query.endpoint; 

  if (!arenaSessionId || !endpointName) {
    res.status(400).json({ message: 'arena2.get:Session ID and endpoint name are required' });
    return;
  }

console.log("arenaget.js:arenaSessionId", arenaSessionId)
console.log("arenaget.js:endpointName", req.query.endpoint)


  // Construct the URL based on the endpoint name
  const remoteApiUrl = `https://api.arenasolutions.com/v1/${endpointName}`;
 
console.log('arenaget.remoteApiUrl', remoteApiUrl)
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
