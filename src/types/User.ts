export type LoginInputs = {
  email: string;
  password: string;
};

export type RegisterInputs = LoginInputs & {
  name: string;
  avatar: string;
};

export type UserType = RegisterInputs & {
  id: number;
  role: 'admin' | 'customer';
};

export type UserInitialState = {
  loggedUser: UserType | null;
  users: UserType[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error?: string | null;
  userRole?: string;
};

export type AuthToken = {
  access_token: string;
  refresh_token: string;
};

export type EditProfileType = {
  name: string;
  email: string;
};
