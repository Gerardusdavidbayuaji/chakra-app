export const formatDate = (date: string | Date): string => {
  if (!date) return "-";
  const value = new Date(date);
  if (isNaN(value.getTime())) return "-";

  const day = String(value.getDate()).padStart(2, "0");
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const year = value.getFullYear();

  return `${day}-${month}-${year}`;
};

export const formatDateLong = (date: string | null): string => {
  if (!date) return "N/A";
  const value = new Date(date);
  if (isNaN(value.getTime())) return "N/A";

  return value.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const formatCurrency = (amount: number): string => {
  if (amount === undefined || amount === null) return "Rp 0,00";

  return (
    "Rp " +
    amount.toLocaleString("id-ID", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
};
