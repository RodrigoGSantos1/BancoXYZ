import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { transferSchema, TransferFormData } from '../../schemas/transferSchema';
import { TransferService } from '../../services/transfer/transferService';
import { MoneyInput, DatePicker } from '../../components/index';
import { MaskedInput } from '../../components/forms/MaskedInput';
import { useAuthContext } from '../../providers/AuthProvider';
import { masks } from '../../utils/masks';

const TransferScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

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

  const onSubmit = async (data: TransferFormData) => {
    if (data.value > (user?.balance || 0)) {
      Alert.alert('Erro', 'Saldo insuficiente para realizar a transferência.');
      return;
    }

    setIsLoading(true);
    try {
      await TransferService.createTransfer(data);
      Alert.alert('Sucesso', 'Transferência realizada com sucesso!', [
        {
          text: 'OK',
          onPress: () => {
            reset();
            navigation.goBack();
          },
        },
      ]);
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
    <View className="flex-1 bg-gray-100">
      <ScrollView className="flex-1 p-4">
        <View className="bg-white rounded-2xl p-6 shadow-sm">
          <Text className="text-2xl font-bold text-gray-800 mb-6">
            Dados da transferência
          </Text>

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

          <TouchableOpacity
            className="bg-primary-500 rounded-xl p-4 flex-row items-center justify-center"
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}
          >
            <Send size={20} color="white" className="mr-2" />
            <Text className="text-white text-center font-bold text-lg ml-2">
              {isLoading ? 'Processando...' : 'Realizar transferência'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default TransferScreen;
