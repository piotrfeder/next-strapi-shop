import { Box, Button, Container, Flex, Input } from "@chakra-ui/react";
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { useRouter } from 'next/router'
import useTranslation from "next-translate/useTranslation";
import * as Yup from 'yup';
import styles from '../../styles/Login.module.scss';
import Link from "next/link";
import { useState } from "react";

interface Values {
  password: string,
  identifier: string;
}

const LoginSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  identifier: Yup.string().email('Invalid email').required('Required'),
});

export default function UserLogin() {
  const router = useRouter()
  const { t } = useTranslation('common');
  const [reponseError, setResponseError] = useState<string>("")
 
  const handleBlur = (inputName:string,val:FormikHelpers<Values>) => {
    val.setFieldTouched(inputName)
    val.validateField(inputName)

  }
  return (
    <Container>
      <div className={styles.login__container}>
        <h1>{t('login_title')}</h1>
        <Formik
          initialValues={{
            password: '',
            identifier: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={async (
            values: Values,
            { setSubmitting }: FormikHelpers<Values>
          ) => {
            console.log('values')
            try {
              const response = await fetch('/api/login', {
                method: "POST",
                body: JSON.stringify(values)
              }).then((response) => response.text()).then( data => setResponseError(data))
              console.log('response status', response.status)
              if (response.status === 200) {
                setResponseError("")
                router.push('/profile')
              }
            }
            catch (error) {
              console.error(error);
            }
          }}
        >{(val) =>{ const { errors, touched, isValid } = val; console.log(val); return (
        
          <Form>
            <div className={styles.login__input}>
              <label htmlFor="identifier">
                { reponseError.length > 0 ? <p className={styles.login__error}>{reponseError}</p> : null}
                {errors.identifier && touched.identifier ? (
                  <div className={styles.login__error}>{t('email_error')}</div>
                ) : t('form_email')}</label>
              <Field
                as={Input}
                id="identifier"
                name="identifier"
                type="email"
                required
                onBlur={() => handleBlur("identifier",val)} 
              />
            </div>
            <div className={styles.login__input}>
              <label htmlFor="password">{errors.password && touched.password ? (
                <div className={styles.login__error}>{t('password_error')}</div>
              ) : t('form_password')}</label>
              <Field as={Input} id="password" name="password" type="password" required onBlur={() => handleBlur("password",val)} />
            </div>
            <Flex alignContent={"center"} alignItems='center'>
              <Box w="50%" maxW="50%">
                <Button type="submit" colorScheme='teal' disabled={!isValid}>{t('login_btn_label')}</Button>
              </Box>
              <Box w="50%" maxW="50%" justifyContent="end">
                <Link href="/password"><a className={styles.password__reminder}>Zapomniałęm hasła</a></Link>
              </Box>
            </Flex>
          </Form>
        )}}

        </Formik>
      </div>
    </Container>
  )
}