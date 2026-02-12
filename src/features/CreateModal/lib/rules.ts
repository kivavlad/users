export const nameRules = [
  {
    required: true,
    message: 'Обязательное поле'
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
