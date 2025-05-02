import React from "react";
import { TimelineEntry } from "@shared/schema";
import { Icons } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface TimelineEditorProps {
  entry: TimelineEntry;
  onEdit: (entry: TimelineEntry) => void;
  onDelete: (id: number) => void;
  isSelected: boolean;
}

const TimelineEditor: React.FC<TimelineEditorProps> = ({ 
  entry, 
  onEdit, 
  onDelete,
  isSelected
}) => {
  return (
    <Card className={`${isSelected ? 'ring-2 ring-primary' : ''}`}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center">
              <span className="bg-secondary text-white px-2 py-1 rounded text-xs font-semibold mr-2">
                {entry.year}
              </span>
              <h3 className="font-semibold truncate">{entry.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {entry.description}
            </p>
          </div>
          <div className="flex space-x-1 ml-2">
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => onEdit(entry)}
              className="h-8 w-8 p-0"
            >
              <Icons.Edit className="h-4 w-4" />
              <span className="sr-only">Editar</span>
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => onDelete(entry.id)}
              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
            >
              <Icons.Trash className="h-4 w-4" />
              <span className="sr-only">Excluir</span>
            </Button>
          </div>
        </div>
        
        {entry.imageUrl && (
          <div className="mt-2 relative h-16 w-full overflow-hidden rounded">
            <img 
              src={entry.imageUrl} 
              alt={entry.title} 
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TimelineEditor;
