

const public_ip ="http://localhost:9080";
export const environment = {
  keycloak:{
    url: public_ip,
    realm: "quiz",
    clientId: "quiz"
  },
  apiUrl: "/v3/api-docs",
  fileserverUrl: "/fileserver",
  logoUrl: "/fileserver/api/v1/buckets/public/objects/download?preview=true&prefix=logo.png",
};

