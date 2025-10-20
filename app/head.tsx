import { ICON_VERSION } from "@/lib/iconVersion";

export default function Head() {
  const query = `?${ICON_VERSION}`;
  return (
    <>
      <link rel="icon" href={`/favicon-v2.ico${query}`} />
      <link rel="icon" type="image/png" sizes="210x210" href={`/icon-v2.png${query}`} />
      <link rel="apple-touch-icon" sizes="180x180" href={`/icon-v2.png${query}`} />
    </>
  );
}
