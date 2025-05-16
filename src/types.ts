// src/types.ts

// --- Base Types ---

/**
 * Represents a MongoDB ObjectId, typically a string.
 */
export type ObjectId = string;

/**
 * Base interface for entities with common audit fields.
 * Timestamps are represented as ISO date strings.
 */
export interface BaseEntity {
    _id: ObjectId;
    createdAt: string;
    updatedAt: string;
}

/**
 * Represents the possible sources of a flashcard.
 */
export type FlashcardSource = "manual" | "ai-full" | "ai-edited";

/**
 * Represents the rating given during a flashcard review.
 * These values typically map to spaced repetition algorithm inputs.
 */
export type FlashcardReviewRating = "easy" | "good" | "hard" | "again";

// --- Entity-like Structures (Conceptual Models for DTOs) ---

/**
 * Conceptual representation of a User, primarily for deriving DTOs.
 * The actual User entity in the database would include sensitive fields like hashedPassword.
 */
export interface UserBase extends BaseEntity {
    email: string;
}

/**
 * Conceptual representation of a Folder entity.
 */
export interface Folder extends BaseEntity {
    userId: ObjectId;
    name: string;
    isDeleted: boolean;
    deletedAt: string | null;
}

/**
 * Conceptual representation of a Flashcard entity.
 */
export interface Flashcard extends BaseEntity {
    userId: ObjectId;
    folderId: ObjectId;
    front: string;
    back: string;
    source: FlashcardSource;
}

/**
 * Conceptual representation of UserFlashcardStats entity.
 * Contains spaced repetition learning metadata for a flashcard.
 */
export interface UserFlashcardStats extends BaseEntity {
    userId: ObjectId;
    flashcardId: ObjectId;
    nextReviewDate: string;
    interval: number;
    easeFactor: number;
    repetitionCount: number;
    lastReviewedAt: string;
    status: string; // e.g., "review", "learning", "graduated"
    // Other SR-specific fields might be present
}

// --- Pagination ---

/**
 * Structure for pagination information in API responses.
 */
export interface PaginationInfo {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

/**
 * Generic structure for paginated API responses.
 */
export interface PaginatedResponse<T> {
    data: T[];
    pagination: PaginationInfo;
}

// --- Auth DTOs ---

// 2.1.1 Register User
export interface RegisterUserRequestDto {
    email: string;
    password: string;
}

export interface RegisteredUserResponseDto {
    id: ObjectId; // Note: 'id' here, not '_id' as per API plan
    email: string;
    createdAt: string;
}

// 2.1.2 Login User
export interface LoginUserRequestDto {
    email: string;
    password: string;
}

export interface UserInLoginResponseDto {
    id: ObjectId; // Note: 'id' here, not '_id'
    email: string;
}

export interface LoginUserResponseDto {
    accessToken: string;
    user: UserInLoginResponseDto;
}

// 2.1.3 Logout User
export interface LogoutUserResponseDto {
    message: string;
}

// --- AI (Flashcard Generation) DTOs ---

// 2.2.1 Generate Flashcard Candidates
export interface GenerateFlashcardCandidatesRequestDto {
    sourceText: string;
    count: number;
    context?: string;
}

export interface FlashcardCandidateDto {
    id: string; // Temporary client-side ID
    front: string;
    back: string;
}

export interface GeneratedFlashcardCandidatesResponseDto {
    candidates: FlashcardCandidateDto[];
}

// --- Folders DTOs ---

// 2.3.1 Create Folder
export interface CreateFolderRequestDto {
    name: string;
}

/**
 * DTO for Folder responses. Directly maps to the Folder entity structure.
 */
export type FolderResponseDto = Folder;

// 2.3.2 List User's Folders
export interface ListFoldersQueryDto {
    page?: number;
    limit?: number;
    sortBy?: "name" | "createdAt";
    sortOrder?: "asc" | "desc";
}

export type ListFoldersResponseDto = PaginatedResponse<FolderResponseDto>;

// 2.3.3 Get Folder Details (Uses FolderResponseDto)

// 2.3.4 Update Folder
export interface UpdateFolderRequestDto {
    name: string;
}
// Response is FolderResponseDto

// 2.3.5 Soft Delete Folder
// Response is FolderResponseDto (for 200 OK) or 204 No Content
export type SoftDeleteFolderResponseDto = FolderResponseDto;


// --- Flashcards DTOs ---

// 2.4.1 Create Manual Flashcard in a Folder
export interface CreateManualFlashcardRequestDto {
    front: string;
    back: string;
}

/**
 * DTO for Flashcard responses. Directly maps to the Flashcard entity structure.
 */
export type FlashcardResponseDto = Flashcard;

// 2.4.2 Save Reviewed AI-Generated Flashcards to a Folder
export interface AiProcessedFlashcardDto {
    front: string;
    back: string;
    source: "ai-edited" | "ai-full";
}

export interface SaveAiFlashcardsRequestDto {
    flashcards: AiProcessedFlashcardDto[];
}

export interface SaveAiFlashcardsResponseDto {
    createdFlashcards: FlashcardResponseDto[];
    count: number;
}

// 2.4.3 List Flashcards in a Folder
export interface ListFlashcardsInFolderQueryDto {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: "front" | "createdAt" | "updatedAt";
    sortOrder?: "asc" | "desc";
}

export type ListFlashcardsInFolderResponseDto = PaginatedResponse<FlashcardResponseDto>;

// 2.4.4 List All User's Flashcards
export interface ListAllUserFlashcardsQueryDto {
    page?: number;
    limit?: number;
    search?: string;
    folderId?: ObjectId;
    sortBy?: string; // API Plan specifies 'string', allowing flexibility beyond direct entity fields
    sortOrder?: "asc" | "desc";
}

export type ListAllUserFlashcardsResponseDto = PaginatedResponse<FlashcardResponseDto>;

// 2.4.5 Get Specific Flashcard (Uses FlashcardResponseDto)

// 2.4.6 Update Flashcard
export interface UpdateFlashcardRequestDto {
    front?: string;
    back?: string;
}
// Response is FlashcardResponseDto

// 2.4.7 Delete Flashcard (Response is 204 No Content)


// --- Learning (Spaced Repetition) DTOs ---

// 2.5.1 Get Next Flashcards for Learning Session
export interface GetNextFlashcardsForLearningQueryDto {
    limit?: number;
}

/**
 * DTO for UserFlashcardStats responses.
 * Directly maps to the UserFlashcardStats entity structure.
 */
export type UserFlashcardStatsResponseDto = UserFlashcardStats;

/**
 * Represents a flashcard along with its learning statistics for a review session.
 * As per API Plan (2.5.1), 'flashcard' includes _id, front, back, folderId, and potentially other fields.
 * Using the full FlashcardResponseDto for 'flashcard' to ensure all necessary data is available.
 */
export interface FlashcardWithStatsDto {
    flashcard: FlashcardResponseDto;
    stats: UserFlashcardStatsResponseDto | null;
}

export interface GetNextFlashcardsForLearningResponseDto {
    cardsToReview: FlashcardWithStatsDto[];
    folderName?: string;
}

// 2.5.2 Submit Flashcard Review
export interface SubmitFlashcardReviewRequestDto {
    rating: FlashcardReviewRating;
}

// Response is UserFlashcardStatsResponseDto
export type SubmitFlashcardReviewResponseDto = UserFlashcardStatsResponseDto;


// --- General API Error DTO ---
// As per section 4.3 Error Handling

export interface ApiErrorResponseDto {
    statusCode: number;
    message: string | string[];
    error?: string;
    // errors?: string[]; // For detailed validation errors, a more specific structure might be needed if plan evolves.
} 