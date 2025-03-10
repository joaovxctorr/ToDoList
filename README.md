# TodoList

**TodoList** é uma aplicação web projetada para ajudar os usuários a gerenciar suas tarefas de forma eficiente. A aplicação oferece funcionalidades de cadastro de tarefas, gerenciamento de status e armazenamento em tempo real usando o Firebase, além de integração com autenticação e funcionalidades de segurança.

## Funcionalidades

### Gerenciamento de Tarefas:
- **Adicionar Tarefas**: Os usuários podem adicionar novas tarefas com descrição, data de vencimento e status.
- **Editar e Deletar Tarefas**: É possível editar ou excluir tarefas existentes para mantê-las sempre atualizadas.
- **Marcar Tarefas como Concluídas**: Os usuários podem alterar o status das tarefas para "concluídas", permitindo um acompanhamento mais eficiente.
- **Filtragem de Tarefas**: As tarefas podem ser filtradas com base no status (concluídas ou pendentes), data ou prioridade.

### Autenticação:
- **Login com Google**: Os usuários podem fazer login com sua conta Google para acesso rápido e seguro.
- **Cadastro com Email e Senha**: Possibilidade de criar uma conta utilizando o endereço de email e senha.
- **Recuperação de Senha**: Caso o usuário esqueça a senha, é possível solicitar o envio de um e-mail para recuperação.

### Armazenamento em Tempo Real:
- **Firebase Firestore**: As tarefas são armazenadas em tempo real no Firebase, permitindo que as alterações sejam refletidas instantaneamente para todos os usuários conectados.
- **Firebase Authentication**: Autenticação e controle de acesso com Firebase, garantindo segurança e individualidade para cada usuário.

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces de usuário, criando uma experiência interativa e reativa.
- **Next.js**: Framework React para renderização do lado do servidor, otimizando o desempenho e SEO.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática, proporcionando mais segurança e menos erros no código.
- **Tailwind CSS**: Framework de utilitários para estilização, permitindo a criação rápida de layouts responsivos e customizados.
- **Firebase**: Plataforma que oferece serviços como Firestore (banco de dados em tempo real) e Authentication (autenticação de usuários).
- **React Toastify**: Biblioteca para exibição de notificações de maneira simples e eficiente.

