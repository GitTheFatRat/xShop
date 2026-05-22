const KEY = "favorites";

export function getFavoriteIds() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function isFavorite(id) {
  return getFavoriteIds().includes(id);
}

export function toggleFavorite(id) {
  const ids = getFavoriteIds();
  const liked = ids.includes(id);
  const next = liked ? ids.filter((x) => x !== id) : [...ids, id];
  localStorage.setItem(KEY, JSON.stringify(next));
  return !liked;
}