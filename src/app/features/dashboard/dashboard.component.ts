import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { SupabaseService } from '../../core/services/supabase.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type ViewMode = 'design' | 'code';
type SidebarTab = 'layers' | 'assets' | 'settings';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ButtonModule, AvatarModule, TooltipModule],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:keydown)': 'onKeyDown($event)',
    '(window:keyup)': 'onKeyUp($event)',
  },
})
export class DashboardComponent {
  private supabaseService = inject(SupabaseService);
  private router = inject(Router);

  // Layout State
  isLeftSidebarOpen = signal(true);
  isRightPanelOpen = signal(true);
  activeSidebarTab = signal<SidebarTab>('layers');
  activeMode = signal<ViewMode>('design');
  isXRayMode = signal(false);

  // Canvas State
  zoomLevel = signal(1);
  panOffset = signal({ x: 0, y: 0 });
  isDragging = signal(false);
  dragStart = signal({ x: 0, y: 0 });

  // Floating Command State
  promptText = signal('');
  isGenerating = signal(false);

  // Computed Styles & Data
  canvasTransform = computed(
    () => `translate(${this.panOffset().x}px, ${this.panOffset().y}px) scale(${this.zoomLevel()})`,
  );

  userName = computed(() => {
    const user = this.supabaseService.user();
    return (
      user?.user_metadata?.['full_name'] || user?.user_metadata?.['name'] || user?.email || 'User'
    );
  });

  toggleGenerate() {
    this.isGenerating.set(true);
    // Simulate generation delay
    setTimeout(() => {
      this.isGenerating.set(false);
    }, 3000);
  }

  async onLogout() {
    try {
      await this.supabaseService.signOut();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.router.navigate(['/auth/login']);
    }
  }

  toggleLeftSidebar() {
    this.isLeftSidebarOpen.update((v) => !v);
  }

  toggleRightPanel() {
    this.isRightPanelOpen.update((v) => !v);
  }

  setMode(mode: ViewMode) {
    this.activeMode.set(mode);
  }

  // Canvas Interactions
  onWheel(event: WheelEvent) {
    if (event.ctrlKey || event.metaKey) {
      event.preventDefault();
      const zoomDelta = event.deltaY * -0.001;
      const newZoom = Math.min(Math.max(0.1, this.zoomLevel() + zoomDelta), 5);
      this.zoomLevel.set(newZoom);
    } else {
      this.panOffset.update((pos) => ({
        x: pos.x - event.deltaX,
        y: pos.y - event.deltaY,
      }));
    }
  }

  startPan(event: MouseEvent) {
    if (event.button === 1 || (event.button === 0 && event.altKey)) {
      // Middle click or Alt+Left
      this.isDragging.set(true);
      this.dragStart.set({ x: event.clientX, y: event.clientY });
    }
  }

  pan(event: MouseEvent) {
    if (this.isDragging()) {
      const dx = event.clientX - this.dragStart().x;
      const dy = event.clientY - this.dragStart().y;

      this.panOffset.update((pos) => ({
        x: pos.x + dx,
        y: pos.y + dy,
      }));

      this.dragStart.set({ x: event.clientX, y: event.clientY });
    }
  }

  endPan() {
    this.isDragging.set(false);
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.metaKey || event.ctrlKey) {
      this.isXRayMode.set(true);
    }
  }

  onKeyUp(event: KeyboardEvent) {
    if (!event.metaKey && !event.ctrlKey) {
      this.isXRayMode.set(false);
    }
  }
}
