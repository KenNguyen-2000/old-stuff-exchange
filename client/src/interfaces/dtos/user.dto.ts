export interface IUserInfo {
  id: number;
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
