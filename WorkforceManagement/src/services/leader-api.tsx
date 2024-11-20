import { get, post } from "./axios-config";

type TBaseResponse<T> = {
  code: number;
  message: string;
  data: T;
};

type TTeamMembersResponse = TBaseResponse<TTeamMembersData[]>;

type TTeamMembersData = {
  id: number;
  fullName: string;
  email: string;
  skills: string;
  certifications: string;
  role: string;
};

type TAssignedProjectBySMResponse = TBaseResponse<TAssignedProjectBySMData>;

type TAssignedProjectBySMData = {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
  createdAt: string;
};

type TProjectsByLeaderResponse = TBaseResponse<TProjectsByLeaderData[]>;

type TProjectsByLeaderData = {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
  vulnerabilities: null;
  createdAt: string;
};

type TTeamMembersAndTasksResponse = TBaseResponse<TTeamMembersAndTasksData[]>;

type TTeamMembersAndTasksData = {
  memberId: number;
  memberName: string;
  memberEmail: string;
  memberRole: string;
  assignedTasks: TAssignedTasks[];
};

type TAssignedTasks = {
  taskId: number;
  assignedAt: string;
  dueDate: string;
  status: string;
  report: string;
  vulnerability: TVulnerability;
};

type TVulnerability = {
  id: number;
  description: string;
  severity: string;
  firstDetectedAt: string;
  url: string;
};

export async function getTeamMembersByLeader() {
  return get<TTeamMembersResponse>({
    url: "/TeamLead/GetTeamMembersByLeader",
  });
}

export async function getAssignedTaskBySM() {
  return await get<TAssignedProjectBySMResponse>({
    url: "/TeamLead/GetAssignedProject",
  });
}

export async function getProjectsByLeader() {
  return await get<TProjectsByLeaderResponse>({
    url: "/TeamLead/GetProjectsByLeader",
  });
}

export async function acceptTask({ projectId }: { projectId: number }) {
  return await post({
    url: `/TeamLead/AcceptTask/${projectId}`,
  });
}

export async function getTeamMembersAndTasks() {
  return await get<TTeamMembersAndTasksResponse>({
    url: "/TeamLead/GetTeamMembersAndTasks",
  });
}

export async function assignVulToPentester({pentesterId, vulnerabilityIds}: {pentesterId: number, vulnerabilityIds: number[]}) {
  return await post({
    url: "/TeamLead/AssignVulnerabilitiesToPentester",
    data: {pentesterId, vulnerabilityIds}
  })
}