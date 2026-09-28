import { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

export const TableQR = ({ tableNumber }) => {
  const canvasRef = useRef(null);

  // window.location.origin = "http://localhost:5173" en dev, tu dominio en producción
  const url = `${window.location.origin}/menu?mesa=${tableNumber}`;

  const handleDownload = () => {
    const canvas = canvasRef.current.querySelector("canvas");
    const link = document.createElement("a");
    link.download = `qr-mesa-${tableNumber}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div style={{ textAlign: "center", padding: "1rem", background: "#fff", borderRadius: 12 }}>
      <div ref={canvasRef}>
        <QRCodeCanvas value={url} size={200} marginSize={2} />
      </div>
      <p style={{ color: "#000", fontWeight: "bold" }}>Mesa {tableNumber}</p>
      <button onClick={handleDownload}>Descargar PNG</button>
    </div>
  );
};