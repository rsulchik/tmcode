import { useState, useCallback, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const STORAGE_KEY = "turkmencode-progress";

export interface ProgressData {
  completedLessons: string[];
}

function loadLocal(): ProgressData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { completedLessons: [] };
}

function saveLocal(data: ProgressData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function useProgress() {
  const { user } = useAuth();
  const [data, setData] = useState<ProgressData>(loadLocal);
  const [synced, setSynced] = useState(false);

  // Load progress from DB when user logs in
  useEffect(() => {
    if (!user) {
      setSynced(false);
      return;
    }

    const loadFromDb = async () => {
      const { data: rows } = await supabase
        .from("user_progress")
        .select("lesson_id")
        .eq("user_id", user.id);

      if (rows) {
        const dbLessons = rows.map((r: any) => r.lesson_id);
        // Merge local + DB
        const localData = loadLocal();
        const merged = Array.from(new Set([...dbLessons, ...localData.completedLessons]));

        // Sync any local-only lessons to DB
        const localOnly = localData.completedLessons.filter((id) => !dbLessons.includes(id));
        if (localOnly.length > 0) {
          const inserts = localOnly.map((lesson_id) => ({
            user_id: user.id,
            lesson_id,
          }));
          await supabase.from("user_progress").insert(inserts);
        }

        const newData = { completedLessons: merged };
        setData(newData);
        saveLocal(newData);
        setSynced(true);
      }
    };

    loadFromDb();
  }, [user]);

  const isCompleted = useCallback(
    (lessonId: string) => data.completedLessons.includes(lessonId),
    [data]
  );

  const markComplete = useCallback(
    async (lessonId: string) => {
      setData((prev) => {
        if (prev.completedLessons.includes(lessonId)) return prev;
        const next = { completedLessons: [...prev.completedLessons, lessonId] };
        saveLocal(next);
        return next;
      });

      if (user) {
        await supabase.from("user_progress").insert({
          user_id: user.id,
          lesson_id: lessonId,
        });
      }
    },
    [user]
  );

  const getModuleProgress = useCallback(
    (lessonIds: string[]) => {
      const done = lessonIds.filter((id) => data.completedLessons.includes(id)).length;
      return {
        done,
        total: lessonIds.length,
        percent: lessonIds.length ? Math.round((done / lessonIds.length) * 100) : 0,
      };
    },
    [data]
  );

  const totalCompleted = data.completedLessons.length;

  return { isCompleted, markComplete, getModuleProgress, totalCompleted };
}
