# Recuperação de senha

**RF**

- Usuário deve poder recuperar sua senha informando o seu e-mail;
- Usuário deve receber um e-mail com instruções de recuperação de senha;
- Usuário deve poder resetar sua senha

**RNF**

- Utilizar Mailtrap para testar envios em ambiente de dev;
- Utilizar Amazon ses para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (backgrond job);

**RN**

- O link enviado por email para resetar senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar sua senha;


# Atualização de perfil

**RF**

- Usuário deve poder atualizar seu nome, email e senha;

**RN**

- O usuário não pode alterar seu email para email já utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antigas;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;


# Painel do pretador

**RF**

- O usuário deve poder listar seus agendamentos de um dia específico;
- prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF**

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenados no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**RN**

- A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar;

# Agendamento de serviço

**RF**

- Usuário deve poder listar todos os prestadores de serviço cadastrados;
- Usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- Usuário deve poder listar os horários disponiveis em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**

- A lista de prestadores deve ser armazenada em cache;

**RN**

- Cada agendamento deve durar uma 1h exatamente;
- Os agendamentos devem estar disponiveis entre 8h as 18h(Primeiro às 8h, último às 17h);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em horário que já passou;
- O prestador não pode agendar horário consigo mesmo;
