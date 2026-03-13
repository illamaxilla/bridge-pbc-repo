-- Explicitly deny public SELECT on sensitive tables.
-- These tables are insert-only from the client; only admins via service_role should read them.

CREATE POLICY "Deny public reads on subscribers"
  ON subscribers FOR SELECT USING (false);

CREATE POLICY "Deny public reads on contact_messages"
  ON contact_messages FOR SELECT USING (false);

CREATE POLICY "Deny public reads on access_requests"
  ON access_requests FOR SELECT USING (false);
