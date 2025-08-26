import { useQuery } from "@tanstack/react-query";
import qrcode from "qrcode";

export function useDataUrl(
  link?: string,
  options?: qrcode.QRCodeToDataURLOptions
) {
  return useQuery({
    queryKey: ["qrcode", link],
    queryFn: () => (link ? qrcode.toDataURL(link, options) : ""),
    enabled: !!link,
    initialData: "",
  });
}
