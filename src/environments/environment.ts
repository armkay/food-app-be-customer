export const environment = {
  production: false,
  aws: {
    cognito: {
      userPoolId: "ca-central-1_WqrJOBuV2",
      userPoolWebClientId: "2ovt4b3fao8k0u1j2a18tht8r6",
      region: "ca-central-1",
      oauth: {
        domain: "https://food-app.auth.ca-central-1.amazoncognito.com",
        scope: ["email", "profile", "openid"],
        redirectSignIn: "https://d3r4w9s0lnkv70.cloudfront.net",
        redirectSignOut: "https://d3r4w9s0lnkv70.cloudfront.net",
        responseType: "code",
      },
    },
  },
};
