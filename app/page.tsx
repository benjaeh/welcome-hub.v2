'use client';

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  HeartHandshake,
  PhoneCall,
  Search,
  Megaphone,
  QrCode,
  ClipboardList,
  Info,
  LifeBuoy,
  ChevronRight,
  ChevronDown,
  Mailbox,
  CalendarDays,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import Image from "next/image";
import ImageSlider from "@/components/ImageSlider";
import { LANGS, RTL_LANGS, LOCALE_MAP, t, type Lang } from "./i18n";


/** ---- Helpers ---- */
function useLocalTime(): Date | null {
  const [now, setNow] = React.useState<Date | null>(null);

  React.useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return now;
}
type SectionCardProps = {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: React.ReactNode;
  onClick?: () => void;
  href?: string;
};
const SectionCard: React.FC<SectionCardProps> = ({ title, icon: Icon, children, onClick, href }) => {
  const body = (
    <Card className="hover:shadow-xl transition-shadow cursor-pointer rounded-2xl h-full">
      <CardContent className="p-5 flex gap-4 items-start">
        <div className="p-3 rounded-2xl bg-muted shrink-0"><Icon className="w-7 h-7" /></div>
        <div className="space-y-1">
          <h3 className="text-lg font-semibold leading-tight">{title}</h3>
          <div className="text-sm text-muted-foreground">{children}</div>
        </div>
        <ChevronRight className="w-5 h-5 ml-auto mt-1 text-muted-foreground" />
      </CardContent>
    </Card>
  );
  if (href) return <a href={href} target="_blank" rel="noreferrer" className="block h-full">{body}</a>;
  return <button className="w-full text-left h-full" onClick={onClick}>{body}</button>;
};

const PillButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => (
  <button {...props} className={`px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 active:opacity-80 transition ${props.className ?? ""}`}>{children}</button>
);

// Temporary demo announcements
const DEMO_ANNOUNCEMENTS = [
  { id: 1, key: "announcement1" },
  { id: 2, key: "announcement2" },
  { id: 3, key: "announcement3" },
];


/** ---- Component ---- */
export default function App() {
  const [lang, setLang] = React.useState<Lang>("en");

  React.useEffect(() => {
    const saved = localStorage.getItem("hub.lang") as Lang | null;
    if (saved) setLang(saved);
  }, []);

  React.useEffect(() => {
    localStorage.setItem("hub.lang", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = RTL_LANGS.includes(lang) ? "rtl" : "ltr";
  }, [lang]);

  const now = useLocalTime();
  const dateLocale = LOCALE_MAP[lang] ?? LOCALE_MAP.en;
  const dateStr = now
    ? now.toLocaleString(dateLocale, { dateStyle: "full", timeStyle: "short" })
    : "—";
  const cardsRef = React.useRef<HTMLDivElement>(null);
  const [cardsVisible, setCardsVisible] = React.useState(false);

  React.useEffect(() => {
    const target = cardsRef.current;
    if (!target) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCardsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const cardsTransform = cardsVisible ? "translateY(0)" : "translateY(40px)";
  const cardsOpacity = cardsVisible ? 1 : 0;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="w-full bg-white shadow-sm">
        <div className="w-full flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 lg:px-12">
          <div className="flex flex-wrap items-center gap-4 sm:gap-5">
            <Image
              src="/communiteer.png"
              alt="Communiteer"
              width={240}
              height={100}
              priority
              className="h-[40px] w-auto md:h-[44px]"
            />
            <div className="h-[40px] w-px bg-slate-200 md:h-[44px]" aria-hidden="true" />
            <Image
              src="/study-nsw.png"
              alt="Study NSW"
              width={200}
              height={90}
              className="h-[34px] w-auto md:h-[38px]"
            />
          </div>
          <div className="relative self-start sm:self-auto">
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as Lang)}
              className="appearance-none rounded-full border border-white/60 bg-white/90 px-5 pr-12 py-2.5 text-base font-medium text-slate-800 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent hover:border-emerald-200"
              aria-label="Language selector"
            >
              {LANGS.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
          </div>
        </div>
      </header>

      <main
        className="min-h-screen"
        style={{
          backgroundImage: "linear-gradient(112deg, #5095cd 1%, #4dbd95 99%)",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
        }}
      >
        <div
          className="relative z-10 w-full overflow-hidden h-[440px] sm:h-[580px] md:h-[620px]"
          style={{
            backgroundImage: "url('/hero/social.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          role="img"
          aria-label="Students gathering at Study NSW Welcome Hub"
        />
        <section className="relative bg-white">
          <div className="max-w-6xl mx-auto px-4 pt-12 sm:pt-20 pb-12">
            <div
              ref={cardsRef}
              className="relative z-10"
              style={{
                transform: cardsTransform,
                opacity: cardsOpacity,
                transition: "transform 0.4s ease, opacity 0.4s ease",
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 rounded-3xl">
                  <CardContent className="p-6 lg:p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                      <div className="rounded-3xl w-full lg:w-2/3 aspect-[4/3] relative overflow-hidden min-h-[280px]">
                        <ImageSlider
                          slides={[
                            { src: "/hero/01.jpg", alt: "Welcome Desk volunteers helping arrivals" },
                            { src: "/hero/02.jpg", alt: "Smiling student ambassadors at the counter" },
                            { src: "/hero/03.jpg", alt: "Students getting info about transport and TFN" },
                          ]}
                          interval={6000}
                        />
                      </div>
                      <div className="flex-1 space-y-3">
                        <h1 className="text-3xl md:text-4xl font-bold leading-tight">{t(lang, "welcome")}</h1>
                        <p className="text-muted-foreground">{t(lang, "heroIntro")}</p>
                        <div className="flex flex-wrap gap-3">
                          <PillButton onClick={() => document.getElementById("searchBox")?.focus()}>
                            <Search className="inline w-4 h-4 mr-2" />
                            {t(lang, "btnSearch")}
                          </PillButton>
                          <Dialog>
                            <DialogTrigger asChild>
                              <PillButton>
                                <QrCode className="inline w-4 h-4 mr-2" />
                                {t(lang, "btnShowQr")}
                              </PillButton>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[440px]">
                              <DialogHeader>
                                <DialogTitle>{t(lang, "checkinModalTitle")}</DialogTitle>
                                <DialogDescription>{t(lang, "checkinModalDesc")}</DialogDescription>
                              </DialogHeader>
                              <div className="flex justify-center py-4">
                                <QRCodeSVG value="https://example.org/check-in" size={256} includeMargin />
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-3xl">
                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-5 h-5" />
                      <span className="font-semibold">{t(lang, "localTime")}</span>
                    </div>
                    <div className="text-2xl font-bold">{dateStr}</div>
                    <Separator />
                    <div className="flex items-center gap-2">
                      <Megaphone className="w-5 h-5" />
                      <span className="font-semibold">{t(lang, "announcements")}</span>
                    </div>
                    <div className="space-y-2">
                      {DEMO_ANNOUNCEMENTS.map((a) => (
                        <Alert key={a.id} className="rounded-xl">
                          <AlertTitle>{t(lang, "announcementUpdate")}</AlertTitle>
                          <AlertDescription>{t(lang, a.key)}</AlertDescription>
                        </Alert>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 pt-10 pb-12 space-y-10">
          <div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Input
                id="searchBox"
                placeholder={t(lang, "searchPlaceholder")}
                className="rounded-2xl py-6 text-base text-white placeholder:text-white"
              />
              <Button className="rounded-2xl px-6 h-12 text-base">
                <Search className="w-5 h-5 mr-2" />
                {t(lang, "btnSearch")}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            <SectionCard
              title={t(lang, "checkinTitle")}
              icon={ClipboardList}
              onClick={() => window.open("https://example.org/check-in", "_blank")}
            >
              {t(lang, "checkinDesc")}
            </SectionCard>

            <SectionCard title={t(lang, "guideTitle")} icon={BookOpen} href="https://example.org/welcome-guide">
              {t(lang, "guideDesc")}
            </SectionCard>

            <SectionCard title={t(lang, "snsTitle")} icon={Info} href="https://www.study.nsw.gov.au/">
              {t(lang, "snsDesc")}
            </SectionCard>

            <SectionCard title={t(lang, "commTitle")} icon={HeartHandshake} href="https://communiteer.org/">
              {t(lang, "commDesc")}
            </SectionCard>

            <SectionCard
              title={t(lang, "helpTitle")}
              icon={LifeBuoy}
              onClick={() => window.open("mailto:support@example.org", "_blank")}
            >
              {t(lang, "helpDesc")}
            </SectionCard>

            <Dialog>
              <DialogTrigger asChild>
                <button className="w-full text-left h-full">
                  <Card className="hover:shadow-xl transition-shadow cursor-pointer rounded-2xl h-full">
                    <CardContent className="p-5 flex gap-4 items-start">
                      <div className="p-3 rounded-2xl bg-muted shrink-0">
                        <Mailbox className="w-7 h-7" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-lg font-semibold leading-tight">{t(lang, "newsletterTitle")}</h3>
                        <div className="text-sm text-muted-foreground">{t(lang, "newsletterDesc")}</div>
                      </div>
                      <ChevronRight className="w-5 h-5 ml-auto mt-1 text-muted-foreground" />
                    </CardContent>
                  </Card>
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[440px]">
                <DialogHeader>
                  <DialogTitle>{t(lang, "newsletterModalTitle")}</DialogTitle>
                  <DialogDescription>{t(lang, "newsletterModalDesc")}</DialogDescription>
                </DialogHeader>
                <div className="flex justify-center py-4">
                  <QRCodeSVG value="https://communiteer.org/newsletter" size={256} includeMargin />
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="rounded-2xl lg:col-span-1">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <LifeBuoy className="w-5 h-5" />
                  <h3 className="font-semibold">{t(lang, "needHelp")}</h3>
                </div>
                <div className="space-y-3">
                  <Button className="w-full rounded-xl" onClick={() => window.open("tel:1300367899", "_self")}>
                    <PhoneCall className="w-5 h-5 mr-2" />
                    {t(lang, "callSns")}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full rounded-xl"
                    onClick={() => window.open("mailto:support@example.org", "_blank")}
                  >
                    {t(lang, "emailTeam")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <footer className="px-0 py-8 text-sm text-muted-foreground">
          <Separator className="mb-4" />
          <div className="max-w-6xl mx-auto px-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{t(lang, "footerBadge")}</Badge>
              <span>{t(lang, "footerBlurb")}</span>
            </div>
            <div className="flex items-center gap-3">
              <a className="underline" href="https://www.study.nsw.gov.au/" target="_blank" rel="noreferrer">
                study.nsw.gov.au
              </a>
              <span>•</span>
              <a className="underline" href="https://communiteer.org/" target="_blank" rel="noreferrer">
                communiteer.org
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
