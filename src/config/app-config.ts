export const AppConfig = {
  region: process.env.REGION,
  environment: process.env.ENVIRONMENT,
  ssm_prefix_name: process.env.SSM_PREFIX_NAME,
  secret_name: process.env.DB_SECRET_NAME,
  rds_resource_arn: process.env.DB_RESOURCE_ARN,
  cert_manager_arn: process.env.CERT_ARN,
  database_name: process.env.DATABASE_NAME,
  log_group_name: "",
  log_stream_name: "",
};
