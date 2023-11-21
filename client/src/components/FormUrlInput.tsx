import React from "react";

interface Props {
  carImageUrl: string;
  setCarImageUrl: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: { preventDefault: () => void }) => Promise<void>;
  showPreview: boolean;
}

const FormUrlInput = (props: Props) => {
  const { carImageUrl, setCarImageUrl, handleSubmit, showPreview } = props;
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center space-y-3"
    >
      <div className="text-xl font-semibold">Car Image URL:</div>

      <input
        className="bg-gray-300 w-96 h-10 px-5 pr-16 rounded-lg text-md focus:outline-none"
        type="text"
        value={carImageUrl}
        onChange={(e) => setCarImageUrl(e.target.value)}
        required
      />
      {carImageUrl && showPreview && (
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-lg font-semibold">Selected Photo Preview</h2>
          <img
            className="rounded-lg shadow-md shadow-slate-600 w-full h-72 object-cover "
            src={carImageUrl}
            alt="Selected"
            style={{ maxWidth: "100%", maxHeight: "300px" }}
          />
        </div>
      )}

      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default FormUrlInput;
