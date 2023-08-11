// pages/api/home.js
import { refreshAccessToken } from 'src/utils/utils';

export default async (req, res) => {
  if (!req.user) {
    return res.redirect(`/oauthSignin${req.query ? `?${req.query}` : ''}`);
  } else {
    try {
      const tokenJson = await refreshAccessToken(req.user);
      const usrObj = { ...req.user };
      usrObj.accessToken = tokenJson.access_token;
      usrObj.refreshToken = tokenJson.refresh_token;


      return res.sendFile(path.join(__dirname, '..', '..', 'public', 'html', 'index.html'));
    } catch (error) {
      return res.redirect(`/oauthSignin${req.query ? `?${req.query}` : ''}`);
    }
  }
};
