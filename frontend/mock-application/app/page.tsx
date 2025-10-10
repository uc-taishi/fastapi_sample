import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <nav className={styles.navbar}>
          <Link href="/">Home</Link>
          <Link href="/practice">練習問題</Link>
        </nav>
        <div style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>この画面はFastAPIのお勉強用に用意したテキトーな画面です。</p>
          <p style={{ fontSize: "24px", fontWeight: "bold"}}>それぞれの個別のページでデータをバックエンド（FastAPI）から取得したり、書き込んだり、消したり
          </p>
        </div>
      </main>
    </div>
  );
}
