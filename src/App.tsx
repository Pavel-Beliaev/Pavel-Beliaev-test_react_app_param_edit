import React, { FC, FormEvent, useState } from 'react';
import './App.css';

//моковые данные
const PARAMS: Param[] = [
  {
    id: 1,
    name: 'Назначение',
    type: 'string',
  },
  {
    id: 2,
    name: 'Длина',
    type: 'string',
  },
];

const MODEL = {
  paramValues: [
    {
      paramId: 1,
      value: 'повседневное',
    },
    {
      paramId: 2,
      value: 'макси',
    },
  ],
};

//типизация
interface Param {
  id: number;
  name: string;
  type: 'string';
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Color {
  value: string;
}

interface Model {
  paramValues: ParamValue[];
  colors?: Color[];
}

interface Props {
  params: Param[];
  model: Model;
}

//компонент "Редактор параметров"
const ParamEditor: FC<Props> = ({ params, model }) => {
  const [paramValues, setParamValues] = useState<ParamValue[]>(
    model.paramValues,
  );

  const getModel = (event: FormEvent) => {
    event.preventDefault();
    return { ...model, paramValues };
  };
  const handleValueChange = (newValue: string, paramId: number) => {
    const updatedValues = paramValues.map((val) => {
      if (paramId === val.paramId) {
        return { ...val, value: newValue };
      }
      return val;
    });
    setParamValues(updatedValues);
  };

  return (
    <form className='form' onSubmit={getModel}>
      {params.map((param) => (
        <div key={param.id}>
          <label htmlFor={param.name}>{param.name}:</label>
          <input
            type='text'
            id={param.name}
            name={param.name}
            value={
              paramValues.find((value) => value.paramId === param.id)?.value ||
              ''
            }
            onChange={(event) =>
              handleValueChange(event.target.value, param.id)
            }
          />
        </div>
      ))}
      <button type='submit'>Save</button>
    </form>
  );
};

export const App: FC = () => {
  return (
    <div className='wrapper'>
      <ParamEditor params={PARAMS} model={MODEL} />
    </div>
  );
};
