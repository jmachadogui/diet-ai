# Calorie Tracker MVP — ERD (Markdown)

**Project:** Natural Language Calorie Tracker (MVP)  
**Date:** 2026-03-14  

This document contains an ERD representation (Mermaid) and a concise description of entities and relationships.

## Mermaid ERD

```mermaid
erDiagram
  USERS {
    uuid id PK
    string email UK
    string password_hash
    timestamp created_at
    int daily_calorie_goal
    float weight_kg
    float height_cm
    int age
    string sex
    string activity_level
  }

  USER_IDENTITIES {
    uuid id PK
    uuid user_id FK
    string platform
    string platform_user_id
    timestamp linked_at
    timestamp last_seen_at
    boolean is_primary
  }

  MAGIC_LINK_TOKENS {
    uuid id PK
    uuid user_id FK
    string platform
    string token UK
    timestamp expires_at
    timestamp used_at
    string redirect_url
  }

  LOGS {
    uuid id PK
    uuid user_id FK
    string platform
    string platform_message_id
    timestamp message_timestamp
    text raw_text
    jsonb llm_output
    string intent
    string processing_status
    text clarification_prompt
    text clarification_response
    int latency_ms
    string error_code
    text error_message
    timestamp created_at
  }

  MEALS {
    uuid id PK
    uuid user_id FK
    uuid source_log_id FK
    string occasion
    timestamp consumed_at
    timestamp created_at
    int total_calories
    float total_protein_g
    float total_carbs_g
    float total_fat_g
  }

  MEAL_ITEMS {
    uuid id PK
    uuid meal_id FK
    string food_name
    float quantity
    string unit
    float weight_g
    int calories
    float protein_g
    float carbs_g
    float fat_g
    string nutrition_api
    string api_ref_id
    jsonb api_response_snapshot
    string resolution_confidence
    text notes
  }

  API_CACHE {
    uuid id PK
    string vendor
    string query_string
    string normalized_query_hash UK
    jsonb nutrition_data
    timestamp fetched_at
    timestamp expires_at
  }

  USER_WEIGHT_HISTORY {
    uuid id PK
    uuid user_id FK
    float weight_kg
    timestamp recorded_at
    string source
  }

  EDIT_HISTORY {
    uuid id PK
    uuid user_id FK
    uuid meal_id FK
    uuid source_log_id FK
    string edit_type
    jsonb old_value
    jsonb new_value
    timestamp changed_at
  }

  USERS ||--o{ USER_IDENTITIES : has
  USERS ||--o{ MAGIC_LINK_TOKENS : issues
  USERS ||--o{ LOGS : produces
  USERS ||--o{ MEALS : owns
  USERS ||--o{ USER_WEIGHT_HISTORY : tracks
  USERS ||--o{ EDIT_HISTORY : makes

  LOGS ||--o{ MEALS : creates
  MEALS ||--o{ MEAL_ITEMS : contains
  MEALS ||--o{ EDIT_HISTORY : changes
  LOGS ||--o{ EDIT_HISTORY : triggers

```

## Relationship Notes

- **users ↔ user_identities (1:N)**: supports multiple chat platforms per user (Telegram now; WhatsApp/Discord later). Enforces unified profile.
- **users ↔ magic_link_tokens (1:N)**: stores short-lived tokens for linking flows. Tokens are single-use (via `used_at`).
- **users ↔ logs (1:N)**: every incoming message (and optionally web actions) can be recorded for debugging/audit.
- **logs ↔ meals (1:N)**: a single message may create zero, one, or multiple meals (e.g., “breakfast + snack”). `meals.source_log_id` tracks provenance.
- **meals ↔ meal_items (1:N)**: each meal has itemized foods for precise edits and recalculation.
- **users ↔ user_weight_history (1:N)**: preserves weight changes over time.
- **edit_history** links changes back to **user**, **meal**, and optionally the **source_log_id** that triggered the edit.

## Entity Purpose (Quick)

- **USERS**: canonical account + profile + goals.
- **USER_IDENTITIES**: mapping to platform-specific identifiers (e.g., Telegram chat/user id).
- **MAGIC_LINK_TOKENS**: linking and enrollment support across platforms.
- **LOGS**: raw inputs and LLM output for debugging, latency tracking, and error analysis.
- **MEALS**: normalized meal events (time + occasion + totals).
- **MEAL_ITEMS**: per-food item details, including nutrition API resolution metadata.
- **API_CACHE**: caches vendor results to reduce cost/latency.
- **USER_WEIGHT_HISTORY**: longitudinal weight data.
- **EDIT_HISTORY**: audit trail + undo support.
