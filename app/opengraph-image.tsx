import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #f6f8fb 0%, #e9eef7 50%, #d8e3f3 100%)",
          padding: "56px",
          color: "#102033",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              height: "18px",
              width: "18px",
              borderRadius: "999px",
              background: "#2563eb",
              boxShadow: "0 0 0 10px rgba(37, 99, 235, 0.12)",
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "-0.03em",
            }}
          >
            mycrm UI
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            maxWidth: "860px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 72,
              lineHeight: 1.05,
              fontWeight: 800,
              letterSpacing: "-0.05em",
            }}
          >
            Headless CRM UI
            <br />
            for React
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              lineHeight: 1.35,
              color: "#3d5877",
              letterSpacing: "-0.02em",
            }}
          >
            데이터 중심 CRM 인터페이스와 AI 네이티브 DX를 위한
            문서·컴포넌트 가이드
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            {["React", "Data Table", "Docs", "AI Guide"].map((label) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  borderRadius: "999px",
                  background: "rgba(255,255,255,0.7)",
                  border: "1px solid rgba(16,32,51,0.08)",
                  padding: "10px 18px",
                  fontSize: 24,
                  fontWeight: 600,
                  color: "#23405f",
                }}
              >
                {label}
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              fontWeight: 600,
              color: "#456383",
            }}
          >
            www.mycrm-ui.com
          </div>
        </div>
      </div>
    ),
    size,
  );
}
