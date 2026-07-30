export default function VehicleForm({
  form,
  onChange,
  onSubmit,
  buttonText,
}) {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="make">Make</label>
        <input
          id="make"
          name="make"
          value={form.make}
          onChange={onChange}
        />
      </div>

      <div>
        <label htmlFor="model">Model</label>
        <input
          id="model"
          name="model"
          value={form.model}
          onChange={onChange}
        />
      </div>

      <div>
        <label htmlFor="year">Year</label>
        <input
          id="year"
          name="year"
          value={form.year}
          onChange={onChange}
        />
      </div>

      <div>
        <label htmlFor="category">Category</label>
        <input
          id="category"
          name="category"
          value={form.category}
          onChange={onChange}
        />
      </div>

      <div>
        <label htmlFor="price">Price</label>
        <input
          id="price"
          name="price"
          value={form.price}
          onChange={onChange}
        />
      </div>

      <button type="submit">
        {buttonText}
      </button>
    </form>
  );
}