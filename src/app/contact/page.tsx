import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FooterService } from "@/service/footer.service";

export const metadata: Metadata = {
  title: "Contact Us — Dermoqore",
  description: "Get in touch with the Dermoqore team.",
};

export default async function ContactPage() {
  const list = await FooterService.findAll().catch(() => []);
  const footer = list[0] ?? null;

  const addressLines = footer?.address?.split("\n") ?? [];

  const info = [
    footer?.address
      ? { Icon: MapPin, label: "Address", value: footer.address.replace(/\n/g, ", "), href: undefined }
      : null,
    footer?.phone
      ? { Icon: Phone, label: "Phone", value: footer.phone, href: `tel:${footer.phone.replace(/\s/g, "")}` }
      : null,
    footer?.email
      ? { Icon: Mail, label: "Email", value: footer.email, href: `mailto:${footer.email}` }
      : null,
    { Icon: Clock, label: "Hours", value: "Sat – Thu, 10am – 7pm", href: undefined },
  ].filter(Boolean) as { Icon: typeof MapPin; label: string; value: string; href?: string }[];

  return (
    <main className="flex flex-1 flex-col">
      {/* ── Page header ── */}
      <section className="border-b border-border bg-background px-6 py-14 text-center md:px-10 md:py-20">
        <p className="text-[10px] font-semibold tracking-[0.22em] text-muted-foreground uppercase">
          Get in touch
        </p>
        <h1 className="font-heading mt-3 text-3xl font-black tracking-[0.06em] text-foreground uppercase md:text-4xl">
          Contact Us
        </h1>
        <p className="mx-auto mt-4 max-w-md text-[13px] leading-relaxed text-muted-foreground">
          Have a question about your skin or our products? We're happy to help.
        </p>
      </section>

      {/* ── Content ── */}
      <section className="mx-auto w-full max-w-[1400px] px-6 py-14 md:px-10 md:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">

          {/* Contact form */}
          <div className="flex flex-col gap-6">
            <h2 className="font-heading text-base font-black tracking-widest text-foreground uppercase">
              Send a Message
            </h2>

            <form className="flex flex-col gap-5" action="#" method="POST">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-[10px] font-semibold tracking-[0.14em] text-foreground uppercase">
                    Full Name
                  </label>
                  <input
                    id="name" name="name" type="text" required placeholder="Your name"
                    className="rounded-sm border border-border bg-background px-4 py-2.5 text-[13px] text-foreground outline-none placeholder:text-muted-foreground focus:border-foreground/40 focus:ring-2 focus:ring-foreground/10 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-[10px] font-semibold tracking-[0.14em] text-foreground uppercase">
                    Email Address
                  </label>
                  <input
                    id="email" name="email" type="email" required placeholder="you@email.com"
                    className="rounded-sm border border-border bg-background px-4 py-2.5 text-[13px] text-foreground outline-none placeholder:text-muted-foreground focus:border-foreground/40 focus:ring-2 focus:ring-foreground/10 transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="subject" className="text-[10px] font-semibold tracking-[0.14em] text-foreground uppercase">
                  Subject
                </label>
                <input
                  id="subject" name="subject" type="text" placeholder="How can we help?"
                  className="rounded-sm border border-border bg-background px-4 py-2.5 text-[13px] text-foreground outline-none placeholder:text-muted-foreground focus:border-foreground/40 focus:ring-2 focus:ring-foreground/10 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-[10px] font-semibold tracking-[0.14em] text-foreground uppercase">
                  Message
                </label>
                <textarea
                  id="message" name="message" required rows={5} placeholder="Tell us more..."
                  className="rounded-sm border border-border bg-background px-4 py-2.5 text-[13px] text-foreground outline-none placeholder:text-muted-foreground focus:border-foreground/40 focus:ring-2 focus:ring-foreground/10 transition-colors resize-none"
                />
              </div>

              <Button type="submit" className="w-fit">
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact info */}
          <div className="flex flex-col gap-8">
            <h2 className="font-heading text-base font-black tracking-widest text-foreground uppercase">
              Our Details
            </h2>

            <ul className="flex flex-col gap-6">
              {info.map(({ Icon, label, value, href }) => (
                <li key={label} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-border">
                    <Icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                      {label}
                    </span>
                    {label === "Address" && addressLines.length > 1 ? (
                      <address className="not-italic text-[13px] text-foreground leading-relaxed">
                        {addressLines.map((line, i) => (
                          <span key={i}>{line}{i < addressLines.length - 1 && <br />}</span>
                        ))}
                      </address>
                    ) : href ? (
                      <a href={href} className="text-[13px] text-foreground transition-opacity hover:opacity-60">
                        {value}
                      </a>
                    ) : (
                      <span className="text-[13px] text-foreground">{value}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            {/* Social links from footer */}
            {footer?.socialLinks && footer.socialLinks.length > 0 && (
              <div className="border-t border-border pt-6">
                <p className="mb-3 text-[10px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                  Follow Us
                </p>
                <div className="flex flex-wrap gap-4">
                  {footer.socialLinks.map((social) => (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[12px] font-medium uppercase tracking-[0.08em] text-foreground transition-opacity hover:opacity-50"
                    >
                      {social.name}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </section>
    </main>
  );
}
