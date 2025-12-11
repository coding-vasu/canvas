---
trigger: always_on
---

# 🎨 Design System - Angular 21 + PrimeNG + Tailwind

## 🛠 Stack & Philosophy

- **Framework**: Angular 19 (Standalone, Signals)
- **UI**: PrimeNG + Tailwind CSS v3+
- **Icons**: PrimeIcons
- **Style**: Tailwind-first, no custom CSS
- **State**: Signals over observables

## 🎨 Colors (tailwind.config.js)

```js
colors: {
  primary: { 500: '#667eea', 600: '#5568d3' },
  secondary: { 500: '#764ba2', 600: '#6b3d94' },
  neutral: { 50: '#f7fafc', 200: '#e2e8f0', 600: '#4a5568', 800: '#1a202c' }
},
backgroundImage: {
  'gradient-primary': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
}
```

**Usage**: `bg-primary-500`, `text-neutral-800`, `bg-gradient-primary`

## 📝 Typography

```
text-3xl font-bold        // Page titles (30px)
text-xl font-semibold     // Section headers (20px)
text-base                 // Body (16px)
text-sm text-neutral-600  // Secondary text (14px)
```

## 📏 Spacing

```
p-4, p-6, p-8           // Padding (16px, 24px, 32px)
gap-4, gap-6            // Grid/flex gaps
space-y-4               // Vertical spacing
```

## 🎯 PrimeNG + Tailwind Patterns

### Buttons

```html
<!-- Primary -->
<p-button
  label="Submit"
  styleClass="!bg-gradient-primary !border-0 !px-6 !py-3 !rounded-lg hover:!shadow-lg"
/>

<!-- Secondary -->
<p-button label="Cancel" styleClass="!bg-white !text-neutral-700 !border-neutral-300 !rounded-lg" />

<!-- Icon -->
<p-button icon="pi pi-trash" class="p-button-rounded p-button-text" />
```

### Inputs

```html
<input
  pInputText
  class="w-full !px-4 !py-3 !border-neutral-300 !rounded-lg 
         focus:!border-primary-500 focus:!ring-2 focus:!ring-primary-200"
/>

<p-dropdown [options]="items" styleClass="w-full" panelStyleClass="!rounded-lg !shadow-xl" />
```

### Cards

```html
<p-card styleClass="!shadow-md !rounded-xl !border-0">
  <ng-template pTemplate="header">
    <div class="px-6 py-4 border-b border-neutral-200">
      <h3 class="text-xl font-semibold text-neutral-800">Title</h3>
    </div>
  </ng-template>
  <div class="px-6 py-4">Content</div>
</p-card>
```

### Tables

```html
<p-table [value]="items" styleClass="!rounded-xl !shadow-md">
  <ng-template pTemplate="header">
    <tr class="bg-neutral-50">
      <th class="!px-6 !py-4 !font-semibold !text-neutral-700">Name</th>
    </tr>
  </ng-template>
  <ng-template pTemplate="body" let-item>
    <tr class="border-b hover:bg-neutral-50">
      <td class="!px-6 !py-4">{{ item.name }}</td>
    </tr>
  </ng-template>
</p-table>
```

### Dialogs

```html
<p-dialog [(visible)]="show" styleClass="!rounded-2xl !shadow-2xl">
  <div class="space-y-4">Content</div>
  <ng-template pTemplate="footer">
    <div class="flex gap-3 pt-4 border-t">
      <p-button label="Cancel" class="p-button-text" />
      <p-button label="Save" />
    </div>
  </ng-template>
</p-dialog>
```

### Toasts

```ts
this.messageService.add({
  severity: 'success',
  summary: 'Success',
  detail: 'Saved successfully',
  life: 3000,
});
```

## 🧩 Component Templates

### Form Field

```html
<div class="space-y-2">
  <label class="block text-sm font-medium text-neutral-700"> Email * </label>
  <input
    pInputText
    formControlName="email"
    class="w-full !px-4 !py-3 !rounded-lg"
    [class.!border-red-500]="isInvalid('email')"
  />
  @if (isInvalid('email')) {
  <small class="text-red-600 text-sm">{{ getError('email') }}</small>
  }
</div>
```

### Stat Card

```html
<div class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
  <div class="flex items-center justify-between mb-4">
    <div class="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center">
      <i class="pi pi-users text-2xl text-primary-600"></i>
    </div>
    <span class="text-sm font-medium px-2 py-1 rounded-full bg-green-100 text-green-700">
      +12%
    </span>
  </div>
  <p class="text-sm text-neutral-600">Total Users</p>
  <p class="text-3xl font-bold text-neutral-800">1,234</p>
</div>
```

### Loading State

```html
@if (isLoading()) {
<div class="animate-pulse space-y-4">
  @for (i of [1,2,3]; track i) {
  <div class="h-20 bg-neutral-200 rounded-lg"></div>
  }
</div>
} @else if (error()) {
<div class="text-center py-12">
  <i class="pi pi-exclamation-circle text-4xl text-red-500 mb-4"></i>
  <p class="text-neutral-600">{{ error() }}</p>
</div>
} @else { @for (item of items(); track item.id) {
<app-item [item]="item" />
} }
```

### Navbar

```html
<nav class="bg-white border-b border-neutral-200 sticky top-0 z-50">
  <div class="container mx-auto px-4 h-16 flex items-center justify-between">
    <div class="flex items-center gap-3">
      <span class="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
        AppName
      </span>
    </div>
    <div class="hidden md:flex gap-6">
      <a
        routerLink="/dashboard"
        routerLinkActive="!text-primary-600 !font-semibold"
        class="text-neutral-600 hover:text-neutral-800 px-3 py-2"
      >
        Dashboard
      </a>
    </div>
    <p-avatar
      [image]="user.avatar"
      shape="circle"
      styleClass="cursor-pointer border-2 border-primary-500"
    />
  </div>
</nav>
```

### Sidebar

```html
<aside class="w-64 bg-white border-r h-screen overflow-y-auto">
  <div class="p-4 space-y-1">
    @for (item of menu; track item.label) {
    <a
      [routerLink]="item.route"
      routerLinkActive="!bg-primary-50 !text-primary-600 !font-semibold"
      class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-neutral-50"
    >
      <i [class]="item.icon"></i>
      <span>{{ item.label }}</span>
    </a>
    }
  </div>
</aside>
```

## 🎨 Common Patterns

### Alert

```html
<p-message
  severity="success"
  text="Success message"
  styleClass="!bg-green-50 !border-green-200 !text-green-800 !rounded-lg"
/>
```

### Badge

```html
<span
  class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium 
             bg-primary-100 text-primary-700"
>
  Active
</span>
```

### Empty State

```html
<div class="flex flex-col items-center justify-center py-12">
  <i class="pi pi-inbox text-6xl text-neutral-300 mb-4"></i>
  <p class="text-neutral-600 font-medium">No items found</p>
</div>
```

## 📱 Responsive

```html
<!-- Mobile-first -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div class="hidden md:block">Desktop only</div>
  <div class="block md:hidden">Mobile only</div>
</div>
```

## ♿ Accessibility

```html
<button aria-label="Close" class="focus:outline-none focus:ring-2 focus:ring-primary-500">
  <i class="pi pi-times"></i>
</button>
```

## 💻 Code Standards

### Component Structure

```ts
@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  template: `...`,
})
export class ExampleComponent {
  // 1. Inputs
  @Input() title = '';

  // 2. Outputs
  @Output() onSave = new EventEmitter();

  // 3. Signals
  isLoading = signal(false);
  items = signal<Item[]>([]);

  // 4. Constructor
  constructor(private service: DataService) {}

  // 5. Lifecycle
  ngOnInit() {}

  // 6. Methods
  save() {}
}
```

### Naming

```ts
// Components: PascalCase + Component
UserListComponent;

// Services: PascalCase + Service
AuthService;

// Files: kebab-case
user - list.component.ts;
auth.service.ts;

// Signals: camelCase (no $)
isLoading = signal(false);

// Observables: camelCase + $
user$ = this.store.select();
```

### Templates

```ts
// ✅ Use control flow
@if (show()) { }
@for (item of items(); track item.id) { }

// ✅ Use signals
{{ count() }}

// ❌ Avoid
*ngIf, *ngFor (old syntax)
```

## 🎯 Quick Reference

### Essential Classes

```
Container: container mx-auto px-4 max-w-7xl
Card: bg-white rounded-xl shadow-md p-6
Button: bg-gradient-primary px-6 py-3 rounded-lg font-semibold
Input: w-full px-4 py-3 border rounded-lg focus:ring-2
Badge: px-3 py-1 rounded-full text-xs font-medium
Avatar: w-10 h-10 rounded-full object-cover
```

### Colors

```
Primary: bg-primary-500 text-primary-600
Success: bg-green-50 text-green-600 border-green-200
Error: bg-red-50 text-red-600 border-red-200
Warning: bg-yellow-50 text-yellow-600 border-yellow-200
Neutral: bg-neutral-50 text-neutral-600 border-neutral-200
```

## 🤖 AI Assistant Instructions

When generating code:

1. Always use Tailwind utilities (no custom CSS)
2. Use PrimeNG components with Tailwind styling
3. Use Angular signals for state
4. Follow color palette (primary/secondary/neutral)
5. Include loading & error states
6. Make responsive (mobile-first)
7. Add TypeScript types
8. Use standalone components
9. Follow naming conventions

---

**Version**: 1.0 | **Updated**: Dec 2024
