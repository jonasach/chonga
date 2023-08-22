// pages/grantDenied.js
import path from 'path';

export default (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'html', 'grantDenied.html'));
};
