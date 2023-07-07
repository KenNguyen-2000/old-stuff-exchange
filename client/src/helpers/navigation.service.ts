import { CommonActions } from '@react-navigation/native';

let navigationRef: any;

export const setNavigationRef = (ref: any) => {
  navigationRef = ref;
};

export const navigate = (name: string, params?: any) => {
  navigationRef?.dispatch(CommonActions.navigate(name, params));
};
