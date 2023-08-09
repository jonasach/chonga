import WebhookService from 'src/services/webhook-service'; // Adjust the path as needed
import TranslationService from 'src/services/translation-service'; // Adjust the path as needed

const inMemoryDataStore = {}; // If this needs to be shared between files, consider placing it in a separate module

export default async function handler(req, res) {
  const did = req.query.documentId,
        wid = req.query.workspaceId,
        gltfElemId = req.query.gltfElementId,
        partId = req.query.partId;
    
  WebhookService.registerWebhook(req.user.accessToken, req.session.passport.user.id, did)
      .catch((err) => console.error(`Failed to register webhook: ${err}`));
    
  const translationParams = {
      documentId: did,
      workspaceId: wid,
      resolution: 'medium',
      distanceTolerance: 0.00012,
      angularTolerance: 0.1090830782496456,
      maximumChordLength: 10
  };
  try {
      const resp = await (partId ? TranslationService.translatePart(req.user.accessToken, gltfElemId, partId, translationParams)
          : TranslationService.translateElement(req.user.accessToken, gltfElemId, translationParams));
      if (resp.contentType.indexOf('json') >= 0) {
          inMemoryDataStore[JSON.parse(resp.data).id] = 'in-progress';
      }
      res.status(200).contentType(resp.contentType).send(resp.data);
  } catch (err) {
      res.status(500).json({ error: err });
  }
}
