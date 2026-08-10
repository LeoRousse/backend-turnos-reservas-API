export class MessagesService {
  constructor(repository) {
    this.repository = repository;
  }

  async getMessages() {
    return this.repository.getAll();
  }

  async getMessageById(id) {
    if (!id || typeof id !== 'string') {
      throw new TypeError('El id del mensaje debe ser una cadena no vacía.');
    }
    return this.repository.getById(id);
  }

  async addMessage(messageData) {
    if (!messageData || typeof messageData !== 'object') {
      throw new TypeError('Body requerido para crear el mensaje.');
    }

    this._validateMessagePayload(messageData);

    const message = {
      sender: messageData.sender,
      recipient: messageData.recipient,
      subject: messageData.subject ?? '',
      content: messageData.content,
    };

    return this.repository.create(message);
  }

  async deleteMessage(id) {
    if (!id || typeof id !== 'string') {
      throw new TypeError('El id del mensaje debe ser una cadena no vacía.');
    }
    return this.repository.delete(id);
  }

  _validateMessagePayload(payload) {
    const required = ['sender', 'recipient', 'content'];
    for (const field of required) {
      if (
        payload[field] === undefined ||
        payload[field] === null ||
        (typeof payload[field] === 'string' && payload[field].trim() === '')
      ) {
        throw new TypeError(`El campo "${field}" es obligatorio para registrar un mensaje.`);
      }
    }

    if (typeof payload.sender !== 'string') {
      throw new TypeError('El remitente debe ser una cadena.');
    }
    if (typeof payload.recipient !== 'string') {
      throw new TypeError('El destinatario debe ser una cadena.');
    }
    if (typeof payload.content !== 'string') {
      throw new TypeError('El contenido debe ser una cadena.');
    }
    if (payload.subject !== undefined && typeof payload.subject !== 'string') {
      throw new TypeError('El asunto debe ser una cadena si se envía.');
    }
  }
}
