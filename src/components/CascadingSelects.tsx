export const CascadingSelects = (props) => {
  return (
    <>
      <form>
        <div>
          <label>Make</label>
          <select
            name="make"
            hx-get="/example/models"
            hx-target="#models"
            hx-indicator=".htmx-indicator"
          >
            <option value="audi">Audi</option>
            <option value="toyota">Toyota</option>
            <option value="bmw">BMW</option>
          </select>
        </div>
        <div>
          <label>Model</label>
          <select id="models" name="model">
            {props.children}
          </select>
          <img
            class="htmx-indicator"
            width="20"
            src="https://htmx.org/img/bars.svg"
          />
        </div>
      </form>
    </>
  );
};

const Model = {
  audi: ["A1", "A3", "A6"],
  toyota: ["Prius", "Aqua", "LandCruiser"],
  bmw: ["325i", "325ix", "z4"],
};

export const ModelSelect = ({ maker }) => {
  const models = Model[maker] || [];
  return (
    <>
      {models.map((model) => (
        <option key={model} value={model.toLowerCase()}>
          {model}
        </option>
      ))}
    </>
  );
};
