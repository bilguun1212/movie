// src/app/[id]/page.tsx

export default function MovieDetail({ params }: { params: { id: string } }) {
  return (
    <div style={{ padding: "100px", textAlign: "center" }}>
      <h1 style={{ fontSize: "3rem", color: "red" }}>Киноны ID: {params.id}</h1>
      <p>Чи одоо dynamic routing-ийг амжилттай ажиллууллаа! 🎉</p>
    </div>
  );
}