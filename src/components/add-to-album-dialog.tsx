import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {FolderPlus} from "lucide-react";
import { useState } from "react";
import { SearchResult } from "@/app/gallery/page";
import { addImageToAlbum } from "./action";

export function AddToAlbumDialog({
  image,
  onClose,
}: {
  image: SearchResult;
  onClose: () => void;
}) {
  const [albumName, setAlbumName] = useState("");
  const [open, setOpen] = useState(false);

  

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpenState) => {
        setOpen(newOpenState);
        if (!newOpenState) {
          onClose();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="ghost">
          <div className="flex h-16  justify-between items-center ">
          <FolderPlus className="mr-2 h-6 w-6"/>
            <span>Add to Album</span>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add to Album</DialogTitle>
          <DialogDescription>
            Type an album you want to move this into
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Album
            </Label>
            <Input
              onChange={(e) => setAlbumName(e.currentTarget.value)}
              id="alnum-name"
              value={albumName}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={async () => {
              onClose()
              setOpen(false);
              await addImageToAlbum(image, albumName);
            }}
            type="submit"
          >
            Add to album
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
