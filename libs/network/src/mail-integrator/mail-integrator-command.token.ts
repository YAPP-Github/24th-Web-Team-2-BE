export enum MailIntegratorCommandToken {
  GET_MAIL_SENDERS = 'get-mail-senders',
  GET_UNREAD_MESSAGES = 'get-unread-messages',
  GET_MESSAGE = 'get-message',

  MODIFY_MESSAGE_AS_READ = 'modify-message-as-read',
  MODIFY_MESSAGE_AS_UNREAD = 'modify-message-as-unread',

  REMOVE_MESSAGE = 'remove-message',

  ATTACH_ACCESS_TOKEN = 'attach-access-token',
}
