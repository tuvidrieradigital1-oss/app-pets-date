import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import logo from "@/assets/pets-date-logo.png";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";

export function SiteHeader() {
  const { user, isAdmin, isVet } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();

  const signOut = async () => {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  return (
    <header className="sticky top-0 z-30 border-b-[2.5px] border-ink bg-card/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Pets Date" width={44} height={44} className="h-11 w-11" />
          <span className="font-display text-2xl font-bold">
            Pets <span className="text-primary">Date</span>
          </span>
        </Link>
        <nav className="flex items-center gap-2">
          {user ? (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link to="/dashboard">Mis mascotas</Link>
              </Button>
              {isVet && (
                <span className="hidden rounded-full border-2 border-ink bg-secondary px-2 py-0.5 text-xs font-bold sm:inline">
                  Veterinario
                </span>
              )}
              {isAdmin && (
                <Button asChild variant="ghost" size="sm">
                  <Link to="/admin">Admin</Link>
                </Button>
              )}
              <Button asChild variant="ghost" size="sm">
                <Link to="/perfil">Perfil</Link>
              </Button>
              <Button variant="outline" size="sm" onClick={signOut}>
                Salir
              </Button>
            </>
          ) : (
            <Button asChild size="sm">
              <Link to="/auth">Ingresar</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
