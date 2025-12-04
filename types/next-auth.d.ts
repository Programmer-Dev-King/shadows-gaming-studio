// types/next-auth.d.ts

import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    name: string;
    role: 'ADMIN' | 'FOUNDER' | 'COFOUNDER' | 'CA' | 'CEO' | 'MD' | 'USER';
  }

  interface Session {
    user?: User & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: string;
  }
}
