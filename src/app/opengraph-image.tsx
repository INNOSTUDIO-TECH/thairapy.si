import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = "Thairapy Massage";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#15180f",
        color: "#f4efe3",
        fontFamily: "serif",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 40,
          border: "1px solid rgba(200,172,115,0.3)",
        }}
      />
      <div style={{ fontSize: 104, letterSpacing: -2 }}>Thairapy</div>
      <div
        style={{
          fontSize: 30,
          letterSpacing: 26,
          color: "#c8ac73",
          marginTop: 8,
        }}
      >
        MASSAGE
      </div>
      <div
        style={{
          fontSize: 26,
          letterSpacing: 8,
          color: "#cdc7b6",
          marginTop: 40,
          textTransform: "uppercase",
        }}
      >
        {siteConfig.tagline}
      </div>
      <div style={{ fontSize: 22, color: "#a9853f", marginTop: 18 }}>
        {siteConfig.address.city}
      </div>
    </div>,
    size
  );
}
