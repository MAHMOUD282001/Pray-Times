import { useEffect, useState } from "react";
import CitiesAndDateContent from "./components/CitiesAndDateContent";
import PrayTimes from "./components/PrayTimes";

function App() {
  let [prayTimes, setPrayTimes] = useState([]);
  let [gregorianDate, setGregorianDate] = useState("");
  let [hijriDate, setHijriDate] = useState("");
  let [city, setCity] = useState("cairo");

  const cities = [
    { name: "Cairo", value: "القاهرة" },
    { name: "Alexandria", value: "الإسكندرية" },
    { name: "Giza", value: "الجيزة" },
    { name: "SharmElSheikh", value: "شرم الشيخ" },
    { name: "Luxor", value: "الأقصر" },
    { name: "Aswan", value: "أسوان" },
    { name: "PortSaid", value: "بور سعيد" },
    { name: "Suez", value: "السويس" },
    { name: "Mansoura", value: "المحلة الكبرى" },
    { name: "Tanta", value: "طنطا" },
    { name: "Ismailia", value: "الإسماعيلية" },
    { name: "Zagazig", value: "الزقازيق" },
    { name: "Damietta", value: "دمياط" },
    { name: "ElMinya", value: "المنيا" },
    { name: "ElMahallaElKubra", value: "المحلة الكبرى" },
    { name: "Dakahelya", value: "الدقهلية" },
  ];

  const prayerTimesData = [
    { name: "الفجر", time: prayTimes.Fajr },
    { name: "الظهر", time: prayTimes.Dhuhr },
    { name: "العصر", time: prayTimes.Asr },
    { name: "المغرب", time: prayTimes.Maghrib },
    { name: "العشاء", time: prayTimes.Isha },
  ];

  useEffect(() => {
    let getPrayTimes = async () => {
      try {
        let response = await fetch(
          `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=egypt&method=2&month=9&year=2024`
        );
        let data = await response.json();
        setPrayTimes(data.data.timings);
        setGregorianDate(data.data.date.gregorian.date);
        setHijriDate(data.data.date.hijri.date);
      } catch (err) {
        console.log(err);
      }
    };

    getPrayTimes();
  }, [city]);

  let handleCityChange = (e) => {
    setCity(e.target.value);
  };

  let formatTime = (time) => {
    if (time === undefined) {
      return "00:00";
    }
    let timeArr = time.split(":");
    let hours = timeArr[0] % 12 || 12;
    let minutes = timeArr[1];
    let amOrPm = hours >= 12 ? "PM" : "AM";
    let formattedTime = `${
      hours < 10 ? "0" + hours : hours
    }:${minutes} ${amOrPm}`;
    return formattedTime;
  };

  return (
    <>
      <section>
        <div className="container">
          <div className="main-content">
            <CitiesAndDateContent
              cities={cities}
              hijriDate={hijriDate}
              gregorianDate={gregorianDate}
              onCityChange={handleCityChange}
            />

            {prayerTimesData?.map((prayerTime) => {
              console.log(prayerTime);
              return (
                <PrayTimes
                  key={prayerTime.name}
                  name={prayerTime.name}
                  time={formatTime(prayerTime.time)}
                />
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
