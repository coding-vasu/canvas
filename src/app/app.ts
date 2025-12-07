import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CardModule, ButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  techStack = signal([
    {
      name: 'Angular v21',
      desc: 'Bleeding-edge framework performance',
      icon: 'pi pi-box',
      color: 'text-red-600',
    },
    {
      name: 'PrimeNG v21',
      desc: 'Modern, accessible UI components',
      icon: 'pi pi-prime',
      color: 'text-emerald-500',
    },
    {
      name: 'TailwindCSS v4',
      desc: 'Next-gen utility-first styling',
      icon: 'pi pi-palette',
      color: 'text-sky-500',
    },
    {
      name: 'Vite + Esbuild',
      desc: 'Instant server start & production builds',
      icon: 'pi pi-bolt',
      color: 'text-yellow-500',
    },
    {
      name: 'Vitest',
      desc: 'Blazing fast unit testing',
      icon: 'pi pi-check-circle',
      color: 'text-lime-500',
    },
    {
      name: 'Modern Tooling',
      desc: 'ESLint, Prettier & Husky integration',
      icon: 'pi pi-cog',
      color: 'text-blue-500',
    },
  ]);
}
