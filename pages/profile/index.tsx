import { Container } from "@chakra-ui/react";
import nookies from 'nookies';
import Strapi from "strapi-sdk-js";
import Shipping from "../../components/Blocks/Shipping";
import { gql, useMutation } from '@apollo/client';

const strapi = new Strapi();

interface IUser {
  id: number,
  username: string,
  email: string,
  provider: string,
  confirmed: boolean,
  blocked: boolean,
  createdAt: string,
  updatedAt: string,
}

interface IFormData {
  address1: string,
  address2: string,
  city: string,
  country: string,
  email: string,
  firstName: string,
  lastName: string,
  phone: string,
  state: string,
  zip: string,
}

const USER_DATA = gql`
 mutation CreateUserDelivery($address1: String, $address2: String, $country:String, $city: String, $state:String, $zip:String, $userID: String, $phone:String, $firstName:String, $lastName:String) {
    createUserDeliveryAdress(data: {Adress1: $address1, Adress2: $address2, Country: $country, City: $city, State: $state, Postal: $zip, userID: $userID, Phone: $phone, FirstName: $firstName, LastName: $lastName}) {
      data {
        attributes {
        Adress1,
        Adress2,
        Country,
        City,
        State,
        Postal,
        userID,
        Phone,
        FirstName,
        LastName
        }
      }
    }
  }
`

export default function Profile({ user }: { user: IUser }) {
  const [createUserDeliveryAdress, { data, loading, error }] = useMutation(USER_DATA);
  const {id} = user;
  const idString = (id).toString();
  console.log(typeof idString)
  const handleSubmit = (formData: IFormData) => {
    console.log('handlesubmit', formData, user)
    const { address1, address2, city, country, email, firstName, lastName, phone, state, zip } = formData;
    createUserDeliveryAdress({
      variables: {
        address1, address2, city, country, email, firstName, lastName, userID: idString, phone, state, zip
      }
    })
  }
  console.log('mutation', data, loading, error)
  console.log('isLogged', user)
  if (!user) {
    return <p>Not Logged</p>;
  }
  return (
    <Container>
      <p>Profile</p>
      <Shipping getData={handleSubmit} userid={id} />
    </Container>
  )
}

export const getServerSideProps = async (ctx) => {

  const cookies = nookies.get(ctx);
  let user = null;

  if (cookies?.jwt) {
    try {
      strapi.axios.defaults.headers.common["Authorization"] = `Bearer ${cookies.jwt}`;
      user = await strapi.fetchUser();

    } catch (e) {
      console.log(e);
    }
  }
  return {
    props: {
      user
    }
  }
}