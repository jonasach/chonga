import passport from 'passport';

export default function handler(req, res) {
  passport.authenticate('onshape', (err, user, info) => {
    if (err || !user) {
      // Redirect to a failure page if authentication fails
      return res.redirect('/grantDenied');
    }
    
    req.logIn(user, (err) => {
      if (err) {
        // Handle login error
        return res.redirect('/grantDenied');
      }
      
      // Redirect to the main page with query parameters
      res.redirect(`/?documentId=${req.session.state.docId}&workspaceId=${req.session.state.workId}&elementId=${req.session.state.elId}`);
    });
  })(req, res);
}
