import moment from 'moment';
import filiesData from './mockFilies';

// Classification asop by cars (main page compare)
const getCountWorkClassification = ({ data, datetime }) => {
  // Result classifications count
  const resultCount = {
    allOk: 0,
    noConnectEquip: 0,
    someError: 0,
    closed: 0,
  };
  // Array with cars
  const carsNum = [];

  // Each by filies
  for (const [_, value] of Object.entries(data)) {
    const currentFilial = value;
    const fixedDateTime = moment(datetime);

    // Each by filies cars
    // eslint-disable-next-line array-callback-return
    currentFilial.map((car) => {
      // Check if not two formulars on one car
      if (!carsNum.includes(car.PENumPe)) {
        carsNum.push(car.PENumPe);

        // If data from equip not updated more than 1 hour
        if (fixedDateTime >= moment(car.obtime).add(1, 'hours')) {
          resultCount.noConnectEquip += 1;
        } else {
          const timeValidation = car.validation.includes('T') ? moment(car.validation) : moment(`${moment(fixedDateTime).format('YYYY-MM-DD')} ${car.validation}`);

          // If time validation not correct or not found
          if (timeValidation.isValid()) {
            const timeValidationDiff = moment.duration(timeValidation.diff(fixedDateTime)).asHours();

            // If one or more DV_OK and validation time < 1 hour by date parsing
            if (car.info.includes('DV_OK') && timeValidationDiff > -1) {
              resultCount.allOk += 1;
              // if car not include one DV_OK or not validations on this day
            } else if (!car.info.includes('DV_OK') || timeValidation < moment(`${moment(fixedDateTime).format('YYYY-MM-DD')} 04:00:00`)) {
              resultCount.closed += 1;
            } else {
              resultCount.someError += 1;
            }
          } else {
            resultCount.closed += 1;
          }
        }
      }
    });
  }

  return resultCount;
};

// Classification asop by cars (compare on fillies)
const getCountWorkClassificationEachFillial = ({ data, datetime }) => {
  // Result classifications count
  const resultCountArr = [];
  // Array with cars
  const carsNum = [];

  const resultCountGlobal = {
    allCount: 0,
    allOk: 0,
    someError: 0,
    closed: 0,
    noConnectEquip: 0,
  };

  // Each by filies
  for (const [key, value] of Object.entries(data)) {
    const resultCount = {
      allCount: 0,
      allOk: 0,
      someError: 0,
      closed: 0,
      noConnectEquip: 0,
    };
    const currentFilial = value;
    const fixedDateTime = moment(datetime);

    // Each by filies cars
    // eslint-disable-next-line array-callback-return
    currentFilial.map((car) => {
      // Check if not two formulars on one car
      if (!carsNum.includes(car.PENumPe)) {
        carsNum.push(car.PENumPe);

        // If data from equip not updated more than 1 hour
        if (fixedDateTime >= moment(car.obtime).add(1, 'hours')) {
          resultCount.noConnectEquip += 1;
          resultCountGlobal.noConnectEquip += 1;
        } else {
          const timeValidation = car.validation.includes('T') ? moment(car.validation) : moment(`${moment(fixedDateTime).format('YYYY-MM-DD')} ${car.validation}`);

          // If time validation not correct or not found
          if (timeValidation.isValid()) {
            const timeValidationDiff = moment.duration(timeValidation.diff(fixedDateTime)).asHours();

            // If one or more DV_OK and validation time < 1 hour by date parsing
            if (car.info.includes('DV_OK') && timeValidationDiff > -1) {
              resultCount.allOk += 1;
              resultCountGlobal.allOk += 1;
              // if car not include one DV_OK or not validations on this day
            } else if (!car.info.includes('DV_OK') || timeValidation < moment(`${moment(fixedDateTime).format('YYYY-MM-DD')} 04:00:00`)) {
              resultCount.closed += 1;
              resultCountGlobal.closed += 1;
            } else {
              resultCount.someError += 1;
              resultCountGlobal.someError += 1;
            }
          } else {
            resultCount.closed += 1;
            resultCountGlobal.closed += 1;
          }
        }
      }
    });
    const fillName = filiesData.find((cur) => cur.asdu_id === key);
    resultCount.allCount = resultCount.allOk + resultCount.closed + resultCount.someError + resultCount.noConnectEquip;
    resultCountGlobal.allCount += resultCount.allCount;
    resultCountArr.push({ filial: fillName.name, filialID: key, data: resultCount });
  }

  resultCountArr.push({ filial: '—', filialID: '0', data: resultCountGlobal });

  return resultCountArr;
};

// This logic just like (compare on fillies), but result responded car nums array  (not count)
const getCountWorkClassificationEachFillialForAlarm = ({ data, datetime }) => {
  // Result classifications count
  const resultCountArr = [];
  // Array with cars
  const carsNum = [];

  // Each by filies
  for (const [key, value] of Object.entries(data)) {
    const resultCount = {
      someError: [],
      closed: [],
      noConnectEquip: [],
    };
    const currentFilial = value;
    const fixedDateTime = moment(datetime);

    // Each by filies cars
    // eslint-disable-next-line array-callback-return
    currentFilial.map((car) => {
      // Check if not two formulars on one car
      if (!carsNum.includes(car.PENumPe)) {
        carsNum.push(car.PENumPe);

        // If data from equip not updated more than 1 hour
        if (fixedDateTime >= moment(car.obtime).add(1, 'hours')) {
          resultCount.noConnectEquip.push(car.PENumPe);
        } else {
          const timeValidation = car.validation.includes('T') ? moment(car.validation) : moment(`${moment(fixedDateTime).format('YYYY-MM-DD')} ${car.validation}`);

          // If time validation not correct or not found
          if (timeValidation.isValid()) {
            const timeValidationDiff = moment.duration(timeValidation.diff(fixedDateTime)).asHours();

            // If one or more DV_OK and validation time < 1 hour by date parsing
            if (car.info.includes('DV_OK') && timeValidationDiff > -1) {
              // if car not include one DV_OK or not validations on this day
            } else if (!car.info.includes('DV_OK') || timeValidation < moment(`${moment(fixedDateTime).format('YYYY-MM-DD')} 04:00:00`)) {
              resultCount.closed.push(car.PENumPe);
            } else {
              resultCount.someError.push(car.PENumPe);
            }
          } else {
            resultCount.closed.push(car.PENumPe);
          }
        }
      }
    });
    const fillName = filiesData.find((cur) => cur.asdu_id === key);
    resultCountArr.push({
      filial: fillName.name, filialID: key, ...resultCount, datetime,
    });
  }

  return resultCountArr;
};

// Classification asop by routes (compare on fillies inner table)
const getCountWorkClassificationEachRoute = ({ data, datetime }) => {
  // Result classifications count
  const resultCount = {};
  // Array with cars
  const carsNum = [];

  const fixedDateTime = moment(datetime);

  // Each by filies cars
  // eslint-disable-next-line array-callback-return
  data.map((car) => {
    // Check if not two formulars on one car
    if (!carsNum.includes(car.PENumPe)) {
      carsNum.push(car.PENumPe);

      if (!(car.marNum in resultCount)) {
        resultCount[car.marNum] = {
          allOk: [],
          someError: [],
          closed: [],
          noConnectEquip: [],
        };
      }

      // If data from equip not updated more than 1 hour
      if (fixedDateTime >= moment(car.obtime).add(1, 'hours')) {
        resultCount[car.marNum].noConnectEquip.push(car.PENumPe);
      } else {
        const timeValidation = car.validation.includes('T') ? moment(car.validation) : moment(`${moment(fixedDateTime).format('YYYY-MM-DD')} ${car.validation}`);

        // If time validation not correct or not found
        if (timeValidation.isValid()) {
          const timeValidationDiff = moment.duration(timeValidation.diff(fixedDateTime)).asHours();

          // If one or more DV_OK and validation time < 1 hour by date parsing
          if (car.info.includes('DV_OK') && timeValidationDiff > -1) {
            resultCount[car.marNum].allOk.push(car.PENumPe);
            // if car not include one DV_OK or not validations on this day
          } else if (!car.info.includes('DV_OK') || timeValidation < moment(`${moment(fixedDateTime).format('YYYY-MM-DD')} 04:00:00`)) {
            resultCount[car.marNum].closed.push(car.PENumPe);
          } else {
            resultCount[car.marNum].someError.push(car.PENumPe);
          }
        } else {
          resultCount[car.marNum].closed.push(car.PENumPe);
        }
      }
    }
  });

  return resultCount;
};

module.exports = {
  getCountWorkClassification,
  getCountWorkClassificationEachFillial,
  getCountWorkClassificationEachRoute,
  getCountWorkClassificationEachFillialForAlarm,
};
