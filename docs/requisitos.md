# Requisitos

## Funcionais
- RF01 — Cadastrar família e responsável.
- RF02 — Autenticar responsável com senha derivada por PBKDF2.
- RF03 — Cadastrar criança com avatar, idade e PIN de 4 dígitos.
- RF04 — Restringir o perfil infantil às funções próprias.
- RF05 — Registrar, editar, excluir e importar/exportar lançamentos.
- RF06 — Criar categorias e orçamentos mensais.
- RF07 — Criar metas familiares e individuais com prazo.
- RF08 — Registrar contribuições e histórico de contribuições.
- RF09 — Criar missões por tipo, XP, criança e prazo.
- RF10 — Permitir envio da missão pela criança e aprovação/recusa pelo responsável.
- RF11 — Creditar XP somente após aprovação.
- RF12 — Integrar missão de registro de despesa às finanças.
- RF13 — Integrar missão de poupança às metas.
- RF14 — Manter histórico de XP e notificações internas.
- RF15 — Exibir dashboard e relatórios.
- RF16 — Exportar/importar backup JSON.
- RF17 — Imprimir relatórios em PDF via impressão do navegador.

## Não funcionais
- RNF01 — HTML5, CSS3 e JavaScript puro.
- RNF02 — Sem bibliotecas ou frameworks externos.
- RNF03 — Persistência local com LocalStorage.
- RNF04 — Interface responsiva para desktop, tablet e celular.
- RNF05 — Textos em pt-BR e valores monetários em BRL.
- RNF06 — Foco visível, navegação por teclado e semântica ARIA em componentes principais.
- RNF07 — Sessão expira após 30 minutos de inatividade.
- RNF08 — Dados de senha/PIN não são armazenados em texto puro.
- RNF09 — Conteúdo digitado pelo usuário é escapado antes de renderização HTML.
- RNF10 — Estrutura preparada para migração de esquema.
