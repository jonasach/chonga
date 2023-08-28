export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const { email, password, workspaceId } = req.body;

  const remoteApiResponse = await fetch('https://api.arenasolutions.com/v1/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, workspaceId }),
  });

//  console.log("arenalogin.js:line 18:arenaSessionId:", JSON.stringify({ email, password, workspaceId }))
  const data = await remoteApiResponse.json();
//  console.log("arenalogin.js:line 20:arenaSessionId:", remoteApiResponse)
//  console.log("arenalogin.js:line 20:arenaSessionId:", remoteApiResponse.json())

  // Check if the status is 400 and handle the error response
  if (remoteApiResponse.status === 400) {
    // Here you can extract the error details if you need to, or simply pass them through
    const errorResponse = {
      status: 400,
      errors: [
        {
          code: 4001,
          message: "The username, password or workspace ID is not valid or you are not allowed to log in due to IP restriction.",
        }
      ],
    };

    res.status(400).json(errorResponse);
    return;
  }


  res.status(200).json(data);
}