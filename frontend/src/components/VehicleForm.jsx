import LoadingButton from "./LoadingButton";

export default function VehicleForm({
  form,
  onChange,
  onSubmit,
  buttonText,
  isSubmitting = false,
  submitLoadingText = "Saving...",
}) {
  const inputClassName =
    "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20";

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label htmlFor="make" className="block text-sm font-medium text-slate-700">
          Make
        </label>
        <input
          id="make"
          name="make"
          value={form.make}
          onChange={onChange}
          className={inputClassName}
          required
        />
      </div>

      <div>
        <label htmlFor="model" className="block text-sm font-medium text-slate-700">
          Model
        </label>
        <input
          id="model"
          name="model"
          value={form.model}
          onChange={onChange}
          className={inputClassName}
          required
        />
      </div>

      <div>
        <label htmlFor="year" className="block text-sm font-medium text-slate-700">
          Year
        </label>
        <input
          id="year"
          name="year"
          type="number"
          value={form.year}
          onChange={onChange}
          className={inputClassName}
          required
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-slate-700">
          Category
        </label>
        <input
          id="category"
          name="category"
          value={form.category}
          onChange={onChange}
          className={inputClassName}
          required
        />
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium text-slate-700">
          Price
        </label>
        <input
          id="price"
          name="price"
          type="number"
          value={form.price}
          onChange={onChange}
          className={inputClassName}
          required
        />
      </div>
      <div>
        <label htmlFor="stock" className="block text-sm font-medium text-slate-700">
          Stock
        </label>
        <input
          id="stock"
          name="stock"
          type="number"
          min="0"
          value={form.stock}
          onChange={onChange}
          className={inputClassName}
        />
      </div>

      <LoadingButton
        type="submit"
        isLoading={isSubmitting}
        loadingText={submitLoadingText}
        className="w-full bg-blue-600 text-white shadow-md shadow-blue-600/20 hover:bg-blue-700 focus:ring-blue-500"
      >
        {buttonText}
      </LoadingButton>
    </form>
  );
}