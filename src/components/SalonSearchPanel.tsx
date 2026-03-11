import { useState } from "react";
import { Search, Heart, X, Star } from "lucide-react";
import type { Salon } from "@/lib/mockData";

interface Props {
  salons: Salon[];
  onSelect: (salon: Salon) => void;
  onToggleFavorite: (id: string) => void;
  onClose: () => void;
}

const SalonSearchPanel = ({ salons, onSelect, onToggleFavorite, onClose }: Props) => {
  const [query, setQuery] = useState("");

  const favorites = salons.filter((s) => s.isFavorite);
  const filtered = query
    ? salons.filter((s) => s.name.toLowerCase().includes(query.toLowerCase()))
    : [];

  const showFavorites = !query && favorites.length > 0;

  return (
    <>
      <div className="overlay-backdrop animate-fade-in" onClick={onClose} />
      <div className="fixed inset-x-0 top-0 z-50 max-w-[430px] mx-auto bg-card rounded-b-3xl shadow-xl animate-slide-down-in">
        <div className="flex items-center justify-between px-5 pt-5 pb-2">
          <h2 className="text-lg font-semibold">Select Salon</h2>
          <button onClick={onClose} className="p-2 -mr-2 active:opacity-60 transition-opacity">
            <X size={20} className="text-muted-foreground" />
          </button>
        </div>

        <div className="px-5 pb-3">
          <div className="flex items-center gap-3 bg-secondary rounded-xl px-4 h-11">
            <Search size={18} className="text-muted-foreground shrink-0" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search salon"
              className="bg-transparent w-full text-sm outline-none placeholder:text-muted-foreground"
              autoFocus
            />
          </div>
        </div>

        <div className="max-h-[60vh] overflow-y-auto px-5 pb-6 space-y-2">
          {showFavorites && (
            <>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider pt-1 pb-1">Favorites</p>
              {favorites.map((s) => (
                <SalonCard key={s.id} salon={s} onSelect={onSelect} onToggleFavorite={onToggleFavorite} />
              ))}
              <button
                onClick={() => setQuery(" ")}
                className="w-full text-center text-sm font-medium text-primary py-3 active:opacity-60 transition-opacity"
              >
                Search new salon
              </button>
            </>
          )}
          {query && (
            <>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider pt-1 pb-1">Results</p>
              {filtered.length === 0 && (
                <p className="text-sm text-muted-foreground py-4 text-center">No salons found</p>
              )}
              {filtered.map((s) => (
                <SalonCard key={s.id} salon={s} onSelect={onSelect} onToggleFavorite={onToggleFavorite} />
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

function SalonCard({
  salon,
  onSelect,
  onToggleFavorite,
}: {
  salon: Salon;
  onSelect: (s: Salon) => void;
  onToggleFavorite: (id: string) => void;
}) {
  return (
    <div className="card-elevated flex items-center gap-3 p-4 active:card-pressed transition-all duration-150">
      <button onClick={() => onSelect(salon)} className="flex-1 text-left">
        <p className="font-semibold text-sm">{salon.name}</p>
        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-0.5">
            <Star size={12} className="text-amber-400 fill-amber-400" />
            {salon.rating}
          </span>
          <span>{salon.distance}</span>
        </div>
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(salon.id);
        }}
        className="p-2 active:scale-90 transition-transform duration-150"
      >
        <Heart
          size={20}
          className={salon.isFavorite ? "fill-destructive text-destructive" : "text-muted-foreground"}
        />
      </button>
    </div>
  );
}

export default SalonSearchPanel;
