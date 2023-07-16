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
  imageUri?: string;
}

export interface IUserUpdate {
  id: number;
  fullName: string;
  username: string;
  email: string;
  phoneNumber?: string;
  gender?: boolean;
  dob: Date;
  address: string;
}

export interface IUpdateAvatar {
  imageUri: string;
}
