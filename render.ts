#!/usr/bin/env bun

import { renderMermaidAscii } from "beautiful-mermaid";

interface Options {
  paddingX: number;
  paddingY: number;
}

function parseArgs(args: string[]): { diagram: string; options: Options } {
  const options: Options = {
    paddingX: 5,
    paddingY: 5,
  };

  let diagram = "";
  let i = 0;

  while (i < args.length) {
    const arg = args[i];

    if (arg === "--padding-x" && args[i + 1]) {
      options.paddingX = parseInt(args[i + 1], 10);
      i += 2;
    } else if (arg === "--padding-y" && args[i + 1]) {
      options.paddingY = parseInt(args[i + 1], 10);
      i += 2;
    } else if (!arg.startsWith("--")) {
      diagram = arg;
      i++;
    } else {
      i++;
    }
  }

  return { diagram, options };
}

async function readStdin(): Promise<string> {
  const chunks: Buffer[] = [];
  for await (const chunk of Bun.stdin.stream()) {
    chunks.push(Buffer.from(chunk));
  }
  return Buffer.concat(chunks).toString("utf-8").trim();
}

async function main() {
  const args = process.argv.slice(2);
  let { diagram, options } = parseArgs(args);

  // if no diagram arg, try stdin
  if (!diagram) {
    const isTTY = process.stdin.isTTY;
    if (!isTTY) {
      diagram = await readStdin();
    }
  }

  if (!diagram) {
    console.error("usage: bun run render.ts <mermaid-diagram>");
    console.error('       echo "graph LR; A --> B" | bun run render.ts');
    process.exit(1);
  }

  try {
    const output = renderMermaidAscii(diagram, {
      paddingX: options.paddingX,
      paddingY: options.paddingY,
    });
    console.log(output);
  } catch (err) {
    console.error("render error:", err instanceof Error ? err.message : err);
    process.exit(1);
  }
}

main();
