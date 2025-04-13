// src/apiData.ts

export interface ApiEndpoint {
  id: string; // Unique identifier for keys
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'; // HTTP method used for the endpoint
  path: string; // API endpoint path
  group: string; // Group name for categorizing endpoints
  description: string; // Description of the endpoint
  requestBody?: string; // JSON string for request body
  responseBody?: string; // JSON string for response body
  explanation?: { field: string; description: string }[]; // Explanation of fields in the response body
  responseCodes: { code: number; description: string; success: boolean }[]; // Possible response codes and their meanings
}

export const apiEndpoints: ApiEndpoint[] = [
  {
    id: 'get-users',
    method: 'GET',
    path: '/v1/users',
    group: 'users',
    description: 'Retrieves a list of all verified users.',
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
    explanation: [
      { field: 'user_id', description: "The Discord user's unique ID." },
      { field: 'username', description: "The user's Discord username." },
      { field: 'verified_at', description: 'The Unix timestamp of when they were verified.' },
    ],
    responseCodes: [
      { code: 200, description: 'Success', success: true },
      { code: 401, description: 'Unauthorized', success: false },
    ],
  },
  {
    id: 'get-user-by-id',
    method: 'GET',
    path: '/v1/users/:user_id',
    group: 'users',
    description: 'Retrieves information about a specific user by ID.',
    responseBody: `{
  "user_id": "123456789012345678",
  "username": "user",
  "verified_at": 1741370540
}`,
    explanation: [
        { field: 'user_id', description: "The Discord user's unique ID." },
        { field: 'username', description: "The user's Discord username." },
        { field: 'verified_at', description: 'The Unix timestamp of when they were verified.' },
    ],
    responseCodes: [
      { code: 200, description: 'Success', success: true },
      { code: 401, description: 'Unauthorized', success: false },
    ],
  },
  {
    id: 'put-actions',
    method: 'PUT',
    path: '/v1/actions',
    group: 'actions',
    description: 'Creates a new GIF action.',
    requestBody: `{
  "url": "https://example.com/gif.gif",
  "anime_name": "Example Anime",
  "tag": "hug"
}`,
    explanation: [
      { field: 'url', description: 'The direct link to the gif.' },
      { field: 'anime_name', description: 'The anime from which the gif originates.' },
      { field: 'tag', description: 'The category/tag associated with the gif.' },
    ],
    responseCodes: [
      { code: 201, description: 'Success', success: true },
      { code: 401, description: 'Unauthorized', success: false },
    ],
  },
  {
    id: 'get-action-tags',
    method: 'GET',
    path: '/v1/actions/tags',
    group: 'actions',
    description: 'Returns a list of all available action tags.',
    responseBody: `[
  "hug",
  "poke",
  "wave"
]`,
    responseCodes: [
      { code: 200, description: 'Success', success: true },
      { code: 401, description: 'Unauthorized', success: false },
    ],
  },
  {
    id: 'get-action-by-tag',
    method: 'GET',
    path: '/v1/actions/:tag',
    group: 'actions',
    description: 'Retrieves a GIF action by tag.',
    responseBody: `{
  "id": 123456,
  "url": "https://example.com/gif.gif",
  "anime_name": "Example Anime",
  "tag": "hug"
}`,
    explanation: [
      { field: 'id', description: 'The unique identifier for the gif.' },
      { field: 'url', description: 'The direct link to the gif.' },
      { field: 'anime_name', description: 'The anime where the gif comes from.' },
      { field: 'tag', description: 'The tag/category associated with the gif.' },
    ],
    responseCodes: [
      { code: 200, description: 'Success', success: true },
      { code: 401, description: 'Unauthorized', success: false },
    ],
  },
    {
    id: 'delete-user',
    method: 'DELETE',
    path: '/v1/users/:user_id',
    group: 'users',
    description: 'Deletes a specific user by ID.',
    responseCodes: [
      { code: 200, description: 'User deleted successfully', success: true },
      { code: 401, description: 'Unauthorized', success: false },
    ],
  },
  {
    id: 'delete-action',
    method: 'DELETE',
    path: '/v1/actions/:gif_id',
    group: 'actions',
    description: 'Deletes a GIF action by ID.',
    responseCodes: [
      { code: 200, description: 'GIF deleted successfully', success: true },
      { code: 401, description: 'Unauthorized', success: false },
    ],
  },
];