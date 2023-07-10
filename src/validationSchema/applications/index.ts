import * as yup from 'yup';

export const applicationValidationSchema = yup.object().shape({
  job_role_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});
