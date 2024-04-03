"use client";

import { toast } from "@/components/ui/use-toast";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { AdminLessonItem } from "./AdminLessonItem";
import { AdminLessonItemType } from "./lessons.query";

type AdminLessonSortableProps = {
  items: AdminLessonItemType[];
};

export const AdminLessonSortable = ({
  items: defaultsItem,
}: AdminLessonSortableProps) => {
  const [items, setItems] = useState(defaultsItem);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  function handleDragEnd(event: DragEvent) {
    const { active, over } = event;
    if (!over) {
      toast.error("something went wrong");
      return;
    }

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map((lesson) => (
          <AdminLessonItem key={lesson.id} lesson={lesson} />
        ))}
      </SortableContext>
    </DndContext>
  );
};
