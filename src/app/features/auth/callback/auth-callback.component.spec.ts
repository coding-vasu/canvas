import '../../../../test-setup';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthCallbackComponent } from './auth-callback.component';
import { SupabaseService } from '../../../core/services/supabase.service';
import { provideRouter, Router } from '@angular/router';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('AuthCallbackComponent', () => {
  let component: AuthCallbackComponent;
  let fixture: ComponentFixture<AuthCallbackComponent>;
  let supabaseServiceSpy: { client: { auth: { getSession: ReturnType<typeof vi.fn> } } };
  let router: Router;

  beforeEach(async () => {
    supabaseServiceSpy = {
      client: {
        auth: {
          getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
        },
      },
    };

    await TestBed.configureTestingModule({
      imports: [AuthCallbackComponent],
      providers: [provideRouter([]), { provide: SupabaseService, useValue: supabaseServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthCallbackComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    vi.spyOn(router, 'navigate').mockImplementation(async () => true);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should redirect to dashboard if session exists', async () => {
    supabaseServiceSpy.client.auth.getSession.mockResolvedValue({
      data: { session: { user: {} } },
    });

    // ngOnInit is called on detectChanges or manually
    await component.ngOnInit();

    expect(supabaseServiceSpy.client.auth.getSession).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should redirect to login if no session exists', async () => {
    supabaseServiceSpy.client.auth.getSession.mockResolvedValue({
      data: { session: null },
    });

    await component.ngOnInit();

    expect(router.navigate).toHaveBeenCalledWith(['/auth/login']);
  });
});
