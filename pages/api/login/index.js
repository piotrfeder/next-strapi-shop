import Strapi from "strapi-sdk-js";
import { setCookie } from "nookies";

const strapi = new Strapi();

export default async (req, res) => {
  try {
    const response = await strapi.login(JSON.parse(req.body)).then((res) => { 
      return res;
    });

    setCookie({res} , "jwt", response.jwt, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    res.status(200).end();
  } catch (e) {
    res.status(401).send(e.error.message);
  }
};
