import {
  ChevronDown,
  Bold,
  Italic,
  Strikethrough,
  ListOrdered,
  List,
  Link,
  Smile,
} from "lucide-react";

export function RichTextToolbar() {
  return (
    <div className="flex items-center gap-1 px-3 py-2 border-b border-gray-200 dark:border-gray-700">
      <button type="button" className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-gray-500">
        <span className="text-sm font-medium">T</span>
        <ChevronDown className="w-3 h-3 inline ml-0.5" />
      </button>
      <div className="w-px h-5 bg-gray-200 dark:bg-gray-700 mx-1" />
      <button type="button" className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-gray-500">
        <Bold className="w-4 h-4" />
      </button>
      <button type="button" className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-gray-500">
        <Italic className="w-4 h-4" />
      </button>
      <button type="button" className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-gray-500">
        <Strikethrough className="w-4 h-4" />
      </button>
      <div className="w-px h-5 bg-gray-200 dark:bg-gray-700 mx-1" />
      <button type="button" className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-gray-500">
        <ListOrdered className="w-4 h-4" />
      </button>
      <button type="button" className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-gray-500">
        <List className="w-4 h-4" />
      </button>
      <div className="w-px h-5 bg-gray-200 dark:bg-gray-700 mx-1" />
      <button type="button" className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-gray-500">
        <Link className="w-4 h-4" />
      </button>
      <button type="button" className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-gray-500">
        <Smile className="w-4 h-4" />
      </button>
    </div>
  );
}
