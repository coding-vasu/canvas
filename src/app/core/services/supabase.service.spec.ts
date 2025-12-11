import '../../../test-setup';
import { TestBed } from '@angular/core/testing';
import { SupabaseService } from './supabase.service';
import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock Supabase client
const mockSupabaseClient = {
  auth: {
    getSession: vi.fn().mockResolvedValue({ data: { session: null }, error: null }),
    onAuthStateChange: vi
      .fn()
      .mockReturnValue({ data: { subscription: { unsubscribe: () => void 0 } } }),
    signUp: vi.fn().mockResolvedValue({ data: null, error: null }),
    signInWithPassword: vi.fn().mockResolvedValue({ data: null, error: null }),
    signInWithOAuth: vi.fn().mockResolvedValue({ data: null, error: null }),
    signOut: vi.fn().mockResolvedValue({ error: null }),
  },
};

// Mock createClient to return our mock client
vi.mock('@supabase/supabase-js', () => ({
  createClient: () => mockSupabaseClient,
}));

describe('SupabaseService', () => {
  let service: SupabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupabaseService);
    (service as unknown as { client: unknown }).client = mockSupabaseClient; // Manually inject mock
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call signUp', async () => {
    await service.signUp('test@example.com', 'password');
    expect(mockSupabaseClient.auth.signUp).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password',
    });
  });

  it('should call signInWithPassword', async () => {
    await service.signInWithPassword('test@example.com', 'password');
    expect(mockSupabaseClient.auth.signInWithPassword).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password',
    });
  });

  it('should call signInWithGoogle', async () => {
    await service.signInWithGoogle();
    expect(mockSupabaseClient.auth.signInWithOAuth).toHaveBeenCalledWith(
      expect.objectContaining({ provider: 'google' }),
    );
  });

  it('should call signOut', async () => {
    await service.signOut();
    expect(mockSupabaseClient.auth.signOut).toHaveBeenCalled();
  });
});
