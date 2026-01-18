import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Path to the logs file in the agent-action folder
    const logPath = path.join(process.cwd(), '..', 'agent-action', 'agent_logs.json');
    
    if (!fs.existsSync(logPath)) {
      return NextResponse.json([]);
    }

    const fileContent = fs.readFileSync(logPath, 'utf-8');
    // Parse the NDJSON (Newline Delimited JSON) into an array
    const logs = fileContent
      .trim()
      .split('\n')
      .map((line) => JSON.parse(line));

    return NextResponse.json(logs);
  } catch (error) {
    return NextResponse.json({ error: "Failed to load logs" }, { status: 500 });
  }
}
