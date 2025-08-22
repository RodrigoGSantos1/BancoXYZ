export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Transfers: undefined;
  Transfer: undefined;
  Profile: undefined;
};

export type TransferStackParamList = {
  TransferForm: undefined;
  TransferConfirmation: { transferId: string };
  TransferSuccess: { transferId: string };
};
