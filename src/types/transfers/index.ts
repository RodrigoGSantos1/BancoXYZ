export interface Transfer {
  id: number;
  value: number;
  date: string;
  currency: string;
  payeer: {
    document: string;
    name: string;
  };
}

export interface TransferFormData {
  value: number;
  currency: string;
  payeerDocument: string;
  payeerName: string;
  transferDate: string;
  description?: string;
}
