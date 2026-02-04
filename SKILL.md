---
name: diagramming-flows
description: Use when visualizing architecture, code flow, state machines, sequences, or entity relationships. Renders mermaid diagrams as ASCII/unicode art directly in the terminal. Triggers on "draw a diagram", "visualize this flow", "show me the architecture", "sequence diagram", "flowchart", "state machine", "ER diagram".
allowed-commands: 'Bash(bun run render.ts *')
---

# Rendering Mermaid Diagrams as ASCII

Render mermaid diagrams directly in the terminal using beautiful-mermaid. Output is unicode box-drawing characters that display correctly in terminals and markdown.

Use these to print in the terminal or add in to markdown files you're generating.

## Running the Renderer

Run:

```bash
bun run render.ts "graph LR
A --> B --> C"
```

**Important**: Use newlines between the header and nodes, not semicolons.

## Supported Diagram Types

- **Flowcharts**: `graph TD` (top-down), `graph LR` (left-right), `graph BT`, `graph RL`
- **State diagrams**: `stateDiagram-v2`
- **Sequence diagrams**: `sequenceDiagram`
- **Class diagrams**: `classDiagram`
- **ER diagrams**: `erDiagram`

## Options

- `--padding-x N` - horizontal node spacing (default: 5)
- `--padding-y N` - vertical node spacing (default: 5)

## When to Use

- Planning mode: visualize architecture before implementing
- Explaining code flow or data relationships
- Documenting system design
- Quick sketches of state machines, sequences, or entity relationships
