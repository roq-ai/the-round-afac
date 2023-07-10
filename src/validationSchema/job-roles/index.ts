import * as yup from 'yup';

export const jobRoleValidationSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  company_id: yup.string().nullable().required(),
});
