import '../../../../test-setup';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { SupabaseService } from '../../../core/services/supabase.service';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let supabaseServiceSpy: { signUp: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    supabaseServiceSpy = {
      signUp: vi.fn().mockResolvedValue({ data: {}, error: null }),
    };

    await TestBed.configureTestingModule({
      imports: [RegisterComponent, BrowserAnimationsModule],
      providers: [provideRouter([]), { provide: SupabaseService, useValue: supabaseServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not call signUp on invalid form', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (component as any).form.setValue({ email: '', password: '123' }); // Too short
    await component.onRegister();
    expect(supabaseServiceSpy.signUp).not.toHaveBeenCalled();
  });

  it('should call signUp on valid form', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (component as any).form.setValue({
      email: 'test@example.com',
      password: 'password123',
    });
    await component.onRegister();
    expect(supabaseServiceSpy.signUp).toHaveBeenCalledWith('test@example.com', 'password123');
  });
});
