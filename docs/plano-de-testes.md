# Plano de testes

| # | Caso | Passos | Resultado esperado |
|---|---|---|---|
| 1 | Login responsável | Abrir login, informar conta demo | Dashboard abre |
| 2 | Senha inválida | Informar senha errada | Mensagem de erro |
| 3 | Logout | Clicar Sair | Sessão removida e login aberto |
| 4 | Rota protegida | Sem sessão, abrir financas.html | Redireciona ao login |
| 5 | Criar criança | Cadastrar nome, idade, avatar e PIN | Perfil aparece na tela |
| 6 | Login criança | Entrar como criança e PIN correto | Modo infantil abre |
| 7 | Restrição criança | Tentar abrir financas.html | Retorna ao modo infantil |
| 8 | Nova despesa | Registrar despesa válida | Lançamento aparece no mês |
| 9 | Editar despesa | Editar lançamento | Dados atualizados |
| 10 | Meta | Criar meta e contribuir | Progresso/histórico atualizam |
| 11 | Missão | Criar missão e entrar como criança | Criança visualiza missão |
| 12 | Aprovação | Criança envia entrega, responsável aprova | XP é creditado |
| 13 | Registro de despesa | Missão com valor é aprovada | Lançamento entra em Finanças |
| 14 | Backup | Exportar/importar JSON | Dados retornam sem perda |
| 15 | Acessibilidade | Navegar com Tab e Esc em modal | Foco visível e modal fecha com Esc |
