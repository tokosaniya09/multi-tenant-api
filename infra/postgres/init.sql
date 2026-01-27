CREATE TABLE api_keys (
  id UUID PRIMARY KEY,
  key_hash TEXT NOT NULL UNIQUE,
  tenant_id UUID NOT NULL,
  revoked_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

INSERT INTO api_keys (id, key_hash, tenant_id)
VALUES (
  gen_random_uuid(),
  '62af8704764faf8ea82fc61ce9c4c3908b6cb97d463a634e9e587d7c885db0ef',
  gen_random_uuid()
);

CREATE TABLE jobs (
  id UUID PRIMARY KEY, 
  tenant_id UUID NOT NULL,
  status TEXT NOT NULL,
  payload JSONB NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now()
)

CREATE INDEX idx_jobs_tenant_id ON jobs(tenant_id);