import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import Modal from "../../Shared/components/Modal";
import Button from "../../Shared/components/Button";

function GenerateEatAdditionalDetailsModal({
  isModalOpen,
  setIsModalOpen,
  onGenerate,
}) {
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    // TEMP: hardcoded return values
    onGenerate(1000, 10, 10);
    setIsModalOpen(false);
  }

  function handleClose(e) {
    setIsModalOpen(false);
  }

  function handleImageChange(e) {
    const file = e.target.files?.[0];

    if (!file) {
      setImageFile(null);
      setImagePreview(null);
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  return (
    <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-lg font-semibold">Generate</h2>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Image</label>

          <div className="flex gap-4 items-start">
            <div>
              <input
                type="file"
                accept="image/*"
                id="image-upload"
                className="hidden"
                onChange={handleImageChange}
              />

              <label
                htmlFor="image-upload"
                className="inline-flex cursor-pointer items-center rounded-md bg-black px-4 py-2 text-sm text-white hover:bg-black/80"
              >
                Choose Image
              </label>

              {imageFile && (
                <p className="mt-1 text-xs text-gray-500">{imageFile.name}</p>
              )}
            </div>
            <div className="ml-auto flex h-28 w-28 items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 text-xs text-gray-400">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-full w-full rounded-md object-cover"
                />
              ) : (
                <span>No image chosen</span>
              )}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <MDEditor
            className="w-full"
            value={description}
            onChange={(val) => setDescription(val)}
          />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button label="Cancel" styleVariant="red" onClick={handleClose} />

          <Button label="Generate" type="submit" styleVariant="green" />
        </div>
      </form>
    </Modal>
  );
}

export default GenerateEatAdditionalDetailsModal;
