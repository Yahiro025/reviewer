// Next.js API Route: /api/execute
// Uses Wandbox API - free, no API key required
// Piston API went whitelist-only as of Feb 2026, so we switched to Wandbox

function mapWandboxToPiston(data) {
  // Wandbox response format → Piston-compatible format
  // Wandbox: { status, signal, compiler_output, compiler_error, program_output, program_error }
  // Piston:   { run: { stdout, stderr, signal, code }, compile: { stdout, stderr, code, signal } }

  const hasCompileError = !!(data.compiler_error || data.status === "1");
  // A runtime failure is indicated by a non-empty program_error or a signal
  const hasRunError = !!(data.program_error || data.signal);

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
      // run.code reflects runtime errors only (compile errors are in compile.code).
      // When compilation fails the program never runs, so run.code stays 0.
      code: hasRunError ? 1 : 0,
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
