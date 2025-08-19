// src/lib/api.ts
export const API_URL = import.meta.env.VITE_API_URL;

export async function createAssessment(payload: {
  userId: string;
  moduleId: string;
  subModuleId: string;
  title?: string;
  measurements: { key: string; value: unknown }[];
  takenAt?: string;
  metadata?: Record<string, unknown>;
}) {
  const res = await fetch(`${API_URL}/api/health-fitness/assessments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Failed to save: ${res.status}`);
  return res.json();
}

export async function listAssessments(params: Partial<{
  userId: string; moduleId: string; subModuleId: string;
}> = {}) {
  const qs = new URLSearchParams(params as any).toString();
  const res = await fetch(`${API_URL}/api/health-fitness/assessments${qs ? `?${qs}` : ''}`);
  if (!res.ok) throw new Error(`Failed to load: ${res.status}`);
  return res.json();
}
