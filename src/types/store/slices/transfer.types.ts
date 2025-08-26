import { Transfer } from '../../models';

export interface TransferState {
  transfers: Transfer[];
  isLoading: boolean;
  error: string | null;
  filters: TransferFilters;
}

export interface TransferFilters {
  search: string;
  minValue: number;
  maxValue: number;
  startDate: string | null;
  endDate: string | null;
}

export interface CreateTransferPayload {
  value: number;
  destinataryDocument: string;
  destinataryName: string;
  date: string;
  description?: string;
}
