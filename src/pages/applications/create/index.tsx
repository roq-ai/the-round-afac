import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createApplication } from 'apiSdk/applications';
import { Error } from 'components/error';
import { applicationValidationSchema } from 'validationSchema/applications';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { JobRoleInterface } from 'interfaces/job-role';
import { UserInterface } from 'interfaces/user';
import { getJobRoles } from 'apiSdk/job-roles';
import { getUsers } from 'apiSdk/users';
import { ApplicationInterface } from 'interfaces/application';

function ApplicationCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ApplicationInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createApplication(values);
      resetForm();
      router.push('/applications');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ApplicationInterface>({
    initialValues: {
      job_role_id: (router.query.job_role_id as string) ?? null,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: applicationValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Application
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <AsyncSelect<JobRoleInterface>
            formik={formik}
            name={'job_role_id'}
            label={'Select Job Role'}
            placeholder={'Select Job Role'}
            fetcher={getJobRoles}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.title}
              </option>
            )}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'application',
    operation: AccessOperationEnum.CREATE,
  }),
)(ApplicationCreatePage);
