export default function handler(req, res) {
  passport.authenticate('onshape', (err, user, info) => {
    if (err || !user) {
      return res.redirect('/html/grantDenied');
    }
    // rest of the code
  })(req, res);
}
