import { SIGN_IN, SIGN_OUT } from './types';
import { CUSTOMER, ADMIN, DRIVER } from '../constants/roles';

export const signIn = (key, session) => ({ type: SIGN_IN, key, session });
export const signOut = (keys = [ADMIN, CUSTOMER, DRIVER]) => ({ type: SIGN_OUT, keys });