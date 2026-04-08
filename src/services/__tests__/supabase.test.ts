import { describe, it, expect, vi, beforeEach } from "vitest";
import { subscribe, submitAccessRequest, resetPassword } from "../supabase";

// ---------------------------------------------------------------------------
// Mock the Supabase client
// ---------------------------------------------------------------------------
const mockInsert = vi.fn();
const mockFrom = vi.fn(() => ({ insert: mockInsert }));
const mockResetPasswordForEmail = vi.fn();

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    from: (...args: unknown[]) => mockFrom(...args),
    auth: {
      resetPasswordForEmail: (...args: unknown[]) => mockResetPasswordForEmail(...args),
    },
  },
}));

beforeEach(() => {
  vi.clearAllMocks();
});

// ---------------------------------------------------------------------------
// subscribe()
// ---------------------------------------------------------------------------
describe("subscribe", () => {
  it("inserts email into subscribers table", async () => {
    mockInsert.mockResolvedValue({ error: null });

    await subscribe("user@example.com");

    expect(mockFrom).toHaveBeenCalledWith("subscribers");
    expect(mockInsert).toHaveBeenCalledWith({ email: "user@example.com" });
  });

  it("silently succeeds on duplicate email (error code 23505)", async () => {
    mockInsert.mockResolvedValue({
      error: { code: "23505", message: "duplicate key value violates unique constraint" },
    });

    await expect(subscribe("user@example.com")).resolves.not.toThrow();
  });

  it("throws on other database errors", async () => {
    mockInsert.mockResolvedValue({
      error: { code: "42000", message: "some other error" },
    });

    await expect(subscribe("user@example.com")).rejects.toThrow("some other error");
  });
});

// ---------------------------------------------------------------------------
// submitAccessRequest()
// ---------------------------------------------------------------------------
describe("submitAccessRequest", () => {
  const validRequest = {
    name: "John Doe",
    email: "john@example.com",
    country: "Ghana",
    primary_interest: "data",
    connection: "referral",
  };

  const okResponse = () =>
    ({
      ok: true,
      status: 200,
      json: async () => ({ ok: true, id: "abc" }),
    }) as unknown as Response;

  const errResponse = (status: number, payload: object) =>
    ({
      ok: false,
      status,
      json: async () => payload,
    }) as unknown as Response;

  beforeEach(() => {
    vi.spyOn(globalThis, "fetch").mockReset();
  });

  it("POSTs the payload to /api/request-access", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(okResponse());

    await submitAccessRequest(validRequest);

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    const [url, init] = fetchSpy.mock.calls[0];
    expect(url).toBe("/api/request-access");
    expect(init?.method).toBe("POST");
    expect(init?.headers).toMatchObject({ "Content-Type": "application/json" });
    expect(JSON.parse(init?.body as string)).toEqual(validRequest);
  });

  it("includes optional fields when provided", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(okResponse());

    const requestWithOptionals = {
      ...validRequest,
      organization: "BRIDGE PBC",
      role: "Researcher",
      description: "Interested in sector data",
    };

    await submitAccessRequest(requestWithOptionals);
    const init = fetchSpy.mock.calls[0][1];
    expect(JSON.parse(init?.body as string)).toEqual(requestWithOptionals);
  });

  it("throws with the server error message on non-2xx responses", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      errResponse(400, { error: "Primary interest is required." }),
    );

    await expect(submitAccessRequest(validRequest)).rejects.toThrow(
      "Primary interest is required.",
    );
  });

  it("throws a friendly network error when fetch itself fails", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new TypeError("Failed to fetch"));

    await expect(submitAccessRequest(validRequest)).rejects.toThrow(
      /couldn't reach the BRIDGE servers/i,
    );
  });
});

// ---------------------------------------------------------------------------
// resetPassword()
// ---------------------------------------------------------------------------
describe("resetPassword", () => {
  it("calls Supabase auth resetPasswordForEmail with correct params", async () => {
    mockResetPasswordForEmail.mockResolvedValue({ error: null });

    await resetPassword("user@example.com");

    expect(mockResetPasswordForEmail).toHaveBeenCalledWith("user@example.com", {
      redirectTo: expect.stringContaining("/login"),
    });
  });

  it("throws on auth error", async () => {
    mockResetPasswordForEmail.mockResolvedValue({
      error: { message: "User not found" },
    });

    await expect(resetPassword("unknown@example.com")).rejects.toThrow("User not found");
  });
});
