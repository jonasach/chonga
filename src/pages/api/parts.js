import { forwardRequestToOnshape } from 'src/utils/utils'; // Adjust the path as needed
import { onshapeApiUrl } from 'src/utils/config'; // Adjust the path as needed

export default function handler(req, res) {
  forwardRequestToOnshape(`${onshapeApiUrl}/parts/d/${req.query.documentId}/w/${req.query.workspaceId}`, req, res);
}
