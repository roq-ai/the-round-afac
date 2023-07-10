import { JobRoleInterface } from 'interfaces/job-role';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ApplicationInterface {
  id?: string;
  job_role_id: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  job_role?: JobRoleInterface;
  user?: UserInterface;
  _count?: {};
}

export interface ApplicationGetQueryInterface extends GetQueryInterface {
  id?: string;
  job_role_id?: string;
  user_id?: string;
}
