import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import {
  LucideAngularModule,
  Box,
  LayoutTemplate,
  Palette,
  Zap,
  CheckCircle,
  Settings,
} from 'lucide-angular';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CardModule, ButtonModule, LucideAngularModule],
  providers: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // Expose icons for the template to use via [img] input
  readonly Box = Box;
  readonly LayoutTemplate = LayoutTemplate;
  readonly Palette = Palette;
  readonly Zap = Zap;
  readonly CheckCircle = CheckCircle;
  readonly Settings = Settings;

  techStack = signal([
    {
      name: 'Angular v21',
      desc: 'Bleeding-edge framework performance',
      icon: Box,
      color: 'text-red-600',
    },
    {
      name: 'PrimeNG v21',
      desc: 'Modern, accessible UI components',
      icon: LayoutTemplate,
      color: 'text-emerald-500',
    },
    {
      name: 'TailwindCSS v4',
      desc: 'Next-gen utility-first styling',
      icon: Palette,
      color: 'text-sky-500',
    },
    {
      name: 'Vite + Esbuild',
      desc: 'Instant server start & production builds',
      icon: Zap,
      color: 'text-yellow-500',
    },
    {
      name: 'Vitest',
      desc: 'Blazing fast unit testing',
      icon: CheckCircle,
      color: 'text-lime-500',
    },
    {
      name: 'Modern Tooling',
      desc: 'ESLint, Prettier & Husky integration',
      icon: Settings,
      color: 'text-blue-500',
    },
  ]);
}
