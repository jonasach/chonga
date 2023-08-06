export default function handler(req, res) {
  if (req.method !== 'POST') {
    console.log('Request method not allowed: ' + req.method);
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }


  const result = {
    API_URL: process.env.ARENA_API_URL,
    API_EMAIL: process.env.ARENA_API_EMAIL,
    API_WORKSPACEID: process.env.ARENA_API_WORKSPACEID,
  };

  res.status(200).json({ result });
}
