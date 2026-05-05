
-- Table for admin-managed lessons
CREATE TABLE public.custom_lessons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  module_id TEXT NOT NULL,
  module_title TEXT NOT NULL DEFAULT '',
  module_icon TEXT NOT NULL DEFAULT '📚',
  lesson_id TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  code TEXT NOT NULL DEFAULT '',
  language TEXT NOT NULL DEFAULT 'html' CHECK (language IN ('html', 'css', 'javascript')),
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.custom_lessons ENABLE ROW LEVEL SECURITY;

-- Only admins can manage custom lessons
CREATE POLICY "Admins can manage custom lessons" ON public.custom_lessons
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Everyone can read custom lessons
CREATE POLICY "Anyone can read custom lessons" ON public.custom_lessons
  FOR SELECT TO anon, authenticated
  USING (true);

-- Update trigger
CREATE TRIGGER update_custom_lessons_updated_at
  BEFORE UPDATE ON public.custom_lessons
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
