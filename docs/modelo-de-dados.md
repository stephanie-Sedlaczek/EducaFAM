# Modelo de dados

O armazenamento real está em `js/data.js`. O esquema é versionado pelo campo `version` do objeto `educafam_store_v2`.

```mermaid
erDiagram
  STORE ||--o{ FAMILY : contains
  FAMILY ||--o{ USER : has
  FAMILY ||--o{ CHILD : has
  FAMILY ||--o{ TRANSACTION : records
  FAMILY ||--o{ CATEGORY : defines
  FAMILY ||--o{ GOAL : owns
  FAMILY ||--o{ MISSION : creates
  FAMILY ||--o{ XP_HISTORY : tracks
  FAMILY ||--o{ BUDGET : sets
  FAMILY ||--o{ NOTIFICATION : receives
  CHILD ||--o{ MISSION : receives
  CHILD ||--o{ XP_HISTORY : earns
  GOAL ||--o{ CONTRIBUTION : receives
  MISSION }o--|| GOAL : may_link

  FAMILY { string id string name string responsible string email boolean consentMinor }
  USER { string id string email string role string password }
  CHILD { string id string name int age string avatar string pin int xp float coffer }
  TRANSACTION { string id string type string description string category float amount date }
  CATEGORY { string id string name string color string icon }
  GOAL { string id string name float target float saved string deadline string type string childId }
  CONTRIBUTION { string id float amount string by string name date }
  MISSION { string id string title string description int xp string type string childId string deadline string status string linkedGoalId }
  XP_HISTORY { string id string childId int amount string reason date }
  BUDGET { string id string category string month float limit }
  NOTIFICATION { string id string text date boolean read string type }
```
