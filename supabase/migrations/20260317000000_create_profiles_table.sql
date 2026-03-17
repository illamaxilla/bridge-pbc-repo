-- Create a server-controlled profiles table for membership tier.
-- This is the secure source of truth for membership status.
-- Only service_role (admin) can update the tier — clients can only read their own.

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  membership_tier TEXT NOT NULL DEFAULT 'free'
    CHECK (membership_tier IN ('free', 'paid')),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- Only service_role can insert/update/delete (no public write access)
CREATE POLICY "Deny public inserts on profiles"
  ON public.profiles FOR INSERT
  WITH CHECK (false);

CREATE POLICY "Deny public updates on profiles"
  ON public.profiles FOR UPDATE
  USING (false);

CREATE POLICY "Deny public deletes on profiles"
  ON public.profiles FOR DELETE
  USING (false);

-- Auto-create a profile row when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, membership_tier)
  VALUES (NEW.id, 'free');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
