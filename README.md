# 🌸 Dulces Pétalos

Catálogo web de floristería construido con foco en **escalabilidad, rendimiento y mantenibilidad**.  
El objetivo técnico del proyecto es ofrecer una base sólida de frontend moderno con arquitectura por capas, UI responsive y experiencia optimizada en carga de datos e imágenes.

![Build Passing](https://img.shields.io/badge/build-passing-success)
![Next.js](https://img.shields.io/badge/Next.js-14%2B-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-v5-FF4154?logo=reactquery)
![Vitest](https://img.shields.io/badge/Vitest-Unit_Tests-6E9F18?logo=vitest)

---

## 🚀 Stack tecnológico y justificación

| Tecnología | Motivo de elección |
|---|---|
| **Next.js (App Router)** | Render híbrido, buena base SEO y optimización de Core Web Vitals sin complejidad extra. |
| **TypeScript (strict)** | Contratos de dominio explícitos, menos errores en runtime y mejor DX en refactors. |
| **Tailwind CSS** | Velocidad de iteración UI + consistencia visual con bajo costo de mantenimiento. |
| **TanStack Query** | Gestión robusta de server state (cache, retries, estados de carga, paginación infinita). |
| **Axios** | Cliente HTTP centralizado con interceptores para manejo de errores transversal. |
| **Vitest + React Testing Library** | Tests rápidos, cercanos al comportamiento real de UI y fáciles de ejecutar en local/CI. |

---

## 🧱 Arquitectura del proyecto

La estructura actual sigue un enfoque **feature-first** dentro de `modules/`, manteniendo infraestructura y utilidades compartidas fuera del módulo:

```text
src/
├── app/
│   ├── (store)/              # Route group de storefront (sin afectar URL publica)
│   │   ├── page.tsx          # "/"
│   │   └── product/[id]/     # "/product/:id"
│   ├── api/                  # Endpoints internos de BFF/proxy
│   │   ├── products/
│   │   └── image/
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── globals.css
├── modules/
│   ├── products/             # Módulo funcional implementado
│   │   ├── core/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── components/
│   │   └── __tests__/
│   ├── auth/                 # Scaffold para crecimiento futuro
│   ├── cart/                 # Scaffold para crecimiento futuro
│   └── user/                 # Scaffold para crecimiento futuro
├── services/                 # Infraestructura compartida (axios/api client)
└── utils/                    # Utilidades puras compartidas
```

> **Nota de escalabilidad:** `auth`, `cart` y `user` existen actualmente como carpetas base (scaffold) para mostrar cómo crecería el proyecto por módulos sin concentrar todo en una sola carpeta global de componentes.

### Headless Hooks

`useProductCatalog` encapsula la lógica de catálogo (infinite scroll, estados de carga/error, filtro, animación de entradas), dejando `ProductCatalog` como orquestador de render.  
Esto permite:

- UI más simple y legible.
- tests más directos sobre comportamiento.
- refactor seguro sin romper presentación.

### ¿Por qué esta estructura escala mejor?

- **Crecimiento por dominio, no por tipo de archivo**: cada módulo encapsula su core, hooks, servicios, componentes y tests.
- **Menor acoplamiento**: los cambios de `products` rara vez impactan `auth`, `cart` o `user`.
- **Onboarding más rápido**: un desarrollador nuevo encuentra todo lo de una feature en una sola zona.
- **Rutas ordenadas con `route groups`**: `app/(store)` permite crecer en `app` sin mezclar storefront, admin, auth o landing pages.
- **Evolución segura**: facilita dividir equipos por módulo y escalar a monorepo o microfrontends en fases futuras.

---

## 🛠️ Decisiones de ingeniería

### 1) Performance: Infinite Scroll + `IntersectionObserver`

- Carga inicial limitada a 6 productos.
- Carga incremental bajo demanda (scroll o botón “Ver más”).
- Skeletons diferenciados para primera carga y paginación.
- Menor coste inicial de render y mejor percepción de velocidad.

### 2) Optimización de imágenes

- Uso de `next/image` con `sizes`, `priority` en el primer fold y `placeholder="blur"`.
- Ajuste de renderizado visual para mitigar pixelado de assets de origen.
- Proxy interno de imágenes para aislar la UI de incidencias del host remoto.

### 3) Server State vs Client State

- **TanStack Query** para server state: es la fuente de verdad del catálogo remoto.
- **No se añadió Redux/Zustand** (YAGNI): no existe un estado global complejo que lo justifique en este alcance.
- Resultado: menor complejidad accidental y mejor mantenibilidad.

### 4) Calidad y testing

Se cubren flujos críticos del catálogo:

- estado loading (skeletons),
- filtrado dinámico por buscador,
- manejo de error de API,
- carga incremental (`fetchNextPage`) en interacción de “ver más”.

---

## 📦 Instalación y configuración

### Requisitos

- Node.js 18+ (recomendado 20+)
- npm 9+
- Docker + Docker Compose (opcional)

### Variables de entorno

Crear `.env.local` en la raíz con:

```bash
NEXT_PUBLIC_API_URL=https://dulces-petalos.jakala.es/api/v1
```

---

### Opción A: ejecución tradicional (Node + npm)

1) Instalar dependencias:

```bash
npm install
```

2) Ejecutar en local:

```bash
npm run dev
```

Aplicación disponible en: [http://localhost:3000](http://localhost:3000)

---

### Opción B: ejecución con Docker 🐳

1) Construir y levantar:

```bash
docker compose up --build
```

2) Ejecutar en segundo plano:

```bash
docker compose up -d --build
```

3) Detener contenedores:

```bash
docker compose down
```

La aplicación queda expuesta en [http://localhost:3000](http://localhost:3000).

---

## ✅ Scripts útiles

```bash
npm run dev      # desarrollo
npm run lint     # linting
npm run test     # tests unitarios
npm run build    # build producción
```

---

## 🗺️ Roadmap técnico (si el proyecto crece)

- E2E con **Playwright** para cubrir journeys completos.
- **Storybook** + tokens para evolucionar hacia sistema de diseño.
- Persistencia de favoritos en `localStorage` (o backend si hay cuenta de usuario).
- Métricas reales de web performance (Lighthouse CI / Web Vitals en producción).
- Estrategia de observabilidad de errores (Sentry) y tracing de red.

---

---

## 🤖 IA Generativa & Context Engineering

Siguiendo la filosofía de innovación de **JAKALA**, este proyecto ha sido desarrollado utilizando herramientas de IA generativa (Cursor / GitHub Copilot) bajo una metodología de **Ingeniería de Contexto**:

- **Definición de Arquitectura:** Se proporcionaron prompts estructurados para asegurar que la IA respetara los principios **SOLID** y la **Arquitectura por Capas**, evitando la generación de "Fat Components".
- **Refactorización Asistida:** Se utilizó la IA para extraer lógica compleja de UI hacia **Headless Hooks**, garantizando una separación clara de responsabilidades.
- **Generación de Casos de Prueba:** Se guió a la IA mediante contexto técnico para generar tests unitarios con **Vitest** que cubrieran no solo el "happy path", sino también estados de error y carga asíncrona.
- **Optimización de Prompting:** Las decisiones de diseño (como el uso de `next/image` para mitigar el pixelado) fueron refinadas mediante iteraciones de prompting técnico, asegurando soluciones alineadas con las mejores prácticas de Next.js.

## Cierre

Proyecto diseñado con una mentalidad de **Senior Frontend / Tech Lead**: decisiones pragmáticas, arquitectura limpia y foco en calidad sin sobreingeniería.  
La base está preparada para iterar funcionalidades de negocio sin sacrificar mantenibilidad.
