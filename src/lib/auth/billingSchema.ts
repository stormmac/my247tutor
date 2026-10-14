/**
 * The card-payment columns on users (database/008_my247tutor_billing.sql, kept identical by a test).
 * The app also adds them itself on first use, so a deploy works before anyone runs the migration.
 * Each change only runs when its column is missing, so this is cheap to run again.
 */
export const BILLING_SQL = `DO $$
BEGIN
  -- Admins can give an account free access, so it never needs to pay.
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'free_access') THEN
    ALTER TABLE users ADD COLUMN free_access BOOLEAN NOT NULL DEFAULT FALSE;
    -- Accounts made before payments existed keep using the site for free. An admin can change that.
    UPDATE users SET free_access = TRUE;
  END IF;
  -- When the account's free trial ends. Null means it never had one.
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'trial_ends_at') THEN
    ALTER TABLE users ADD COLUMN trial_ends_at TIMESTAMPTZ;
  END IF;
  -- The parent's Stripe customer and subscription, kept up to date from Stripe.
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'stripe_customer_id') THEN
    ALTER TABLE users ADD COLUMN stripe_customer_id VARCHAR(255) UNIQUE;
    ALTER TABLE users ADD COLUMN subscription_status VARCHAR(30);
    ALTER TABLE users ADD COLUMN paid_until TIMESTAMPTZ;
  END IF;
END $$;`;
