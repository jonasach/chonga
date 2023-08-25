let inMemoryDataStore = {};

export default function handler(req, res) {
    if (req.body.event === 'onshape.model.translation.complete') {
      inMemoryDataStore[req.body.translationId] = req.body.webhookId;
    }
    res.status(200).send();
}

