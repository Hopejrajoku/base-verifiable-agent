import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import path from 'path';

export async function POST() {
  const scriptPath = path.join(process.cwd(), '..', 'agent-action', 'verify_bridge.js');
  
  return new Promise((resolve) => {
    exec(`node ${scriptPath}`, (error, stdout, stderr) => {
      if (error) {
        resolve(NextResponse.json({ error: stderr }, { status: 500 }));
      } else {
        resolve(NextResponse.json({ message: "Agent Triggered Successfully" }));
      }
    });
  });
}
