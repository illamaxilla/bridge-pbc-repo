import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { name, email, phone, organization, message } = await req.json();

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set");
      return new Response(JSON.stringify({ error: "Email service not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const emailBody = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Inter, Arial, sans-serif; background: #ffffff; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: 40px auto; background: #f3f5f2; border-radius: 16px; overflow: hidden;">
    <div style="background: #1B4D3E; padding: 32px 40px;">
      <div style="color: #B8D935; font-size: 12px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px;">New Contact Submission</div>
      <h1 style="color: white; font-size: 24px; font-weight: 300; margin: 0;">New message from <strong>${name}</strong></h1>
    </div>
    <div style="padding: 32px 40px;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #DEDEDE; font-size: 13px; color: #999; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; width: 140px;">Name</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #DEDEDE; font-size: 15px; color: #191919;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #DEDEDE; font-size: 13px; color: #999; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Email</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #DEDEDE; font-size: 15px; color: #1B4D3E;"><a href="mailto:${email}" style="color: #1B4D3E;">${email}</a></td>
        </tr>
        ${phone ? `<tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #DEDEDE; font-size: 13px; color: #999; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Phone</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #DEDEDE; font-size: 15px; color: #191919;">${phone}</td>
        </tr>` : ""}
        ${organization ? `<tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #DEDEDE; font-size: 13px; color: #999; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Organization</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #DEDEDE; font-size: 15px; color: #191919;">${organization}</td>
        </tr>` : ""}
      </table>
      <div style="margin-top: 24px;">
        <div style="font-size: 13px; color: #999; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">Message</div>
        <div style="background: white; border-radius: 12px; padding: 20px 24px; font-size: 15px; line-height: 1.7; color: #191919; white-space: pre-wrap;">${message}</div>
      </div>
      <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #DEDEDE; font-size: 13px; color: #999; text-align: center;">
        Submitted via bridgepbc.com contact form
      </div>
    </div>
  </div>
</body>
</html>
    `.trim();

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "BRIDGE Contact Form <onboarding@resend.dev>",
        to: ["info@bridgepbc.com"],
        reply_to: email,
        subject: `New contact from ${name}${organization ? ` — ${organization}` : ""}`,
        html: emailBody,
      }),
    });

    const resData = await res.json();

    if (!res.ok) {
      console.error("Resend error:", resData);
      return new Response(JSON.stringify({ error: "Failed to send email", detail: resData }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
