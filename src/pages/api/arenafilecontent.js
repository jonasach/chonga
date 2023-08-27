import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const { guid } = req.query; // Extract the guid from query parameters

  if (!guid) {
    res.status(400).json({ message: 'GUID is required' });
    return;
  }

  const arenaSessionId = req.headers['arena-session-id'];

  if (!arenaSessionId) {
    res.status(400).json({ message: 'Session ID is required' });
    return;
  }

  // Use the guid in the URL
  const remoteApiUrl = `https://api.arenasolutions.com/v1/files/${guid}/content`;

  try {
    console.log('arenafilecontent:line27:remoteApiUrl', remoteApiUrl)

    const remoteApiResponse = await axios.get(remoteApiUrl, {
      headers: {
        'arena_session_id': arenaSessionId,
      },
      responseType: 'arraybuffer', // this makes sure the response is an ArrayBuffer
    });
  
    if (remoteApiResponse.status !== 200) {
      console.error('Remote API responded with an error:', remoteApiResponse.status, remoteApiResponse.statusText);
      res.status(remoteApiResponse.status).send('Remote API error');
      return;
    }
  
    const buffer = remoteApiResponse.data; // directly access the ArrayBuffer
  
    // Set the headers for returning PDF content
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Length', buffer.length);
  
    // Send the buffer back as a response
    res.status(200).send(buffer);
  
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
  
}
