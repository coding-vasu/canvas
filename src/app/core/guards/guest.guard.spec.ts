import '../../../test-setup';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { guestGuard } from './guest.guard';
import { SupabaseService } from '../services/supabase.service';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('authGuard', () => {
  let supabaseServiceSpy: { client: { auth: { getSession: ReturnType<typeof vi.fn> } } };
  let router: Router;

  beforeEach(() => {
    supabaseServiceSpy = {
      client: {
        auth: {
          getSession: vi.fn(),
        },
      },
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: SupabaseService, useValue: supabaseServiceSpy },
        {
          provide: Router,
          useValue: {
            createUrlTree: vi.fn().mockReturnValue('mockUrlTree'),
          },
        },
      ],
    });

    router = TestBed.inject(Router);
  });

  const executeGuard = async () => {
    return await TestBed.runInInjectionContext(() =>
      guestGuard({} as unknown as ActivatedRouteSnapshot, {} as unknown as RouterStateSnapshot),
    );
  };

  it('should redirect to dashboard if session exists', async () => {
    supabaseServiceSpy.client.auth.getSession.mockResolvedValue({
      data: { session: {} },
    });

    const result = await executeGuard();

    expect(result).toBe('mockUrlTree'); // Expect redirection
    expect(router.createUrlTree).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should allow access if no session exists', async () => {
    supabaseServiceSpy.client.auth.getSession.mockResolvedValue({
      data: { session: null },
    });

    const result = await executeGuard();

    expect(result).toBe(true);
  });
});
