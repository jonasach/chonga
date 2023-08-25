const path = require('path');

const handleRequest = (req, res) => {
   res.sendFile(path.join(process.cwd(), 'public', 'html', 'grantDenied.html'));
};

export default handleRequest;
