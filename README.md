# BrixJS Utils

> 🧰 Utility toolkit for the [BrixJS](https://github.com/airtrame/brixjs-cli) framework – a collection of shared helpers and low-level tools to support consistent and efficient API development.

This repository contains the **source code for the `@airtrame/brixjs-utils` npm package**, a collection of reusable utility functions, types, and internal helpers that support the core and CLI packages of the BrixJS framework.

---

## ⚡ What is BrixJS?

BrixJS is a TypeScript-native framework designed for creating modular and maintainable REST APIs using a **declarative YAML-based actor system**. It simplifies backend architecture by enforcing conventions, strict typing, and reusable business logic components.

While the main framework logic lives in [`brixjs-core`](https://github.com/airtrame/brixjs-core) and developer tooling is handled by [`brixjs-cli`](https://github.com/airtrame/brixjs-cli), this package provides **shared utilities** that power both under the hood.

---

## 🚀 Features of the Framework

### 🏗️ Project Scaffolding
- Quickly initialize a new BrixJS API project with `brix new`.
- Auto-generate routes, actors, services, and more.

### 🔁 Developer Experience
- Built-in **hot-reload** for local development.
- Streamlined commands for **building** and **running** your API.
- Helpful prompts and validation.

### 📦 YAML-Driven Logic
- Supports declarative business logic via `*.actor.yaml` files.
- Automatically integrates generated actors into your routes.

### ✅ Data Safety & Routing
- Full **TypeScript support** with strict type checks.
- Built-in **Zod** validation for request/response schemas.
- Centralized and typed route declarations.

### 🧩 API Features & Middleware
- Consistent **JSON responses and errors**.
- Versioned API support.
- Middleware system with CORS enabled by default.

---

## 📦 Installation

```bash
npm install @airtrame/brixjs-utils
```


---

## 🤝 Contributing

We welcome contributions of all kinds – bug fixes, utility ideas, documentation, and feedback.

BrixJS is fully open-source and MIT-licensed. Feel free to fork the repo, open issues, or submit pull requests.

---

## 🔗 Resources

* 🧱 Core framework: [BrixJS Core](https://github.com/airtrame/brixjs-core)
* 🛠️ CLI tool: [BrixJS CLI](https://github.com/airtrame/brixjs-cli)
* 📦 Utils on npm: [@airtrame/brixjs-utils](https://www.npmjs.com/package/@airtrame/brixjs-utils)
* 🧑‍💻 Maintained by: [Airtrame](https://airtrame.com)

---

## 📄 License

MIT © [Airtrame](https://airtrame.com)


