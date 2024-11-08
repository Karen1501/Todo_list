// app/layout.js
import React from "react";
//import "./globals.css";

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
