import { ShareCard } from "./ShareCard";
import { Trader } from "@/app/types/trader";
import Image from "next/image";

interface ShareModalProps {
  trader: Trader;
  onClose: () => void;
}

export function ShareModal({ trader, onClose }: ShareModalProps) {
  const handleImageGenerated = async (imageUrl: string) => {
    // Update preview image
    const previewImg = document.getElementById(
      "share-preview"
    ) as HTMLImageElement;
    if (previewImg) {
      previewImg.src = imageUrl;
    }
  };

  const handleDownload = () => {
    const previewImg = document.getElementById(
      "share-preview"
    ) as HTMLImageElement;
    if (!previewImg?.src) return;

    const link = document.createElement("a");
    link.download = `${trader.name
      .toLowerCase()
      .replace(/\s+/g, "-")}-stats.png`;
    link.href = previewImg.src;
    link.click();
  };

  const handleCopy = async () => {
    const previewImg = document.getElementById(
      "share-preview"
    ) as HTMLImageElement;
    if (!previewImg?.src) return;

    try {
      const blob = await fetch(previewImg.src).then((r) => r.blob());
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);
    } catch (err) {
      console.error("Error copying image:", err);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#11121B] rounded-lg max-w-4xl w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-xl font-bold text-white mb-4">
          Share Trader Stats
        </h2>

        {/* Preview */}
        <div className="relative bg-[#1C1C28] rounded-lg p-4 mb-4">
          <div className="relative w-full aspect-[1200/630]">
            <Image
              id="share-preview"
              alt="Share preview"
              fill
              className="rounded-lg object-contain"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
            />
          </div>
          <ShareCard trader={trader} onGenerated={handleImageGenerated} />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <button
            onClick={handleCopy}
            className="px-4 py-2 border border-purple-200 text-purple-200 rounded-lg hover:bg-purple-200 hover:text-black transition-colors"
          >
            Copy Image
          </button>
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
}
