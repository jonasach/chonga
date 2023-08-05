export default async function handler(req, res) {
    if (req.method !== 'POST') {
      res.status(405).json({ message: 'Method not allowed' });
      return;
    }
  
    const { email, password, workspaceId } = req.body;
  
    // Now make the remote API call with the required parameters (email, password, workspaceId)
  
    const remoteApiResponse = await fetch('https://api.arenasolutions.com/v1/login', {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, workspaceId }),
    });
  
    const data = await remoteApiResponse.json();

console.log(data)

    res.status(200).json(data);
  }
  