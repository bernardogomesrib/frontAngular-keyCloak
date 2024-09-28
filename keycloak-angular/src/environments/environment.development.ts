

const location = window.location.href.split(":");
const public_ip =location[0]+":"+location[1];
//console.log(public_ip);
export const environment = {
  keycloak:{
    url: public_ip,
    realm: "quiz",
    clientId: "quiz"
  },
  apiUrl: "/v3/api-docs",
  fileserverUrl: "/fileserver",
  logoUrl: "/fileserver/api/v1/buckets/public/objects/download?preview=true&prefix=logo.png",
  public_ip: public_ip
};

