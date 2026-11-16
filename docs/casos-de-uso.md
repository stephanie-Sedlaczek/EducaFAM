# Casos de uso

## Responsável
1. Entrar no sistema.
2. Cadastrar criança.
3. Registrar receita/despesa.
4. Criar meta.
5. Contribuir para meta.
6. Criar missão.
7. Aprovar ou recusar missão.
8. Consultar relatórios.
9. Gerenciar categorias/orçamentos.
10. Fazer backup/restauração.

## Criança
1. Entrar com PIN.
2. Visualizar missões.
3. Marcar missão como feita e enviar entrega.
4. Acompanhar aprovação.
5. Consultar metas.
6. Contribuir com o cofrinho.
7. Consultar XP e nível.
8. Guardar dinheiro no cofrinho.

## Diagrama Mermaid
```mermaid
flowchart LR
  R[Responsável] --> L[Login]
  R --> F[Finanças]
  R --> M[Metas]
  R --> MI[Missões]
  R --> C[Crianças]
  R --> RE[Relatórios]
  R --> S[Configurações]
  Cn[Criança] --> CL[Login com PIN]
  CL --> CM[Minhas Missões]
  CL --> CG[Minhas Metas]
  CL --> CP[Meu Progresso]
  CL --> CF[Cofrinho]
  CM --> MI
  CF --> M
  MI -->|aprovação| XP[Histórico de XP]
  MI -->|Registro de despesa| F
  MI -->|Poupança| M
```
