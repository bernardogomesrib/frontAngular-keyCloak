

const public_ip ="http://179.73.180.94";
export const environment = {
  keycloak:{
    url: public_ip+":9080/",
    realm: "quiz",
    clientId: "quiz"
  },
  apiUrl: public_ip+":8080",
  fileserverUrl: public_ip+":9090",
  logoUrl: public_ip+":9090/api/v1/buckets/public/objects/download?preview=true&prefix=logo.png",
};

