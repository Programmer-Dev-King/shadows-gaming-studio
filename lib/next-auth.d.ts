import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'founder' | 'cofounder' | 'ca' | 'ceo' | 'md' | 'user';
  }

  interface Session {
    user?: User & DefaultSession['user'];
  }

  interface JWT {
    id: string;
    role: string;
  }
}
