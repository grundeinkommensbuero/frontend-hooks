if (!process.env.API_URL) {
  console.log('No API_URL provided as env variable');
}

export default {
  COGNITO: {
    REGION: 'eu-central-1',
    USER_POOL_ID:
      process.env.NODE_ENV === 'development'
        ? 'eu-central-1_SYtDaO0qH'
        : 'eu-central-1_xx4VmPPdF',
  },
  API: {
    INVOKE_URL: process.env.API_URL, // Needs to be provided in frontend using this package
  },
};
