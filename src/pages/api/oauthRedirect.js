import path from 'path';

const sendGrantDeniedFile = (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'html', 'grantDenied.html'));
};

export default sendGrantDeniedFile;
