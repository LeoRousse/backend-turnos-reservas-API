export function getMessages(messagesService) {
  return async (req, res) => {
    try {
      const messages = await messagesService.getMessages();
      return res.status(200).json(messages);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };
}

export function getMessageById(messagesService) {
  return async (req, res) => {
    try {
      const message = await messagesService.getMessageById(req.params.mid);
      if (!message) {
        return res.status(404).json({ error: 'Mensaje no encontrado' });
      }
      return res.status(200).json(message);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };
}

export function createMessage(messagesService) {
  return async (req, res) => {
    try {
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: 'Body requerido' });
      }

      const message = await messagesService.addMessage(req.body);
      return res.status(201).json(message);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };
}

export function deleteMessage(messagesService) {
  return async (req, res) => {
    try {
      const message = await messagesService.deleteMessage(req.params.mid);
      if (!message) {
        return res.status(404).json({ error: 'Mensaje no encontrado' });
      }
      return res.status(200).json(message);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };
}
