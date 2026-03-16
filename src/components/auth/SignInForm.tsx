import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/context/AuthContext";
import { Field } from "./FormField";

const signInSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type SignInFormData = z.infer<typeof signInSchema>;

export interface SignInFormProps {
  onSuccess?: () => void;
  onForgot?: () => void;
}

export const SignInForm = ({ onSuccess, onForgot }: SignInFormProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signIn } = useAuth();

  const { control, handleSubmit, formState: { errors } } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: SignInFormData) => {
    setError(null);
    setLoading(true);
    try {
      await signIn(data.email, data.password);
      onSuccess?.();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred.";
      if (message.includes("Invalid login")) {
        setError("Invalid email or password. Please try again.");
      } else {
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" aria-busy={loading}>
      {error && (
        <div role="alert" className="px-4 py-3 rounded-[10px] bg-red-50 border border-red-200 text-red-800 text-[13px] font-[Inter,sans-serif] leading-relaxed">
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

      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between items-center">
          <label className="text-[13px] font-semibold text-[#191919] font-[Inter,sans-serif]">
            Password <span className="text-[#1B4D3E]">*</span>
          </label>
          <button
            type="button"
            onClick={onForgot}
            className="bg-transparent border-none cursor-pointer text-[#1B4D3E] font-semibold text-xs font-[Inter,sans-serif] p-0 underline"
          >
            Forgot password?
          </button>
        </div>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <input
              type="password"
              placeholder="••••••••"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              className="px-4 py-3 rounded-[10px] border-[1.5px] border-[#DEDEDE] bg-[#F3F5F2] text-[15px] font-[Inter,sans-serif] text-[#191919] outline-none w-full box-border"
            />
          )}
        />
        {errors.password ? (
          <span className="text-xs text-red-600 font-[Inter,sans-serif]">
            {errors.password.message}
          </span>
        ) : (
          <span className="text-xs text-gray-400 font-[Inter,sans-serif]">
            Minimum 8 characters
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
            Signing in…
          </>
        ) : (
          <>
            Sign In
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </>
        )}
      </button>
    </form>
  );
};
