import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import useBackendApi, {IAuthenticationResponse, User} from "../../../backendApiHooks";

const { authentication } = useBackendApi();

export default NextAuth({

    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'my-project',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: {
                    label: 'email',
                    type: 'email',
                    placeholder: 'jsmith@example.com',
                },
                password: { label: 'Password', type: 'password' },
                tenantKey: {
                    label: 'Tenant Key',
                    type: 'text',
                },
            },
            async authorize(credentials, req) {

                const payload = {
                    loginOrMobile: req.query.loginOrMobile,
                    password: req.query.password,
                    remember: req.query.remember,
                };

                let authResponse: IAuthenticationResponse = await authentication(payload);
                if (!authResponse.ok) {
                    throw new Error("К сожалению пользователь с таким логином или паролем не существует!");
                }

                const user: User = authResponse.user;


                // If no error and we have user data, return it
                if (authResponse.ok && user) {
                    return user;
                }

                // Return null if user data could not be retrieved
                return null;
            },
        }),
        // ...add more providers here
    ],
    secret: process.env.JWT_SECRET,
    pages: {
        signIn: '/login',
        signOut: '/login'
    },
    callbacks: {
        async jwt({ token, user, account }) {
            if (account && user) {
                return {
                    ...token,
                    accessToken: user.token,
                    refreshToken: user.token,
                };
            }

            return token;
        },

        async session({ session, token }) {
            session.user.id = token.sub;
            session.user.accessToken = token.accessToken;
            session.user.refreshToken = token.refreshToken;
            session.user.accessTokenExpires = token.accessTokenExpires;

            return session;
        },
    },
    theme: {
        colorScheme: 'auto', // "auto" | "dark" | "light"
        brandColor: '', // Hex color code #33FF5D
        logo: '/logo.png', // Absolute URL to image
    },
    // Enable debug messages in the console if you are having problems
    debug: process.env.NODE_ENV === 'development',
});
