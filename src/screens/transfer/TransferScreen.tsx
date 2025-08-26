import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, Check } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { transferSchema, TransferFormData } from '../../schemas/transferSchema';
import { TransferService } from '../../services/transfer/transferService';
import { MoneyInput, DatePicker } from '../../components/index';
import { MaskedInput } from '../../components/forms/MaskedInput';
import { useAuthContext } from '../../providers/AuthProvider';
import { masks } from '../../utils/masks';
import { useAppDispatch } from '../../hooks/useRedux';
import { updateBalance } from '../../store/slices/balanceSlice';
import { createTransferSuccess } from '../../store/slices/transferSlice';

const TransferScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<TransferFormData>({
    resolver: zodResolver(transferSchema),
    defaultValues: {
      value: 0,
      currency: 'BRL',
      payeerDocument: '',
      payeerName: '',
      transferDate: '',
      description: '',
    },
  });

  const dispatch = useAppDispatch();

  const onSubmit = async (data: TransferFormData) => {
    if (data.value > (user?.balance || 0)) {
      Alert.alert('Erro', 'Saldo insuficiente para realizar a transferência.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await TransferService.createTransfer(
        data,
        user?.email || '',
        parseInt(user?.id || '0', 10)
      );
      dispatch(updateBalance({ amount: data.value, operation: 'debit' }));
      dispatch(
        createTransferSuccess({
          id: parseInt(
            response.transferId?.split('-')[1] || Date.now().toString(),
            10
          ),
          value: data.value,
          date: data.transferDate,
          currency: data.currency,
          payeer: {
            document: data.payeerDocument,
            name: data.payeerName,
          },
        })
      );

      setIsSuccess(true);
      setTimeout(() => {
        reset();
        navigation.goBack();
      }, 2000);
    } catch (error) {
      Alert.alert(
        'Erro',
        'Não foi possível realizar a transferência. Tente novamente.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 px-4 py-6">
        <View className="bg-white rounded-2xl p-6 shadow">
          <View className="flex-row items-center mb-8">
            <View className="flex-1">
              <Text className="text-2xl font-bold text-gray-800">
                Nova Transferência
              </Text>
              <Text className="text-gray-500 mt-1">
                Saldo disponível: R${' '}
                {(user?.balance || 0).toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                })}
              </Text>
            </View>
          </View>

          <Controller
            control={control}
            name="value"
            render={({ field: { value } }) => (
              <MoneyInput
                label="Valor"
                value={value || 0}
                onValueChange={(newValue) => setValue('value', newValue)}
                keyboardType="numeric"
                error={errors.value?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="payeerDocument"
            render={({ field: { value } }) => (
              <MaskedInput
                label="CPF do Destinatário"
                placeholder="000.000.000-00"
                mask={masks.cpf}
                unmask={masks.cpfToNumber}
                onValueChange={(newValue) =>
                  setValue('payeerDocument', newValue.toString())
                }
                value={value.toString()}
                keyboardType="numeric"
                maxLength={14}
                error={errors.payeerDocument?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="payeerName"
            render={({ field: { onChange, onBlur, value } }) => (
              <View className="mb-4">
                <Text className="text-gray-700 font-semibold mb-2 text-base">
                  Nome do Destinatário
                </Text>
                <TextInput
                  className={`bg-gray-50 border rounded-xl p-4 text-gray-800 ${
                    errors.payeerName ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="Nome completo"
                  placeholderTextColor="#9CA3AF"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  autoCapitalize="words"
                />
                {errors.payeerName && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.payeerName.message}
                  </Text>
                )}
              </View>
            )}
          />

          <Controller
            control={control}
            name="transferDate"
            render={({ field: { onChange, value } }) => (
              <DatePicker
                value={value}
                onChange={onChange}
                label="Data da Transferência"
                placeholder="Selecione uma data"
              />
            )}
          />

          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, onBlur, value } }) => (
              <View className="mb-6">
                <Text className="text-gray-700 font-semibold mb-2 text-base">
                  Descrição (opcional)
                </Text>
                <TextInput
                  className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-800"
                  placeholder="Descrição da transferência"
                  placeholderTextColor="#9CA3AF"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  multiline
                  numberOfLines={3}
                />
              </View>
            )}
          />

          <View className="mt-8">
            <TouchableOpacity
              className={`rounded-xl py-4 flex-row items-center justify-center ${
                isSuccess
                  ? 'bg-green-500'
                  : isLoading
                    ? 'bg-primary-400'
                    : 'bg-primary-500'
              }`}
              onPress={handleSubmit(onSubmit)}
              disabled={isLoading || isSuccess}
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : isSuccess ? (
                <View className="flex-row items-center">
                  <Check size={20} color="white" />
                  <Text className="text-white text-center font-bold text-lg ml-3">
                    Transferência Realizada
                  </Text>
                </View>
              ) : (
                <View className="flex-row items-center">
                  <Send size={20} color="white" />
                  <Text className="text-white text-center font-bold text-lg ml-3">
                    Realizar transferência
                  </Text>
                </View>
              )}
            </TouchableOpacity>
            <Text className="text-gray-500 text-center text-sm mt-4">
              Ao confirmar, você concorda com os termos e condições da
              transferência.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TransferScreen;
