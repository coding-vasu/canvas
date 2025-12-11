import '../../../test-setup';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { SupabaseService } from '../../core/services/supabase.service';
import { provideRouter, Router } from '@angular/router';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let supabaseServiceSpy: { signOut: ReturnType<typeof vi.fn>; user: ReturnType<typeof vi.fn> };
  let router: Router;

  beforeEach(async () => {
    supabaseServiceSpy = {
      signOut: vi.fn().mockResolvedValue({ error: null }),
      user: vi
        .fn()
        .mockReturnValue({ email: 'test@example.com', user_metadata: { full_name: 'Test User' } }),
    };

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [provideRouter([]), { provide: SupabaseService, useValue: supabaseServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    vi.spyOn(router, 'navigate').mockImplementation(async () => true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sign out and navigate to login on logout', async () => {
    await component.onLogout();
    expect(supabaseServiceSpy.signOut).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/auth/login']);
  });
});
