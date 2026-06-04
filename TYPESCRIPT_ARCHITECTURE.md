TYPESCRIPT_ARCHITECTURE
======================

Objective
---------
Define a migration and architecture plan to build the frontend and backend entirely in TypeScript, with clear folder structures, types, DTOs, validation, and integration patterns.

Frontend Folder Structure (TypeScript)
-------------------------------------
src/
  assets/
  components/
    ui/ (Button.tsx, Card.tsx, Input.tsx)
    layout/ (Topbar.tsx, Sidebar.tsx)
  pages/ (index.tsx, dashboard/, auth/)
  features/ (portfolio/, market/, notifications/)
  hooks/ (useAuth.ts, useSocket.ts)
  services/ (apiClient.ts, marketApi.ts)
  store/ (zustand stores typed)
  types/ (index.ts, api.d.ts)
  utils/ (formatters, math)

Backend Folder Structure (TypeScript)
------------------------------------
src/
  controllers/
  routes/
  models/ (mongoose models with TS interfaces)
  services/ (marketSync, notificationService)
  jobs/ (workers)
  middlewares/ (auth.ts, error.ts)
  utils/
  types/
  app.ts
  server.ts

Type Definitions & Patterns
---------------------------
- Use `types/` to centralize domain types: `User`, `Portfolio`, `Holding`, `Transaction`, `Alert`, `Notification`, `Wallet`, `ExchangeAccount`, `Goal`.
- For each Mongoose model, define a TS interface and a Mongoose Schema with generics: `interface IUser { ... } const UserModel = model<IUser>('User', userSchema)`.

API Types & DTOs
----------------
- Define request and response DTOs per endpoint.
- Example: `AuthLoginDto { username: string; password: string }` and `AuthLoginRes { accessToken: string; user: UserPublic }`.
- Use Zod schemas for runtime validation and `z.infer<typeof schema>` to derive TS types.

Validation Strategy
-------------------
- Zod-centric: validate HTTP input at the controller boundary using express-zod-api style middleware.
- Derive types from Zod to keep runtime and compile-time in sync.

React Forms
-----------
- Use `react-hook-form` with `@hookform/resolvers/zod` to integrate Zod schemas for form-level validation.

Error Handling and Types
------------------------
- Central `ApiError` class with typed `code`, `status`, `message`, `meta`.
- Controller returns `Result<T>` typed objects. Use generics to unify responses: `ApiResponse<T> = { status: 'success'|'error'; data?: T; error?: ApiError }`.

Contracts & OpenAPI
-------------------
- Generate OpenAPI docs from typed routes or keep a single source-of-truth YAML. Use codegen to generate `api.d.ts` for frontend.

Zod integration pattern
-----------------------
1. Create `schemas/` with zod validators per endpoint: `loginSchema = z.object({...})`.
2. Middleware `validate(schema)` parses and attaches typed `req.body` via `z.infer`.
3. Controllers accept typed inputs: `async function login(req: Request<{}, {}, LoginInput>)`.

Type-safe service boundaries
---------------------------
- Service functions accept typed DTOs and return typed results. E.g., `getPortfolioSummary(userId: ObjectId): Promise<PortfolioSummary>`.

Developer ergonomics
--------------------
- Enable `strict` TS settings: `noImplicitAny`, `strictNullChecks`.
- Use ESLint + Prettier + TypeScript plugin.

Migration plan (if porting from JS)
---------------------------------
1. Add TypeScript and minimal tsconfig, change server entry to `ts-node` for dev.
2. Convert models and utility modules first (small surface area).
3. Introduce Zod schemas for endpoints as you convert controllers.
4. Move frontend to TSX gradually: pages first, then components.

Testing
-------
- Use `ts-jest` or Vite test runner with TypeScript support. Keep types in tests via `expectType` patterns when useful.

End of TYPESCRIPT_ARCHITECTURE
