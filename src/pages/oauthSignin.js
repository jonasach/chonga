// src/pages/api/oauthSignin.js
import { v4 as uuidv4 } from 'uuid';
import passport from 'passport';

export default (req, res) => {
  if (req.method === 'GET') {
    const state = {
      docId: req.query.documentId,
      workId: req.query.workspaceId,
      elId: req.query.elementId,
    };
    req.session.state = state;
    passport.authenticate('onshape', { state: uuidv4(state) })(req, res);
  } else {
    res.statusCode = 405;
    res.end();
  }
};
