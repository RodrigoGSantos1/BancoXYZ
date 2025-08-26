import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, Platform } from 'react-native';
import { Calendar } from 'lucide-react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  label: string;
  placeholder: string;
  minimumDate?: Date;
  maximumDate?: Date;
  error?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  label,
  placeholder,
  minimumDate,
  maximumDate,
  error,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    value ? new Date(value) : undefined
  );
  const [tempDate, setTempDate] = useState<Date>(new Date());

  useEffect(() => {
    if (value) {
      const date = new Date(value);
      setSelectedDate(date);
      setTempDate(date);
    }
  }, [value]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR');
  };

  const handleDateChange = (event: DateTimePickerEvent, date?: Date) => {
    if (Platform.OS === 'android') {
      setIsVisible(false);
    }

    if (event.type === 'set' && date) {
      if (Platform.OS === 'android') {
        setSelectedDate(date);
        setTempDate(date);
        onChange(date.toISOString().split('T')[0]);
      } else {
        setTempDate(date);
      }
    }
  };

  const confirmDate = () => {
    setSelectedDate(tempDate);
    onChange(tempDate.toISOString().split('T')[0]);
    setIsVisible(false);
  };

  const cancelDate = () => {
    setTempDate(selectedDate || new Date());
    setIsVisible(false);
  };

  const showDatePicker = () => {
    setTempDate(selectedDate || new Date());
    setIsVisible(true);
  };

  return (
    <View className="mb-4">
      <Text className="text-gray-700 font-semibold mb-2 text-base">
        {label}
      </Text>

      <TouchableOpacity
        className={`bg-gray-50 border rounded-xl p-4 flex-row items-center justify-between ${
          error ? 'border-red-500' : 'border-gray-200'
        }`}
        onPress={showDatePicker}
      >
        <Text className={selectedDate ? 'text-gray-800' : 'text-gray-400'}>
          {selectedDate ? formatDate(selectedDate) : placeholder}
        </Text>
        <Calendar size={20} color="#6B7280" />
      </TouchableOpacity>

      {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}

      {isVisible &&
        (Platform.OS === 'ios' ? (
          <Modal visible transparent animationType="slide">
            <View
              style={{
                flex: 1,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                justifyContent: 'flex-end',
              }}
            >
              <View
                style={{
                  backgroundColor: 'white',
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  paddingBottom: 34,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 20,
                    paddingVertical: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: '#E5E7EB',
                  }}
                >
                  <TouchableOpacity onPress={cancelDate}>
                    <Text style={{ color: '#007AFF', fontSize: 17 }}>
                      Cancelar
                    </Text>
                  </TouchableOpacity>
                  <Text
                    style={{
                      color: '#000000',
                      fontWeight: '600',
                      fontSize: 17,
                    }}
                  >
                    Selecionar Data
                  </Text>
                  <TouchableOpacity onPress={confirmDate}>
                    <Text
                      style={{
                        color: '#007AFF',
                        fontSize: 17,
                        fontWeight: '600',
                      }}
                    >
                      Confirmar
                    </Text>
                  </TouchableOpacity>
                </View>
                <DateTimePicker
                  value={tempDate}
                  mode="date"
                  display="spinner"
                  onChange={handleDateChange}
                  minimumDate={minimumDate}
                  maximumDate={maximumDate}
                  locale="pt-BR"
                />
              </View>
            </View>
          </Modal>
        ) : (
          <DateTimePicker
            value={tempDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
            minimumDate={minimumDate}
            maximumDate={maximumDate}
          />
        ))}
    </View>
  );
};
