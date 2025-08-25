import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AppError } from '../errors/AppError';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    if (error instanceof AppError) {
      console.error(`[${error.code}] ${error.message}`, error.details);
    } else {
      console.error('Unexpected error:', error);
    }
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      const isAppError = this.state.error instanceof AppError;
      const errorMessage = isAppError
        ? this.state.error?.message
        : 'Ocorreu um erro inesperado';

      return (
        <View className="flex-1 items-center justify-center p-4 bg-gray-50">
          <Text className="text-xl font-bold text-gray-800 mb-2">Ops!</Text>
          <Text className="text-gray-600 text-center mb-4">{errorMessage}</Text>
          <TouchableOpacity
            className="bg-primary-500 px-6 py-3 rounded-xl"
            onPress={this.handleRetry}
          >
            <Text className="text-white font-semibold">Tentar Novamente</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}
