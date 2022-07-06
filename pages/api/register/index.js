import Strapi from "strapi-sdk-js";
import { setCookie } from "nookies";

const strapi = new Strapi();

export default async (req, res) => {
  try {
    const response = await strapi.register(JSON.parse(req.body)).then((res) => { 
      return res;
    });

    setCookie({res} , "jwt", response.jwt, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });
    console.log('register res', res, response)
    res.status(200).end();
  } catch (e) {
    res.status(400).send(e.error.message);
  }
};