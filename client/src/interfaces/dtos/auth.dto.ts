export interface ILoginDto {
  username: string;
  password: string;
}

export interface IRegisterDto {
  fullName: string;
  username: string;
  password: string;
  email?: string;
  phoneNumber?: string;
  dob: Date;
  address?: string;
}

export interface IChangePasswordDto {
  username: string;
  currentPassword: string;
  newPassword: string;
}
