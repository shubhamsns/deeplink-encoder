import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

function App() {
  const [finalUrl, setFinalUrl] = useState("");
  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: {
      baseUrl: "",
      queryparams: [
        {
          key: "",
          value: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "queryparams",
  });

  const handleFinalSubmit = ({ baseUrl, queryparams }) => {
    const queryObj = {};
    queryparams.forEach(({ key, value }) => {
      queryObj[key] = value;
    });
    const qs = new URLSearchParams(queryObj).toString();
    setFinalUrl(`${baseUrl}?${qs}`);
  };

  return (
    <div>
      <header>Blinkit deeplink encoder</header>
      <div className="container">
        <div>
          <label>{`Base-url : `}</label>
          <input
            placeholder="grofers://"
            required
            {...register("baseUrl", { required: true })}
          />
        </div>

        <form onSubmit={handleSubmit(handleFinalSubmit)}>
          <div className="container">
            {fields.map((item, index) => (
              <div key={item.id}>
                <label>{`key : `}</label>
                <input
                  required
                  {...register(`queryparams.${index}.key`, {
                    required: true,
                  })}
                />

                <label>value:</label>
                <input
                  required
                  {...register(`queryparams.${index}.value`, {
                    required: true,
                  })}
                />

                {fields.length > 1 && (
                  <button type="button" onClick={() => remove(index)}>
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>

          <div>
            <button
              type="button"
              onClick={() => append({ key: "", value: "" })}
            >
              append
            </button>
          </div>

          <div className="container">
            <button type="submit">submit</button>

            <button
              onClick={() => {
                reset();
                setFinalUrl("");
              }}
            >
              reset
            </button>
          </div>
        </form>

        <div
          onClick={() => {
            if (!finalUrl) return;

            navigator.clipboard.writeText(finalUrl).then(() => {
              alert("copied");
            });
          }}
        >
          Final url : {finalUrl}
        </div>
      </div>
    </div>
  );
}

export default App;
