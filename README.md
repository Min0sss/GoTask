# GoTask

**GoTask** is a high-performance **Productivity & Task Management Dashboard** built with Angular. It demonstrates complex frontend capabilities including drag-and-drop workflows, data visualization, and file export operations without a backend.

This project is a centerpiece of my **front-end professional portfolio**, showcasing reactive state management, local persistence strategies, and a polished, professional dark-mode UI.

---

## Live Demo

[https://gotask-app.vercel.app/]

## Features

- **Interactive Kanban Board:**
  - Full Drag & Drop support powered by **Angular CDK**.
  - Smooth transitions between To Do, In Progress, and Completed columns.
- **Reactive State Engine:**
  - Centralized state management using **RxJS** `BehaviorSubject`.
  - Instant UI updates across components (Board, List, Stats) without page reloads.
- **Advanced Analytics Dashboard:**
  - Visual data representation using **Chart.js**.
  - Real-time metrics for Task Status, Priority distribution, and Completion History (Last 7 days).
- **Data Portability:**
  - **Export to Excel:** Generates `.xlsx` reports using `xlsx` library.
  - **Export to PDF:** Generates formatted PDF summaries using `jspdf` & `jspdf-autotable`.
- **Zero-Config Persistence:**
  - Automatic data saving via **LocalStorage**, ensuring data remains intact between sessions without a backend.
- **Smart Task Management:**
  - Custom tagging system, priority levels, and due date tracking.
  - Archive and Restore functionality with "Soft Delete".

---

## Tech Stack

* **Core:** Angular (Latest Version - Standalone Components)
* **State Management:** RxJS (Observables & Subjects)
* **Styling:** CSS3 (Variables, Flexbox, Grid, Dark Theme)
* **Drag & Drop:** Angular CDK (Component Dev Kit)
* **Visualization:** Chart.js
* **Utilities:** UUID, FileSaver
* **Deployment:** Vercel / GitHub Pages

---

## Project Structure

```bash
GOTASK/
├─ node_modules/
├─ src/
│  └─ app/
│     ├─ components/
│     │  ├─ archived/
│     │  │  ├─ archived.component.css
│     │  │  ├─ archived.component.html
│     │  │  └─ archived.component.ts
│     │  ├─ board/
│     │  │  ├─ board.component.html
│     │  │  └─ board.component.ts
│     │  ├─ confirm-modal/
│     │  │  ├─ confirm-modal.component.css
│     │  │  ├─ confirm-modal.component.html
│     │  │  └─ confirm-modal.component.ts
│     │  ├─ stats/
│     │  │  ├─ stats.component.css
│     │  │  ├─ stats.component.html
│     │  │  └─ stats.component.ts
│     │  ├─ task-create/
│     │  │  ├─ task-create.component.css
│     │  │  ├─ task-create.component.html
│     │  │  └─ task-create.component.ts
│     │  ├─ task-form/
│     │  │  ├─ task-form.component.html
│     │  │  └─ task-form.component.ts
│     │  ├─ task-list/
│     │  │  ├─ task-list.component.html
│     │  │  └─ task-list.component.ts
│     │  └─ task-modal/
│     │     ├─ task-modal.component.css
│     │     ├─ task-modal.component.html
│     │     └─ task-modal.component.ts
│     │
│     ├─ models/
│     │  └─ task.model.ts
│     │
│     ├─ services/
│     │  └─ task.service.ts
│     │
│     ├─ app.component.html
│     ├─ app.component.ts
│     └─ app.config.ts

```
# Clone repository
git clone https://github.com/Min0sss/GoTask.git

# Install dependencies
npm install

# Run development server
ng serve 

##  Notes

- Frontend-First: This is a pure frontend solution. All data is managed locally in the browser for privacy and speed.

- Architecture: Built using Angular's Standalone Components approach, reducing boilerplate and improving modularity

- No Backend Required: The app uses the browser's LocalStorage API to persist data, making it a perfect offline-capable demo.

- Clean Code: Strictly typed with TypeScript and follows Angular best practices (Services for logic, Components for view).

## Author

Guillermo Contreras
Front-End Developer

This project is part of my Professional Portfolio and demonstrates real-world dashboard architecture, CRUD operations, library integration (Charts/PDF/Excel), and advanced DOM manipulation.