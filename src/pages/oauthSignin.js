//import { v4 as uuidv4 } from 'uuid';
//import passport from 'passport';

const handleOauthSignin = (req) => {
  if (req.method === 'GET') {
    const state = {
      docId: req.query.documentId,
      workId: req.query.workspaceId,
      elId: req.query.elementId,
    };
    req.session.state = state;

    // Uncomment below line if you want to use passport and uuidv4
    // passport.authenticate('onshape', { state: uuidv4() })(req, res);
  } 
  // Uncomment the below lines if you want to handle methods other than GET
  /*
  else {
    res.statusCode = 405;
    res.end();
  }
  */
};

export default handleOauthSignin;
