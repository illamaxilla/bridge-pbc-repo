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
    primary_interest: "Technology",
    connection: "LinkedIn",
  };

  it("inserts access request data into access_requests table", async () => {
    mockInsert.mockResolvedValue({ error: null });

    await submitAccessRequest(validRequest);

    expect(mockFrom).toHaveBeenCalledWith("access_requests");
    expect(mockInsert).toHaveBeenCalledWith(validRequest);
  });

  it("includes optional fields when provided", async () => {
    mockInsert.mockResolvedValue({ error: null });

    const requestWithOptionals = {
      ...validRequest,
      organization: "BRIDGE PBC",
      role: "Researcher",
      description: "Interested in sector data",
    };

    await submitAccessRequest(requestWithOptionals);
    expect(mockInsert).toHaveBeenCalledWith(requestWithOptionals);
  });

  it("throws on database error", async () => {
    mockInsert.mockResolvedValue({
      error: { code: "23502", message: "not-null constraint violation" },
    });

    await expect(submitAccessRequest(validRequest)).rejects.toThrow(
      "not-null constraint violation",
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
