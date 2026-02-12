export const nameRules = [
  {
    required: true,
    message: 'Обязательное поле'
  },
  {
    pattern: /\S/,
    message: 'Поле не может состоять из пробелов'
  }
];

export const avatarRules = [
  {
    required: true,
    message: 'Обязательное поле'
  },
  {
    pattern: /^(https?:\/\/)[^\s$.?#].[^\s]*$/i,
    message: 'Введите корректный URL'
  }
];
