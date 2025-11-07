import { NextResponse } from "next/server";

const REQUIRED_MESSAGE = "Required check-in details are missing.";

export async function POST(request: Request) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json(
      { error: "Check-in is not configured. GOOGLE_SHEETS_WEBHOOK_URL is missing." },
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

  const {
    firstName = "",
    lastName = "",
    fullName = "",
    primaryEmail = "",
    schoolEmail = "",
    mobileNumber = "",
    phoneCountryCode = "",
    originCountry = "",
    originCountryOther = "",
    educationInstitution = "",
    educationInstitutionOther = "",
    newToAustralia = "",
    australiaDuration = "",
    assistanceNeeded = "",
    assistanceOther = "",
    connectImportance = "",
    helpfulRating = "",
    lang = "en",
  } = body as Record<string, unknown>;

  const trimmedFirstName = typeof firstName === "string" ? firstName.trim() : "";
  const trimmedLastName = typeof lastName === "string" ? lastName.trim() : "";
  const trimmedPrimaryEmail = typeof primaryEmail === "string" ? primaryEmail.trim() : "";
  const trimmedOriginCountry = typeof originCountry === "string" ? originCountry.trim() : "";
  const trimmedEducationInstitution =
    typeof educationInstitution === "string" ? educationInstitution.trim() : "";
  const trimmedNewToAustralia = typeof newToAustralia === "string" ? newToAustralia.trim() : "";
  const trimmedAssistanceNeeded =
    typeof assistanceNeeded === "string" ? assistanceNeeded.trim() : "";
  const trimmedConnectImportance =
    typeof connectImportance === "string" ? connectImportance.trim() : "";
  const trimmedHelpfulRating = typeof helpfulRating === "string" ? helpfulRating.trim() : "";
  const trimmedPhoneCountryCode =
    typeof phoneCountryCode === "string" ? phoneCountryCode.trim() : "";

  if (
    !trimmedFirstName ||
    !trimmedLastName ||
    !trimmedPrimaryEmail ||
    !trimmedPhoneCountryCode ||
    !trimmedOriginCountry ||
    !trimmedEducationInstitution ||
    !trimmedNewToAustralia ||
    !trimmedAssistanceNeeded ||
    !trimmedConnectImportance ||
    !trimmedHelpfulRating
  ) {
    return NextResponse.json({ error: REQUIRED_MESSAGE }, { status: 400 });
  }

  const submission = {
    firstName: trimmedFirstName,
    lastName: trimmedLastName,
    fullName:
      typeof fullName === "string" && fullName.trim().length
        ? fullName.trim()
        : `${trimmedFirstName} ${trimmedLastName}`.replace(/\s+/g, " ").trim(),
    primaryEmail: trimmedPrimaryEmail.toLowerCase(),
    schoolEmail: typeof schoolEmail === "string" ? schoolEmail.trim() : "",
    mobileNumber: typeof mobileNumber === "string" ? mobileNumber.trim() : "",
    phoneCountryCode: trimmedPhoneCountryCode,
    originCountry: trimmedOriginCountry,
    originCountryOther: typeof originCountryOther === "string" ? originCountryOther.trim() : "",
    educationInstitution: trimmedEducationInstitution,
    educationInstitutionOther:
      typeof educationInstitutionOther === "string" ? educationInstitutionOther.trim() : "",
    newToAustralia: trimmedNewToAustralia,
    australiaDuration: typeof australiaDuration === "string" ? australiaDuration.trim() : "",
    assistanceNeeded: trimmedAssistanceNeeded,
    assistanceOther: typeof assistanceOther === "string" ? assistanceOther.trim() : "",
    connectImportance: trimmedConnectImportance,
    helpfulRating: trimmedHelpfulRating,
    lang,
    submittedAt: new Date().toISOString(),
  };

  let sheetsResponse: Response;

  try {
    sheetsResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submission),
    });
  } catch (error) {
    console.error("Error sending data to the Google Sheets webhook:", error);
    return NextResponse.json(
      { error: "We couldn't reach the registration service. Please try again later." },
      { status: 502 }
    );
  }

  if (!sheetsResponse.ok) {
    const details = await sheetsResponse.text().catch(() => "");
    console.error("Unexpected response from the Google Sheets webhook:", details);
    return NextResponse.json(
      { error: "The registration service returned an error. Please try again later." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
