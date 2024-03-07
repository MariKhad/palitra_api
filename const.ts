export const URL = 'https://www.thecolorapi.com/';

export const ERRORS = {
  WRONG_ID: 'Неправильный идентификатор',
  WRONG_PASS_LENGTH: 'Не менее 4 и не более 16 символов',
  NOT_STRING: 'должна быть строкой',
  NOT_HEX: 'недействительно',
  USER_EXISTS: 'Пользователь с таким логином уже существует',
  VALIDATION_FAIL: 'Неправильный логин или пароль',
  NOT_FOUND: 'не найден',
  AUTHORIZATION_FAIL: 'Пользователь не авторизован',
  NO_ACCESS: 'Доступ запрещен',
  TOKEN_EXPIRED: 'Срок действия токена истек',
};

export const DEFAULTS = {
  ROLE: 'admin',
};

export const FIELDS = {
  HEX: 'hex',
  PALETTE: 'palette',
  CONTENT: 'content',
  LOGIN: 'login',
  PASSWORD: 'password',
  USERNAME: 'user_name',
  COLORNAME: 'color_name',
  PALETTENAME: 'palette_name',
};
