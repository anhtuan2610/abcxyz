import { TTicketForm } from "../components/Customer/TicketForm";
import { get, post } from "./axios-config";

type TBaseResponse = {
  code: number;
  message: string;
  data: any;
};

type TResponseSubmittedTickets = {
  code: number;
  message: string;
  data: TResponseTicketsData[];
};

type TResponseTicketsData = {
  id: number;
  projectName: string;
  description: string;
  urls: string;
  createdAt: string;
  statusId: number;
  statusName: string;
  teamId: number;
  teamLeadId: number;
  rejectReason: string;
  scanInitiatedAt: string;
  teamLeadAcceptedAt: string;
};

export async function createPentestRequest({ data }: { data: TTicketForm }) {
  return await post<TBaseResponse>({
    url: "/Customer/CreateRequest",
    data,
  });
}

export async function getSubmittedTickets() {
  return await get<TResponseSubmittedTickets>({
    url: "/Customer/GetAllRequests",
  });
}

export async function customerRejectRequest({
  id,
  rejectReason,
}: {
  id: number;
  rejectReason: string;
}) {
  return await post({
    url: `/Customer/RejectRequest/${id}`,
    data: { rejectReason },
  });
}
