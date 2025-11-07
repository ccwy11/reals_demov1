// src/types/user.ts
export type CurrentUser = {
  /** UUID from Better-Auth */
  id: string;
  /** Verified email */
  email: string;
  /** Optional display name */
  name: string | null;
  /** Optional avatar URL */
//   image: string | null;
};