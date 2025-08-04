# Authentication System

This document describes the authentication system implemented in the Second Brain frontend application.

## Features

### 1. Token Management

- **Automatic Token Validation**: The system automatically checks if the JWT token is expired
- **Token Storage**: Tokens are stored in localStorage
- **Token Cleanup**: On logout, all tokens and user data are removed from localStorage

### 2. Logout Functionality

- **Logout Button**: Added to the sidebar with a logout icon
- **Automatic Redirect**: On logout, users are redirected to the signin page
- **State Cleanup**: All authentication state is cleared on logout

### 3. Token Expiration Handling

- **Client-side Validation**: JWT tokens are decoded and expiration is checked
- **Automatic Redirect**: Expired tokens automatically redirect to signin page
- **Axios Interceptors**: All API calls automatically include the token and handle 401 responses

### 4. Route Protection

- **Protected Routes**: Dashboard is only accessible to authenticated users
- **Public Routes**: Signin and Signup pages redirect authenticated users to dashboard
- **Loading States**: Shows loading while checking authentication status

## Implementation Details

### Files Modified/Created

1. **`src/utils/auth.ts`** - Core authentication utilities

   - `isTokenExpired()` - Checks if JWT token is expired
   - `logout()` - Handles logout and cleanup
   - `validateToken()` - Validates token and redirects if expired
   - `setupAxiosInterceptors()` - Sets up automatic token handling
   - `initializeAuth()` - Initializes the auth system

2. **`src/hooks/useAuth.ts`** - React hook for authentication state

   - Manages authentication state
   - Provides logout function
   - Handles loading states

3. **`src/icons/LogoutIcon.tsx`** - Logout icon component

4. **`src/component/SiderBar.tsx`** - Updated with logout button

5. **`src/App.tsx`** - Updated with proper route protection

6. **`src/pages/Dashboard.tsx`** - Simplified to use automatic token handling

7. **`src/component/AddContentDia.tsx`** - Removed manual token handling

## Usage

### For Backend Integration

The system expects:

- JWT tokens in localStorage under the key "token"
- Backend to return 401 status for expired/invalid tokens
- Token format: `header.payload.signature` (standard JWT)

### For Frontend Development

The authentication system is automatically initialized when the app starts. No additional setup is required.

## Security Features

1. **Automatic Token Validation**: Every page load checks token expiration
2. **Automatic Logout**: Expired tokens trigger immediate logout
3. **Route Protection**: Unauthenticated users cannot access protected routes
4. **Clean State Management**: All auth state is properly cleaned on logout

## API Integration

All API calls automatically:

- Include the Authorization header with the token
- Handle 401 responses by logging out the user
- Redirect to signin page on authentication failures
