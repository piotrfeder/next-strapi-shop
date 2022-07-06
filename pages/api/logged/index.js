import Strapi from "strapi-sdk-js";
import { parseCookies } from "nookies";

export default async (req, res) => {

  try {
    const cookies = parseCookies(res)
    console.log('token', cookies )
    const jwtToken = cookies.jwt;
    
    /* if (Date.now() >= exp * 1000) {
      return res.status(400).end();
    } */
    return res.status(200).end();
  } catch (e) {
    return res.status(400).send(e.error.message);
  }
};