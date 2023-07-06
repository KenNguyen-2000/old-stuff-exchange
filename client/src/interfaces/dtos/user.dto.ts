export interface IUserInfo {
  id: string;
  fullName: string;
  username?: string;
  email?: string;
  isEmailConfirmed: boolean;
  phoneNumber?: string;
  gender?: boolean;
  dob: Date;
  address: string;
  points: number;
  role: string;
}
