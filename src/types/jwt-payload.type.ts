export type JWTPayloadT = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  emailVerifiedAt: Date;
};
