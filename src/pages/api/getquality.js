export default async function handler(req, res) {
    if (req.method !== 'GET') {
      res.status(405).json({ message: 'Method not allowed' });
      return;
    }
  
    const sessionId = req.headers['arena_session_id'];
  
    if (!sessionId) {
      res.status(400).json({ message: 'Session ID required' });
      return;
    }
  
    console.log ('line 12')
    // Call the remote API endpoint for items, passing the session ID as a header
    const remoteApiResponse = await fetch('https://api.arenasolutions.com/v1/qualityprocesses?template.guid=HZJ27VMR84NJ2L4FZGTM', {
      method: 'GET', // Assuming it's a GET request
      headers: {
        'arena_session_id': sessionId, // Passing the session ID as a header
      },
    });
  

    const data = await remoteApiResponse.json();

  
    console.log (data)
    res.status(200).json(data);
  }
  