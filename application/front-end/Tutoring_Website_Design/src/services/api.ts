/**
 * api.ts
 * 
 * Course: CSC 648 Fall 2025
 * Team: Team06
 * 
 * Description:
 * Backend API service layer that handles all HTTP requests to the LEMN server. This file
 * provides a clean abstraction for API calls, including tutor searches, subject fetching,
 * and other backend operations. It includes error handling, request formatting, and response
 * parsing. The API functions use the configuration from config/api.ts for base URLs and
 * endpoints. This service layer allows the frontend components to interact with the backend
 * without dealing with low-level fetch operations or URL construction.
 */

import { API_BASE_URL, API_ENDPOINTS } from '../config/api';

interface Tutor {
  id: string;
  name: string;
  image: string;
  sessionsCompleted: number;
  subjects: string[];
}

interface SearchParams {
  query?: string;
  subject?: string;
}

export interface TutorApplication {
  subject: string;
  course: string;
  availability: string;
  resume: File;
  email: string; // can get from auth context
}

// Generic API fetch wrapper
async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit,
  requireAuth = false // new flag
): Promise<T> {
  const token = localStorage.getItem("authToken");
  const url = `${API_BASE_URL}${endpoint}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options?.headers,
  };

  if (requireAuth) {
    if (!token) throw new Error("Authentication required but no token found");
    headers['Authorization'] = `${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}


// Tutor API calls
export const tutorAPI = {
  // Get all tutors
  // getAllTutors: async (): Promise<Tutor[]> => {
  //   return apiFetch<Tutor[]>(API_ENDPOINTS.TUTORS);
  // },  

  // Search tutors with query and subject filter
  searchTutors: async (params: SearchParams): Promise<Tutor[]> => {
    const queryParams = new URLSearchParams();
    if (params.query) queryParams.append('q', params.query);
    if (params.subject && params.subject !== 'All Subjects') {
      queryParams.append('subject', params.subject);
    }

    const endpoint = `${API_ENDPOINTS.SEARCH_TUTORS}?${queryParams.toString()}`;
    return apiFetch<Tutor[]>(endpoint);
  },
  applyAsTutor: async (application: TutorApplication) => {
    const formData = new FormData();
    formData.append("subject", application.subject);
    formData.append("course", application.course);
    formData.append("availability", application.availability);
    formData.append("resume", application.resume);
    formData.append("email", application.email);

    return apiFetch(
      API_ENDPOINTS.TUTOR_APPLICATION,
      {
        method: "POST",
        body: formData,
      },
      true // requireAuth: send token
    );
  }
};

// Subject API calls
export const subjectAPI = {
  getAllSubjects: async (): Promise<string[]> => {
    return apiFetch<string[]>(API_ENDPOINTS.SUBJECTS);
  },
};

// Auth API calls
export const authAPI = {
  login: async (email: string, password: string) => {
    return apiFetch(API_ENDPOINTS.LOGIN, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  signup: async (first_name: string, last_name: string, email: string, password: string, phone_number: string | null) => {
    return apiFetch(API_ENDPOINTS.SIGNUP, {
      method: 'POST',
      body: JSON.stringify({ first_name, last_name, email, password, phone_number }),
    });
  },

  // logout: async () => {
  //   return apiFetch(API_ENDPOINTS.LOGOUT, {
  //     method: 'POST',
  //   });
  // },
};