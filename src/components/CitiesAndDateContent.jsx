import React from "react";

function CitiesAndDateContent({
  cities,
  hijriDate,
  gregorianDate,
  onCityChange,
}) {
  return (
    <div className="top-sec">
      <div className="city">
        <h2 className="head">المدينه</h2>

        <select name="" id="" onChange={onCityChange}>
          {cities.map((city) => {
            return (
              <option key={city.name} value={city.name}>
                {city.value}
              </option>
            );
          })}
        </select>
      </div>

      <div className="date">
        <h2>التاريخ</h2>
        <div>
          <h2>{hijriDate}</h2>

          <h2>{gregorianDate}</h2>
        </div>
      </div>
    </div>
  );
}

export default CitiesAndDateContent;
