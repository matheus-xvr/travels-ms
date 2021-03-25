export default () => {
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_AUTH_USER,
    SMTP_AUTH_PASS,
    SMTP_DEBUG,
  } = process.env;

  return {
    smtpClient: {
      host: SMTP_HOST,
      port: +SMTP_PORT,
      user: SMTP_AUTH_USER,
      password: SMTP_AUTH_PASS,
      debug: +SMTP_DEBUG,
    },
  };
};
