# Product Requirements Document (PRD)
**Project:** Natural Language Calorie Tracker (MVP)  
**Date:** 2026-03-14  

**Related design docs:**
- **ERD:** `calorie_tracker_erd.md` (Entity-Relationship Diagram + modeling notes)

## 1. Executive Summary

The Calorie Tracker is a **chat-first** application designed to minimize friction in dietary logging. Users log what they eat using **natural language** via messaging platforms (starting with Telegram). A **Large Language Model (LLM)** parses these messages into structured meal data, which is then enriched with **nutritional information** (calories and macronutrients) via an external nutrition API.

A **web application** handles user enrollment, goals configuration, and provides dashboards to review history and progress. All data is stored centrally so that usage across multiple chat platforms (future: WhatsApp, Discord) stays in sync.

The MVP focuses on:
- Text-only input via chat.
- Accurate calorie and macro tracking using an external nutrition API.
- On-demand summaries (no push notifications).
- Edit and history capabilities via both chat and web.
- **Traceability & debuggability**: persist raw messages, LLM outputs, clarifications, and errors (see ERD).

## 2. Goals & Non-Goals

### 2.1 Goals (MVP)

- Allow users to log meals using free-form text in chat.
- Automatically calculate calories and macronutrients (protein, carbs, fat) per log.
- Store all logs and nutritional data in a central database.
- Allow users to edit past logs via chat using natural language.
- Provide a web portal for:
  - Enrollment and profile setup.
  - Viewing and editing historical logs.
  - Viewing goal vs. actual calorie intake.
- Use a **Magic Link** flow to associate chat accounts (e.g., Telegram) with web accounts.
- **Auditability**: maintain an edit history so changes can be traced (who/what/when) and optionally undone later.

### 2.2 Non-Goals (MVP)

- No voice-message handling in MVP.
- No photo-based meal recognition in MVP.
- No proactive notifications, reminders, or daily auto-summaries.
- No complex dietary recommendations or coaching logic (e.g., “eat more protein at lunch”).
- No offline mobile app; interaction is via web + chat platforms only.

## 3. Target Users & Personas

### 3.1 Target Users

- **Busy professionals** who want quick, low-friction meal logging.
- **Fitness and nutrition enthusiasts** needing more detailed tracking than “just calories.”
- **Chat-first users** who prefer using Telegram/WhatsApp/Discord over dedicated mobile apps.

### 3.2 Example Persona

**Name:** Alex, 29, software engineer  
**Needs:**
- Simple way to track calories/macros without searching food databases.
- Log via Telegram while at work or on the go.
- Periodically review calorie intake versus goals on a web dashboard.

## 4. User Stories

### 4.1 Logging

1. **Free-Text Logging**
   - *As a user, I want to type “I had a chicken salad and two slices of bread for lunch” so that the app automatically understands and logs my meal without me having to break it down into fields.*

2. **Weight-Based Logging**
   - *As a user, I want to log meals using weights (e.g., “200g grilled chicken”) so that my calorie counts are more accurate.*

3. **Single Follow-up Clarification**
   - *As a user, I want the bot to ask at most one clarifying question when my description is vague, so I don’t feel interrogated.*

### 4.2 History & Editing

4. **View History**
   - *As a user, I want to see what I ate in the last week so that I can understand my patterns and progress.*

5. **Edit via Chat**
   - *As a user, I want to say “Actually, I only ate one slice of that bread” and have the system update the corresponding meal so my totals are correct.*

6. **Edit via Web**
   - *As a user, I want to use a web interface to edit or delete individual food entries so I can make precise corrections when needed.*

### 4.3 Summaries

7. **On-Demand Summary**
   - *As a user, I want to ask “Show my summary for today” so that I can see my total calorie intake when I care about it, without receiving constant notifications.*

## 5. Functional Requirements

### 5.1 Identity, Enrollment & Linking

**FR-1: Web Enrollment**
- Users must be able to create an account via a web application.
- Required baseline fields (MVP minimum):
  - Email (or other primary identifier).
  - Age, sex, height, weight (for context and future features).
  - Activity level (for future goals & recommendations).
- Users can define **calorie intake goals** (macros may be stored but recommendations are not required in MVP).

**FR-2: Magic Link Linking (Cross-Platform)**
- The system generates a **Magic Link** for linking chat accounts to web accounts.
- Flow (Telegram example):
  - From web: User clicks “Connect Telegram” → redirected to Telegram/bot with a token that maps to their account.
  - From bot: Bot can send a web link that, when opened in a browser, associates that chat ID with an existing or new account.
- Architecture must allow reuse of this pattern for future platforms (WhatsApp, Discord).

**FR-2a: Token Security & Lifecycle (Finding from ERD)**
- Magic link tokens must be:
  - **Short-lived** (`expires_at`).
  - **Single-use** (`used_at`).
  - Stored with platform metadata (e.g., Telegram) and optional `redirect_url`.

**FR-3: Unified Profile**
- All chat messages from linked accounts are associated with a **single user profile** in the database.
- Users should see the same history regardless of which platform they use.

**FR-3a: Multi-Identity Mapping (Finding from ERD)**
- Store platform identifiers in a dedicated mapping entity (e.g., `user_identities`) rather than on the `users` record.
- Support multiple identities per user (Telegram now; WhatsApp/Discord later).
- Optionally mark one identity as primary.

### 5.2 Natural Language Meal Logging

**FR-4: Message Ingestion**
- The system receives text messages from Telegram (MVP).
- Messages are sent to the backend for processing.

**FR-5: LLM Parsing**
- The backend sends each meal-related message to an LLM to:
  - Detect intent (“log meal” vs other commands).
  - Extract a structured representation:
    - List of food items.
    - Quantity (e.g., “2 slices”, “1 cup”, “200g”).
    - Meal context if available (breakfast/lunch/dinner/snack).
    - Time of consumption (default to message timestamp if unspecified).

**FR-6: Follow-Up Clarification**
- If the LLM identifies ambiguity (e.g., “a bowl of cereal” without size/type):
  - The system can ask **at most one** clarifying question.
- If the user response is still ambiguous or absent:
  - The system falls back to **standard reference portions** obtained from the nutrition API or pre-defined defaults.

**FR-6a: Clarification Traceability (Finding from ERD)**
- Persist both:
  - The clarification question (`clarification_prompt`).
  - The user’s reply (`clarification_response`).
- Link clarifications to the original log record.

**FR-7: Weight Priority**
- If the user specifies a weight for an item (grams/ounces), this must override any default portion sizes.

### 5.3 Nutritional Intelligence & External API

**FR-8: Nutrition API Integration**
- The backend uses an external **Nutrition API** (e.g., Edamam, Nutritionix, USDA, FatSecret) to get:
  - Calories (kcal).
  - Protein (g).
  - Carbohydrates (g).
  - Fat (g).
- LLM is responsible for **parsing**; the nutrition API is responsible for **nutritional values**.

**FR-9: Per-Item and Per-Meal Calculation**
- For each parsed food item:
  - Resolve to one or more API entries.
  - Calculate per-item calories and macros using the quantity/weight.
- For the meal:
  - Aggregate all items into total calories, protein, carbs, and fats.

**FR-9a: Per-Item Provenance (Finding from ERD)**
- Store, per meal item:
  - Nutrition vendor name.
  - Vendor reference ID (when available).
  - Optional snapshot of the API response used to compute macros (for debugging disputes).
  - Optional confidence/resolution notes.

**FR-10: Error Handling**
- If the nutrition API is unavailable or fails:
  - The system should respond with a clear error message (e.g., “Unable to fetch nutrition data right now. Please try again later.”).
  - The log may be queued for retry or discarded (decision to be specified later).

**FR-10a: Error Observability (Finding from ERD)**
- Persist error metadata on logs:
  - `error_code`, `error_message`.
  - `processing_status`.

**FR-10b: Nutrition API Caching (Finding from ERD)**
- Implement a cache for nutrition lookups keyed by normalized query/hash.
- Cache entries must have an expiry to avoid stale vendor data.

### 5.4 Data Storage & History

**FR-11: Log Storage (Debug/Audit)**
Each ingested message must be stored as a log entry with at minimum:
- User ID.
- Timestamp of message and platform message ID (when available).
- Raw input text.
- Structured parsed representation (JSON) produced by the LLM.
- Processing status (success, pending clarification, failed).
- Clarification prompt/response (if applicable).
- Latency measurement for the end-to-end pipeline.
- Source platform (e.g., Telegram).

**FR-11a: Provenance Link (Finding from ERD)**
- Meals created from a chat message must reference the source log record (`source_log_id`) to enable end-to-end traceability.
- One log may create zero, one, or multiple meals.

**FR-12: History Retrieval**
- Users can:
  - Request summaries by day via chat (e.g., “Show yesterday’s meals”).
  - View all logs in a date range via the web.

**FR-12a: Longitudinal Weight History (Finding from ERD)**
- Store weight as a time series (weight history) rather than only overwriting the user profile field.
- Weight changes should be timestamped and optionally attributed to a source (web/chat/import).

### 5.5 Editing & LLM Reconstructor

**FR-13: Chat-Based Edits**
- Users can issue natural language edit commands, such as:
  - “Edit my breakfast today: remove the toast.”
  - “Change my lunch yesterday; I only ate half the pasta.”
- The LLM is responsible for:
  - Identifying the relevant log(s) and items.
  - Determining the change operation (update quantity, remove item, add item, etc.).
  - Producing a structured “edit instruction” to the backend (e.g., which log ID, which item ID, new values).

**FR-14: Backend Edit Operations**
- The backend must provide APIs to:
  - Update items in a log (e.g., change quantity).
  - Remove or add items to a log.
  - Recalculate and persist the new nutritional totals.

**FR-14a: Edit Audit Trail (Finding from ERD)**
- Persist all edits to an `edit_history` record with:
  - `user_id`, `meal_id`, timestamp.
  - Old value and new value (JSON).
  - Optional link to `source_log_id` when the edit is initiated by chat.

**FR-15: Web-Based Edits**
- On the web dashboard, users can:
  - Browse logs filtered by date.
  - Expand a log to see individual items and nutritional details.
  - Edit or delete items or entire logs with a form-based interface.
  - Changes trigger recalculation of meal and daily totals.

### 5.6 Summaries & Goals

**FR-16: On-Demand Daily Summary**
- Users can ask via chat:
  - “Show today’s summary”
  - “How many calories have I eaten today?”
- Response (minimum):
  - Total calories consumed today.
  - Comparison vs. daily goal (e.g., “1,800 / 2,200 kcal”).
- Macros may be included but recommendations beyond reporting are not required for MVP.

**FR-17: No Automatic Push Summaries**
- The system should **not** send unsolicited daily summaries or reminders in the MVP.
- All summaries are user-initiated.

### 5.7 Web Application (MVP Scope)

**FR-18: User Profile & Goals**
- Users can:
  - Register and log in.
  - Manage basic profile data (age, height, weight, activity level).
  - Set or update daily calorie goals.

**FR-19: Dashboard**
- Shows:
  - Daily/weekly view of calorie intake.
  - “Goal vs. Actual” for calories.
- Minimal charting is acceptable for MVP; can be refined later.

**FR-20: Log Management**
- Web UI to:
  - List meals/logs by date.
  - View meal details (foods, amounts, calories, macros).
  - Edit/delete specific meals or items.

## 6. Non-Functional Requirements

### 6.1 Performance

- **NFR-1:** Chat response latency (LLM parsing + nutrition API + DB write) should ideally be within **3–5 seconds** for 95% of requests.
- **NFR-2:** Web dashboard page loads (excluding first auth) should typically be under **2 seconds** for standard queries.

**NFR-1a: Observability (Finding from ERD)**
- Store end-to-end latency per message (`latency_ms`).
- Store processing outcomes (`processing_status`) and error fields on the log record.

### 6.2 Scalability & Extensibility

- **NFR-3:** The architecture must support:
  - Additional input modalities (voice, images) later without rewriting core business logic.
  - Multiple chat platforms (Telegram, WhatsApp, Discord) through a common abstraction for “message sources.”

### 6.3 Reliability & Availability

- **NFR-4:** The system should be able to handle transient failures of the nutrition API gracefully (see FR-10).
- **NFR-5:** Aim for high availability suitable for a consumer app.

### 6.4 Security & Privacy

- **NFR-6:** All communication between web client, chat integration layer, and backend must use HTTPS or equivalent secure channels.
- **NFR-7:** User-sensitive data (email, health-related data) must be stored securely; passwords must be hashed.
- **NFR-8:** Logs should be associated with internal user IDs; chat platform IDs should be mapped and not used as primary identifiers in the core system.

**NFR-8a: Identity Separation (Finding from ERD)**
- Store platform IDs only in `user_identities` and never as the core domain key.

## 7. Future Scope (Post-MVP)

The following are explicitly out of scope for MVP but should be considered when designing the architecture:

1. **Voice Input**
2. **Image-Based Logging**
3. **Additional Platforms**
4. **Proactive Guidance & Coaching**
5. **Advanced Analytics**

## 8. Open Questions (To Be Decided Later)

1. **Nutrition API Choice**
2. **Handling Partial Failures**
3. **Data Retention Policy**

**Additional (from ERD modeling):**
4. **Nutrition Cache Policy**
   - Cache TTL per vendor?
   - Cache key normalization rules (locale, branded vs generic, unit conversions)?

5. **Edit Undo Policy**
   - Should users be able to “undo last change” via chat?
   - How long should edit history be retained?

## 9. Acceptance Criteria (MVP)

1. A new user can:
   - Sign up via the web.
   - Link their Telegram account using a Magic Link.
   - Log meals via Telegram using natural language.

2. The system:
   - Parses meal messages into items and quantities via an LLM.
   - Fetches nutritional data and calculates per-meal calories and macros.
   - Stores all logs centrally.

3. The user can:
   - Ask for “today’s summary” in chat and see total calories vs. their goal.
   - View and edit past meals via:
     - Chat (LLM reconstructor).
     - Web dashboard.

4. All of the above function with reasonable performance and no manual database edits.

5. **Debuggability & Traceability (Finding from ERD)**
   - Every ingested message produces a stored log record containing raw text, LLM output, processing status, and latency.
   - Every chat-created meal references the source log record.
   - Every edit (chat or web) writes an audit entry with old vs new values.
