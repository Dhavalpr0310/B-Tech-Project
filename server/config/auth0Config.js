import { auth } from "express-oauth2-jwt-bearer";

const jwtCheck = auth({
  audience: "http://localhost:8000",
  issuerBaseURL: "https://dev-20gly8u4jsygu8lv.us.auth0.com", //update this url with your auth domain
  tokenSigningAlg: "RS256",
});

export default jwtCheck;
