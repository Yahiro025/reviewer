// Next.js API Route: /api/execute
// Uses Wandbox API - free, no API key required
// Piston API went whitelist-only as of Feb 2026, so we switched to Wandbox

function mapWandboxToPiston(data) {
  // Wandbox response format → Piston-compatible format
  
  // A compiler error happens if gcc actually throws an error.
  // If the user's C program simply `return 1;`, Wandbox sets status to "1" but compiler_error is empty.
  const hasCompileError = !!(data.compiler_error && data.compiler_error.includes("error:"));
  
  // A runtime failure happens if the program crashes or returns a non-zero code.
  // We parse the status to get the actual exit code.
  const rawStatus = parseInt(data.status || "0", 10);
  const isRuntimeNonZero = !hasCompileError && rawStatus !== 0;

  return {
    success: true,
    compile: {
      stdout: data.compiler_output || "",
      stderr: data.compiler_error || "",
      code: hasCompileError ? 1 : 0,
      signal: null,
    },
    run: {
      stdout: data.program_output || "",
      stderr: data.program_error || "",
      // If it failed to compile, run.code is null/0. Otherwise, pass the raw exit code.
      code: hasCompileError ? 0 : rawStatus,
      signal: data.signal || null,
    },
  };
}

export async function POST(request) {
  const { code, stdin = "" } = await request.json();

  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, 15000); // 15s client timeout for compile + run

  try {
    const response = await fetch("https://wandbox.org/api/compile.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        compiler: "gcc-head-c",
        code,
        stdin,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Wandbox API error: ${response.status}`);
    }

    const data = await response.json();
    return Response.json(mapWandboxToPiston(data));
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      return Response.json(
        { success: false, error: "Code execution timed out. The execution server took too long to respond." },
        { status: 504 }
      );
    }
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
