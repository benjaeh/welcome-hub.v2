import { NextResponse } from "next/server";

const REQUIRED_MESSAGE = "Required check-in details are missing.";

type CheckinSubmission = {
  firstName: string;
  lastName: string;
  fullName: string;
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
  lang: unknown;
  submittedAt: string;
};

function normalizeApiBaseUrl(rawUrl: string): string {
  const trimmed = rawUrl.trim().replace(/\/+$/, "");

  if (trimmed.endsWith("/api/3")) {
    return trimmed;
  }

  const apiIndex = trimmed.indexOf("/api/3/");
  if (apiIndex >= 0) {
    return `${trimmed.slice(0, apiIndex)}/api/3`;
  }

  return `${trimmed}/api/3`;
}

function parseString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function parseTagIds(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((tagId) => tagId.trim())
    .filter(Boolean);
}

function parseListIds(raw: string | undefined, legacySingleListId: string): string[] {
  const fromList = raw
    ? raw
        .split(",")
        .map((listId) => listId.trim())
        .filter(Boolean)
    : [];

  const merged = [...fromList];
  if (legacySingleListId) {
    merged.push(legacySingleListId);
  }

  return Array.from(new Set(merged));
}

async function readErrorBody(response: Response): Promise<string> {
  const text = await response.text().catch(() => "");
  return text.slice(0, 1000);
}

async function postJson(
  baseUrl: string,
  path: string,
  apiKey: string,
  payload: unknown
): Promise<unknown> {
  const response = await fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Api-Token": apiKey,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const details = await readErrorBody(response);
    throw new Error(
      `ActiveCampaign request failed (${response.status}) on ${path}. ${details || "No details."}`
    );
  }

  return response.json().catch(() => ({}));
}

function getContactId(payload: unknown): string {
  if (!payload || typeof payload !== "object") return "";
  const contact = (payload as { contact?: unknown }).contact;
  if (!contact || typeof contact !== "object") return "";
  const id = (contact as { id?: unknown }).id;
  return id == null ? "" : String(id).trim();
}

async function syncWithActiveCampaign(
  submission: CheckinSubmission,
  config: {
    apiUrl: string;
    apiKey: string;
    listIds: string[];
    tagIds: string[];
  }
) {
  const phone = `${submission.phoneCountryCode}${submission.mobileNumber}`.trim();

  const syncPayload = {
    contact: {
      email: submission.primaryEmail,
      firstName: submission.firstName,
      lastName: submission.lastName,
      phone: phone || undefined,
    },
  };

  const syncResult = await postJson(config.apiUrl, "/contact/sync", config.apiKey, syncPayload);
  const contactId = getContactId(syncResult);

  if (!contactId) {
    throw new Error("ActiveCampaign contact sync did not return a contact id.");
  }

  for (const listId of config.listIds) {
    try {
      await postJson(config.apiUrl, "/contactLists", config.apiKey, {
        contactList: {
          list: listId,
          contact: contactId,
          status: 1,
        },
      });
    } catch (error) {
      // A list sync issue should not block the full check-in.
      console.warn(`ActiveCampaign list sync warning for list ${listId}:`, error);
    }
  }

  for (const tagId of config.tagIds) {
    try {
      await postJson(config.apiUrl, "/contactTags", config.apiKey, {
        contactTag: {
          contact: contactId,
          tag: tagId,
        },
      });
    } catch (error) {
      // Duplicate tag assignment should not fail check-in flow.
      console.warn("ActiveCampaign tag assignment warning:", error);
    }
  }
}

async function sendToSheetsWebhook(webhookUrl: string, submission: CheckinSubmission) {
  const webhookResponse = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(submission),
  });

  if (!webhookResponse.ok) {
    const details = await readErrorBody(webhookResponse);
    throw new Error(`Google Sheets webhook returned ${webhookResponse.status}. ${details}`);
  }
}

export async function POST(request: Request) {
  const webhookUrl = parseString(process.env.GOOGLE_SHEETS_WEBHOOK_URL);
  const activeCampaignApiKey = parseString(process.env.ACTIVE_CAMPAIGN_API_KEY);
  const configuredActiveCampaignUrl = parseString(
    process.env.ACTIVE_CAMPAIGN_API_URL || process.env.ACTIVE_CAMPAIGN_URL
  );
  const legacyActiveCampaignListId = parseString(process.env.ACTIVE_CAMPAIGN_LIST_ID);
  const activeCampaignListIds = parseListIds(
    process.env.ACTIVE_CAMPAIGN_LIST_IDS,
    legacyActiveCampaignListId
  );
  const activeCampaignTagIds = parseTagIds(process.env.ACTIVE_CAMPAIGN_TAG_IDS);

  const hasActiveCampaign = Boolean(configuredActiveCampaignUrl && activeCampaignApiKey);
  const hasSheetsWebhook = Boolean(webhookUrl);

  if (!hasActiveCampaign && !hasSheetsWebhook) {
    return NextResponse.json(
      {
        error:
          "Check-in is not configured. Set ActiveCampaign vars (ACTIVE_CAMPAIGN_API_URL + ACTIVE_CAMPAIGN_API_KEY) or GOOGLE_SHEETS_WEBHOOK_URL.",
      },
      { status: 500 }
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request format." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request format." }, { status: 400 });
  }

  const payload = body as Record<string, unknown>;

  const submission: CheckinSubmission = {
    firstName: parseString(payload.firstName),
    lastName: parseString(payload.lastName),
    fullName: parseString(payload.fullName),
    primaryEmail: parseString(payload.primaryEmail).toLowerCase(),
    schoolEmail: parseString(payload.schoolEmail),
    mobileNumber: parseString(payload.mobileNumber),
    phoneCountryCode: parseString(payload.phoneCountryCode),
    originCountry: parseString(payload.originCountry),
    originCountryOther: parseString(payload.originCountryOther),
    educationInstitution: parseString(payload.educationInstitution),
    educationInstitutionOther: parseString(payload.educationInstitutionOther),
    newToAustralia: parseString(payload.newToAustralia),
    australiaDuration: parseString(payload.australiaDuration),
    assistanceNeeded: parseString(payload.assistanceNeeded),
    assistanceOther: parseString(payload.assistanceOther),
    connectImportance: parseString(payload.connectImportance),
    helpfulRating: parseString(payload.helpfulRating),
    lang: payload.lang ?? "en",
    submittedAt: new Date().toISOString(),
  };

  if (!submission.fullName) {
    submission.fullName = `${submission.firstName} ${submission.lastName}`.replace(/\s+/g, " ").trim();
  }

  if (
    !submission.firstName ||
    !submission.lastName ||
    !submission.primaryEmail ||
    !submission.phoneCountryCode ||
    !submission.originCountry ||
    !submission.educationInstitution ||
    !submission.newToAustralia ||
    !submission.assistanceNeeded ||
    !submission.connectImportance ||
    !submission.helpfulRating
  ) {
    return NextResponse.json({ error: REQUIRED_MESSAGE }, { status: 400 });
  }

  if (hasActiveCampaign) {
    try {
      await syncWithActiveCampaign(submission, {
        apiUrl: normalizeApiBaseUrl(configuredActiveCampaignUrl),
        apiKey: activeCampaignApiKey,
        listIds: activeCampaignListIds,
        tagIds: activeCampaignTagIds,
      });
    } catch (error) {
      console.error("Error sending check-in to ActiveCampaign:", error);
      return NextResponse.json(
        { error: "We couldn't submit your details right now. Please try again." },
        { status: 502 }
      );
    }
  }

  if (hasSheetsWebhook) {
    try {
      await sendToSheetsWebhook(webhookUrl, submission);
    } catch (error) {
      // Keep this as warning when ActiveCampaign already succeeded.
      if (!hasActiveCampaign) {
        console.error("Error sending check-in to Google Sheets webhook:", error);
        return NextResponse.json(
          { error: "We couldn't reach the registration service. Please try again later." },
          { status: 502 }
        );
      }
      console.warn("Google Sheets webhook warning (ActiveCampaign succeeded):", error);
    }
  }

  return NextResponse.json({ ok: true });
}
