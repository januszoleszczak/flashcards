# REST API Plan

## 1. Resources

*   **Auth**: Handles user authentication (registration, login, logout). Not directly mapped to a single DB table but interacts with `users`.
*   **Users**: Represents user accounts. (Corresponds to `users` collection)
    *   Note: Direct user resource modification (e.g., `PUT /users/{id}`) is often limited or handled via specific profile endpoints, not detailed in MVP. Focus is on auth.
*   **Folders**: Represents user-created folders to organize flashcards. (Corresponds to `folders` collection)
*   **Flashcards**: Represents individual flashcards. (Corresponds to `flashcards` collection)
*   **AI**: Namespace for AI-related operations, specifically flashcard generation.
*   **UserFlashcardStats**: Manages learning statistics for flashcards. (Corresponds to `userFlashcardStats` collection, primarily interacted with via learning session endpoints).

## 2. Endpoints

### 2.1. Auth

#### 2.1.1. Register User
*   **Method**: `POST`
*   **Path**: `/auth/register`
*   **Description**: Registers a new user.
*   **Request Body**:
    ```json
    {
      "email": "user@example.com",
      "password": "securePassword123"
    }
    ```
*   **Response Body (Success 201)**:
    ```json
    {
      "id": "ObjectId",
      "email": "user@example.com",
      "createdAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
    }
    ```
*   **Error Responses**:
    *   `400 Bad Request`: Validation errors (e.g., invalid email format, password too weak, email already exists).
    *   `500 Internal Server Error`: Server-side issue.

#### 2.1.2. Login User
*   **Method**: `POST`
*   **Path**: `/auth/login`
*   **Description**: Logs in an existing user and returns JWT tokens.
*   **Request Body**:
    ```json
    {
      "email": "user@example.com",
      "password": "securePassword123"
    }
    ```
*   **Response Body (Success 200)**:
    ```json
    {
      "accessToken": "jwt.access.token",
      "user": {
        "id": "ObjectId",
        "email": "user@example.com"
      }
    }
    ```
*   **Error Responses**:
    *   `400 Bad Request`: Validation errors (e.g., missing fields).
    *   `401 Unauthorized`: Invalid credentials.
    *   `500 Internal Server Error`.

#### 2.1.3. Logout User
*   **Method**: `POST`
*   **Path**: `/auth/logout`
*   **Description**: Logs out a user. (Primarily for potential server-side token invalidation if implemented; client also deletes token).
*   **Request Body**: Empty or may contain refresh token if used for invalidation.
*   **Response Body (Success 200)**:
    ```json
    {
      "message": "Successfully logged out"
    }
    ```
*   **Error Responses**:
    *   `401 Unauthorized`: If token is required and invalid/missing.
    *   `500 Internal Server Error`.

### 2.2. AI (Flashcard Generation)

#### 2.2.1. Generate Flashcard Candidates
*   **Method**: `POST`
*   **Path**: `/ai/flashcards/generate`
*   **Description**: Submits text to an AI service to generate flashcard candidates. This does not create flashcards in the database directly.
*   **Authentication**: Required.
*   **Request Body**:
    ```json
    {
      "sourceText": "The text to generate flashcards from...",
      "count": 10,
      "context": "Optional context or category for generation"
    }
    ```
*   **Response Body (Success 200)**:
    ```json
    {
      "candidates": [
        {
          "id": "temp-candidate-id-1", // Temporary ID for client-side tracking during review
          "front": "Generated front text (max 200 chars)",
          "back": "Generated back text (max 500 chars)"
        }
        // ... more candidates
      ]
    }
    ```
*   **Error Responses**:
    *   `400 Bad Request`: Validation errors (e.g., text too short/long as per PRD 3.2.1 (1000-10000 chars for source text), invalid count).
    *   `401 Unauthorized`.
    *   `500 Internal Server Error`: AI service communication error or other server issues.
    *   `503 Service Unavailable`: If the AI service is down or overloaded.

### 2.3. Folders

#### 2.3.1. Create Folder
*   **Method**: `POST`
*   **Path**: `/folders`
*   **Description**: Creates a new folder for the authenticated user.
*   **Authentication**: Required.
*   **Request Body**:
    ```json
    {
      "name": "My New Folder"
    }
    ```
*   **Response Body (Success 201)**:
    ```json
    {
      "_id": "ObjectId",
      "userId": "ObjectId (authenticated user)",
      "name": "My New Folder",
      "createdAt": "YYYY-MM-DDTHH:mm:ss.sssZ",
      "updatedAt": "YYYY-MM-DDTHH:mm:ss.sssZ",
      "isDeleted": false,
      "deletedAt": null
    }
    ```
*   **Error Responses**:
    *   `400 Bad Request`: Validation errors (e.g., name missing, name too long (max 100 chars), name already exists for the user).
    *   `401 Unauthorized`.
    *   `500 Internal Server Error`.

#### 2.3.2. List User's Folders
*   **Method**: `GET`
*   **Path**: `/folders`
*   **Description**: Retrieves a paginated list of active folders for the authenticated user.
*   **Authentication**: Required.
*   **Query Parameters**:
    *   `page` (number, optional, default: 1): Page number for pagination.
    *   `limit` (number, optional, default: 10): Number of items per page.
    *   `sortBy` (string, optional, default: 'createdAt'): Field to sort by (e.g., 'name', 'createdAt').
    *   `sortOrder` (string, optional, default: 'desc'): Sort order ('asc' or 'desc').
*   **Response Body (Success 200)**:
    ```json
    {
      "data": [
        {
          "_id": "ObjectId",
          "userId": "ObjectId",
          "name": "Folder Name",
          "createdAt": "YYYY-MM-DDTHH:mm:ss.sssZ",
          "updatedAt": "YYYY-MM-DDTHH:mm:ss.sssZ",
          "isDeleted": false,
          "deletedAt": null
        }
        // ... more folders
      ],
      "pagination": {
        "currentPage": 1,
        "totalPages": 5,
        "totalItems": 50,
        "hasNextPage": true,
        "hasPreviousPage": false
      }
    }
    ```
*   **Error Responses**:
    *   `401 Unauthorized`.
    *   `500 Internal Server Error`.

#### 2.3.3. Get Folder Details
*   **Method**: `GET`
*   **Path**: `/folders/{folderId}`
*   **Description**: Retrieves details of a specific folder.
*   **Authentication**: Required.
*   **Response Body (Success 200)**:
    ```json
    {
      "_id": "ObjectId",
      "userId": "ObjectId",
      "name": "Folder Name",
      "createdAt": "YYYY-MM-DDTHH:mm:ss.sssZ",
      "updatedAt": "YYYY-MM-DDTHH:mm:ss.sssZ",
      "isDeleted": false,
      "deletedAt": null
      // Potentially include flashcard count or other relevant details
    }
    ```
*   **Error Responses**:
    *   `401 Unauthorized`.
    *   `403 Forbidden`: If the folder does not belong to the user.
    *   `404 Not Found`: Folder not found or is soft-deleted (depending on desired behavior for direct access to soft-deleted items).
    *   `500 Internal Server Error`.

#### 2.3.4. Update Folder
*   **Method**: `PUT`
*   **Path**: `/folders/{folderId}`
*   **Description**: Updates a folder's details (e.g., name).
*   **Authentication**: Required.
*   **Request Body**:
    ```json
    {
      "name": "Updated Folder Name"
    }
    ```
*   **Response Body (Success 200)**:
    ```json
    {
      "_id": "ObjectId",
      "userId": "ObjectId",
      "name": "Updated Folder Name",
      "createdAt": "YYYY-MM-DDTHH:mm:ss.sssZ",
      "updatedAt": "YYYY-MM-DDTHH:mm:ss.sssZ", // This will be updated
      "isDeleted": false,
      "deletedAt": null
    }
    ```
*   **Error Responses**:
    *   `400 Bad Request`: Validation errors (e.g., name missing, too long, already exists).
    *   `401 Unauthorized`.
    *   `403 Forbidden`: Folder does not belong to the user.
    *   `404 Not Found`: Folder not found.
    *   `500 Internal Server Error`.

#### 2.3.5. Soft Delete Folder
*   **Method**: `DELETE`
*   **Path**: `/folders/{folderId}`
*   **Description**: Soft deletes a folder by setting `isDeleted` to true and recording `deletedAt`. Flashcards within are not deleted but become inaccessible via standard folder views.
*   **Authentication**: Required.
*   **Response Body (Success 200 or 204 No Content)**:
    *   If 200 OK:
      ```json
      {
        "_id": "ObjectId",
        "userId": "ObjectId",
        "name": "Folder Name",
        // ... other fields ...
        "isDeleted": true,
        "deletedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
      }
      ```
*   **Error Responses**:
    *   `401 Unauthorized`.
    *   `403 Forbidden`: Folder does not belong to the user.
    *   `404 Not Found`: Folder not found.
    *   `500 Internal Server Error`.

### 2.4. Flashcards

#### 2.4.1. Create Manual Flashcard in a Folder
*   **Method**: `POST`
*   **Path**: `/folders/{folderId}/flashcards`
*   **Description**: Creates a new manual flashcard within a specified folder.
*   **Authentication**: Required.
*   **Request Body**:
    ```json
    {
      "front": "Front of the flashcard (max 200 chars)",
      "back": "Back of the flashcard (max 500 chars)"
      // "source" will be set to "manual" by the backend
    }
    ```
*   **Response Body (Success 201)**:
    ```json
    {
      "_id": "ObjectId",
      "userId": "ObjectId (authenticated user)",
      "folderId": "ObjectId (from path)",
      "front": "Front of the flashcard",
      "back": "Back of the flashcard",
      "source": "manual",
      "createdAt": "YYYY-MM-DDTHH:mm:ss.sssZ",
      "updatedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
    }
    ```
*   **Error Responses**:
    *   `400 Bad Request`: Validation errors (e.g., front/back missing or too long).
    *   `401 Unauthorized`.
    *   `403 Forbidden`: If the folder does not belong to the user.
    *   `404 Not Found`: Folder specified by `folderId` not found.
    *   `500 Internal Server Error`.

#### 2.4.2. Save Reviewed AI-Generated Flashcards to a Folder
*   **Method**: `POST`
*   **Path**: `/folders/{folderId}/flashcards/ai-processed`
*   **Description**: Saves a batch of reviewed (accepted/edited) AI-generated flashcard candidates to a specified folder.
*   **Authentication**: Required.
*   **Request Body**:
    ```json
    {
      "flashcards": [
        {
          "front": "Edited front text (max 200 chars)",
          "back": "Edited back text (max 500 chars)",
          "source": "ai-edited" // or "ai-full" if not edited
        },
        // ... more flashcards
      ]
    }
    ```
*   **Response Body (Success 201)**:
    ```json
    {
      "createdFlashcards": [
        {
          "_id": "ObjectId",
          "userId": "ObjectId",
          "folderId": "ObjectId (from path)",
          "front": "Edited front text",
          "back": "Edited back text",
          "source": "ai-edited", // or "ai-full"
          "createdAt": "YYYY-MM-DDTHH:mm:ss.sssZ",
          "updatedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
        }
        // ... more created flashcards
      ],
      "count": 2 // Number of successfully created flashcards
    }
    ```
*   **Error Responses**:
    *   `400 Bad Request`: Validation errors (e.g., missing fields, content too long in any flashcard).
    *   `401 Unauthorized`.
    *   `403 Forbidden`: If the folder does not belong to the user.
    *   `404 Not Found`: Folder specified by `folderId` not found.
    *   `500 Internal Server Error`.

#### 2.4.3. List Flashcards in a Folder
*   **Method**: `GET`
*   **Path**: `/folders/{folderId}/flashcards`
*   **Description**: Retrieves a paginated list of flashcards within a specific folder.
*   **Authentication**: Required.
*   **Query Parameters**:
    *   `page` (number, optional, default: 1).
    *   `limit` (number, optional, default: 10).
    *   `search` (string, optional): Text search query for front/back fields.
    *   `sortBy` (string, optional, default: 'createdAt'): Field to sort by (e.g., 'front', 'createdAt', 'updatedAt').
    *   `sortOrder` (string, optional, default: 'desc').
*   **Response Body (Success 200)**:
    ```json
    {
      "data": [
        {
          "_id": "ObjectId",
          "userId": "ObjectId",
          "folderId": "ObjectId",
          "front": "Flashcard front",
          "back": "Flashcard back",
          "source": "manual",
          "createdAt": "YYYY-MM-DDTHH:mm:ss.sssZ",
          "updatedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
        }
        // ... more flashcards
      ],
      "pagination": { /* ... pagination details ... */ }
    }
    ```
*   **Error Responses**:
    *   `401 Unauthorized`.
    *   `403 Forbidden`: If folder does not belong to user.
    *   `404 Not Found`: Folder not found.
    *   `500 Internal Server Error`.

#### 2.4.4. List All User's Flashcards (Across Folders)
*   **Method**: `GET`
*   **Path**: `/flashcards`
*   **Description**: Retrieves a paginated list of all flashcards for the authenticated user, optionally filtered by folder.
*   **Authentication**: Required.
*   **Query Parameters**:
    *   `page` (number, optional, default: 1).
    *   `limit` (number, optional, default: 10).
    *   `search` (string, optional): Text search query for front/back fields.
    *   `folderId` (ObjectId string, optional): Filter by a specific folder.
    *   `sortBy` (string, optional, default: 'createdAt').
    *   `sortOrder` (string, optional, default: 'desc').
*   **Response Body (Success 200)**: Same structure as listing flashcards in a folder.
*   **Error Responses**:
    *   `400 Bad Request`: Invalid `folderId` format if provided.
    *   `401 Unauthorized`.
    *   `500 Internal Server Error`.

#### 2.4.5. Get Specific Flashcard
*   **Method**: `GET`
*   **Path**: `/flashcards/{flashcardId}`
*   **Description**: Retrieves details of a specific flashcard.
*   **Authentication**: Required.
*   **Response Body (Success 200)**:
    ```json
    {
      "_id": "ObjectId",
      "userId": "ObjectId",
      "folderId": "ObjectId",
      "front": "Flashcard front",
      "back": "Flashcard back",
      "source": "manual", // or "ai-full", "ai-edited"
      "createdAt": "YYYY-MM-DDTHH:mm:ss.sssZ",
      "updatedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
      // Optionally include userFlashcardStats if relevant here, or keep separate
    }
    ```
*   **Error Responses**:
    *   `401 Unauthorized`.
    *   `403 Forbidden`: If flashcard does not belong to user.
    *   `404 Not Found`: Flashcard not found.
    *   `500 Internal Server Error`.

#### 2.4.6. Update Flashcard
*   **Method**: `PUT`
*   **Path**: `/flashcards/{flashcardId}`
*   **Description**: Updates a flashcard's content. If an 'ai-full' flashcard is edited, its source changes to 'ai-edited'. Moving flashcard between folders is out of MVP scope.
*   **Authentication**: Required.
*   **Request Body**:
    ```json
    {
      "front": "Updated front content (max 200 chars)", // Optional
      "back": "Updated back content (max 500 chars)"  // Optional
      // "folderId" change is not supported in MVP
    }
    ```
*   **Response Body (Success 200)**: Updated flashcard object (similar to GET response, with `updatedAt` and potentially `source` changed).
*   **Error Responses**:
    *   `400 Bad Request`: Validation errors (e.g., content too long).
    *   `401 Unauthorized`.
    *   `403 Forbidden`: Flashcard does not belong to user.
    *   `404 Not Found`: Flashcard not found.
    *   `500 Internal Server Error`.

#### 2.4.7. Delete Flashcard
*   **Method**: `DELETE`
*   **Path**: `/flashcards/{flashcardId}`
*   **Description**: Permanently deletes a flashcard and its associated `userFlashcardStats`.
*   **Authentication**: Required.
*   **Response Body (Success 204 No Content)**.
*   **Error Responses**:
    *   `401 Unauthorized`.
    *   `403 Forbidden`: Flashcard does not belong to user.
    *   `404 Not Found`: Flashcard not found.
    *   `500 Internal Server Error`.

### 2.5. Learning (Spaced Repetition)

#### 2.5.1. Get Next Flashcards for Learning Session
*   **Method**: `GET`
*   **Path**: `/folders/{folderId}/learn/next-cards`
*   **Description**: Fetches the next set of flashcards due for review in a specific folder, based on SR algorithm logic.
*   **Authentication**: Required.
*   **Query Parameters**:
    *   `limit` (number, optional, default: 5): Max number of cards to return.
*   **Response Body (Success 200)**:
    ```json
    {
      "cardsToReview": [
        {
          "flashcard": {
            "_id": "ObjectId",
            "front": "Front of card 1",
            "back": "Back of card 1",
            "folderId": "ObjectId (from path)"
            // ... other flashcard fields
          },
          "stats": { // userFlashcardStats object or null if new
            "_id": "ObjectId (statsId)",
            "nextReviewDate": "YYYY-MM-DDTHH:mm:ss.sssZ",
            "interval": 2,
            "easeFactor": 2.5,
            "repetitionCount": 1,
            "lastReviewedAt": "YYYY-MM-DDTHH:mm:ss.sssZ",
            // ... other SR stats fields
          }
        }
        // ... more cards
      ],
      "folderName": "Name of the Folder" // Optional: for UI context
    }
    ```
*   **Error Responses**:
    *   `401 Unauthorized`.
    *   `403 Forbidden`: If folder does not belong to user.
    *   `404 Not Found`: Folder not found.
    *   `500 Internal Server Error`.

#### 2.5.2. Submit Flashcard Review
*   **Method**: `POST`
*   **Path**: `/flashcards/{flashcardId}/review`
*   **Description**: Submits a user's review of a flashcard, triggering an update to its `userFlashcardStats` via the SR library.
*   **Authentication**: Required.
*   **Request Body**:
    ```json
    {
      "rating": "easy" // Or "good", "hard", "again" - depends on SR library
      // Potentially other SR library specific inputs
    }
    ```
*   **Response Body (Success 200)**:
    ```json
    { // Updated userFlashcardStats object
      "_id": "ObjectId (statsId)",
      "userId": "ObjectId (authenticated user)",
      "flashcardId": "ObjectId (from path)",
      "nextReviewDate": "YYYY-MM-DDTHH:mm:ss.sssZ",
      "interval": 3,
      "easeFactor": 2.6,
      "repetitionCount": 2,
      "lastReviewedAt": "YYYY-MM-DDTHH:mm:ss.sssZ", // This will be updated now
      "status": "review", // Example status
      // ... other updated SR stats fields
    }
    ```
*   **Error Responses**:
    *   `400 Bad Request`: Invalid rating value or other SR input.
    *   `401 Unauthorized`.
    *   `403 Forbidden`: If flashcard does not belong to user.
    *   `404 Not Found`: Flashcard not found.
    *   `500 Internal Server Error`: SR library processing error.

## 3. Authentication and Authorization

*   **Authentication Mechanism**: JSON Web Tokens (JWT).
    *   `accessToken`: Short-lived, sent in the `Authorization: Bearer <token>` header for protected endpoints.
    *   (Optional for MVP, but good practice) `refreshToken`: Longer-lived, securely stored by the client (e.g., HTTPOnly cookie), used to obtain new access tokens. Not detailed in MVP endpoints but a common pattern.
*   **Authorization (Row-Level Security)**:
    *   Implemented at the application layer (NestJS backend).
    *   All queries accessing or modifying user-specific data (`folders`, `flashcards`, `userFlashcardStats`) will be scoped by the authenticated `userId` extracted from the JWT.
    *   This ensures users can only operate on their own data. Attempts to access/modify other users' data will result in `403 Forbidden` or `404 Not Found` errors.

## 4. Validation and Business Logic

### 4.1. General Validation
*   All incoming request payloads will be validated for:
    *   **Required fields**: As per DB schema and endpoint definition.
    *   **Data types**: Correct types for each field.
    *   **String lengths**:
        *   Flashcard `front`: max 200 characters.
        *   Flashcard `back`: max 500 characters.
        *   Folder `name`: max 100 characters (application-enforced).
    *   **Enum values**: For fields like `flashcards.source`.
    *   **Object ID format**: For path parameters and foreign keys.
*   NestJS `ValidationPipe` with `class-validator` and `class-transformer` will be used for robust validation.

### 4.2. Specific Business Logic and Constraints

*   **User Registration**:
    *   `email` must be unique (DB index `users.email`).
    *   Password hashing (e.g., bcrypt) before storing in `users.hashedPassword`.
*   **Folder Creation/Update**:
    *   `name` must be unique per user (DB index `folders.userId_name` on active folders, or as per chosen index strategy).
    *   `isDeleted` is `false` by default. Soft delete sets `isDeleted` to `true` and `deletedAt`.
*   **Flashcard Creation/Update**:
    *   Must be associated with a valid `folderId` belonging to the user.
    *   `source` is set to `"manual"` for manually created cards.
    *   For AI-processed cards, `source` is `"ai-full"` or `"ai-edited"`.
    *   If an `ai-full` flashcard is edited via `PUT /flashcards/{flashcardId}`, its `source` automatically changes to `"ai-edited"`.
    *   PRD 3.2.1: AI Generation `sourceText` expected to be 1000-10000 characters.
*   **AI Flashcard Generation**:
    *   The `/ai/flashcards/generate` endpoint returns candidates; it does not save them.
    *   Candidates are saved via `/folders/{folderId}/flashcards/ai-processed` after user review.
*   **Learning Session**:
    *   `/folders/{folderId}/learn/next-cards` uses SR logic (via an integrated library) to determine which cards are due, querying `userFlashcardStats`.
    *   `/flashcards/{flashcardId}/review` uses the SR library to update `userFlashcardStats` based on user's `rating`.
*   **Deletion**:
    *   `DELETE /folders/{folderId}` performs a soft delete.
    *   `DELETE /flashcards/{flashcardId}` performs a hard delete of the flashcard and its associated `userFlashcardStats`.
*   **Search**:
    *   Flashcard search (`GET /flashcards`, `GET /folders/{folderId}/flashcards` with `?search=`) uses the text index on `flashcards.front` and `flashcards.back`.

### 4.3. Error Handling
*   Consistent error response structure:
    ```json
    {
      "statusCode": 4xx or 5xx,
      "message": "A human-readable error message or array of messages for validation.",
      "error": "Short error description (e.g., 'Bad Request', 'Unauthorized')" // Optional
      // "errors": ["field: specific error"] // For detailed validation errors
    }
    ```
*   Standard HTTP status codes will be used.

### 4.4. Security Measures
*   **HTTPS**: All communication.
*   **Rate Limiting**: Applied to sensitive endpoints like auth and AI generation to prevent abuse. (PRD US-AUTH-002 mentions brute-force protection for login).
*   **Input Sanitization**: To prevent XSS if content were ever rendered as HTML (though current spec is plain text).
*   **Dependency Security**: Regularly update dependencies. 