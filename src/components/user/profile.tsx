/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import Sheet from 'react-modal-sheet';

interface EditSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: unknown) => void;
  initialData: any;
  fields: {
    name: string;
    type: string;
    placeholder?: string;
  }[];
}

const EditSheet: React.FC<EditSheetProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  fields,
}) => {
  const [editedData, setEditedData] = useState(initialData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedData((prevState: any) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedData);
    onClose();
  };

  return (
    <Sheet isOpen={isOpen} onClose={onClose}>
      <Sheet.Container>
        <Sheet.Content>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Edit Information</h2>
            <form onSubmit={handleSubmit}>
              {fields.map((field) => (
                <div key={field.name} className="mb-4">
                  <label htmlFor={field.name} className="block text-gray-700">
                    {field.name.charAt(0).toUpperCase() + field.name.slice(1)}:
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={editedData[field.name]}
                    onChange={handleInputChange}
                    placeholder={field.placeholder || ''}
                    className="w-full border-gray-300 rounded-md p-2 mt-1"
                  />
                </div>
              ))}
              <div className="flex justify-end mt-4">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2">
                  Save
                </button>
                <button
                  onClick={onClose}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
};

export default EditSheet;