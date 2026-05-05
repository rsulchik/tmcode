import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, BookOpen } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { modules as staticModules } from "@/data/lessons";
import { toast } from "sonner";
import type { CustomLesson } from "@/hooks/useLessons";

interface Props {
  customLessons: CustomLesson[];
  onReload: () => void;
}

const emptyLesson: {
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
} = {
  module_id: "",
  module_title: "",
  module_icon: "📚",
  lesson_id: "",
  title: "",
  description: "",
  content: "",
  code: "",
  language: "html",
  sort_order: 0,
};

const AdminLessonEditor = ({ customLessons, onReload }: Props) => {
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyLesson);
  const [saving, setSaving] = useState(false);
  const [moduleType, setModuleType] = useState<"existing" | "new">("existing");

  const openNew = () => {
    setEditId(null);
    setForm({ ...emptyLesson, sort_order: customLessons.length });
    setModuleType("existing");
    setOpen(true);
  };

  const openEdit = (lesson: CustomLesson) => {
    setEditId(lesson.id);
    setForm({
      module_id: lesson.module_id,
      module_title: lesson.module_title,
      module_icon: lesson.module_icon,
      lesson_id: lesson.lesson_id,
      title: lesson.title,
      description: lesson.description,
      content: lesson.content,
      code: lesson.code,
      language: lesson.language,
      sort_order: lesson.sort_order,
    });
    const isStatic = staticModules.some(m => m.id === lesson.module_id);
    setModuleType(isStatic ? "existing" : "new");
    setOpen(true);
  };

  const handleSave = async () => {
    if (!form.title || !form.module_id || !form.lesson_id) {
      toast.error("Ady, modul ID we sapak ID gerekli");
      return;
    }

    setSaving(true);

    if (editId) {
      const { error } = await supabase
        .from("custom_lessons")
        .update({
          module_id: form.module_id,
          module_title: form.module_title,
          module_icon: form.module_icon,
          lesson_id: form.lesson_id,
          title: form.title,
          description: form.description,
          content: form.content,
          code: form.code,
          language: form.language,
          sort_order: form.sort_order,
        })
        .eq("id", editId);

      if (error) {
        toast.error("Ýalňyşlyk: " + error.message);
      } else {
        toast.success("Sapak üýtgedildi");
        setOpen(false);
        onReload();
      }
    } else {
      const { error } = await supabase.from("custom_lessons").insert({
        module_id: form.module_id,
        module_title: form.module_title,
        module_icon: form.module_icon,
        lesson_id: form.lesson_id,
        title: form.title,
        description: form.description,
        content: form.content,
        code: form.code,
        language: form.language,
        sort_order: form.sort_order,
      });

      if (error) {
        toast.error("Ýalňyşlyk: " + error.message);
      } else {
        toast.success("Sapak goşuldy");
        setOpen(false);
        onReload();
      }
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("custom_lessons").delete().eq("id", id);
    if (error) {
      toast.error("Ýalňyşlyk: " + error.message);
    } else {
      toast.success("Sapak aýyryldy");
      onReload();
    }
  };

  const setField = (key: string, value: string | number) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          Sapaklar ({customLessons.length})
        </CardTitle>
        <Button size="sm" onClick={openNew} className="gap-1">
          <Plus className="h-4 w-4" />
          Sapak goş
        </Button>
      </CardHeader>
      <CardContent>
        {customLessons.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            Heniz goşulan sapak ýok. "Sapak goş" düwmesine basyň.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ady</TableHead>
                <TableHead>Modul</TableHead>
                <TableHead>Dil</TableHead>
                <TableHead>Tertip</TableHead>
                <TableHead className="text-right">Amallar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customLessons.map((lesson) => (
                <TableRow key={lesson.id}>
                  <TableCell className="font-medium">{lesson.title}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs">
                      {lesson.module_icon} {lesson.module_title || lesson.module_id}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">{lesson.language}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {lesson.sort_order}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      <Button size="sm" variant="ghost" onClick={() => openEdit(lesson)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDelete(lesson.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editId ? "Sapak üýtget" : "Täze sapak goş"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Module selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Modul görnüşi</label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant={moduleType === "existing" ? "default" : "outline"}
                  onClick={() => setModuleType("existing")}
                >
                  Bar bolan modul
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={moduleType === "new" ? "default" : "outline"}
                  onClick={() => setModuleType("new")}
                >
                  Täze modul
                </Button>
              </div>
            </div>

            {moduleType === "existing" ? (
              <div className="space-y-2">
                <label className="text-sm font-medium">Modul</label>
                <Select
                  value={form.module_id}
                  onValueChange={(v) => {
                    const mod = staticModules.find(m => m.id === v);
                    setField("module_id", v);
                    if (mod) {
                      setField("module_title", mod.title);
                      setField("module_icon", mod.icon);
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Modul saýlaň" />
                  </SelectTrigger>
                  <SelectContent>
                    {staticModules.map(m => (
                      <SelectItem key={m.id} value={m.id}>
                        {m.icon} {m.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Modul ID</label>
                  <Input
                    placeholder="react"
                    value={form.module_id}
                    onChange={e => setField("module_id", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Modul ady</label>
                  <Input
                    placeholder="React Esaslary"
                    value={form.module_title}
                    onChange={e => setField("module_title", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Ikona</label>
                  <Input
                    placeholder="⚛️"
                    value={form.module_icon}
                    onChange={e => setField("module_icon", e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Sapak ID</label>
                <Input
                  placeholder="react-1"
                  value={form.lesson_id}
                  onChange={e => setField("lesson_id", e.target.value)}
                  disabled={!!editId}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Dil</label>
                <Select value={form.language} onValueChange={v => setField("language", v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="html">HTML</SelectItem>
                    <SelectItem value="css">CSS</SelectItem>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Ady</label>
              <Input
                placeholder="Sapak ady"
                value={form.title}
                onChange={e => setField("title", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Düşündiriş</label>
              <Input
                placeholder="Gysga düşündiriş"
                value={form.description}
                onChange={e => setField("description", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Teoriýa (Markdown)</label>
              <Textarea
                placeholder={"# Sözbaşy\n\nTeoriýa teksti..."}
                value={form.content}
                onChange={e => setField("content", e.target.value)}
                className="min-h-[150px] font-mono text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Başlangyç kod</label>
              <Textarea
                placeholder="Kodlary şu ýere ýazyň..."
                value={form.code}
                onChange={e => setField("code", e.target.value)}
                className="min-h-[150px] font-mono text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Tertip belgisi</label>
              <Input
                type="number"
                value={form.sort_order}
                onChange={e => setField("sort_order", parseInt(e.target.value) || 0)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Ýatyr</Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Saklanýar..." : editId ? "Üýtget" : "Goş"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default AdminLessonEditor;
