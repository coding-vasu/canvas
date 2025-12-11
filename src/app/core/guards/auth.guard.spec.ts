import '../../../test-setup';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';
import { authGuard } from './auth.guard';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';

describe('authGuard', () => {
  let routerSpy: { createUrlTree: Mock };
  let mockClient: { auth: { getSession: Mock } };

  beforeEach(() => {
    routerSpy = { createUrlTree: vi.fn() };
    mockClient = {
      auth: {
        getSession: vi.fn(),
      },
    };

    const serviceSpy = {
      client: mockClient,
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: SupabaseService, useValue: serviceSpy },
      ],
    });
  });

  const executeGuard = async () => {
    return TestBed.runInInjectionContext(() =>
      authGuard({} as unknown as ActivatedRouteSnapshot, {} as unknown as RouterStateSnapshot),
    );
  };

  it('should allow access if session exists', async () => {
    mockClient.auth.getSession.mockResolvedValue({ data: { session: {} }, error: null });

    const result = await executeGuard();
    expect(result).toBe(true);
  });

  it('should redirect to login if no session', async () => {
    mockClient.auth.getSession.mockResolvedValue({ data: { session: null }, error: null });
    const mockUrlTree = {} as unknown;
    routerSpy.createUrlTree.mockReturnValue(mockUrlTree);

    const result = await executeGuard();
    expect(routerSpy.createUrlTree).toHaveBeenCalledWith(['/auth/login']);
    expect(result).toBe(mockUrlTree);
  });
});
