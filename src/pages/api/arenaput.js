export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const arenaSessionId = req.headers['arena-session-id'];
  const endpointName = req.query.endpoint;

  console.log("arenaput.js:endpointName", endpointName)

  if (!arenaSessionId || !endpointName) {
    res.status(400).json({ message: 'Session ID and endpoint name are required' });
    return;
  }

  // Get the request body with updated form data
  const updatedFormData = req.body; // Make sure this matches the structure of your form data

  // Construct the URL based on the endpoint name
  const remoteApiUrl = `https://api.arenasolutions.com/v1/${endpointName}`;

console.log("arenaput.js:remoteApiUrl", remoteApiUrl)


  try {
    // Call the remote API endpoint with the updated data
    const remoteApiResponse = await fetch(remoteApiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'arena_session_id': arenaSessionId,
      },
      body: JSON.stringify(updatedFormData), // Send the updated form data as the request body
    });

    const data = await remoteApiResponse.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error updating form data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
