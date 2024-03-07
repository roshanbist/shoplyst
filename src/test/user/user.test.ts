import { error } from 'console';
import userReducer, {
  loginUser,
  registerUser,
} from '../../redux/slices/UserSlice';
import {
  LoginInputs,
  RegisterInputs,
  UserInitialState,
  UserType,
} from '../../types/User';

const initialState: UserInitialState = {
  loggedUser: null,
  users: [],
  loading: 'idle',
  error: '',
  userRole: '',
};

describe('user reducers', () => {
  // return initial state
  test('should return initial state', () => {
    const userState = userReducer(undefined, { type: '' });
    expect(userState).toEqual(initialState);
  });

  // register fulfill
  test('should register an account for new user', () => {
    const mockUserRegister: RegisterInputs = {
      name: 'Nicolas',
      email: 'nicolas@gmail.com',
      password: '1234',
      avatar: 'https://i.imgur.com/LDOO4Qs.jpg',
    };

    const userRegisterState = userReducer(
      initialState,
      registerUser.fulfilled(mockUserRegister, 'fulfilled', mockUserRegister)
    );

    const updateUserState = {
      ...initialState,
      users: [mockUserRegister],
      loading: 'succeeded',
    };

    expect(userRegisterState).toEqual(updateUserState);
  });

  // register pending
  test('should have loading pending when registering is in pending', () => {
    const mockUserRegister: RegisterInputs = {
      name: 'Nicolas',
      email: 'nicolas@gmail.com',
      password: '1234',
      avatar: 'https://i.imgur.com/LDOO4Qs.jpg',
    };

    const userRegisterState = userReducer(
      initialState,
      registerUser.pending('pending', mockUserRegister)
    );

    const updateUserState = {
      ...initialState,
      users: [],
      loading: 'pending',
    };

    expect(userRegisterState).toEqual(updateUserState);
  });

  // register rejected
  test('should have error when user register is rejected', () => {
    const mockUserRegister: RegisterInputs = {
      name: 'Nicolas',
      email: 'nicolas@gmail.com',
      password: '1234',
      avatar: 'https://i.imgur.com/LDOO4Qs.jpg',
    };

    const errorResponse = new Error('error');

    const userRegisterState = userReducer(
      initialState,
      registerUser.rejected(errorResponse, 'rejected', mockUserRegister)
    );

    const updateUserState = {
      ...initialState,
      users: [],
      loading: 'failed',
      error: errorResponse.message,
    };

    expect(userRegisterState).toEqual(updateUserState);
  });

  // login fulfilled
  test('should login the user', () => {
    const mockUser: LoginInputs = {
      email: 'nicolas@gmail.com',
      password: '1234',
    };

    const currentLoggedUser: UserType = {
      ...mockUser,
      id: 1,
      name: 'Nicolas',
      role: 'customer',
      avatar: 'https://i.imgur.com/LDOO4Qs.jpg',
    };

    const userLoginState = userReducer(
      initialState,
      loginUser.fulfilled(currentLoggedUser, 'fulfilled', mockUser)
    );

    const updateUserState = {
      ...initialState,
      loggedUser: currentLoggedUser,
      loading: 'succeeded',
      error: '',
    };

    expect(userLoginState).toEqual(updateUserState);
  });

  // login pending
  test('should have loading pending when logging the user', () => {
    const mockUser: LoginInputs = {
      email: 'nicolas@gmail.com',
      password: '1234',
    };

    const userLoginState = userReducer(
      initialState,
      loginUser.pending('pending', mockUser)
    );

    const updateUserState = {
      ...initialState,
      loading: 'pending',
      error: '',
    };

    expect(userLoginState).toEqual(updateUserState);
  });

  // login rejected
  test('should have error when logging is rejected', () => {
    const mockUser: LoginInputs = {
      email: 'nicolas@gmail.com',
      password: '1234',
    };

    const errorResponse = new Error('error');

    const userLoginState = userReducer(
      initialState,
      loginUser.rejected(errorResponse, 'rejected', mockUser)
    );

    const updateUserState = {
      ...initialState,
      loading: 'failed',
      error: errorResponse.message,
    };

    expect(userLoginState).toEqual(updateUserState);
  });
});
