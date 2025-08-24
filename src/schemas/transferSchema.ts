import { z } from 'zod';

export const transferSchema = z.object({
  value: z.number().min(0.01, 'Valor deve ser maior que zero'),
  currency: z.string().min(1, 'Moeda é obrigatória'),
  payeerDocument: z
    .string()
    .min(11, 'CPF deve ter 11 dígitos')
    .max(14, 'CPF deve ter no máximo 14 dígitos'),
  payeerName: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  transferDate: z.string().min(1, 'Data é obrigatória'),
  description: z.string().optional(),
});

export type TransferFormData = z.infer<typeof transferSchema>;
