import { Box, Button, Container, Flex, FormControl, FormLabel, Heading, Input, Select } from "@chakra-ui/react";
import { Context } from "../../../pages/context";
import { useContext, useState } from "react";
import useTranslation from "next-translate/useTranslation";
import { Field, Form, Formik } from "formik";
import { gql, useQuery } from '@apollo/client';

const GET_USER_DATA = gql`
 query GETUSERDATA($userID:StringFilterInput) {
  userDeliveryAdresses(filters: {userID: $userID}) {
    data {
      attributes {
        Adress1
        Adress2
        Country
        City
        State
        Postal
        Phone
        FirstName
        LastName
      }
    }
  }
}
`;

export default function Shipping({ getData, userid }:{getData:()=> void; userid: number}) {
  const { t } = useTranslation('common');
  const { state } = useContext(Context);
  const idString = (userid).toString();
  const [initialValues, setInitalValues] = useState({ firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address1: '',
  address2: '',
  country: '',
  city: '',
  state: '',
  zip: '',})
  const { loading, error, data } = useQuery(GET_USER_DATA, {
    variables: {userID :{ eq: idString}},
    onCompleted: (data) => {
      const newValues = initialValues;
      newValues.firstName = data.userDeliveryAdresses.data[0].attributes.FirstName;
      newValues.lastName = data.userDeliveryAdresses.data[0].attributes.LastName;
      newValues.email = data.userDeliveryAdresses.data[0].attributes.Email;
      newValues.phone = data.userDeliveryAdresses.data[0].attributes.Phone;
      newValues.address1 = data.userDeliveryAdresses.data[0].attributes.Adress1;
      newValues.address2 = data.userDeliveryAdresses.data[0].attributes.Adress2;
      newValues.country = data.userDeliveryAdresses.data[0].attributes.Country;
      newValues.city = data.userDeliveryAdresses.data[0].attributes.City;
      newValues.state = data.userDeliveryAdresses.data[0].attributes.State;
      newValues.zip = data.userDeliveryAdresses.data[0].attributes.Postal;
      setInitalValues(newValues)
      console.log('complete data',data);
    }
  });
  console.log('userdata', data)
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <Container maxW="100%" padding="0">
      <Formik onSubmit={e => { console.log('submit', e); getData(e) }} initialValues={initialValues}>
        <Form>
          <Flex wrap="wrap">
            <Box maxW="50%" width="100%" pr="24px">
              <Heading as="h2" mb="24px">{t('form_1_title')}</Heading>
              <FormLabel htmlFor="firstName">{t('form_first_name')}</FormLabel>
              <Field as={Input} mb="24px" variant="outline" id="firstName" name="firstName" placeholder={t('form_first_name')} isRequired isInvalid />
              <Field as={Input} mb="24px" variant="outline" id="lastName" name="lastName" placeholder={t('form_last_name')} isRequired />
              <Field as={Input} mb="24px" variant="outline" id="email" name="email" placeholder={t('form_email')} isRequired />
              <Field as={Input} variant="outline" id="phone" placeholder={t('form_phone')} name="phone" isRequired />
            </Box>
            <Box maxW="50%" width="100%" pl="24px">
              <Heading as="h2" mb="24px">{t('form_2_title')}</Heading>
              <Field as={Input} mb="24px" variant="outline" id="address1" name="address1" placeholder={t('form_address_1')} isRequired />
              <Field as={Input} mb="24px" variant="outline" id="address2" name="address2" placeholder={t('form_address_2')} />
              <Field as={Select} id='country' placeholder={t('form_country')} mb="24px" name='country' isRequired>
                <option value="pl">{t('country_pl')}</option>
                <option value="en">{t('country_en')}</option>
              </Field>
              <Field as={Input} mb="24px" variant="outline" id="city" name="city"  placeholder={t('form_city')} isRequired />
              <Field as={Input} mb="24px" variant="outline" id="state" name="state" placeholder={t('form_state')} />
              <Field as={Input} mb="24px" variant="outline" id="zip" name="zip" placeholder={t('form_zip')} />
            </Box>
            <Box w="50%" maxW="50%">
              <Button type="submit" colorScheme='teal'>Zapisz</Button>
            </Box>
          </Flex>
        </Form>
      </Formik>
    </Container>
  )
}