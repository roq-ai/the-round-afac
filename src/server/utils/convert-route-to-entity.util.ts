const mapping: Record<string, string> = {
  applications: 'application',
  companies: 'company',
  'job-roles': 'job_role',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
