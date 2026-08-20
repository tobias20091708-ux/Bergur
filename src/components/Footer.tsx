const DEFAULT_EMAIL = "[kontakt@bergurmoberg.dk]";

export function Footer({ email = DEFAULT_EMAIL }: { email?: string }) {
  return (
    <footer className="bg-background px-6 py-10 text-sm text-muted sm:px-12">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p>© {new Date().getFullYear()} Bergur Rønne Moberg</p>
        <p>
          {email} · Københavns Universitet
        </p>
      </div>
    </footer>
  );
}
