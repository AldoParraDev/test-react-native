export function parseQrData(raw: string) {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
