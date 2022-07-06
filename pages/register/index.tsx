import { Button, Container, Input } from "@chakra-ui/react";
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { useRouter } from 'next/router'
import * as Yup from 'yup';
import useTranslation from "next-translate/useTranslation";
import styles from '../../styles/Login.module.scss';
import { useState } from "react";

interface Values {
  username: string,
  password: string,
  email: string,
  repassword: string,
}



export default function UserRegister() {
  const router = useRouter()
  const { t } = useTranslation('common');
  const [passwordItem, setPassword] = useState('');
  const RegisterSchema = Yup.object({
    username: Yup.string().required('Required'),
    password: Yup.string()
      .min(2, t('password_error'))
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    repassword: Yup.string().oneOf([Yup.ref('password')], 'test')
  });
  console.log('yip', RegisterSchema, Yup.ref)
  
  return (
    <Container>
      <div className={styles.login__container}>
        <h1>{t('register_title')}</h1>
        <Formik
          initialValues={{
            username: '',
            password: '',
            email: '',
            repassword: '',
          }}
          validationSchema={RegisterSchema}
          onSubmit={async (
            values: Values,
            { setSubmitting }: FormikHelpers<Values>
          ) => {
            try {
              const { username, password, email } = values;
              const response = await fetch('/api/register', {
                method: "POST",
                body: JSON.stringify({ username, password, email })
              }).catch((e) => console.log(e));
              if (response.status === 200) {
                router.push('/profile')
              }

            }
            catch (err) {
              console.log('err', err)
            }

          }}
        >{({ errors, touched }) => (
  
          <Form>
            <div className={styles.login__input}>
              <label htmlFor="username">{errors.username && touched.username ? (
                <div className={styles.login__error}>{t('username_error')}</div>
              ) : t('form_username')}</label>
              <Field as={Input} id="username" name="username" type="text"/>
            </div>
            <div className={styles.login__input}>
              <label htmlFor="email">{errors.email && touched.email ? (
                <div className={styles.login__error}>{t('email_error')}</div>
              ) : t('form_email')}</label>
              <Field as={Input}
                id="email"
                name="email"
                type="email"
              />
            </div>
            <div className={styles.login__input}>
              <label htmlFor="password">{errors.password && touched.password ? (
                <div className={styles.login__error}>{errors.password}</div>
              ) : t('form_password')}</label>
              <Field as={Input} id="password" name="password" type="password" />
            </div>
            <div className={styles.login__input}>
              <label htmlFor="repassword">{errors.repassword && touched.repassword ? (
                <div className={styles.login__error}>{t('password_error')}</div>
              ) : t('form_retypepassword')}</label>
              <Field as={Input} id="repassword" name="repassword" type="password" />
            </div>
            <Button type="submit" colorScheme='teal'>Submit</Button>

          </Form>
        )}
        </Formik>
      </div>
    </Container>
  )
}