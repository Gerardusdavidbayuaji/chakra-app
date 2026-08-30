import type { IInstallmentItem } from ".";
import type { IPaginatedResult } from ".";
import apiFetch from "@/utils/apiFetch";

export const getInstallmentsByPremiId = async (
  premiId: string,
): Promise<IInstallmentItem[]> => {
  const response = await apiFetch<IPaginatedResult<IInstallmentItem>>(
    `/premi/${premiId}/installments?pageSize=3&orderBy=installmentNumber`,
  );
  return response.data;
};
