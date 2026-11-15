import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || 'mdshamimaehsan@gmail.com,info@alahsanfoundationbd.org,admin@example.com')
  .toLowerCase()
  .split(',')
  .map(e => e.trim());

const authOptions = {
  site: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'dummy-google-client-id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'dummy-google-client-secret',
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || 'dummy-github-id',
      clientSecret: process.env.GITHUB_SECRET || 'dummy-github-secret',
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'ইমেইল বা ইউজারনেম', type: 'text' },
        password: { label: 'পাসওয়ার্ড', type: 'password' },
      },
      authorize: async (credentials) => {
        const u = credentials?.username?.trim().toLowerCase();
        const p = credentials?.password?.trim();

        if (
          (u === 'admin' && p === 'admin123') ||
          (u === 'mdshamimaehsan@gmail.com' && p === 'admin123') ||
          (u === 'info@alahsanfoundationbd.org' && p === 'admin123')
        ) {
          return {
            id: '1',
            name: 'মোঃ শামীম আহসান (অ্যাডমিন)',
            email: u === 'admin' ? 'admin@alahsanfoundationbd.org' : u,
            role: 'admin',
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.role = ADMIN_EMAILS.includes((user.email || '').toLowerCase()) ? 'admin' : (user.role || 'user');
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role || (ADMIN_EMAILS.includes((session.user.email || '').toLowerCase()) ? 'admin' : 'user');
      }
      return session;
    },
  },
  pages: {
    signIn: '/signin',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
