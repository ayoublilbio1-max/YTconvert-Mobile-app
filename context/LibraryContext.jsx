import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MOCK_HISTORY } from "../constants/mockHistory";

const FAVORITES_STORAGE_KEY = "ytmp3:favorites";

const LibraryContext = createContext(null);

export function LibraryProvider({ children }) {
  const [history, setHistory] = useState(MOCK_HISTORY);
  const [favorites, setFavorites] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
        if (stored) setFavorites(JSON.parse(stored));
      } catch (e) {
        // ignore read errors — app just starts with empty favorites
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify(favorites),
    ).catch(() => {});
  }, [favorites, loaded]);

  const isFavorite = useCallback(
    (id) => favorites.some((item) => item.id === id),
    [favorites],
  );

  const addToFavorites = useCallback((item) => {
    setFavorites((prev) =>
      prev.some((f) => f.id === item.id) ? prev : [item, ...prev],
    );
  }, []);

  const removeFromFavorites = useCallback((id) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const removeManyFromFavorites = useCallback((ids) => {
    setFavorites((prev) => prev.filter((item) => !ids.includes(item.id)));
  }, []);

  const toggleFavorite = useCallback(
    (item) => {
      if (isFavorite(item.id)) {
        removeFromFavorites(item.id);
        return false;
      }
      addToFavorites(item);
      return true;
    },
    [isFavorite, addToFavorites, removeFromFavorites],
  );

  const addToHistory = useCallback((item) => {
    setHistory((prev) => [item, ...prev]);
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const showSnackbar = useCallback((message) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  }, []);

  const hideSnackbar = useCallback(() => setSnackbarVisible(false), []);

  return (
    <LibraryContext.Provider
      value={{
        history,
        favorites,
        isFavorite,
        addToFavorites,
        removeFromFavorites,
        removeManyFromFavorites,
        toggleFavorite,
        addToHistory,
        clearHistory,
        snackbarVisible,
        snackbarMessage,
        showSnackbar,
        hideSnackbar,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
}

export function useLibrary() {
  const ctx = useContext(LibraryContext);
  if (!ctx) throw new Error("useLibrary must be used within LibraryProvider");
  return ctx;
}
