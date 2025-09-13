# Copilot Instructions for AI Agents

## Project Overview
This monorepo contains multiple React projects (Vite-based) for the Full Stack Open course. Each subfolder in `part1/` and `part2/` is a self-contained app (e.g., `phonebook`, `courseinfo`, `anecdotes`, `unicafe`).

- **Frontend:** React (JSX), Vite, ESLint
- **Data flow:** Most apps use local React state. Some (e.g., `phonebook`) interact with a REST backend via a service module (see `src/services/`).
- **Component structure:** Components are in `src/components/`. Service modules for API calls are in `src/services/`.

## Key Patterns & Conventions
- **State management:** Use React hooks (`useState`, `useEffect`). State is usually lifted to `App.jsx`.
- **API communication:** Use a service module (e.g., `personService.js`) for all HTTP requests. Do not call `fetch`/`axios` directly in components.
- **Form handling:** Controlled components for forms. See `PersonForm.jsx` for example.
- **Updating data:** For updates (e.g., changing a phone number), prompt the user for confirmation, then call the service's `update` method and update state accordingly.
- **Error handling:** Use `alert()` for user-facing errors. No global error boundary.
- **Linting:** ESLint config is present in each app folder. Follow the rules for code style.

## Developer Workflows
- **Install dependencies:** Run `npm install` in each app folder (e.g., `part2/phonebook/`).
- **Start dev server:** Run `npm run dev` in the app folder.
- **Build:** Run `npm run build` in the app folder.
- **Lint:** Run `npm run lint` in the app folder.

## Examples
- **API pattern:**
  - `src/services/personService.js`:
    ```js
    import axios from 'axios';
    const baseUrl = '/api/persons';
    const create = newPerson => axios.post(baseUrl, newPerson).then(res => res.data);
    const update = (id, updatedPerson) => axios.put(`${baseUrl}/${id}`, updatedPerson).then(res => res.data);
    export default { create, update };
    ```
- **Component pattern:**
  - `src/components/PersonForm.jsx`:
    - Handles form state, checks for duplicates, updates via service, and resets form.

## Integration Points
- **Backend:** Some apps (e.g., `phonebook`) expect a REST API at `/api/*`. See `db.json` for mock data.
- **No monorepo tooling:** Each app is independent. No root-level build or lint commands.

## When in doubt
- Follow the patterns in the most complete app (e.g., `part2/phonebook/`).
- Reference the README in each app folder for details.
