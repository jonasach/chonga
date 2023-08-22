// pages/api/grantDenied.js
const path = require('path');

export default (req, res) => {
   res.sendFile(path.join(process.cwd(), 'public', 'html', 'grantDenied.html'));
};

