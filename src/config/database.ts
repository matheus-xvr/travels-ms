export default () => {
  const {
    PRE_DB_USERNAME,
    PRE_DB_PASSWORD,
    PRE_DB_PORT,
    PRE_DB_HOSTS,
    PRE_DB_DIALECT,
    PRE_DB_REPLICA_SET,
    PRE_DB_AUTH_SOURCE,
    PRE_DB_DATABASE,
    PRE_DB_RETRY_WRITES,
    PRE_DB_W,
  } = process.env;

  return {
    mongoDb: {
      userName: PRE_DB_USERNAME,
      password: PRE_DB_PASSWORD,
      port: PRE_DB_PORT,
      hosts: PRE_DB_HOSTS,
      dialect: PRE_DB_DIALECT,
      replicaSet: PRE_DB_REPLICA_SET,
      authSource: PRE_DB_AUTH_SOURCE,
      retryWrites: PRE_DB_RETRY_WRITES,
      dbW: PRE_DB_W,
      database: PRE_DB_DATABASE,
    },
  };
};
