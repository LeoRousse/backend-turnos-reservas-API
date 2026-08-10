import { Router } from 'express';
import {
  createMessage,
  deleteMessage,
  getMessageById,
  getMessages,
} from '../controllers/messages.controller.js';

export function createMessagesRouter(messagesService) {
  const router = Router();

  router.get('/', getMessages(messagesService));
  router.get('/:mid', getMessageById(messagesService));
  router.post('/', createMessage(messagesService));
  router.delete('/:mid', deleteMessage(messagesService));

  return router;
}
