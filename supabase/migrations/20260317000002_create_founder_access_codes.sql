-- ============================================================================
-- BRIDGE PBC — Founder Access Codes
-- Moves hardcoded client-side access codes to a server-side table with an RPC
-- validation function, preventing code exposure in browser DevTools.
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.founder_access_codes (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  code        text NOT NULL UNIQUE,
  guest_name  text NOT NULL,
  active      boolean DEFAULT true,
  created_at  timestamptz DEFAULT now()
);

-- RLS: no public read/write — only accessible via the RPC function below
ALTER TABLE public.founder_access_codes ENABLE ROW LEVEL SECURITY;

-- Seed the existing codes (previously hardcoded in client JS)
INSERT INTO public.founder_access_codes (code, guest_name) VALUES
  ('BRIDGE-2026', 'Valued Guest'),
  ('BRIDGE-KA',   'Kofi Acheampong'),
  ('BRIDGE-OS26', 'Osei'),
  ('BRIDGE-KY26', 'Kyei'),
  ('BRIDGE-AK26', 'Akwasi'),
  ('BRIDGE-AF26', 'Afua'),
  ('BRIDGE-JS26', 'Jesse'),
  ('BRIDGE-JO26', 'Josh'),
  ('BRIDGE-DM26', 'Damien')
ON CONFLICT (code) DO NOTHING;

-- RPC: validate a founder access code. Returns the guest name or NULL.
-- Uses SECURITY DEFINER so the anon caller never reads the table directly.
CREATE OR REPLACE FUNCTION public.validate_founder_code(input_code text)
RETURNS text
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT guest_name
  FROM founder_access_codes
  WHERE code = upper(trim(input_code))
    AND active = true
  LIMIT 1;
$$;

-- Allow anon + authenticated users to call the RPC
GRANT EXECUTE ON FUNCTION public.validate_founder_code(text) TO anon, authenticated;
