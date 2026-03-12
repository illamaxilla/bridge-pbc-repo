import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Field } from "./FormField";

const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export interface ForgotPasswordFormProps {
  onBack: () => void;
}

export const ForgotPasswordForm = ({ onBack }: ForgotPasswordFormProps) => {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { control, handleSubmit, formState: { errors }, getValues } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setError(null);
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${window.location.origin}/login`,
      });
      if (error) throw error;
      setSent(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center gap-5 pt-4 pb-2">
        <div className="w-[72px] h-[72px] rounded-full bg-[#E8F5E0] flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1B4D3E" strokeWidth="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        </div>
        <div className="text-center flex flex-col gap-2.5">
          <h2 className="text-[22px] font-bold text-[#191919] font-[Inter,sans-serif] m-0">
            Check your email
          </h2>
          <p className="text-sm text-gray-600 font-[Inter,sans-serif] leading-relaxed m-0 max-w-[320px]">
            If an account exists for <strong>{getValues("email")}</strong>, we've sent a password reset link. Please check your inbox and spam folder.
          </p>
        </div>
        <button
          onClick={onBack}
          className="px-10 py-[13px] rounded-full border-none bg-[#1B4D3E] text-white text-[15px] font-semibold font-[Inter,sans-serif] cursor-pointer mt-1"
        >
          Back to Sign In
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5 mb-1">
        <h2 className="text-[22px] font-bold text-[#191919] font-[Inter,sans-serif] m-0">
          Reset your password
        </h2>
        <p className="text-sm text-gray-500 font-[Inter,sans-serif] m-0">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      {error && (
        <div className="px-4 py-3 rounded-[10px] bg-red-50 border border-red-200 text-red-800 text-[13px] font-[Inter,sans-serif] leading-relaxed">
          {error}
        </div>
      )}

      <div>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Field
              label="Email Address" type="email" placeholder="your@email.com"
              value={field.value} onChange={field.onChange} required
            />
          )}
        />
        {errors.email && (
          <span className="block mt-1 text-xs text-red-600 font-[Inter,sans-serif]">
            {errors.email.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-1 px-8 py-[15px] rounded-full border-none bg-[#1B4D3E] hover:bg-[#163f32] disabled:bg-gray-300 text-white text-[15px] font-semibold font-[Inter,sans-serif] disabled:cursor-not-allowed cursor-pointer transition-all duration-200 flex items-center justify-center gap-2.5 w-full"
      >
        {loading ? (
          <>
            <span className="inline-block w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            Sending…
          </>
        ) : "Send Reset Link"}
      </button>

      <button
        type="button"
        onClick={onBack}
        className="bg-transparent border-none cursor-pointer text-[#1B4D3E] font-semibold text-[13px] font-[Inter,sans-serif] p-0 underline text-center"
      >
        ← Back to Sign In
      </button>
    </form>
  );
};
