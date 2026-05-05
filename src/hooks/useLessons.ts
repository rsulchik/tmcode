import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { modules as staticModules, type Module, type Lesson } from "@/data/lessons";

export interface CustomLesson {
  id: string;
  module_id: string;
  module_title: string;
  module_icon: string;
  lesson_id: string;
  title: string;
  description: string;
  content: string;
  code: string;
  language: "html" | "css" | "javascript";
  sort_order: number;
}

export function useLessons() {
  const [customLessons, setCustomLessons] = useState<CustomLesson[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCustomLessons = useCallback(async () => {
    const { data } = await supabase
      .from("custom_lessons")
      .select("*")
      .order("sort_order", { ascending: true });

    if (data) {
      setCustomLessons(data as unknown as CustomLesson[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadCustomLessons();
  }, [loadCustomLessons]);

  // Merge static + custom lessons into unified modules
  const mergedModules: Module[] = [...staticModules.map(m => ({ ...m, lessons: [...m.lessons] }))];

  // Group custom lessons by module
  const customModuleMap: Record<string, { title: string; icon: string; lessons: Lesson[] }> = {};

  for (const cl of customLessons) {
    const existingModule = mergedModules.find(m => m.id === cl.module_id);
    if (existingModule) {
      // Add to existing module
      existingModule.lessons.push({
        id: cl.lesson_id,
        title: cl.title,
        description: cl.description,
        content: cl.content,
        code: cl.code,
        language: cl.language,
      });
    } else {
      // New custom module
      if (!customModuleMap[cl.module_id]) {
        customModuleMap[cl.module_id] = {
          title: cl.module_title,
          icon: cl.module_icon,
          lessons: [],
        };
      }
      customModuleMap[cl.module_id].lessons.push({
        id: cl.lesson_id,
        title: cl.title,
        description: cl.description,
        content: cl.content,
        code: cl.code,
        language: cl.language,
      });
    }
  }

  // Add custom modules
  for (const [moduleId, mod] of Object.entries(customModuleMap)) {
    mergedModules.push({
      id: moduleId,
      title: mod.title,
      description: `${mod.lessons.length} sapak`,
      icon: mod.icon,
      lessons: mod.lessons,
    });
  }

  return { modules: mergedModules, customLessons, loading, reload: loadCustomLessons };
}
