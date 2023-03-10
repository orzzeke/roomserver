import React, { useState, useEffect } from "react";
import s20230308 from "./s20230308.json";
import s20230315 from "./s20230315.json";
import s20230322 from "./Response0322.json";
import s20230329 from "./Response0329.json";
import titleData0308 from "./ResponseLiftHeader0308.json";
import moment from "moment/moment";
import "rsuite/dist/rsuite.min.css";

const Homepage = () => {
  let holiday = [];
  const [mouseSeat, setMouseSeat] = useState([null, null, null]);
  const [formView, setFormView] = useState(false);
  const [jsonData, setJsonData] = useState(s20230308);
  const [datevalue, setDateValue] = useState();
  const [titleData, setTitleData] = useState(titleData0308);
  const [showDataView, setShowDataView] = useState("rates");
  const [roomType, setRoomType] = useState("");
  const [multiplyPrice, setMultiplyPrice] = useState(() => {
    const row = [];
    jsonData.list.data.map((res) => {
      const coul = [];
      res.map((respone) => coul.push("1"));
      row.push(coul);
    });
    return row;
  });
  const [addPrice, setAddPrice] = useState(() => {
    const row = [];
    jsonData.list.data.map((res) => {
      const coul = [];
      res.map((respone) => coul.push("0"));
      row.push(coul);
    });
    return row;
  });

  function changeMultiply(e, a, b) {
    let temp = [...multiplyPrice];
    temp[a][b] = e.target.value;
    setMultiplyPrice(temp);
  }
  function changeAdd(e, a, b) {
    let temp = [...addPrice];
    temp[a][b] = e.target.value;
    setAddPrice(temp);
  }

  function mathButton(aIndex, bIndex) {
    let price = jsonData.list.data[aIndex][bIndex][0][0][showDataView];
    let temp = JSON.parse(JSON.stringify(jsonData));
    temp.list.data[aIndex][bIndex].map((response) => {
      response[0][showDataView] =
        Number(price) * Number(multiplyPrice[aIndex][bIndex]) +
        Number(addPrice[aIndex][bIndex]);
    });
    setJsonData(temp);
  }

  function changeInputData(e, a, b, c) {
    let temp = JSON.parse(JSON.stringify(jsonData));
    temp.list.data[a][b][c][0][showDataView] = e.target.value;
    setJsonData(temp);
  }
  jsonData.list.inventory[0].forEach((date, index) => {
    if (
      moment(date.date).format("d") === "6" ||
      moment(date.date).format("d") === "0"
    ) {
      holiday.push(index);
    }
  });

  function changeDate(e) {
    const catchDate = moment(e.target.value).format("YYYYMMDD");
    const num = "20230308,20230315,20230322,20230329";
    if (!num.includes(catchDate)) {
      alert("超出資料範圍");
    } else {
      setDateValue(catchDate);
      checkedData(catchDate);
    }
  }
  function SubtractDateBut(i) {
    let num = "";
    if (datevalue < 20230309) {
      alert("超出資料範圍");
    } else {
      num = Number(datevalue) - i * 7;
      if (localStorage.getItem(`countryItem${num}`)) {
        let getData = localStorage.getItem(`countryItem${num}`);
        let getDataAry = JSON.parse(getData);
        setJsonData(getDataAry);
      } else {
        checkedData(num);
      }
    }
    setDateValue(num);
  }

  function addDateBut(i) {
    let num = "";
    if (datevalue > 20230328) {
      alert("超出資料範圍");
    } else {
      num = Number(datevalue) + i * 7;
      if (localStorage.getItem(`countryItem${num}`)) {
        let getData = localStorage.getItem(`countryItem${num}`);
        let getDataAry = JSON.parse(getData);
        setJsonData(getDataAry);
      } else {
        checkedData(num);
      }
    }
    setDateValue(num);
  }
  function checkedData(date) {
    const jsond = {
      20230308: s20230308,
      20230315: s20230315,
      20230322: s20230322,
      20230329: s20230329,
    };
    setJsonData(jsond[date]);
  }
  useEffect(() => {
    setDateValue(moment(jsonData.list.inventory[0][0].date).format("YYYYMMDD"));
  }, [datevalue]);

  function cleanButton() {
    if (localStorage.getItem(`countryItem${datevalue}`)) {
      let getData = localStorage.getItem(`countryItem${datevalue}`);
      let getDataAry = JSON.parse(getData);
      setJsonData(getDataAry);
    } else {
      checkedData(datevalue);
    }
  }

  function submitButton() {
    let countryString = JSON.stringify(jsonData);
    localStorage.setItem(`countryItem${datevalue}`, countryString);
  }

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem(`countryItem20230308`));
    if (items) {
      setJsonData(items);
    } else {
      setJsonData(s20230308);
    }
  }, []);

  return (
    <div className="wrap">
      <div>
        <select
          className="select"
          defaultValue="--select--"
          onChange={(e) => setShowDataView(e.target.value)}
        >
          <option
            disabled="disabled"
            defaultValue="--select--"
            style={{ backgroundColor: "	#E0E0E0" }}
          >
            --select--
          </option>
          <option value="rates">rates</option>
          <option value="extraadult">extraadult</option>
          <option value="extrachild">extrachild</option>
          <option value="minnights">minnight</option>
          <option value="stopsell">stopsell</option>
        </select>
        <select
          className="select"
          defaultValue="--select roomtpye--"
          onChange={(e) => setRoomType(e.target.value)}
        >
          <option style={{ backgroundColor: "#E0E0E0" }} disabled="disabled">
            --select roomtpye--
          </option>
          <option value="">ALL</option>
          <option value="Deluxe Standard Twin">Deluxe Standard Twin</option>
          <option value="Luxury Room">Luxury Room</option>
          <option value="Superior Family">Superior Family</option>
          <option value="Superior Queen">Superior Queen</option>
          <option value="test">test</option>
        </select>
        <button type="button" className="btn" onClick={cleanButton}>
          清除
        </button>
        <button type="button" className="btn" onClick={submitButton}>
          save
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <td style={{ width: "20%" }}>
              <button onClick={() => SubtractDateBut(2)} type="button">
                <img
                  alt="changePage"
                  src="https://img.icons8.com/dusk/28/null/circled-chevron-left.png"
                />
              </button>
              <button onClick={() => SubtractDateBut(1)} type="button">
                <img
                  alt="changePage"
                  src="https://img.icons8.com/office/28/null/circled-chevron-left.png"
                />
              </button>
              <input
                style={{ width: "120px" }}
                type="date"
                onChange={(e) => changeDate(e)}
                value={jsonData.list.inventory[0][0].date}
              ></input>
              <button onClick={() => addDateBut(1)} type="button">
                <img
                  alt="changePage"
                  src="https://img.icons8.com/office/28/null/circled-chevron-right.png"
                />
              </button>
              <button onClick={() => addDateBut(2)} type="button">
                <img
                  alt="changePage"
                  src="https://img.icons8.com/dusk/28/null/circled-chevron-right.png"
                />
              </button>
            </td>

            {jsonData.list.inventory[0].map((date, hIndex) => (
              <td
                key={hIndex}
                className={`
                ${holiday.includes(hIndex) ? "holidayBaccColor" : ""}
                ${hIndex === mouseSeat[2] ? "baccBlue" : ""}
                `}
              >
                <p>{moment(date.date).format("ddd")}</p>
                <p>{moment(date.date).format("D")}</p>
                <p>{moment(date.date).format("MMM ")}</p>
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {jsonData.list.data.map((respones, aIndex) => (
            <>
              <tr
                id={"s" + aIndex + 1}
                className={`${
                  titleData.list[aIndex].roomtype === roomType ||
                  roomType === ""
                    ? ""
                    : "hide"
                }`}
              >
                <th className={`textleft  `}>
                  <p className="inline">{titleData.list[aIndex].roomtype}</p>
                  <button
                    style={{ backgroundColor: "white", border: "none" }}
                    className="iconbtn"
                    type="button"
                    onClick={() => setFormView(!formView)}
                  >
                    <img
                      alt="icon"
                      src="https://img.icons8.com/ios/50/null/formula-fx.png"
                      width={"20px"}
                    ></img>
                  </button>
                </th>
                {jsonData.list.inventory[aIndex].map((uaData, bIndex) => (
                  <th
                    key={uaData.date}
                    className={`textRed 
                    ${holiday.includes(bIndex) ? "holidayBaccColor" : ""}`}
                  >
                    {uaData.aval}
                  </th>
                ))}
              </tr>
              {respones.map((respones, bIndex) => (
                <tr
                  className={`${
                    titleData.list[aIndex].roomtype === roomType ||
                    roomType === ""
                      ? ""
                      : "hide"
                  }`}
                >
                  <td
                    className={`
                  ${
                    aIndex === mouseSeat[0] && bIndex === mouseSeat[1]
                      ? "baccBlue"
                      : ""
                  }
                  `}
                  >
                    <p className="textleft">
                      {titleData.list[aIndex].ratedata[bIndex].display_name}
                    </p>
                    {formView && (
                      <form className="textright">
                        x{" "}
                        <input
                          defaultValue={1}
                          className="titleInput"
                          onChange={(e) => changeMultiply(e, aIndex, bIndex)}
                        ></input>{" "}
                        +{" "}
                        <input
                          defaultValue={0}
                          className="titleInput"
                          onChange={(e) => changeAdd(e, aIndex, bIndex)}
                        ></input>
                        <button
                          onClick={() => mathButton(aIndex, bIndex)}
                          type="button"
                          style={{ backgroundColor: "white", border: "none" }}
                        >
                          <img
                            alt="icon"
                            src="https://img.icons8.com/small/16/000000/go.png"
                          />
                        </button>
                      </form>
                    )}
                  </td>
                  {respones.map((inputData, cIndex) => (
                    <td
                      style={{ position: "relative" }}
                      onMouseEnter={() =>
                        setMouseSeat([aIndex, bIndex, cIndex])
                      }
                      onMouseLeave={() => setMouseSeat([null, null, null])}
                      className={`${
                        holiday.includes(cIndex) ? "holidayBaccColor" : ""
                      }`}
                    >
                      {showDataView !== "stopsell" ? (
                        <input
                          className="tdInput"
                          onChange={(e) =>
                            changeInputData(e, aIndex, bIndex, cIndex)
                          }
                          value={
                            inputData[0][showDataView] < "1"
                              ? ""
                              : inputData[0][showDataView]
                          }
                        ></input>
                      ) : (
                        <img
                          alt="sell"
                          src={
                            inputData[0][showDataView] === "1"
                              ? "https://img.icons8.com/office/30/null/checked--v1.png"
                              : "https://img.icons8.com/office/30/null/x-coordinate.png"
                          }
                        />
                      )}
                      <div
                        className="imgDiv"
                        style={{
                          position: "absolute",
                          bottom: "0",
                          right: "0",
                        }}
                      >
                        {inputData[0].stopsell === "1" && (
                          <img
                            alt="stop sell"
                            src="https://img.icons8.com/office/8/null/100-percents.png"
                            title="Stop Sell"
                          />
                        )}
                        {inputData[0].minnights === "2" && (
                          <img
                            alt="min nught"
                            src="https://img.icons8.com/ultraviolet/8/null/100-percents.png"
                            title="Min night: 2"
                          />
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Homepage;
