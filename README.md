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

### Gerenciamento de Estado

- **TanStack Query** - Gerenciamento de estado do servidor
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de esquemas

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
│   │   ├── forms/          # Componentes de formulário
│   │   └── ui/             # Componentes de interface
│   ├── constants/          # Constantes e configurações
│   │   ├── api/            # Configurações da API
│   │   ├── colors/         # Paleta de cores
│   │   └── fonts/          # Configurações de fontes
│   ├── hooks/              # Custom hooks React
│   ├── screens/            # Telas da aplicação
│   │   ├── auth/           # Telas de autenticação
│   │   ├── home/           # Tela principal
│   │   ├── transfer/       # Tela de transferência
│   │   └── transfers/      # Lista de transferências
│   ├── services/           # Serviços e APIs
│   │   ├── api/            # Cliente HTTP e endpoints
│   │   └── storage/        # Gerenciamento de armazenamento
│   ├── store/              # Gerenciamento de estado
│   │   ├── auth/           # Estado de autenticação
│   │   └── transfers/      # Estado das transferências
│   ├── types/              # Definições de tipos TypeScript
│   └── utils/              # Funções utilitárias
├── __tests__/              # Testes automatizados
├── assets/                 # Recursos estáticos
└── docs/                   # Documentação
```

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

3. **Configure as variáveis de ambiente**
   ```bash
   cp .env.example .env
   # Edite o arquivo .env com suas configurações
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

# Build para produção
expo build:android
expo build:ios
```

## 🧪 Testes

O projeto utiliza Jest como framework de testes com suporte a:

- **Testes unitários** para componentes e funções
- **Testes de integração** para fluxos de usuário
- **Mocks** para dependências externas
- **Cobertura de código** para garantir qualidade

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

## 📚 Documentação Adicional

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [NativeWind Documentation](https://www.nativewind.dev/)
- [React Navigation Documentation](https://reactnavigation.org/)

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
