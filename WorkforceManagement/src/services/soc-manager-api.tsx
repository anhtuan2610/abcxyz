import { get, post } from "./axios-config";

type TBaseResponse<T> = {
  code: number;
  message: string;
  data: T;
};

type TPendingTicketResponse = {
  code: number;
  message: string;
  data: TPendingTicketData[];
};

type TPendingTicketData = {
  id: number;
  projectName: string;
  description: string;
  urls: string;
  createdAt: string;
  customerEmail: String;
};

type TApprovedRequestResponse = {
  code: number;
  message: string;
  data: TApprovedRequestData[];
};

type TApprovedRequestData = {
  id: number;
  projectName: string;
  description: string;
  teamLead: TTeamLeadInfo;
  createdAt: string;
};

type TTeamLeadInfo = {
  id: number;
  fullName: string;
  email: string;
};

export type TFormCreateProject = {
  name: string;
  description: string;
  endDate: string;
};

type TProjectResponse = TBaseResponse<TProject[]>;

type TProject = {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  statusId: number;
  teamId: number;
  createAt: string;
};

type TCreatedProjectResponse = {
  code: number;
  data: null;
  message: string;
};

type TTeamResponse = TBaseResponse<TTeamData[]>;

type TTeamData = {
  teamId: number;
  teamName: string;
  isParticipating: boolean;
};

type TLeaderWithoutTeamResponse = TBaseResponse<TLeaderWithoutTeamData[]>;

type TLeaderWithoutTeamData = {
  id: number;
  fullName: string;
  email: string;
};

export type TFormCreateTeam = {
  teamName: string;
  leaderId: number | null;
};

type TTeamMemberResponse = TBaseResponse<TTeamMemberData>;

type TTeamMemberData = {
  leader: {
    leaderId: number;
    fullName: string;
    email: string;
  };
  members: TTeamMember[];
};

type TTeamMember = {
  pentesterId: number;
  fullName: string;
  email: string;
  skills: string;
  certifications: string;
};

type TMembersWithoutTeamResponse = TBaseResponse<TMemberWithoutTeamData[]>;

type TMemberWithoutTeamData = {
  id: number;
  fullName: string;
  email: string;
  skills: string;
  certifications: string;
};

type TTeamNoInProjectResponse = TBaseResponse<TTeamNoInProjectData[]>;

type TTeamNoInProjectData = {
  teamId: number;
  teamName: string;
  leaderName: string;
  leaderEmail: string;
};

type TVerifyUrlResponse = {
  url: string;
  status: string;
  message: string | null;
  domainInfo: {
    domain: string;
    whoisInformation: {
      registrar: string | null;
      status: string | null;
      expirationDate: string | null;
      rawData: string; // JSON chuỗi chứa thêm thông tin chi tiết
      createdDate: string | null;
      updatedDate: string | null;
      expiresDate: string | null;
      domainAvailability: string | null;
      contactEmail: string | null;
      domainNameExt: string | null;
      estimatedDomainAge: number;
      ips: string[];
    };
    dnsInformation: {
      aRecords: string[];
      aaaaRecords: string[];
      mxRecords: string[];
      nsRecords: string[];
      soaRecord: string;
    };
  };
};

type TTopVulnerabilitiesResponse = TBaseResponse<TTopVulnerabilitiesData[]>;

type TTopVulnerabilitiesData = {
  name: string;
  count: number;
};

type TTopProjectsResponse = TBaseResponse<TTopProjectsData[]>;

type TTopProjectsData = {
  name: string;
  vulnerabilityCount: number;
};

type TCountSeverityAllProjectResponse = TBaseResponse<
  TCountSeverityAllProjectData[]
>;

type TCountSeverityAllProjectData = {
  severity: string;
  count: number;
};

type TProjectDetailsInfoResponse = TBaseResponse<TProjectDetailsInfoData>;

type TProjectDetailsInfoData = {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  team: TProjectDetailsTeam;
};

type TProjectDetailsTeam = {
  teamId: number;
  teamName: string;
  leader: TProjectDetailsLeader;
};

type TProjectDetailsLeader = {
  teamId: number;
  fullNam: string;
  email: string;
};

type TMembersByProjectResponse = TBaseResponse<TMembersByProjectData>;

type TMembersByProjectData = {
  leader: TMembersByProjectLeader;
  members: TMembersByProjectPentester[];
};

type TMembersByProjectLeader = {
  id: number;
  fullName: string;
  email: string;
  skills: string;
  certifications: string;
};

export type TMembersByProjectPentester = {
  id: number;
  fullName: string;
  email: string;
  skills: string;
  certifications: string;
};

type TVulByProjectResponse = TBaseResponse<TVulByProjectData>;

type TVulByProjectData = {
  vulnerabilities: TVulByProjectDataDetail[];
  totalVulnerabilities: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
};

type TVulByProjectDataDetail = {
  id: number;
  description: string;
  severity: string;
  statusId: number;
  riskSeverity: string;
  url: string;
  assignedAt: string;
  instances: number;
  firstDetectedAt: string;
  lastUpdatedAt: string;
  actionReason: string;
  statusName: string;
};

export async function getPendingRequest() {
  return await get<TPendingTicketResponse>({
    url: "/SocManager/GetPendingRequests",
  });
}

export async function approveRequest({ id }: { id: number }) {
  return await post({
    url: `/SocManager/ApproveRequest/${id}`,
  });
}

export async function rejectRequest({
  id,
  rejectReason,
}: {
  id: number;
  rejectReason: string;
}) {
  return await post({
    url: `/SocManager/RejectRequest/${id}`,
    data: { rejectReason },
  });
}

export async function getApprovedRequest() {
  return await get<TApprovedRequestResponse>({
    url: "/SocManager/GetPentestRequestsForSOCManager",
  });
}

export async function createPentestProject({
  id,
  data,
}: {
  id: number;
  data: TFormCreateProject;
}) {
  return await post<TCreatedProjectResponse>({
    url: `/SocManager/CreatePentestProject/${id}`,
    data: data,
  });
}

export async function getAllProjects() {
  return await get<TProjectResponse>({
    url: "/SocManager/GetAllProjects",
  });
}

export async function getAllTeams() {
  return await get<TTeamResponse>({
    url: "/SocManager/GetAllTeams",
  });
}

export async function getLeadersWithoutTeam() {
  return await get<TLeaderWithoutTeamResponse>({
    url: "/SocManager/GetLeadersWithoutTeam",
  });
}

export async function createNewTeam({
  createFormData,
}: {
  createFormData: TFormCreateTeam;
}) {
  return await post({
    url: "/SocManager/CreateTeam",
    data: createFormData,
  });
}

export async function getTeamMembers({ teamId }: { teamId: number }) {
  return await get<TTeamMemberResponse>({
    url: `/SocManager/GetTeamMembers/${teamId}`,
  });
}

export async function getPentestersWiththoutTeam() {
  return await get<TMembersWithoutTeamResponse>({
    url: "/SocManager/GetPentestersWiththoutTeam",
  });
}

export async function addPentesterToTeam({
  teamId,
  pentesterId,
}: {
  teamId: number;
  pentesterId: number;
}) {
  return await post({
    url: `/SocManager/AddPentestersToTeam/${teamId}`,
    data: [{ pentesterId }],
  });
}

export async function getAllTeamsNotInProject() {
  return await get<TTeamNoInProjectResponse>({
    url: "/SocManager/GetTeamsNotInProject",
  });
}

export async function assignTeamToProject({
  teamId,
  selectedProjectId,
}: {
  teamId: number;
  selectedProjectId: number;
}) {
  return await post({
    url: `/SocManager/AssignTeamToProject/${selectedProjectId}`,
    data: { teamId },
  });
}

export async function verifyUrl({ url }: { url: string }) {
  return await post<TVerifyUrlResponse>({
    url: "/DomainVerification/VerifyUrlInternational",
    data: { url },
  });
}

export async function getTopVulnerabilities() {
  return await get<TTopVulnerabilitiesResponse>({
    url: "/SocManager/GetTopVulnerabilities",
  });
}

export async function getTopProjects() {
  return await get<TTopProjectsResponse>({
    url: "/SocManager/GetTopProjects",
  });
}

export async function getVulnerabilityCountBySeverity() {
  return await get<TCountSeverityAllProjectResponse>({
    url: "/SocManager/GetVulnerabilityCountBySeverity",
  });
}

export async function getProjectDetails({ projectId }: { projectId: number }) {
  return await get<TProjectDetailsInfoResponse>({
    url: `/SocManager/GetProjectInfo/${projectId}`,
  });
}

export async function getMembersByProject({
  projectId,
}: {
  projectId: number;
}) {
  return await get<TMembersByProjectResponse>({
    url: `/SocManager/GetMembersByProject/${projectId}`,
  });
}

export async function importVulnerabilities({
  projectId,
  htmlFile,
}: {
  projectId: number;
  htmlFile: File;
}) {
  const formData = new FormData();
  formData.append("htmlFile", htmlFile);

  return await post<TBaseResponse<null>>({
    url: `/SocManager/ImportReport/${projectId}`,
    data: formData,
    config: {
      headers: {
        "Content-Type": "multipart/form-data", // Đặt header chính xác
      },
    },
  });
}

export async function getVulnerabilitiesByProject({
  projectId,
  searchString,
  currentPage,
  pageSize,
}: {
  projectId: number;
  searchString: string;
  currentPage: number;
  pageSize: number;
}) {
  return await get<TVulByProjectResponse>({
    url: `SocManager/GetVulnerabilitiesByProject/${projectId}`,
    params: { searchString, pageNumber: currentPage, pageSize },
  });
}

export async function countSeverityByProject({
  projectId,
}: {
  projectId: number;
}) {
  return await get<TCountSeverityAllProjectResponse>({
    // tuong tu kieu nen lay luon
    url: `/SocManager/CountVulnerabilitiesBySeverityForProject/${projectId}`,
  });
}
