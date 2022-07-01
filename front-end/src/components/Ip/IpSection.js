import React, { useState } from "react";
import axios from "axios";
const geoAPIKey = "at_OL5AP2QeUTdWsdO9rqHUKW91v8NLc";
const ipifiAPI = `https://geo.ipify.org/api/v2/country?apiKey=${geoAPIKey}&ipAddress=`;

const IpSection = (props) => {
  const [ipVal, setIpVal] = useState("8.8.8.8");
  const [error, setError] = useState("");
  const [geoData, setGeoData] = useState({
    ip: "8.8.8.8",
    location: "Califronia, US",
    timeZone: "UTC-07",
    isp: "Google LLC",
  });

  const handleInputChange = (e) => {
    setIpVal(e.target.value);
  };

  const validateIp = (ipVal) => {
    let err = "";
    const ipRegex =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (!ipRegex.test(ipVal)) {
      err = "Enter a valid IP Address";
    }
    setError(err);
    return err;
  };

  const handleFindIpClick = () => {
    const error = validateIp(ipVal);
    if (!error) {
      axios.get(ipifiAPI + ipVal).then((recievedGeoData) =>
        setGeoData({
          ip: recievedGeoData.data["ip"],
          location:
            recievedGeoData.data["location"]["region"] +
            ", " +
            recievedGeoData.data["location"]["country"],
          timeZone: recievedGeoData.data["location"]["timezone"],
          isp: recievedGeoData.data["isp"],
        })
      );
      props.findCoordinates(geoData["location"]);
    }
  };
  return (
    <section className="container-fluid bg-image hero-bg-image">
      <div className="row justify-content-center">
        <div className="col-11 col-md-6">
          <div className="input-group mt-5">
            <input
              type="text"
              id="ip-input-field"
              className="form-control fs-4"
              placeholder="Enter your IP"
              aria-label="Recipient's IP"
              aria-describedby="basic-addon2"
              value={ipVal}
              onChange={handleInputChange}
            />
            <span
              id="ip-input-icon"
              className="input-group-text bg-dark text-white fs-3"
              role="button"
              onClick={handleFindIpClick}
            >
              {">"}
            </span>
          </div>
          {error && (
            <div
              data-testid="errorMsg"
              className="text-danger border rounded mt-1 p-2 bg-white fs-5 width-fit-content"
            >
              {error}
            </div>
          )}
        </div>
      </div>
      <div className="row justify-content-center position-relative vertical-offset">
        <div className="col-10 col-sm-9 p-sm-3 bg-white rounded container-fluid">
          <div className="row text-center">
            <div className="col-12 col-sm-3 p-sm-2 border-end">
              <p className="mb-0 text-muted text-uppercase fw-light">
                IP Address
              </p>
              <p className="data-value fs-4">{geoData["ip"]}</p>
            </div>
            <div className="col-12 col-sm-3 p-sm-2 border-end">
              <p className="mb-0 text-muted text-uppercase fw-light">
                Location
              </p>
              <p className="data-value fs-4">{geoData["location"]}</p>
            </div>

            <div className="col-12 col-sm-3 p-sm-2 border-end">
              <p className="mb-0 text-muted text-uppercase fw-light">
                Timezone
              </p>
              <p className="data-value fs-4">UTC{geoData["timeZone"]}</p>
            </div>

            <div className="col-12 col-sm-3 p-sm-2">
              <p className="mb-0 text-muted text-uppercase fw-light">ISP</p>
              <p className="data-value fs-4">{geoData["isp"]}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IpSection;
