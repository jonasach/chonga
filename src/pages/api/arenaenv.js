export default function handler(req, res) {
  if (req.method !== 'POST') {
    console.log('Request method not allowed: ' + req.method);
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }


  const result = {
    API_URL: process.env.API_URL,
    API_EMAIL: process.env.API_EMAIL,
    API_WORKSPACEID: process.env.API_WORKSPACEID,
  };

  res.status(200).json({ result });
}
