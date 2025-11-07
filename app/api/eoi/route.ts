import { NextResponse } from "next/server";

const REQUIRED_MESSAGE = "Required expression of interest details are missing.";

export async function POST(request: Request) {
  const webhookUrl = process.env.GOOGLE_SHEETS_EOI_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json(
      { error: "EOI form is not configured. GOOGLE_SHEETS_EOI_WEBHOOK_URL is missing." },
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

  const { firstName = "", lastName = "", email = "", interest = "", details = "", lang = "en" } =
    body as Record<string, unknown>;

  const trimmedFirstName = typeof firstName === "string" ? firstName.trim() : "";
  const trimmedLastName = typeof lastName === "string" ? lastName.trim() : "";
  const trimmedEmail = typeof email === "string" ? email.trim() : "";
  const trimmedInterest = typeof interest === "string" ? interest.trim() : "";
  const trimmedDetails = typeof details === "string" ? details.trim() : "";

  if (!trimmedFirstName || !trimmedLastName || !trimmedEmail || !trimmedInterest) {
    return NextResponse.json({ error: REQUIRED_MESSAGE }, { status: 400 });
  }

  const submission = {
    firstName: trimmedFirstName,
    lastName: trimmedLastName,
    email: trimmedEmail.toLowerCase(),
    interest: trimmedInterest,
    details: trimmedDetails,
    lang,
    submittedAt: new Date().toISOString(),
  };

  let webhookResponse: Response;

  try {
    webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submission),
    });
  } catch (error) {
    console.error("Error sending EOI data to the webhook:", error);
    return NextResponse.json(
      { error: "We couldn't reach the EOI service. Please try again later." },
      { status: 502 }
    );
  }

  if (!webhookResponse.ok) {
    const detailsText = await webhookResponse.text().catch(() => "");
    console.error("Unexpected response from the EOI webhook:", detailsText);
    return NextResponse.json(
      { error: "The EOI service returned an error. Please try again later." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
