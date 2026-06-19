import { AnnouncementBarService } from "@/service/announcement-bar.service";

function getSafeLink(link: string | null) {
  if (!link) return null;

  const trimmedLink = link.trim();
  if (trimmedLink.startsWith("/")) {
    return { href: trimmedLink, isExternal: false };
  }

  try {
    const url = new URL(trimmedLink);
    if (url.protocol === "http:" || url.protocol === "https:") {
      return { href: url.toString(), isExternal: true };
    }
  } catch {
    return null;
  }

  return null;
}

export default async function AnnouncementBar() {
  const items = await AnnouncementBarService.findActive().catch(() => []);
  if (items.length === 0) return null;

  return (
    <div className="border-t-[3px] border-[#332a21] bg-[#f3eee7] text-[#2a2118]" role="status">
      <div className="mx-auto flex min-h-8 max-w-[1400px] items-center justify-center gap-x-6 gap-y-1 overflow-hidden px-6 py-1.5 text-center md:px-10">
        {items.map((item) => {
          const link = getSafeLink(item.link);
          const className =
            "text-[11px] font-bold tracking-[0.04em] uppercase no-underline transition-opacity hover:opacity-75";

          if (!link) {
            return (
              <span key={item.id} className={className}>
                {item.message}
              </span>
            );
          }

          return (
            <a
              key={item.id}
              href={link.href}
              target={link.isExternal ? "_blank" : undefined}
              rel={link.isExternal ? "noopener noreferrer" : undefined}
              className={className}
            >
              {item.message}
            </a>
          );
        })}
      </div>
    </div>
  );
}
