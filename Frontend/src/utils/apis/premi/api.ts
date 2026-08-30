import type { IPremiDetail } from "./types";
import apiFetch from "@/utils/apiFetch";

export const getPremiById = async (id: string): Promise<IPremiDetail> => {
  const response = await apiFetch<IPremiDetail>(`/premi/${id}`);
  return response;
};
