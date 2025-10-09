CREATE TABLE IF NOT EXISTS accounts (
  id BIGSERIAL PRIMARY KEY,
  account_name VARCHAR(100) NOT NULL,
  account_number VARCHAR(50) NOT NULL,
  customer_id VARCHAR(50) NOT NULL,
  account_type VARCHAR(20),
  initial_balance NUMERIC(18,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- index unik pada account_number (jika perlu unik)
CREATE UNIQUE INDEX IF NOT EXISTS idx_account_number ON accounts(account_number);