'use client';

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
    titleKey: "activityOrientationTitle",
    scheduleKey: "activityOrientationSchedule",
    descriptionKey: "activityOrientationDescription",
  },
  {
    id: "lounge",
    titleKey: "activityLoungeTitle",
    scheduleKey: "activityLoungeSchedule",
    descriptionKey: "activityLoungeDescription",
  },
  {
    id: "briefing",
    titleKey: "activityBriefingTitle",
    scheduleKey: "activityBriefingSchedule",
    descriptionKey: "activityBriefingDescription",
  },
] as const;

const COUNTRY_OPTIONS = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo (Republic)",
  "Congo (Democratic Republic)",
  "Costa Rica",
  "Côte d’Ivoire",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
  "Other",
] as const;

type PhoneCountryCode = {
  country: string;
  dial: string;
  iso: string;
  flag: string;
};

const PHONE_COUNTRY_CODE_DATA: Array<{ country: string; dial: string; iso: string }> = [
  { country: "Afghanistan", dial: "+93", iso: "AF" },
  { country: "Albania", dial: "+355", iso: "AL" },
  { country: "Algeria", dial: "+213", iso: "DZ" },
  { country: "Andorra", dial: "+376", iso: "AD" },
  { country: "Angola", dial: "+244", iso: "AO" },
  { country: "Antigua and Barbuda", dial: "+1-268", iso: "AG" },
  { country: "Argentina", dial: "+54", iso: "AR" },
  { country: "Armenia", dial: "+374", iso: "AM" },
  { country: "Australia", dial: "+61", iso: "AU" },
  { country: "Austria", dial: "+43", iso: "AT" },
  { country: "Azerbaijan", dial: "+994", iso: "AZ" },
  { country: "Bahamas", dial: "+1-242", iso: "BS" },
  { country: "Bahrain", dial: "+973", iso: "BH" },
  { country: "Bangladesh", dial: "+880", iso: "BD" },
  { country: "Barbados", dial: "+1-246", iso: "BB" },
  { country: "Belarus", dial: "+375", iso: "BY" },
  { country: "Belgium", dial: "+32", iso: "BE" },
  { country: "Belize", dial: "+501", iso: "BZ" },
  { country: "Benin", dial: "+229", iso: "BJ" },
  { country: "Bhutan", dial: "+975", iso: "BT" },
  { country: "Bolivia", dial: "+591", iso: "BO" },
  { country: "Bosnia and Herzegovina", dial: "+387", iso: "BA" },
  { country: "Botswana", dial: "+267", iso: "BW" },
  { country: "Brazil", dial: "+55", iso: "BR" },
  { country: "Brunei", dial: "+673", iso: "BN" },
  { country: "Bulgaria", dial: "+359", iso: "BG" },
  { country: "Burkina Faso", dial: "+226", iso: "BF" },
  { country: "Burundi", dial: "+257", iso: "BI" },
  { country: "Cabo Verde", dial: "+238", iso: "CV" },
  { country: "Cambodia", dial: "+855", iso: "KH" },
  { country: "Cameroon", dial: "+237", iso: "CM" },
  { country: "Canada", dial: "+1", iso: "CA" },
  { country: "Central African Republic", dial: "+236", iso: "CF" },
  { country: "Chad", dial: "+235", iso: "TD" },
  { country: "Chile", dial: "+56", iso: "CL" },
  { country: "China", dial: "+86", iso: "CN" },
  { country: "Colombia", dial: "+57", iso: "CO" },
  { country: "Comoros", dial: "+269", iso: "KM" },
  { country: "Congo (Republic)", dial: "+242", iso: "CG" },
  { country: "Congo (Democratic Republic)", dial: "+243", iso: "CD" },
  { country: "Costa Rica", dial: "+506", iso: "CR" },
  { country: "Côte d’Ivoire", dial: "+225", iso: "CI" },
  { country: "Croatia", dial: "+385", iso: "HR" },
  { country: "Cuba", dial: "+53", iso: "CU" },
  { country: "Cyprus", dial: "+357", iso: "CY" },
  { country: "Czech Republic", dial: "+420", iso: "CZ" },
  { country: "Denmark", dial: "+45", iso: "DK" },
  { country: "Djibouti", dial: "+253", iso: "DJ" },
  { country: "Dominica", dial: "+1-767", iso: "DM" },
  { country: "Dominican Republic", dial: "+1-809", iso: "DO" },
  { country: "Ecuador", dial: "+593", iso: "EC" },
  { country: "Egypt", dial: "+20", iso: "EG" },
  { country: "El Salvador", dial: "+503", iso: "SV" },
  { country: "Equatorial Guinea", dial: "+240", iso: "GQ" },
  { country: "Eritrea", dial: "+291", iso: "ER" },
  { country: "Estonia", dial: "+372", iso: "EE" },
  { country: "Eswatini", dial: "+268", iso: "SZ" },
  { country: "Ethiopia", dial: "+251", iso: "ET" },
  { country: "Fiji", dial: "+679", iso: "FJ" },
  { country: "Finland", dial: "+358", iso: "FI" },
  { country: "France", dial: "+33", iso: "FR" },
  { country: "Gabon", dial: "+241", iso: "GA" },
  { country: "Gambia", dial: "+220", iso: "GM" },
  { country: "Georgia", dial: "+995", iso: "GE" },
  { country: "Germany", dial: "+49", iso: "DE" },
  { country: "Ghana", dial: "+233", iso: "GH" },
  { country: "Greece", dial: "+30", iso: "GR" },
  { country: "Grenada", dial: "+1-473", iso: "GD" },
  { country: "Guatemala", dial: "+502", iso: "GT" },
  { country: "Guinea", dial: "+224", iso: "GN" },
  { country: "Guinea-Bissau", dial: "+245", iso: "GW" },
  { country: "Guyana", dial: "+592", iso: "GY" },
  { country: "Haiti", dial: "+509", iso: "HT" },
  { country: "Honduras", dial: "+504", iso: "HN" },
  { country: "Hungary", dial: "+36", iso: "HU" },
  { country: "Iceland", dial: "+354", iso: "IS" },
  { country: "India", dial: "+91", iso: "IN" },
  { country: "Indonesia", dial: "+62", iso: "ID" },
  { country: "Iran", dial: "+98", iso: "IR" },
  { country: "Iraq", dial: "+964", iso: "IQ" },
  { country: "Ireland", dial: "+353", iso: "IE" },
  { country: "Israel", dial: "+972", iso: "IL" },
  { country: "Italy", dial: "+39", iso: "IT" },
  { country: "Jamaica", dial: "+1-876", iso: "JM" },
  { country: "Japan", dial: "+81", iso: "JP" },
  { country: "Jordan", dial: "+962", iso: "JO" },
  { country: "Kazakhstan", dial: "+7", iso: "KZ" },
  { country: "Kenya", dial: "+254", iso: "KE" },
  { country: "Kiribati", dial: "+686", iso: "KI" },
  { country: "Kuwait", dial: "+965", iso: "KW" },
  { country: "Kyrgyzstan", dial: "+996", iso: "KG" },
  { country: "Laos", dial: "+856", iso: "LA" },
  { country: "Latvia", dial: "+371", iso: "LV" },
  { country: "Lebanon", dial: "+961", iso: "LB" },
  { country: "Lesotho", dial: "+266", iso: "LS" },
  { country: "Liberia", dial: "+231", iso: "LR" },
  { country: "Libya", dial: "+218", iso: "LY" },
  { country: "Liechtenstein", dial: "+423", iso: "LI" },
  { country: "Lithuania", dial: "+370", iso: "LT" },
  { country: "Luxembourg", dial: "+352", iso: "LU" },
  { country: "Madagascar", dial: "+261", iso: "MG" },
  { country: "Malawi", dial: "+265", iso: "MW" },
  { country: "Malaysia", dial: "+60", iso: "MY" },
  { country: "Maldives", dial: "+960", iso: "MV" },
  { country: "Mali", dial: "+223", iso: "ML" },
  { country: "Malta", dial: "+356", iso: "MT" },
  { country: "Marshall Islands", dial: "+692", iso: "MH" },
  { country: "Mauritania", dial: "+222", iso: "MR" },
  { country: "Mauritius", dial: "+230", iso: "MU" },
  { country: "Mexico", dial: "+52", iso: "MX" },
  { country: "Micronesia", dial: "+691", iso: "FM" },
  { country: "Moldova", dial: "+373", iso: "MD" },
  { country: "Monaco", dial: "+377", iso: "MC" },
  { country: "Mongolia", dial: "+976", iso: "MN" },
  { country: "Montenegro", dial: "+382", iso: "ME" },
  { country: "Morocco", dial: "+212", iso: "MA" },
  { country: "Mozambique", dial: "+258", iso: "MZ" },
  { country: "Myanmar", dial: "+95", iso: "MM" },
  { country: "Namibia", dial: "+264", iso: "NA" },
  { country: "Nauru", dial: "+674", iso: "NR" },
  { country: "Nepal", dial: "+977", iso: "NP" },
  { country: "Netherlands", dial: "+31", iso: "NL" },
  { country: "New Zealand", dial: "+64", iso: "NZ" },
  { country: "Nicaragua", dial: "+505", iso: "NI" },
  { country: "Niger", dial: "+227", iso: "NE" },
  { country: "Nigeria", dial: "+234", iso: "NG" },
  { country: "North Korea", dial: "+850", iso: "KP" },
  { country: "North Macedonia", dial: "+389", iso: "MK" },
  { country: "Norway", dial: "+47", iso: "NO" },
  { country: "Oman", dial: "+968", iso: "OM" },
  { country: "Pakistan", dial: "+92", iso: "PK" },
  { country: "Palau", dial: "+680", iso: "PW" },
  { country: "Panama", dial: "+507", iso: "PA" },
  { country: "Papua New Guinea", dial: "+675", iso: "PG" },
  { country: "Paraguay", dial: "+595", iso: "PY" },
  { country: "Peru", dial: "+51", iso: "PE" },
  { country: "Philippines", dial: "+63", iso: "PH" },
  { country: "Poland", dial: "+48", iso: "PL" },
  { country: "Portugal", dial: "+351", iso: "PT" },
  { country: "Qatar", dial: "+974", iso: "QA" },
  { country: "Romania", dial: "+40", iso: "RO" },
  { country: "Russia", dial: "+7", iso: "RU" },
  { country: "Rwanda", dial: "+250", iso: "RW" },
  { country: "Saint Kitts and Nevis", dial: "+1-869", iso: "KN" },
  { country: "Saint Lucia", dial: "+1-758", iso: "LC" },
  { country: "Saint Vincent and the Grenadines", dial: "+1-784", iso: "VC" },
  { country: "Samoa", dial: "+685", iso: "WS" },
  { country: "San Marino", dial: "+378", iso: "SM" },
  { country: "Sao Tome and Principe", dial: "+239", iso: "ST" },
  { country: "Saudi Arabia", dial: "+966", iso: "SA" },
  { country: "Senegal", dial: "+221", iso: "SN" },
  { country: "Serbia", dial: "+381", iso: "RS" },
  { country: "Seychelles", dial: "+248", iso: "SC" },
  { country: "Sierra Leone", dial: "+232", iso: "SL" },
  { country: "Singapore", dial: "+65", iso: "SG" },
  { country: "Slovakia", dial: "+421", iso: "SK" },
  { country: "Slovenia", dial: "+386", iso: "SI" },
  { country: "Solomon Islands", dial: "+677", iso: "SB" },
  { country: "Somalia", dial: "+252", iso: "SO" },
  { country: "South Africa", dial: "+27", iso: "ZA" },
  { country: "South Korea", dial: "+82", iso: "KR" },
  { country: "South Sudan", dial: "+211", iso: "SS" },
  { country: "Spain", dial: "+34", iso: "ES" },
  { country: "Sri Lanka", dial: "+94", iso: "LK" },
  { country: "Sudan", dial: "+249", iso: "SD" },
  { country: "Suriname", dial: "+597", iso: "SR" },
  { country: "Sweden", dial: "+46", iso: "SE" },
  { country: "Switzerland", dial: "+41", iso: "CH" },
  { country: "Syria", dial: "+963", iso: "SY" },
  { country: "Taiwan", dial: "+886", iso: "TW" },
  { country: "Tajikistan", dial: "+992", iso: "TJ" },
  { country: "Tanzania", dial: "+255", iso: "TZ" },
  { country: "Thailand", dial: "+66", iso: "TH" },
  { country: "Timor-Leste", dial: "+670", iso: "TL" },
  { country: "Togo", dial: "+228", iso: "TG" },
  { country: "Tonga", dial: "+676", iso: "TO" },
  { country: "Trinidad and Tobago", dial: "+1-868", iso: "TT" },
  { country: "Tunisia", dial: "+216", iso: "TN" },
  { country: "Turkey", dial: "+90", iso: "TR" },
  { country: "Turkmenistan", dial: "+993", iso: "TM" },
  { country: "Tuvalu", dial: "+688", iso: "TV" },
  { country: "Uganda", dial: "+256", iso: "UG" },
  { country: "Ukraine", dial: "+380", iso: "UA" },
  { country: "United Arab Emirates", dial: "+971", iso: "AE" },
  { country: "United Kingdom", dial: "+44", iso: "GB" },
  { country: "United States", dial: "+1", iso: "US" },
  { country: "Uruguay", dial: "+598", iso: "UY" },
  { country: "Uzbekistan", dial: "+998", iso: "UZ" },
  { country: "Vanuatu", dial: "+678", iso: "VU" },
  { country: "Vatican City", dial: "+379", iso: "VA" },
  { country: "Venezuela", dial: "+58", iso: "VE" },
  { country: "Vietnam", dial: "+84", iso: "VN" },
  { country: "Yemen", dial: "+967", iso: "YE" },
  { country: "Zambia", dial: "+260", iso: "ZM" },
  { country: "Zimbabwe", dial: "+263", iso: "ZW" },
  { country: "Other", dial: "", iso: "" },
] as const;

function isoToFlag(iso: string): string {
  if (!iso) return "🌐";
  const letters = iso.toUpperCase().replace(/[^A-Z]/g, "");
  if (letters.length !== 2) return "🌐";
  return letters
    .split("")
    .map((char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
    .join("");
}

const PHONE_COUNTRY_CODES: PhoneCountryCode[] = PHONE_COUNTRY_CODE_DATA.map((entry) => ({
  ...entry,
  flag: isoToFlag(entry.iso),
}));

const PHONE_COUNTRY_CODE_MAP: Record<string, string> = PHONE_COUNTRY_CODES.reduce(
  (acc, entry) => {
    acc[entry.country] = entry.dial;
    return acc;
  },
  {} as Record<string, string>
);

const FIELD_CLASS =
  "rounded-2xl border border-slate-200/70 bg-white/70 px-4 py-3 text-sm text-slate-900 shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-1 focus-visible:bg-white";

const LABEL_CLASS = "text-sm font-semibold text-slate-600";

const INSTITUTION_OPTIONS = [
  "University of Sydney (USYD)",
  "University of New South Wales (UNSW Sydney)",
  "Macquarie University",
  "University of Technology Sydney (UTS)",
  "Western Sydney University (WSU)",
  "TAFE NSW",
  "International College of Management Sydney (ICMS)",
  "Australian College of Applied Psychology (ACAP)",
  "Kaplan Business School Sydney",
  "Other",
] as const;

const ASSISTANCE_OPTIONS = [
  { id: "airport", labelKey: "formAssistanceOption_airport" },
  { id: "communication", labelKey: "formAssistanceOption_communication" },
  { id: "lostLuggage", labelKey: "formAssistanceOption_lostLuggage" },
  { id: "emergency", labelKey: "formAssistanceOption_emergency" },
  { id: "internet", labelKey: "formAssistanceOption_internet" },
  { id: "directions", labelKey: "formAssistanceOption_directions" },
  { id: "other", labelKey: "formAssistanceOtherOption" },
] as const;

const SCALE_OPTIONS = ["1", "2", "3", "4", "5"] as const;

type CheckinFormState = {
  firstName: string;
  lastName: string;
  primaryEmail: string;
  schoolEmail: string;
  mobileNumber: string;
  phoneCountryCode: string;
  originCountry: string;
  originCountryOther: string;
  educationInstitution: string;
  educationInstitutionOther: string;
  newToAustralia: string;
  australiaDuration: string;
  assistanceNeeded: string;
  assistanceOther: string;
  connectImportance: string;
  helpfulRating: string;
};

const CHECKIN_FORM_DEFAULT: CheckinFormState = {
  firstName: "",
  lastName: "",
  primaryEmail: "",
  schoolEmail: "",
  mobileNumber: "",
  phoneCountryCode: "+61",
  originCountry: "",
  originCountryOther: "",
  educationInstitution: "",
  educationInstitutionOther: "",
  newToAustralia: "",
  australiaDuration: "",
  assistanceNeeded: "",
  assistanceOther: "",
  connectImportance: "",
  helpfulRating: "",
};

function createEmptyCheckinForm(): CheckinFormState {
  return { ...CHECKIN_FORM_DEFAULT };
}


/** ---- Component ---- */
export default function App() {
  const [lang, setLang] = React.useState<Lang>("en");

  React.useEffect(() => {
    const saved = localStorage.getItem("hub.lang");
    if (saved && LANGS.some((entry) => entry.code === saved)) {
      setLang(saved as Lang);
    }
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
  const [isCheckinOpen, setIsCheckinOpen] = React.useState(false);
  const [checkinForm, setCheckinForm] = React.useState<CheckinFormState>(() => createEmptyCheckinForm());
  const [isSubmittingCheckin, setIsSubmittingCheckin] = React.useState(false);
  const [checkinError, setCheckinError] = React.useState<string | null>(null);
  const [checkinSuccess, setCheckinSuccess] = React.useState(false);
  const [showCheckinBanner, setShowCheckinBanner] = React.useState(false);
  const [countrySearch, setCountrySearch] = React.useState("");
  const [countrySearchVisible, setCountrySearchVisible] = React.useState(false);
  const [phoneCodeSearch, setPhoneCodeSearch] = React.useState("");
  const [phoneCodeSearchVisible, setPhoneCodeSearchVisible] = React.useState(false);
  const checkinSuccessTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const checkinCloseTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

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

  React.useEffect(() => {
    return () => {
      if (checkinSuccessTimer.current) {
        clearTimeout(checkinSuccessTimer.current);
        checkinSuccessTimer.current = null;
      }
      if (checkinCloseTimer.current) {
        clearTimeout(checkinCloseTimer.current);
        checkinCloseTimer.current = null;
      }
    };
  }, []);

  const cardsTransform = cardsVisible ? "translateY(0)" : "translateY(40px)";
  const cardsOpacity = cardsVisible ? 1 : 0;
  const filteredCountries = React.useMemo(() => {
    const query = countrySearch.trim().toLowerCase();
    if (!query) return COUNTRY_OPTIONS;
    return COUNTRY_OPTIONS.filter((country) => country.toLowerCase().includes(query));
  }, [countrySearch]);

  const filteredPhoneCodes = React.useMemo(() => {
    const query = phoneCodeSearch.trim().toLowerCase();
    if (!query) return PHONE_COUNTRY_CODES;
    return PHONE_COUNTRY_CODES.filter(
      (entry) =>
        entry.country.toLowerCase().includes(query) ||
        entry.dial.toLowerCase().includes(query) ||
        entry.flag.toLowerCase().includes(query)
    );
  }, [phoneCodeSearch]);

  function handleCheckinInputChange<K extends keyof CheckinFormState>(key: K) {
    return (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      setCheckinForm((prev) => ({ ...prev, [key]: value }));
    };
  }

  function handleCheckinSelectChange<K extends keyof CheckinFormState>(key: K) {
    return (event: React.ChangeEvent<HTMLSelectElement>) => {
      const value = event.target.value;
      setCheckinForm((prev) => {
        const next = { ...prev, [key]: value };
        if (key === "originCountry" && value !== "Other") {
          next.originCountryOther = "";
          const dial = PHONE_COUNTRY_CODE_MAP[value] ?? next.phoneCountryCode;
          if (dial) next.phoneCountryCode = dial;
        }
        if (key === "educationInstitution" && value !== "Other") {
          next.educationInstitutionOther = "";
        }
        if (key === "newToAustralia" && value !== "No") {
          next.australiaDuration = "";
        }
        return next;
      });
    };
  }

  function handleAssistanceSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;
    setCheckinForm((prev) => ({
      ...prev,
      assistanceNeeded: value,
      assistanceOther: value === "other" ? prev.assistanceOther : "",
    }));
  }

  function handlePhoneCountryCodeChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;
    setCheckinForm((prev) => ({ ...prev, phoneCountryCode: value }));
  }

  function handleCheckinRatingChange<K extends keyof CheckinFormState>(key: K, value: string) {
    setCheckinForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleCheckinSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmittingCheckin) return;
    setIsSubmittingCheckin(true);
    setCheckinError(null);

    try {
      const trimmed = {
        firstName: checkinForm.firstName.trim(),
        lastName: checkinForm.lastName.trim(),
        primaryEmail: checkinForm.primaryEmail.trim(),
        schoolEmail: checkinForm.schoolEmail.trim(),
        mobileNumber: checkinForm.mobileNumber.trim(),
        phoneCountryCode: checkinForm.phoneCountryCode.trim(),
        originCountry: checkinForm.originCountry.trim(),
        originCountryOther: checkinForm.originCountryOther.trim(),
        educationInstitution: checkinForm.educationInstitution.trim(),
        educationInstitutionOther: checkinForm.educationInstitutionOther.trim(),
        newToAustralia: checkinForm.newToAustralia.trim(),
        australiaDuration: checkinForm.australiaDuration.trim(),
        assistanceNeeded: checkinForm.assistanceNeeded.trim(),
        assistanceOther: checkinForm.assistanceOther.trim(),
        connectImportance: checkinForm.connectImportance.trim(),
        helpfulRating: checkinForm.helpfulRating.trim(),
      };

      const assistanceOption = ASSISTANCE_OPTIONS.find((option) => option.id === trimmed.assistanceNeeded);
      const assistanceLabel = assistanceOption
        ? assistanceOption.id === "other"
          ? t("en", "formOptionOther")
          : t("en", assistanceOption.labelKey)
        : trimmed.assistanceNeeded;

      if (!trimmed.firstName || !trimmed.lastName) {
        throw new Error(t(lang, "formErrorName"));
      }
      if (!trimmed.phoneCountryCode) {
        throw new Error(t(lang, "formErrorPhoneCode"));
      }
      if (!trimmed.primaryEmail) {
        throw new Error(t(lang, "formErrorPrimaryEmail"));
      }
      if (!trimmed.originCountry) {
        throw new Error(t(lang, "formErrorCountry"));
      }
      if (trimmed.originCountry === "Other" && !trimmed.originCountryOther) {
        throw new Error(t(lang, "formErrorCountryOther"));
      }
      if (!trimmed.educationInstitution) {
        throw new Error(t(lang, "formErrorInstitution"));
      }
      if (trimmed.educationInstitution === "Other" && !trimmed.educationInstitutionOther) {
        throw new Error(t(lang, "formErrorInstitutionOther"));
      }
      if (!trimmed.newToAustralia) {
        throw new Error(t(lang, "formErrorNewToAustralia"));
      }
      if (trimmed.newToAustralia === "No" && !trimmed.australiaDuration) {
        throw new Error(t(lang, "formErrorNewToAustraliaDuration"));
      }
      if (!trimmed.assistanceNeeded) {
        throw new Error(t(lang, "formErrorAssistance"));
      }
      if (trimmed.assistanceNeeded === "other" && !trimmed.assistanceOther) {
        throw new Error(t(lang, "formErrorAssistanceOther"));
      }
      if (!trimmed.connectImportance) {
        throw new Error(t(lang, "formErrorConnectImportance"));
      }
      if (!trimmed.helpfulRating) {
        throw new Error(t(lang, "formErrorHelpfulRating"));
      }

      const payload = {
        ...trimmed,
        assistanceNeeded: assistanceLabel,
        phoneCountryCode: trimmed.phoneCountryCode,
        fullName: `${trimmed.firstName} ${trimmed.lastName}`.replace(/\s+/g, " ").trim(),
        lang,
      };

      const response = await fetch("/api/checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.error ?? t(lang, "formErrorSubmission"));
      }

      setCheckinForm(createEmptyCheckinForm());
      setCountrySearch("");
      setCountrySearchVisible(false);
      setCheckinSuccess(true);
      setShowCheckinBanner(true);
      if (checkinSuccessTimer.current) {
        clearTimeout(checkinSuccessTimer.current);
        checkinSuccessTimer.current = null;
      }
      if (checkinCloseTimer.current) {
        clearTimeout(checkinCloseTimer.current);
        checkinCloseTimer.current = null;
      }
      checkinSuccessTimer.current = setTimeout(() => {
        setShowCheckinBanner(false);
        checkinSuccessTimer.current = null;
      }, 6000);
      checkinCloseTimer.current = setTimeout(() => {
        setIsCheckinOpen(false);
        setCheckinSuccess(false);
        checkinCloseTimer.current = null;
      }, 1500);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : t(lang, "formErrorSubmission");
      setCheckinError(message);
    } finally {
      setIsSubmittingCheckin(false);
    }
  }

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
              aria-label={t(lang, "languageSelectorAria")}
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
          <div className="max-w-6xl mx-auto px-4 pt-8 sm:pt-10 pb-16">
            <div
              ref={cardsRef}
              className="relative z-10"
              style={{
                transform: cardsTransform,
                opacity: cardsOpacity,
                transition: "transform 0.4s ease, opacity 0.4s ease",
              }}
            >
              <div className="rounded-3xl bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.95)_0%,_rgba(255,255,255,0.88)_60%,_rgba(255,255,255,0.82)_100%)] shadow-xl ring-1 ring-slate-100 p-8 md:p-12 space-y-8 backdrop-blur max-w-4xl mx-auto">
                <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,320px)] items-start">
                  <div className="space-y-8">
                    <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-slate-900">
                      {t(lang, "welcome")}
                    </h1>
                    <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
                      {t(lang, "heroIntro")}
                    </p>
                    {showCheckinBanner ? (
                      <div className="rounded-2xl border border-emerald-500/40 bg-emerald-600/10 px-4 py-3 text-sm font-semibold text-emerald-900 shadow-sm backdrop-blur">
                        {t(lang, "formSuccessBanner")}
                      </div>
                    ) : null}
                    <div className="flex flex-wrap gap-4 pt-2">
                      <Dialog
                        open={isCheckinOpen}
                        onOpenChange={(open) => {
                          setIsCheckinOpen(open);
                          if (!open) {
                            setCheckinError(null);
                            setCheckinForm(createEmptyCheckinForm());
                            setCountrySearch("");
                            setCountrySearchVisible(false);
                            if (checkinCloseTimer.current) {
                              clearTimeout(checkinCloseTimer.current);
                              checkinCloseTimer.current = null;
                            }
                            if (!checkinSuccess && checkinSuccessTimer.current) {
                              clearTimeout(checkinSuccessTimer.current);
                              checkinSuccessTimer.current = null;
                            }
                            setCheckinSuccess(false);
                          }
                        }}
                      >
                        <DialogTrigger asChild>
                          <button
                            type="button"
                            aria-label={t(lang, "heroCheckinAria")}
                            className="inline-flex items-center justify-center rounded-full bg-teal-600 px-6 py-3 font-medium text-white transition hover:bg-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-500"
                          >
                            {t(lang, "heroCheckinButton")}
                          </button>
                        </DialogTrigger>
                        <DialogContent className="max-h-[70vh] overflow-hidden border border-white/60 bg-white/90 shadow-2xl backdrop-blur sm:max-w-[520px]">
                          <DialogHeader className="space-y-2">
                            <DialogTitle>{t(lang, "heroCheckinButton")}</DialogTitle>
                            <DialogDescription>{t(lang, "heroCheckinDescription")}</DialogDescription>
                          </DialogHeader>
                          {checkinError ? (
                            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                              {checkinError}
                            </div>
                          ) : null}
                          <div className="max-h-[55vh] space-y-5 overflow-y-auto pr-1">
                            {checkinSuccess ? (
                              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-5 text-sm font-medium text-emerald-800">
                                {t(lang, "formSuccessModal")}
                              </div>
                            ) : (
                              <form onSubmit={handleCheckinSubmit} className="space-y-5">
                                <div className="grid gap-1.5">
                                  <Label htmlFor="checkin-first-name" className={LABEL_CLASS}>
                                    {t(lang, "formFirstNameLabel")} <span className="text-red-500">*</span>
                                  </Label>
                                  <Input
                                    id="checkin-first-name"
                                    autoComplete="given-name"
                                    value={checkinForm.firstName}
                                    onChange={handleCheckinInputChange("firstName")}
                                    className={FIELD_CLASS}
                                  />
                                </div>

                                <div className="grid gap-1.5">
                                  <Label htmlFor="checkin-last-name" className={LABEL_CLASS}>
                                    {t(lang, "formLastNameLabel")} <span className="text-red-500">*</span>
                                  </Label>
                                  <Input
                                    id="checkin-last-name"
                                    autoComplete="family-name"
                                    value={checkinForm.lastName}
                                    onChange={handleCheckinInputChange("lastName")}
                                    className={FIELD_CLASS}
                                  />
                                </div>

                                <div className="grid gap-1.5">
                                  <Label htmlFor="checkin-primary-email" className={LABEL_CLASS}>
                                    {t(lang, "formPrimaryEmailLabel")} <span className="text-red-500">*</span>
                                  </Label>
                                  <Input
                                    id="checkin-primary-email"
                                    type="email"
                                    autoComplete="email"
                                    value={checkinForm.primaryEmail}
                                    onChange={handleCheckinInputChange("primaryEmail")}
                                    className={FIELD_CLASS}
                                  />
                                </div>

                                <div className="grid gap-1.5">
                                  <Label htmlFor="checkin-school-email" className={LABEL_CLASS}>
                                    {t(lang, "formSchoolEmailLabel")}
                                  </Label>
                                  <Input
                                    id="checkin-school-email"
                                    type="email"
                                    value={checkinForm.schoolEmail}
                                    onChange={handleCheckinInputChange("schoolEmail")}
                                    className={FIELD_CLASS}
                                  />
                                </div>

                                <div className="grid gap-1.5">
                                  <Label htmlFor="checkin-mobile" className={LABEL_CLASS}>
                                    {t(lang, "formMobileLabel")} <span className="text-red-500">*</span>
                                  </Label>
                                  <div className="flex items-center gap-2">
                                    <div className="flex-1">
                                      {phoneCodeSearchVisible ? (
                                        <Input
                                          id="phone-code-search"
                                          value={phoneCodeSearch}
                                          onChange={(event) => setPhoneCodeSearch(event.target.value)}
                                          aria-label={t(lang, "formPhoneCodeSearchLabel")}
                                          className={`${FIELD_CLASS} mb-2`}
                                          onBlur={(event) => {
                                            const related = event.relatedTarget as HTMLElement | null;
                                            if (related?.id !== "phone-country-code") {
                                              setPhoneCodeSearchVisible(false);
                                              setPhoneCodeSearch("");
                                            }
                                          }}
                                          onFocus={() => setPhoneCodeSearchVisible(true)}
                                          autoFocus
                                        />
                                      ) : null}
                                      <select
                                        id="phone-country-code"
                                        aria-label={t(lang, "formPhoneCountryCodeLabel")}
                                        value={checkinForm.phoneCountryCode}
                                        onChange={handlePhoneCountryCodeChange}
                                        onFocus={() => setPhoneCodeSearchVisible(true)}
                                        onBlur={(event) => {
                                          const related = event.relatedTarget as HTMLElement | null;
                                          if (related?.id !== "phone-code-search") {
                                            setPhoneCodeSearchVisible(false);
                                            setPhoneCodeSearch("");
                                          }
                                        }}
                                        className={`${FIELD_CLASS} appearance-none cursor-pointer pr-8`}
                                      >
                                        {filteredPhoneCodes.map((entry) => (
                                          <option key={`${entry.country}-${entry.dial}`} value={entry.dial}>
                                            {entry.flag} {entry.dial || t(lang, "formPhoneCustomLabel")}
                                          </option>
                                        ))}
                                      </select>
                                      {filteredPhoneCodes.length === 0 ? (
                                        <p className="mt-1 text-xs text-muted-foreground">{t(lang, "formNoCodesFound")}</p>
                                      ) : null}
                                    </div>
                                    <Input
                                      id="checkin-mobile"
                                      type="tel"
                                      autoComplete="tel"
                                      value={checkinForm.mobileNumber}
                                      onChange={handleCheckinInputChange("mobileNumber")}
                                      className={`${FIELD_CLASS} flex-[1.2]`}
                                    />
                                  </div>
                                </div>

                                <div className="grid gap-1.5">
                                  <Label htmlFor="checkin-origin" className={LABEL_CLASS}>
                                    {t(lang, "formCountryLabel")} <span className="text-red-500">*</span>
                                  </Label>
                                  {countrySearchVisible ? (
                                    <Input
                                      id="checkin-origin-search"
                                      value={countrySearch}
                                      onChange={(event) => setCountrySearch(event.target.value)}
                                      aria-label={t(lang, "formCountrySearchLabel")}
                                      className={`${FIELD_CLASS} mb-2`}
                                      onBlur={(event) => {
                                        const related = event.relatedTarget as HTMLElement | null;
                                        if (related?.id !== "checkin-origin") {
                                          setCountrySearchVisible(false);
                                          setCountrySearch("");
                                        }
                                      }}
                                      onFocus={() => setCountrySearchVisible(true)}
                                      autoFocus
                                    />
                                  ) : null}
                                  <select
                                    id="checkin-origin"
                                    value={checkinForm.originCountry}
                                    onChange={handleCheckinSelectChange("originCountry")}
                                    onFocus={() => setCountrySearchVisible(true)}
                                    onBlur={(event) => {
                                      const related = event.relatedTarget as HTMLElement | null;
                                      if (related?.id !== "checkin-origin-search") {
                                        setCountrySearchVisible(false);
                                        setCountrySearch("");
                                      }
                                    }}
                                    className={`${FIELD_CLASS} appearance-none cursor-pointer pr-8`}
                                  >
                                    <option value="">{t(lang, "formCountrySelectPlaceholder")}</option>
                                    {filteredCountries.map((country) => (
                                      <option key={country} value={country}>
                                        {country === "Other" ? t(lang, "formOptionOther") : country}
                                      </option>
                                    ))}
                                  </select>
                                  {filteredCountries.length === 0 ? (
                                    <p className="text-xs text-muted-foreground">{t(lang, "formNoCountriesFound")}</p>
                                  ) : null}
                                  {checkinForm.originCountry === "Other" ? (
                                    <div className="grid gap-1.5">
                                      <Label htmlFor="checkin-origin-other" className={LABEL_CLASS}>
                                        {t(lang, "formCountryOtherLabel")}
                                      </Label>
                                      <Input
                                        id="checkin-origin-other"
                                        value={checkinForm.originCountryOther}
                                        onChange={handleCheckinInputChange("originCountryOther")}
                                        className={FIELD_CLASS}
                                      />
                                    </div>
                                  ) : null}
                                </div>

                                <div className="grid gap-1.5">
                                  <Label htmlFor="checkin-institution" className={LABEL_CLASS}>
                                    {t(lang, "formInstitutionLabel")} <span className="text-red-500">*</span>
                                  </Label>
                                  <select
                                    id="checkin-institution"
                                    value={checkinForm.educationInstitution}
                                    onChange={handleCheckinSelectChange("educationInstitution")}
                                    className={`${FIELD_CLASS} appearance-none cursor-pointer pr-8`}
                                  >
                                    <option value="">{t(lang, "formInstitutionSelectPlaceholder")}</option>
                                    {INSTITUTION_OPTIONS.map((institution) => (
                                      <option key={institution} value={institution}>
                                        {institution === "Other" ? t(lang, "formOptionOther") : institution}
                                      </option>
                                    ))}
                                  </select>
                                  {checkinForm.educationInstitution === "Other" ? (
                                    <div className="grid gap-1.5">
                                      <Label htmlFor="checkin-institution-other" className={LABEL_CLASS}>
                                        {t(lang, "formInstitutionOtherLabel")}
                                      </Label>
                                      <Input
                                        id="checkin-institution-other"
                                        value={checkinForm.educationInstitutionOther}
                                        onChange={handleCheckinInputChange("educationInstitutionOther")}
                                        className={FIELD_CLASS}
                                      />
                                    </div>
                                  ) : null}
                                </div>

                                <div className="grid gap-1.5">
                                  <Label htmlFor="checkin-new-aus" className={LABEL_CLASS}>
                                    {t(lang, "formNewToAustraliaLabel")} <span className="text-red-500">*</span>
                                  </Label>
                                  <select
                                    id="checkin-new-aus"
                                    value={checkinForm.newToAustralia}
                                    onChange={handleCheckinSelectChange("newToAustralia")}
                                    className={`${FIELD_CLASS} appearance-none cursor-pointer pr-8`}
                                  >
                                    <option value="">{t(lang, "formSelectOption")}</option>
                                    <option value="Yes">{t(lang, "formNewToAustraliaYes")}</option>
                                    <option value="No">{t(lang, "formNewToAustraliaNo")}</option>
                                  </select>
                                  {checkinForm.newToAustralia === "No" ? (
                                    <div className="grid gap-1.5">
                                      <Label htmlFor="checkin-aus-duration" className={LABEL_CLASS}>
                                        {t(lang, "formNewToAustraliaDurationLabel")}
                                      </Label>
                                      <Input
                                        id="checkin-aus-duration"
                                        value={checkinForm.australiaDuration}
                                        onChange={handleCheckinInputChange("australiaDuration")}
                                        className={FIELD_CLASS}
                                      />
                                    </div>
                                  ) : null}
                                </div>

                                <div className="grid gap-1.5">
                                  <Label htmlFor="checkin-assistance" className={LABEL_CLASS}>
                                    {t(lang, "formAssistanceLabel")} <span className="text-red-500">*</span>
                                  </Label>
                                  <select
                                    id="checkin-assistance"
                                    value={checkinForm.assistanceNeeded}
                                    onChange={handleAssistanceSelectChange}
                                    className={`${FIELD_CLASS} appearance-none cursor-pointer pr-8`}
                                  >
                                    <option value="">{t(lang, "formAssistanceSelectPlaceholder")}</option>
                                    {ASSISTANCE_OPTIONS.map((option) => (
                                      <option key={option.id} value={option.id}>
                                        {t(lang, option.labelKey)}
                                      </option>
                                    ))}
                                  </select>
                                  {checkinForm.assistanceNeeded === "other" ? (
                                    <div className="grid gap-1.5">
                                      <Label htmlFor="checkin-assistance-other" className={LABEL_CLASS}>
                                        {t(lang, "formAssistanceOtherLabel")}
                                      </Label>
                                      <textarea
                                        id="checkin-assistance-other"
                                        value={checkinForm.assistanceOther}
                                        onChange={handleCheckinInputChange("assistanceOther")}
                                        className={`${FIELD_CLASS} min-h-[96px] resize-y`}
                                      />
                                    </div>
                                  ) : null}
                                </div>

                                <div className="grid gap-1.5">
                                  <Label className={LABEL_CLASS}>
                                    {t(lang, "formRatingsConnectLabel")} <span className="text-red-500">*</span>
                                  </Label>
                                  <div role="radiogroup" className="flex items-center justify-between gap-2 rounded-2xl border border-slate-200/70 bg-white/60 px-4 py-3">
                                    {SCALE_OPTIONS.map((option) => {
                                      const selected = checkinForm.connectImportance === option;
                                      return (
                                        <button
                                          key={`connect-${option}`}
                                          type="button"
                                          role="radio"
                                          aria-checked={selected}
                                          onClick={() => handleCheckinRatingChange("connectImportance", option)}
                                          className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold transition ${
                                            selected
                                              ? "border-teal-600 bg-teal-600 text-white shadow-lg"
                                              : "border-slate-200 bg-white text-slate-700 hover:border-teal-300"
                                          }`}
                                        >
                                          {option}
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>

                                <div className="grid gap-1.5">
                                  <Label className={LABEL_CLASS}>
                                    {t(lang, "formRatingsHelpfulLabel")} <span className="text-red-500">*</span>
                                  </Label>
                                  <div role="radiogroup" className="flex items-center justify-between gap-2 rounded-2xl border border-slate-200/70 bg-white/60 px-4 py-3">
                                    {SCALE_OPTIONS.map((option) => {
                                      const selected = checkinForm.helpfulRating === option;
                                      return (
                                        <button
                                          key={`helpful-${option}`}
                                          type="button"
                                          role="radio"
                                          aria-checked={selected}
                                          onClick={() => handleCheckinRatingChange("helpfulRating", option)}
                                          className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold transition ${
                                            selected
                                              ? "border-teal-600 bg-teal-600 text-white shadow-lg"
                                              : "border-slate-200 bg-white text-slate-700 hover:border-teal-300"
                                          }`}
                                        >
                                          {option}
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>

                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
                                  <Button type="submit" className="w-full sm:w-auto" disabled={isSubmittingCheckin}>
                                    {isSubmittingCheckin ? t(lang, "formSubmitting") : t(lang, "formSubmitButton")}
                                  </Button>
                                </div>
                              </form>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                      <button
                        type="button"
                        aria-label={t(lang, "heroHelpAria")}
                        className="inline-flex items-center justify-center rounded-full bg-teal-600 px-6 py-3 font-medium text-white transition hover:bg-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-500"
                        onClick={() => window.open("mailto:support@example.org", "_blank")}
                      >
                        {t(lang, "heroHelpButton")}
                      </button>
                      <button
                        type="button"
                        aria-label={t(lang, "heroExploreAria")}
                        className="inline-flex items-center justify-center rounded-full bg-teal-600 px-6 py-3 font-medium text-white transition hover:bg-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-500"
                        onClick={() => window.open("https://www.study.nsw.gov.au/", "_blank")}
                      >
                        {t(lang, "heroExploreButton")}
                      </button>
                    </div>
                  </div>
                  <aside>
                    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm backdrop-blur px-3 py-3 md:px-4 md:py-4 space-y-2">
                      <div className="flex items-center gap-2 text-sm md:text-base text-slate-700">
                        <CalendarDays className="w-4 h-4 md:w-5 md:h-5" />
                        <span className="font-semibold">{t(lang, "localTime")}</span>
                      </div>
                      <div className="text-lg md:text-xl font-bold text-slate-900 leading-tight">{dateStr}</div>
                    </div>
                  </aside>
                </div>
                <div className="space-y-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div className="space-y-1.5">
                      <h2 className="text-2xl font-semibold text-slate-900">{t(lang, "whatsOnHeading")}</h2>
                      <p className="text-sm text-muted-foreground">{t(lang, "whatsOnSubheading")}</p>
                    </div>
                    <a
                      href="https://www.study.nsw.gov.au/events"
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-medium text-teal-600 hover:text-teal-700 transition inline-flex items-center gap-1"
                    >
                      {t(lang, "announcementsLink")} <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {UPCOMING_ACTIVITIES.map((activity) => (
                      <div
                        key={activity.id}
                        className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5 space-y-3 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-lg font-semibold text-slate-900">{t(lang, activity.titleKey)}</h3>
                          <Megaphone className="h-4 w-4 text-teal-500 shrink-0" aria-hidden="true" />
                        </div>
                        <p className="text-sm font-medium text-slate-600">{t(lang, activity.scheduleKey)}</p>
                        <p className="text-sm text-muted-foreground">{t(lang, activity.descriptionKey)}</p>
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
