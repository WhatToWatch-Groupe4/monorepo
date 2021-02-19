import React, { useEffect, useState } from 'react';
import binoculars from '../assets/icons/binoculars.png';
import binocularsPrimary from '../assets/icons/binoculars-primary.png';
import { ViewModel } from '../models/view.model';

function ButtonView() {
  const [enable, setEnable] = useState(true);

  function toggleView(): void {
    setEnable(!enable);
  }

  useEffect(() => {
    fetch(`http://localhost:3000/views/15/test`)
      .then((data) => data.json())
      .then((data) => {
        const test = data as ViewModel;
        console.log(test);
      });
  });

  if (enable) {
    return (
      <button
        className="border-primary border-4 cursor-pointer rounded-xl hover:shadow-xl hover:opacity-90 focus:outline-none"
        onClick={toggleView}
      >
        <img src={binocularsPrimary} alt="logo" className="px-24 py-4 inline w-11/12" />
      </button>
    );
  }

  return (
    <button
      className="bg-primary border-4 border-primary cursor-pointer rounded-xl hover:shadow-xl hover:opacity-90 focus:outline-none"
      onClick={toggleView}
    >
      <img src={binoculars} alt="logo" className="px-24 py-4 inline w-11/12" />
    </button>
  );
}

export default ButtonView;
