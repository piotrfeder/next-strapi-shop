import React, { useContext } from 'react';
import Footer from '../footer';
import Header from '../header';
import Newsletter from '../newsletter';
import {useEffect } from 'react';
import nookies from 'nookies';
import Strapi from "strapi-sdk-js";
const strapi = new Strapi();
import {Context} from '../../pages/context';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children} : LayoutProps ) {
  const { dispatch } = useContext(Context);
  useEffect(() => {
    const getUserData = async () => {
      const cookies = nookies.get();
      let user = null;
      if (cookies?.jwt) {
        try {
          strapi.axios.defaults.headers.common["Authorization"] = `Bearer ${cookies.jwt}`;
          user = await strapi.fetchUser();
          dispatch({type: 'setUser', payload: user})
        } catch (e) {
          console.log(e);
        }
      }
      return user;
    }
    getUserData();
  }, [])
  return (
    <>
      <Header/>
      <main>{children}</main>
      <Newsletter />
      <Footer />
   </>
  )
}