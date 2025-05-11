// src/apiData.ts

export interface ApiEndpoint {
  id: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  path: string;
  group: string;
  description: string;
  requiresAuth?: boolean;
  // ----------------------------------
  pathParameters?: ApiParameter[];
  queryParameters?: ApiParameter[];
  requestHeaders?: ApiParameter[];
  requestBodySchema?: ApiParameter[];
  // ----------------------------------
  requestBody?: string;
  responseBody?: string;
  responseCodes: { code: number; description: string; success: boolean }[];
  responseFieldDescriptions?: ApiParameter[];
}

export interface ApiParameter {
  name: string; // Parameter name (e.g., 'user_id', 'limit', 'Authorization')
  type: "string" | "integer" | "boolean"; // Data type
  required?: boolean; // Is the parameter required?
  description: string; // Explanation of the parameter
  example?: string | number | boolean; // Optional example value
}

const commonActionsHeaders: ApiParameter[] = [
  {
    name: "Authorization",
    type: "string",
    required: true,
    description: "Bearer token for authentication.",
    example: "Bearer YOUR_ACTIONS_API_KEY",
  },
];

const commonAdminHeaders: ApiParameter[] = [
  {
    name: "Authorization",
    type: "string",
    required: true,
    description: "Bearer token for authentication (Admin).",
    example: "Bearer YOUR_ADMIN_API_KEY",
  },
];

const jsonContentTypeHeader: ApiParameter = {
  name: "Content-Type",
  type: "string",
  required: true,
  description: "Must be application/json.",
  example: "application/json",
};

export const apiEndpoints: ApiEndpoint[] = [
  {
    id: "get-users",
    method: "GET",
    path: "/v1/users",
    group: "users",
    description: "Retrieves a list of all verified users.",
    requestHeaders: commonAdminHeaders,
    responseBody: `[
  {
    "user_id": "123456789012345678",
    "username": "user",
    "verified_at": 1741370540
  },
  {
    "user_id": "123456789012345678",
    "username": "anotherUser",
    "verified_at": 1741370999
  }
]`,
    responseCodes: [
      { code: 200, description: "Success", success: true },
      { code: 401, description: "Unauthorized", success: false },
    ],
    responseFieldDescriptions: [
      {
        name: "user_id",
        type: "string",
        description: "The Discord user's unique ID.",
      },
      {
        name: "username",
        type: "string",
        description: "The user's Discord username.",
      },
      {
        name: "verified_at",
        type: "integer",
        description: "The Unix timestamp of when they were verified.",
      },
    ],
  },
  {
    id: "get-user-by-id",
    method: "GET",
    path: "/v1/users/:user_id",
    group: "users",
    description: "Retrieves information about a specific user by ID.",
    requestHeaders: commonAdminHeaders,
    pathParameters: [
      {
        name: "user_id",
        type: "string",
        required: true,
        description: "The Discord ID of the user to retrieve.",
      },
    ],
    responseBody: `{
  "user_id": "123456789012345678",
  "username": "user",
  "verified_at": 1741370540
}`,
    responseCodes: [
      { code: 200, description: "Success", success: true },
      { code: 401, description: "Unauthorized", success: false },
    ],
    responseFieldDescriptions: [
      {
        name: "user_id",
        type: "string",
        description: "The Discord user's unique ID.",
      },
      {
        name: "username",
        type: "string",
        description: "The user's Discord username.",
      },
      {
        name: "verified_at",
        type: "integer",
        description: "The Unix timestamp of when they were verified.",
      },
    ],
  },
  {
    id: "get-user-by-id-banner",
    method: "GET",
    path: "/v1/user/:user_id/banner",
    group: "user",
    description: "Returns the Discord CDN URL for the user's banner image.",
    requiresAuth: false,
    pathParameters: [
      {
        name: "user_id",
        type: "string",
        required: true,
        description: "The Discord ID of the user to retrieve the banner from.",
      },
    ],
    responseBody: `{
  "banner_url": "https://cdn.discordapp.com/banners/123456789012345678/bannerhash.png?size=512"
}`,
    responseCodes: [
      {
        code: 200,
        description: "Success. Returns the banner URL in the response body.",
        success: true,
      },
      { code: 400, description: "No user_id provided", success: false },
      {
        code: 404,
        description: "User does not have a banner set.",
        success: false,
      },
      {
        code: 500,
        description: "Failed to fetch user data from Discord.",
        success: false,
      },
    ],
    responseFieldDescriptions: [
      {
        name: "banner_url",
        type: "string",
        description: "The Discord CDN URL for the user's banner image.",
      },
      {
        name: "error",
        type: "string",
        description: "Error message (if applicable).",
      },
    ],
  },
  {
    id: "put-actions",
    method: "PUT",
    path: "/v1/actions",
    group: "actions",
    description: "Creates a new GIF action.",
    requestHeaders: [...commonActionsHeaders, jsonContentTypeHeader],
    requestBodySchema: [
      {
        name: "url",
        type: "string",
        required: true,
        description: "The direct link to the gif.",
        example: "https://example.com/gif.gif",
      },
      {
        name: "anime_name",
        type: "string",
        required: true,
        description: "The anime from which the gif originates.",
        example: "Example Anime",
      },
      {
        name: "tag",
        type: "string",
        required: true,
        description: "The category/tag associated with the gif.",
        example: "hug",
      },
    ],
    requestBody: `{
  "url": "https://example.com/gif.gif",
  "anime_name": "Example Anime",
  "tag": "hug"
}`,
    responseCodes: [
      { code: 201, description: "Gif added successfully", success: true }, // Changed code to 201 Created
      { code: 400, description: "Missing required fields", success: false },
      { code: 401, description: "Unauthorized", success: false },
    ],
  },
  {
    id: "get-action-tags",
    method: "GET",
    path: "/v1/actions/tags",
    group: "actions",
    description: "Returns a list of all available action tags.",
    requiresAuth: false,
    responseBody: `[
  "hug",
  "poke",
  "wave"
]`,
    responseCodes: [
      { code: 200, description: "Success", success: true },
      { code: 401, description: "Unauthorized", success: false },
    ],
  },
  {
    id: "get-action-by-tag",
    method: "GET",
    path: "/v1/actions/tag/:tag",
    group: "actions",
    description: "Retrieves a GIF action by tag.",
    requiresAuth: false,
    pathParameters: [
      {
        name: "tag",
        type: "string",
        required: true,
        description:
          'The action tag (e.g., "hug", "poke") to retrieve a GIF for.',
      },
    ],
    responseBody: `{
  "id": 123456,
  "url": "https://example.com/gif.gif",
  "anime_name": "Example Anime",
  "tag": "hug"
}`,
    responseFieldDescriptions: [
      {
        name: "id",
        type: "integer",
        description: "The unique identifier for the gif.",
      },
      {
        name: "url",
        type: "string",
        description: "The direct link to the gif.",
      },
      {
        name: "anime_name",
        type: "string",
        description: "The anime where the gif comes from.",
      },
      {
        name: "tag",
        type: "string",
        description: "The tag/category associated with the gif.",
      },
    ],
    responseCodes: [
      { code: 200, description: "Success", success: true },
      { code: 401, description: "Unauthorized", success: false },
    ],
  },
  {
    id: "delete-user",
    method: "DELETE",
    path: "/v1/users/:user_id",
    group: "users",
    description: "Deletes a specific user by ID.",
    requestHeaders: commonAdminHeaders,
    pathParameters: [
      {
        name: "user_id",
        type: "string",
        required: true,
        description: "The Discord ID of the user to delete.",
      },
    ],
    responseCodes: [
      { code: 200, description: "User deleted successfully", success: true },
      { code: 401, description: "Unauthorized", success: false },
    ],
  },
  {
    id: "delete-action",
    method: "DELETE",
    path: "/v1/actions/:gif_id",
    group: "actions",
    description: "Deletes a GIF action by ID.",
    requestHeaders: commonAdminHeaders,
    pathParameters: [
      {
        name: "gif_id",
        type: "integer",
        required: true,
        description: "The unique ID of the GIF action to delete.",
      },
    ],
    responseCodes: [
      { code: 200, description: "GIF deleted successfully", success: true },
      { code: 401, description: "Unauthorized", success: false },
    ],
  },
];
