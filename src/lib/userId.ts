const USER_ID_KEY = 'user_id';
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export function getUserId(): string {
  return localStorage.getItem(USER_ID_KEY) ?? '';
}

export async function initUserId(): Promise<void> {
  let userId = localStorage.getItem(USER_ID_KEY);
  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem(USER_ID_KEY, userId);
  }
  await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: userId }),
  });
}
