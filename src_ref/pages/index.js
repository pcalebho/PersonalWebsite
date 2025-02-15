import Link from "next/link";

export default function Home() {
  return (
    <div>
      Hello World.{" "}
      <Link href="/about">
        About
      </Link>
      <Link href="/roboteyes">
        Robot Eyes
      </Link>
    </div>
  );
}
