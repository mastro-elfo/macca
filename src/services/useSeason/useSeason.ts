export type Season = "winter" | "spring" | "summer" | "autumn";

export default function useSeason(today?: Date): Season {
  const _today = today ?? new Date();
  const month = _today.getMonth();
  const day = _today.getDate();
  if (month < 2 || (month === 2 && day < 20)) return "winter";
  if (month < 5 || (month === 5 && day < 20)) return "spring";
  if (month < 8 || (month === 8 && day < 22)) return "summer";
  if (month < 11 || (month === 11 && day < 22)) return "autumn";
  return "winter";
}
