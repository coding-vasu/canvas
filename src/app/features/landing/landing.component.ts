import { Component, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import {
  LucideAngularModule,
  Sparkles,
  Search,
  Layers,
  Smartphone,
  Monitor,
  Code,
  Image,
  ArrowRight,
  Play,
  Command,
  Wand2,
  Zap,
  MessageSquare,
  Share2,
  CheckCircle,
  Quote,
  Star,
} from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, LucideAngularModule, RouterLink],
  templateUrl: './landing.component.html',
})
export class LandingComponent {
  // Icons
  readonly Sparkles = Sparkles;
  readonly Search = Search;
  readonly Layers = Layers;
  readonly Smartphone = Smartphone;
  readonly Monitor = Monitor;
  readonly Code = Code;
  readonly Image = Image;
  readonly ArrowRight = ArrowRight;
  readonly Play = Play;
  readonly Command = Command;
  readonly Wand2 = Wand2;
  readonly Zap = Zap;
  readonly MessageSquare = MessageSquare;
  readonly Share2 = Share2;
  readonly CheckCircle = CheckCircle;
  readonly Quote = Quote;
  readonly Star = Star;

  // Typing animation state
  typingText = signal('A mobile banking dashboard, dark mode, minimalist style.');

  // Feature Bento Grid Data
  features = signal([
    {
      title: 'Platform Agnostic',
      desc: 'One prompt, infinite form factors. Convert Mobile to Web instantly.',
      icon: Monitor,
      cols: 'md:col-span-2 lg:col-span-1',
      bgClass: 'bg-gradient-to-br from-obsidian to-neutral-900',
    },
    {
      title: 'Fully Layered',
      desc: "We don't generate flattened JPEGs. You get editable layers, ready for export.",
      icon: Layers,
      cols: 'md:col-span-2',
      bgClass: 'bg-neutral-900',
    },
    {
      title: 'Production Ready',
      desc: 'Export to React, Vue, or Swift.',
      icon: Code,
      cols: 'md:col-span-1',
      bgClass: 'bg-neutral-900',
    },
  ]);

  // How It Works Data
  steps = signal([
    {
      step: '01',
      title: 'Describe',
      desc: 'Type your idea in plain English or paste a screenshot reference.',
      icon: MessageSquare,
    },
    {
      step: '02',
      title: 'Refine',
      desc: 'Use the AI chat to tweak colors, spacing, and layout in real-time.',
      icon: Zap,
    },
    {
      step: '03',
      title: 'Export',
      desc: 'Copy production-ready Angular code directly to your codebase.',
      icon: Code,
    },
  ]);

  // Testimonials Data
  testimonials = signal([
    {
      quote:
        'This tool saved me weeks of frontend boilerplate. The code quality is actually better than what I write manually.',
      author: 'Sarah Jenkins',
      role: 'Product Manager at TechFlow',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    },
    {
      quote:
        "Finally, a 'text-to-UI' tool that understands modern design systems. The Tailwind output is flawless.",
      author: 'David Chen',
      role: 'Senior Frontend Dev',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    },
  ]);

  techStack = signal([]); // Keep for compatibility if used, though seemingly unused in new template
}
