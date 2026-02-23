/**
 * api.ts (Configuration)
 * 
 * Course: CSC 648 Fall 2025
 * Team: Team06
 * 
 * Description:
 * API configuration file that defines the base URL and all endpoint paths for the LEMN
 * backend server. This centralized configuration makes it easy to update API endpoints
 * and switch between development, staging, and production environments. The base URL
 * should be updated to point to the actual backend server when deployed. All API service
 * functions in services/api.ts use these constants to construct full endpoint URLs.
 */

// API Configuration
// Replace this with your actual backend URL
export const API_BASE_URL = 'http://3.133.58.251:3010/api';

// API Endpoints
export const API_ENDPOINTS = {
  TUTORS: '/tutors',
  SEARCH_TUTORS: '/search/tutors',
  SUBJECTS: '/subjects',
  LOGIN: '/login',
  SIGNUP: '/register',
  LOGOUT: '/logout',
  TUTOR_APPLICATION: '/apply',
};