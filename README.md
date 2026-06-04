# cogent

## Getting started

Requires **Node 22+** and at least one provider key.

```bash
git clone https://github.com/AKjangid99/TerminalAgent.git
cd TerminalAgent
npm install
cp .env.example .env       # add your key(s)
```

```bash
# .env
ANTHROPIC_API_KEY=...
GEMINI_API_KEY=...
GROQ_API_KEY=...
```

Run it straight from source:

```bash
npm run dev -- "list the typescript files under src"
```

Or build and run the compiled binary:

```bash
npm run build
node dist/index.js "explain what this project does"
```

## Usage

```
cogent [message]            Interactive TUI (default)
cogent --print [message]    One-shot: stream the answer to stdout
echo "..." | cogent -p      Read the prompt from a pipe

Options
  --provider <name>   anthropic, gemini (default), or groq
  --model <id>        Specific model (see --list-models)
  --session <id>      Resume a saved session (see --list-sessions)
  --list-models       Print available models
  --list-sessions     Print saved sessions, newest first
  --print, -p         Non-interactive output
  --classic           Plain readline REPL instead of the TUI
  --yolo              Run tools without asking permission
  --context-limit <n> Override the model's context window
  --version, -v
  --help, -h
```

```bash
cogent --provider groq --model llama-3.3-70b-versatile "refactor src/tools/grep.ts"
cogent --list-models
```

## Development

```bash
npm run dev            # run from source (tsx)
npm run build          # tsc → dist/
npm run check          # biome lint + format check
npm run format         # biome format --write
npm run test:tools     # tool suite — no API key needed
npm run test:provider  # provider streaming (needs a key)
npm run test:agent     # full loop end to end (needs a key)
```
