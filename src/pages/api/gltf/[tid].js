import fetch from 'node-fetch';
import { forwardRequestToOnshape } from 'src/utils/utils'; // Adjust the path as needed
import { onshapeApiUrl } from 'src/utils/config'; // Adjust the path as needed
import WebhookService from 'src/services/webhook-service'; // Adjust the path as needed

const inMemoryDataStore = {}; // If this needs to be shared between files, consider placing it in a separate module

export default async function handler(req, res) {
  let results = inMemoryDataStore[req.query.tid];
  if (results === null || results === undefined) {
    res.status(404).end();
  } else {
    if ('in-progress' === results) {
      res.status(202).end();
    } else {
      // GLTF data is ready.
      const transResp = await fetch(`${onshapeApiUrl}/translations/${req.query.tid}`, { headers: { 'Authorization': `Bearer ${req.user.accessToken}` } });
      const transJson = await transResp.json();
      if (transJson.requestState === 'FAILED') {
        res.status(500).json({ error: transJson.failureReason });
      } else {
        forwardRequestToOnshape(`${onshapeApiUrl}/documents/d/${transJson.documentId}/externaldata/${transJson.resultExternalDataIds[0]}`, req, res);
      }

      const webhookID = results;
      WebhookService.unregisterWebhook(webhookID, req.user.accessToken)
        .then(() => console.log(`Webhook ${webhookID} unregistered successfully`))
        .catch((err) => console.error(`Failed to unregister webhook ${webhookID}: ${JSON.stringify(err)}`));
      delete inMemoryDataStore[req.query.tid];
    }
  }
}
