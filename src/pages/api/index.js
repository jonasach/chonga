import { refreshAccessToken } from './oauthRefresh';
import path from 'path';

export default async function handler(req, res) {
  if (!req.user) {
    console.log("No user logged in");
    return res.redirect(`/oauthSignin${req._parsedUrl.search ? req._parsedUrl.search : ""}`);
  } else {
    refreshAccessToken(req.user).then((tokenJson) => {
      console.log("User is logged in, refreshing token");
      let usrObj = JSON.parse(JSON.stringify(req.user));
      usrObj.accessToken = tokenJson.access_token;
      usrObj.refreshToken = tokenJson.refresh_token;
      req.login(usrObj, () => {
        console.log("Refresh token success");
        return res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
      });
    }).catch(() => {
      return res.redirect(`/oauthSignin${req._parsedUrl.search ? req._parsedUrl.search : ""}`);
    });
  }
}
