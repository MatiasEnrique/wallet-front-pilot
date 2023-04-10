import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

export const authOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        const { username, password } = credentials;

        const accessToken = axios
          .post(
            'https://localhost:7131/api/login',
            {},
            {
              auth: {
                username,
                password
              }
            }
          )
          .then((res) => {
            console.log(res);
            return res.data;
          })
          .catch((err) => {
            console.log(err.response);
            throw new Error(err.message);
          });

        if (accessToken) {
          return accessToken;
        } else return null;
      }
    })
  ],
  pages: {
    signIn: '/auth/login'
  },
  session: {
    jwt: true
  },
  callbacks: {
    jwt: async (token, user) => {
      if (user) {
        token.accessToken = user.token;
        console.log(token);
      }
      return Promise.resolve(token);
    }
  }
};

export default NextAuth(authOptions);
