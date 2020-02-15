import * as Yup from 'yup';

function getValidationSchema(values) {
  return Yup.object().shape({
    password: Yup.string().required('Password is required!'),
    passwordConfirm: Yup.string()
      .oneOf([values.password], 'Passwords are not the same!')
      .required('Password confirmation is required!'),
    email: Yup.string()
      .email('Invalid email')
      .required('Required')
  });
}

function getErrorsFromValidationError(validationError) {
  const FIRST_ERROR = 0;
  return validationError.inner.reduce((errors, error) => {
    return {
      ...errors,
      [error.path]: error.errors[FIRST_ERROR]
    };
  }, {});
}

export default function validate(values) {
  const validationSchema = getValidationSchema(values);
  try {
    validationSchema.validateSync(values, { abortEarly: false });
    return {};
  } catch (error) {
    return getErrorsFromValidationError(error);
  }
}
