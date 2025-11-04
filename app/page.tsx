'use client';

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  HeartHandshake,
  PhoneCall,
  Search,
  Megaphone,
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

// Temporary demo announcements
const UPCOMING_ACTIVITIES = [
  {
    id: "orientation",
    title: "Guided orientation tours",
    schedule: "Today · 10:00 AM & 2:00 PM",
    description: "Join our volunteers for a 20-minute walk-through of key services and study essentials.",
  },
  {
    id: "lounge",
    title: "Student lounge pop-up",
    schedule: "Today · 12:30 PM",
    description: "Grab a snack, meet other arrivals, and discover weekly student meetups in the lounge zone.",
  },
  {
    id: "briefing",
    title: "Volunteer briefing",
    schedule: "Tomorrow · 9:00 AM",
    description: "Interested in helping out? Meet the Communiteer team and learn how to get involved.",
  },
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
        <section className="relative">
          <div
            className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,#7cc5e6_0%,#41c39c_55%,#29a084_100%)]"
            aria-hidden="true"
          />
          <div className="max-w-6xl mx-auto px-4 pt-10 sm:pt-14 pb-12">
            <div
              ref={cardsRef}
              className="relative z-10"
              style={{
                transform: cardsTransform,
                opacity: cardsOpacity,
                transition: "transform 0.4s ease, opacity 0.4s ease",
              }}
            >
              <div className="rounded-3xl bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.95)_0%,_rgba(255,255,255,0.88)_60%,_rgba(255,255,255,0.82)_100%)] shadow-xl ring-1 ring-slate-100 p-10 md:p-16 space-y-12 backdrop-blur">
                <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,360px)] items-start">
                  <div className="space-y-8">
                    <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-slate-900">
                      Welcome to the International Student Hub
                    </h1>
                    <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
                      Check in, access support, and explore programs built for international students across NSW.
                    </p>
                    <div className="flex flex-wrap gap-4 pt-2">
                      <button
                        type="button"
                        aria-label="Check in to the International Student Hub"
                        className="inline-flex items-center justify-center px-6 py-3 rounded-full font-medium text-white bg-teal-600 hover:bg-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-500 transition"
                        onClick={() => window.open("https://example.org/check-in", "_blank")}
                      >
                        Check-In
                      </button>
                      <button
                        type="button"
                        aria-label="Ask for help at the International Student Hub"
                        className="inline-flex items-center justify-center px-6 py-3 rounded-full font-medium text-white bg-teal-600 hover:bg-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-500 transition"
                        onClick={() => window.open("mailto:support@example.org", "_blank")}
                      >
                        Ask for Help
                      </button>
                      <button
                        type="button"
                        aria-label="Explore programs for international students"
                        className="inline-flex items-center justify-center px-6 py-3 rounded-full font-medium text-white bg-teal-600 hover:bg-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-500 transition"
                        onClick={() => window.open("https://www.study.nsw.gov.au/", "_blank")}
                      >
                        Explore Programs
                      </button>
                    </div>
                  </div>
                  <aside className="space-y-6">
                    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm backdrop-blur p-6 space-y-5">
                      <div className="flex items-center gap-2 text-slate-700">
                        <CalendarDays className="w-5 h-5" />
                        <span className="font-semibold">Local time &amp; date</span>
                      </div>
                      <div className="text-2xl font-bold text-slate-900">{dateStr}</div>
                    </div>
                  </aside>
                </div>
                <div className="space-y-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div className="space-y-1.5">
                      <h2 className="text-2xl font-semibold text-slate-900">What’s on today</h2>
                      <p className="text-sm text-muted-foreground">
                        Updates for international students visiting the Welcome Hub
                      </p>
                    </div>
                    <a
                      href="https://www.study.nsw.gov.au/events"
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-medium text-teal-600 hover:text-teal-700 transition inline-flex items-center gap-1"
                    >
                      View all announcements <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {UPCOMING_ACTIVITIES.map((activity) => (
                      <div
                        key={activity.id}
                        className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5 space-y-3 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-lg font-semibold text-slate-900">{activity.title}</h3>
                          <Megaphone className="h-4 w-4 text-teal-500 shrink-0" aria-hidden="true" />
                        </div>
                        <p className="text-sm font-medium text-slate-600">{activity.schedule}</p>
                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
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
