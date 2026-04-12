# 📺 TubeTrack

TubeTrack is a robust TV show discovery and information platform built with Vue 3 and Vite. By integrating the TV Maze API, it serves as a comprehensive encyclopedia for television content, allowing users to explore vast catalogs, access deep-dive show metadata, and stay informed about their favorite series through a high-performance, reactive interface.

## 🛠️ Tech Stack

- Framework: Vue 3 (Composition API)
- Build Tool: Vite
- State Management: Pinia
- Routing: Vue Router 4
- HTTP Client: Axios
- Testing: Vitest
- Styling: CSS3

## 📐 Architecture Decisions

### Tech Stack Rationale

- Vite: Selected over Webpack to ensure a lightning-fast development experience. Its Hot Module Replacement (HMR) allows for near-instant updates during the rapid iteration of UI components.
- Pinia: Replaces Vuex as the state management solution due to its simpler API and better modularity.
- Vitest: Picked for its seamless integration with Vite. Since it shares the same configuration, it provides a much faster and more reliable testing environment compared to Jest in a Vite-based project.

### Design & Pattern Strategy

- Atomic Design: UI elements (Buttons, Cards) are built as highly reusable "atoms" to maintain visual consistency and reduce CSS duplication across the app.
- Responsive Scaling: Implemented responsive UI using modern layout engines like Flexbox. This ensures the website layouts remain immersive and responsive on everything from small mobile screens to largre monitor.

## 📦 Project Setup

### Node and NPM version

- Node: 24.12.0
- NPM: 11.6.2

### Installation

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## 🧪 Testing & Quality Assurance

### Run all unit tests

```sh
npm run test
```

### Generate code coverage report

```sh
npm run test:coverage
```
