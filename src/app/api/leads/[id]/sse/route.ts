import { sseEmitter } from "@/lib/sse";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const encoder = new TextEncoder();
  let isClosed = false;

  const stream = new ReadableStream({
    start(controller) {
      // 1. Send initial handshake connection established message
      controller.enqueue(encoder.encode("data: connected\n\n"));

      // 2. Set up event listener for this lead id
      const onUpdate = (data: { id: string; action: string; status?: string; remark?: string }) => {
        if (data.id === id) {
          try {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
          } catch (e) {
            console.error("SSE stream enqueue error:", e);
          }
        }
      };

      sseEmitter.on("lead-update", onUpdate);

      // Keep connection alive with periodic heartbeats (every 15s)
      const heartbeatInterval = setInterval(() => {
        if (!isClosed) {
          try {
            controller.enqueue(encoder.encode(": keepalive\n\n"));
          } catch (e) {
            // connection might already be closed, cleanup will handle it
          }
        }
      }, 15000);

      // 3. Handle connection closure or abort signal
      request.signal.addEventListener("abort", () => {
        isClosed = true;
        clearInterval(heartbeatInterval);
        sseEmitter.off("lead-update", onUpdate);
        try {
          controller.close();
        } catch (e) {
          // ignore if already closed
        }
      });
    },
    cancel() {
      isClosed = true;
    }
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      "Connection": "keep-alive",
    },
  });
}
