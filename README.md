# AI Kitchen Assistant (EzuraSense)

An AI-powered kitchen assistant that helps users discover recipes using ingredients.

---

## Overview

EzuraSense is a mobile app built with React Native (Expo).

Users can:

* Get recipes
* Enter ingredients
* View cooking steps
* Ask cooking queries

---

## Features

* Ingredient-based suggestions
* AI cooking assistant
* Recipe display
* Fast UI
* Reusable components

---

## Tech Stack

Frontend:

* React Native (Expo)

Logic:

* Custom modules

Tools:

* Node.js
* npm

---
## Project Structure

EzuraSense/

- assets/
  - fonts/
  - loader.gif

- src/
  - app/
    - (tabs)/
      - CookAto.tsx
      - Ezura.tsx
      - _layout.tsx
      - index.tsx

    - components/
      - Editingredients.jsx
      - Error.jsx
      - Header.jsx
      - ListDisplayer.jsx
      - ListHolder.jsx
      - Loader.tsx
      - Loading.jsx
      - CookatoGen.jsx

    - _layout.tsx

- codes/
  - .env
  - colors.json

- app.json
- babel.config.js
- package.json
- tsconfig.json
- README.md
---

## Installation

Clone:

```
git clone https://github.com/your-username/ai-kitchen-assistant.git
cd ai-kitchen-assistant
```

Install:

```
npm install
```

Run:

```
npx expo start
```

---

## How It Works

1. User enters ingredients
2. System processes input
3. AI suggests recipes
4. UI shows results

---

## Example

Input:

```
Tomato, Onion, Egg
```

Output:

```
Recipe: Tomato Egg Scramble

Steps:
1. Chop vegetables
2. Heat pan
3. Add eggs
4. Cook and serve
```

---

## Author

Kevin Sebastian
