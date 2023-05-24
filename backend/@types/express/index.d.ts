declare namespace Express {
    export interface Request {
      csrfToken,string,
      user: {
        userId:string;
        role: 'admin' | 'user';
        tier: 'free' | 'standard' | 'premium';
        name:string
      }
    }
  }