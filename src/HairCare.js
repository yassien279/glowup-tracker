import React, { useState } from "react";
import { amazonSearch } from "./api/amazonApi";

const PLACEHOLDER_IMG = "https://via.placeholder.com/250x200?text=No+Image";

export default function HairCare() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setProducts([]);
    try {
      // Search on Amazon AE (UAE)
      const result = await amazonSearch(searchTerm || "shampoo", "AE");
      setProducts(result);
      if (!result.length) setError("No products found.");
    } catch {
      setError("Failed to fetch products. Try again!");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: 32 }}>
      <h1 style={{ color: "white", fontSize: 48, fontWeight: "bold", marginBottom: 32 }}>
        Hair Care Product Search
      </h1>
      <form onSubmit={handleSearch} style={{ display: "flex", marginBottom: 32 }}>
        <input
          type="text"
          placeholder="as i am"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            padding: 24,
            fontSize: 28,
            borderRadius: 10,
            border: "none",
            outline: "none"
          }}
        />
        <button
          type="submit"
          style={{
            marginLeft: 12,
            background: "#4287f5",
            color: "white",
            fontSize: 28,
            border: "none",
            borderRadius: 10,
            padding: "0 40px",
            cursor: "pointer"
          }}
        >
          Search
        </button>
      </form>

      {loading && <p style={{ color: "#fff", fontSize: 24 }}>Loading...</p>}
      {error && <p style={{ color: "red", fontSize: 24 }}>{error}</p>}

      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 40
      }}>
        {products.map((product, i) => (
          <div key={product.asin || i} style={{
            background: "#202638",
            color: "#fff",
            borderRadius: 18,
            width: 350,
            minHeight: 370,
            padding: 24,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
            <img
              src={product.product_photo || PLACEHOLDER_IMG}
              alt={product.product_title || "No Title"}
              style={{
                width: "100%", height: 180, objectFit: "contain",
                borderRadius: 10, background: "#181d2a"
              }}
              onError={e => { e.target.src = PLACEHOLDER_IMG; }}
            />
            <h2 style={{
              fontSize: 28, fontWeight: 700, margin: "18px 0 8px 0",
              textAlign: "center", minHeight: 68
            }}>
              {product.product_title || "No Title"}
            </h2>
            <p style={{ fontSize: 22, marginBottom: 8 }}>
              {product.product_price || "No Price"}
            </p>
            <a
              href={product.product_url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#53bfff", fontSize: 20, textDecoration: "underline", marginTop: 4
              }}
            >
              View on Amazon
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
