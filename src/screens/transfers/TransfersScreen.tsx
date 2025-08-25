import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  ListRenderItem,
} from 'react-native';
import { Plus, Calendar } from 'lucide-react-native';
import { TransferService } from '../../services/transfer/transferService';
import { TransferFilters, TransferItem } from '../../components/index';
import { useNavigation } from '@react-navigation/native';
import { Transfer } from '../../types';
import { getTransferItemLayout } from '../../utils/dimensions';

const TransfersScreen = () => {
  const navigation = useNavigation();
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [filteredTransfers, setFilteredTransfers] = useState<Transfer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchTransfers = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await TransferService.getTransfers();
      setTransfers(response);
      setFilteredTransfers(response);
    } catch (error) {
      console.error('Erro ao buscar transferências:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransfers();
  }, [fetchTransfers]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchTransfers();
    setRefreshing(false);
  }, [fetchTransfers]);

  const handleSearch = useCallback(
    (query: string) => {
      if (!query.trim()) {
        setFilteredTransfers(transfers);
        return;
      }

      const filtered = transfers.filter(
        (transfer) =>
          transfer.payeer.name.toLowerCase().includes(query.toLowerCase()) ||
          transfer.payeer.document.includes(query)
      );
      setFilteredTransfers(filtered);
    },
    [transfers]
  );

  const handleFilterByValue = useCallback(
    (minValue: number, maxValue: number) => {
      const filtered = transfers.filter(
        (transfer) => transfer.value >= minValue && transfer.value <= maxValue
      );
      setFilteredTransfers(filtered);
    },
    [transfers]
  );

  const handleFilterByDate = useCallback(
    (startDate: string, endDate: string) => {
      if (!startDate && !endDate) {
        setFilteredTransfers(transfers);
        return;
      }

      const filtered = transfers.filter((transfer) => {
        const transferDate = new Date(transfer.date);
        const start = startDate ? new Date(startDate) : new Date(0);
        const end = endDate ? new Date(endDate) : new Date();

        return transferDate >= start && transferDate <= end;
      });
      setFilteredTransfers(filtered);
    },
    [transfers]
  );

  const handleClearFilters = useCallback(() => {
    setFilteredTransfers(transfers);
  }, [transfers]);

  const handleTransferPress = useCallback((transfer: Transfer) => {
    console.log('Transferência selecionada:', transfer);
  }, []);

  const handleNewTransfer = useCallback(() => {
    navigation.navigate('Transfer' as never);
  }, [navigation]);

  const renderItem: ListRenderItem<Transfer> = useCallback(
    ({ item }) => (
      <TransferItem transfer={item} onPress={() => handleTransferPress(item)} />
    ),
    [handleTransferPress]
  );

  const ListHeaderComponent = useMemo(
    () => (
      <>
        <TransferFilters
          onSearch={handleSearch}
          onFilterByValue={handleFilterByValue}
          onFilterByDate={handleFilterByDate}
          onClearFilters={handleClearFilters}
        />
        <View className="flex-row items-center justify-between mb-4 px-4">
          <Text className="text-gray-700 font-semibold">
            {filteredTransfers.length} transferência(s)
          </Text>
          <TouchableOpacity className="flex-row items-center">
            <Text className="text-primary-500 text-sm mr-1">Ordenar</Text>
            <Calendar size={16} className="text-primary-500" />
          </TouchableOpacity>
        </View>
      </>
    ),
    [
      handleSearch,
      handleFilterByValue,
      handleFilterByDate,
      handleClearFilters,
      filteredTransfers.length,
    ]
  );

  const ListEmptyComponent = useMemo(
    () => (
      <View className="items-center py-8">
        <Text className="text-gray-600">
          {isLoading
            ? 'Carregando transferências...'
            : 'Nenhuma transferência encontrada'}
        </Text>
      </View>
    ),
    [isLoading]
  );

  return (
    <View className="flex-1 bg-gray-100">
      <View className="bg-white p-4 border-b border-gray-200">
        <View className="flex-row items-center justify-between">
          <Text className="text-2xl font-bold text-gray-800">
            Transferências
          </Text>
          <TouchableOpacity
            className="bg-primary-500 rounded-full w-10 h-10 items-center justify-center"
            onPress={handleNewTransfer}
          >
            <Plus size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={filteredTransfers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        getItemLayout={getTransferItemLayout}
        removeClippedSubviews
        maxToRenderPerBatch={5}
        windowSize={11}
        initialNumToRender={10}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={ListEmptyComponent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default TransfersScreen;
