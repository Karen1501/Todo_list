import React from "react";
import "../styles/global.css";

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <header></header>
        <main>{children}</main>
      </body>
    </html>
  );
}
