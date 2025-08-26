# 🏦 BancoXYZ

Uma aplicação móvel moderna para gerenciamento bancário, desenvolvida com React Native e Expo.

## 📱 Sobre o Projeto

BancoXYZ é uma aplicação bancária móvel que oferece funcionalidades essenciais para gerenciamento de contas, transferências e operações financeiras. Desenvolvida com as melhores práticas de desenvolvimento mobile, a aplicação proporciona uma experiência de usuário intuitiva e segura.

## ✨ Funcionalidades

- 🔐 **Autenticação Segura**: Sistema de login e registro de usuários
- 🏠 **Dashboard Principal**: Visão geral da conta e saldo
- 💸 **Transferências**: Envio e recebimento de dinheiro
- 📊 **Histórico**: Acompanhamento de todas as transações
- 🎨 **Interface Moderna**: Design responsivo com NativeWind/TailwindCSS
- 🚀 **Splash Screen**: Tela de inicialização personalizada com animações
- 📱 **Responsivo**: Adaptação para diferentes tamanhos de tela

## 🚀 Tecnologias Utilizadas

### Frontend

- **React Native** - Framework para desenvolvimento mobile
- **Expo** - Plataforma para desenvolvimento React Native
- **TypeScript** - Linguagem de programação tipada
- **NativeWind** - Framework CSS-in-JS para React Native
- **TailwindCSS** - Framework CSS utilitário

### Navegação

- **React Navigation** - Sistema de navegação entre telas
- **Bottom Tabs** - Navegação por abas inferiores
- **Stack Navigator** - Navegação em pilha
- **Auth Navigator** - Navegação para usuários autenticados

### Gerenciamento de Estado

- **Redux Toolkit** - Gerenciamento de estado global
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de esquemas
- **Redux Persist** - Persistência de estado

### Serviços e APIs

- **Axios** - Cliente HTTP para requisições
- **React Query** - Gerenciamento de estado do servidor
- **AsyncStorage** - Armazenamento local assíncrono

### Desenvolvimento

- **ESLint** - Linting de código
- **Prettier** - Formatação de código
- **Jest** - Framework de testes
- **Husky** - Git hooks
- **Lint-staged** - Linting pré-commit

## 📁 Estrutura do Projeto

```
BancoXYZ/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── auth/           # Componentes de autenticação
│   │   ├── forms/          # Componentes de formulário
│   │   ├── home/           # Componentes da tela principal
│   │   ├── transfers/      # Componentes de transferências
│   │   ├── ErrorBoundary.tsx # Tratamento de erros
│   │   ├── SplashScreen.tsx  # Tela de inicialização
│   │   └── index.tsx       # Exportações dos componentes
│   ├── hooks/              # Custom hooks React
│   │   ├── useAuth.ts      # Hook de autenticação
│   │   └── useRedux.ts     # Hook para Redux
│   ├── navigation/          # Sistema de navegação
│   │   ├── AuthNavigator.tsx # Navegação de autenticação
│   │   ├── MainNavigator.tsx # Navegação principal
│   │   ├── RootNavigator.tsx # Navegação raiz
│   │   ├── guards.ts        # Proteção de rotas
│   │   └── types.ts         # Tipos de navegação
│   ├── providers/           # Provedores de contexto
│   │   └── AuthProvider.tsx # Provedor de autenticação
│   ├── screens/             # Telas da aplicação
│   │   ├── auth/            # Telas de autenticação
│   │   ├── home/            # Tela principal
│   │   ├── profile/         # Tela de perfil
│   │   ├── transfer/        # Tela de transferência
│   │   └── transfers/       # Lista de transferências
│   ├── services/            # Serviços e APIs
│   │   ├── api/             # Cliente HTTP e endpoints
│   │   ├── auth/            # Serviços de autenticação
│   │   ├── balance/         # Serviços de saldo
│   │   ├── transfer/        # Serviços de transferência
│   │   └── mock/            # Dados e serviços mock
│   ├── store/               # Gerenciamento de estado Redux
│   │   ├── slices/          # Slices do Redux Toolkit
│   │   │   ├── authSlice.ts # Estado de autenticação
│   │   │   ├── balanceSlice.ts # Estado de saldo
│   │   │   └── transferSlice.ts # Estado de transferências
│   │   └── index.ts         # Configuração da store
│   ├── theme/               # Configurações de tema
│   │   └── ThemeContext.tsx # Contexto de tema básico
│   ├── types/               # Definições de tipos TypeScript
│   │   ├── api/             # Tipos de API
│   │   ├── auth/            # Tipos de autenticação
│   │   ├── components/      # Tipos de componentes
│   │   ├── forms/           # Tipos de formulários
│   │   ├── models/          # Modelos de dados
│   │   ├── store/           # Tipos do Redux
│   │   └── transfers/       # Tipos de transferências
│   ├── utils/               # Funções utilitárias
│   │   ├── dimensions.ts    # Dimensões da tela
│   │   ├── masks.ts         # Máscaras de input
│   │   ├── retry.ts         # Lógica de retry
│   │   ├── splashConfig.ts  # Configuração da splash screen
│   │   └── lazyLoad.tsx     # Carregamento lazy
│   └── schemas/             # Esquemas de validação
│       └── transferSchema.ts # Schema de transferência
├── __tests__/               # Testes automatizados
│   ├── components/          # Testes de componentes
│   ├── services/            # Testes de serviços
│   └── store/               # Testes da store
├── assets/                  # Recursos estáticos
│   ├── icon.png             # Ícone principal do app
│   ├── splash-icon.png      # Ícone da splash screen
│   ├── adaptive-icon.png    # Ícone adaptativo Android
│   └── favicon.png          # Favicon para web
├── app.json                 # Configuração do Expo
├── tailwind.config.js       # Configuração do TailwindCSS
└── tsconfig.json            # Configuração do TypeScript
```

## 🚀 Splash Screen

A splash screen personalizada inclui:

- **Animações Suaves**: Fade in/out com escala
- **Layout Responsivo**: Funciona em diferentes tamanhos de tela
- **Configuração Centralizada**: Arquivo `splashConfig.ts` para ajustes
- **Design Consistente**: Usa as cores principais do app

## 🛠️ Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**
- **Expo CLI** (`npm install -g @expo/cli`)
- **Git**

## 📦 Instalação

1. **Clone o repositório**

   ```bash
   git clone https://github.com/seu-usuario/BancoXYZ.git
   cd BancoXYZ
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

## 🚀 Como Executar

### Desenvolvimento

```bash
# Iniciar o servidor de desenvolvimento
npm start

# Executar no Android
npm run android

# Executar no iOS
npm run ios

# Executar na web
npm run web
```

### Testes

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm run test:watch

# Executar testes com cobertura
npm run test:coverage
```

### Qualidade de Código

```bash
# Verificar linting
npm run lint

# Corrigir problemas de linting automaticamente
npm run lint:fix

# Verificar formatação
npm run format:check

# Formatar código automaticamente
npm run format

# Verificar tipos TypeScript
npm run type-check
```

### Build e Deploy

```bash
# Verificação completa antes do build
npm run prebuild

## 🧪 Testes

O projeto utiliza Jest como framework de testes com suporte a:

- **Testes unitários** para componentes e funções
- **Testes de integração** para fluxos de usuário
- **Mocks** para dependências externas
- **Cobertura de código** para garantir qualidade
- **Testes de componentes** com React Native Testing Library

## 📱 Plataformas Suportadas

- ✅ **Android** (API 21+)
- ✅ **iOS** (iOS 12+)
- ✅ **Web** (navegadores modernos)

## 🔧 Configuração

### ESLint

Configurado com regras para React Native e TypeScript, garantindo qualidade e consistência do código.

### Prettier

Formatação automática do código seguindo padrões estabelecidos.

### Husky

Git hooks para garantir que o código seja validado antes de cada commit.

### TypeScript

Configuração rigorosa para detectar erros em tempo de desenvolvimento.

### TailwindCSS

Sistema de design utilitário com configuração personalizada para React Native.

## 📚 Documentação Adicional

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [NativeWind Documentation](https://www.nativewind.dev/)
- [React Navigation Documentation](https://reactnavigation.org/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 👥 Equipe

- **Desenvolvedor Principal** - [Rodrigo Guedes](https://github.com/RodrigoGSantos1)

---

**BancoXYZ** - Transformando a experiência bancária digital 🚀
```
