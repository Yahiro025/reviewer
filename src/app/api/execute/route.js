// Next.js API Route: /api/execute
// Uses Piston API - 100% free, no API key required

export async function POST(request) {
  const { code, stdin = "", language = "c", version = "10.2.0" } = await request.json();

  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, 10000); // 10s client timeout for compile + run

  try {
    const response = await fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language,
        version,
        files: [{ name: "main.c", content: code }],
        stdin: stdin,
        args: [],
        compile_timeout: 5000,
        run_timeout: 3000,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Piston API error: ${response.status}`);
    }

    const data = await response.json();

    return Response.json({
      run: data.run,
      compile: data.compile,
      success: true,
    });
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
