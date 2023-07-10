import axios from 'axios';
import queryString from 'query-string';
import { JobRoleInterface, JobRoleGetQueryInterface } from 'interfaces/job-role';
import { GetQueryInterface } from '../../interfaces';

export const getJobRoles = async (query?: JobRoleGetQueryInterface) => {
  const response = await axios.get(`/api/job-roles${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createJobRole = async (jobRole: JobRoleInterface) => {
  const response = await axios.post('/api/job-roles', jobRole);
  return response.data;
};

export const updateJobRoleById = async (id: string, jobRole: JobRoleInterface) => {
  const response = await axios.put(`/api/job-roles/${id}`, jobRole);
  return response.data;
};

export const getJobRoleById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/job-roles/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteJobRoleById = async (id: string) => {
  const response = await axios.delete(`/api/job-roles/${id}`);
  return response.data;
};
