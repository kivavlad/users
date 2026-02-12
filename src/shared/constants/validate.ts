export const requiredField = [
  {
    required: true,
    message: 'Обязательное поле',
  },
  {
    pattern: /\S/,
    message: 'Поле не может состоять из пробелов',
  },
];

export const requiredUrl = [
  {
    required: true,
    message: 'Обязательное поле',
  },
  {
    pattern: /^(https?:\/\/)[^\s$.?#].[^\s]*$/i,
    message: 'Введите корректный URL',
  },
];
