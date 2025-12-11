import '../../../../test-setup';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
// Correction: use ../../../ to reach app/core from features/auth/login
import { SupabaseService } from '../../../core/services/supabase.service';
import { provideRouter, Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let supabaseServiceSpy: {
    signInWithPassword: ReturnType<typeof vi.fn>;
    signInWithGoogle: ReturnType<typeof vi.fn>;
  };
  let messageServiceSpy: {
    add: ReturnType<typeof vi.fn>;
    messageObserver: Subject<void>;
    clearObserver: Subject<void>;
  };

  beforeEach(async () => {
    supabaseServiceSpy = {
      signInWithPassword: vi.fn().mockResolvedValue({ data: {}, error: null }),
      signInWithGoogle: vi.fn().mockResolvedValue({ data: {}, error: null }),
    };

    messageServiceSpy = {
      add: vi.fn(),
      messageObserver: new Subject(),
      clearObserver: new Subject(),
    };

    await TestBed.configureTestingModule({
      imports: [LoginComponent, BrowserAnimationsModule],
      providers: [
        provideRouter([]),
        { provide: SupabaseService, useValue: supabaseServiceSpy },
        { provide: MessageService, useValue: messageServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    vi.spyOn(router, 'navigate').mockImplementation(async () => true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not call signIn on invalid form', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (component as any).form.setValue({ email: '', password: '' });
    await component.onLogin();
    expect(supabaseServiceSpy.signInWithPassword).not.toHaveBeenCalled();
  });

  it('should call signInWithPassword on valid form and redirect to dashboard', async () => {
    vi.useFakeTimers();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (component as any).form.setValue({
      email: 'test@example.com',
      password: 'password',
    });
    await component.onLogin();
    expect(supabaseServiceSpy.signInWithPassword).toHaveBeenCalledWith(
      'test@example.com',
      'password',
    );
    expect(messageServiceSpy.add).toHaveBeenCalledWith(
      expect.objectContaining({ severity: 'success' }),
    );
    vi.advanceTimersByTime(500);
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
    vi.useRealTimers();
  });

  it('should call signInWithGoogle on Google button click', async () => {
    await component.onGoogleLogin();
    expect(supabaseServiceSpy.signInWithGoogle).toHaveBeenCalled();
  });
});
