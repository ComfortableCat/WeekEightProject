import Link from "next/link";

export function Header() {
  return (
    <header className="flex px-10 py-5 text-center shadow-md shadow-black mb-5">
      <h1 className="font-mono font-semibold text-xl">Talker</h1>
      <nav className="gap-5 flex px-10 divide-x-2">
        <Link href="/">HOME</Link>
        <Link href="/newtalkingpoint">NEW</Link>
        <Link href="/browsetalkingpoints/true">BROWSE</Link>
      </nav>
    </header>
  );
}
