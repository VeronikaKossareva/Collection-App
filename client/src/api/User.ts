import { z } from 'zod';
import { LogoutButton } from '../components/LogoutButton';

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
})

export type User = z.infer<typeof UserSchema>;

export function fetchUser(id: string): Promise<User> {
  return fetch(`/api/users/${id}`)
    .then((response) => response.json())
    .then((data) => UserSchema.parse(data));
}

export function registerUser(name: string, email: string, password: string): Promise<void> {
  return fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  }).then(response => {
    if (!response.ok) {
      if (response.status === 409) {
        throw new Error('User with this email already exists');
      }
      throw new Error('Registration failed');
    }
    return response.json();
  });
}

export function login(email: string, password: string,): Promise<void> {
  return fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password })
  })
    .then(response => response.json())
    .then(() => {
      LogoutButton;
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

export function fetchMe(): Promise<User> {
  const token = localStorage.getItem('token');

  return fetch('/api/users/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => UserSchema.parse(data));
}
