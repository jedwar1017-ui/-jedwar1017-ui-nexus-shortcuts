# Nexus Shortcuts — phone-friendly AI + project launchpad

**Working prototype:** responsive web launchpad with searchable project links, safely validated personal shortcuts and copyable prompts for a five-step AI critique workflow.

**Not implemented:** automatic LLM API calls, direct PC control, secure token management, cloud synchronization, GitHub Actions execution, or an installed Windows application. Copy/paste is currently the safe bridge between different AI services.

## Usage
Run a local static web server: `python -m http.server 8000`, then open http://localhost:8000. Direct `file://` opening may be blocked by browser ES-module security. On a phone, use an explicitly enabled static host such as GitHub Pages; no hosted URL is verified yet. No backend and no API keys.
- Click a project to open its GitHub repository.
- Add an HTTPS shortcut (stays in that browser via localStorage), or remove it.
- Click any role prompt to copy it and paste into your chosen AI application.
- No model output is assumed verified: the final release check requires actual evidence.

## Tests
Node 22+: `node --test tests/*.test.mjs`.
CI is configured in `.github/workflows/ci.yml`; committed workflows are not proof that CI has executed.

## Safety
This public repository includes **no private tokens or user-supplied secrets**. Never put API keys in shortcuts; your local shortcut list can be exported only in future, once secure backup is designed. No link claiming the private repository is published here. Browser clipboard permissions may restrict copy in some contexts.
