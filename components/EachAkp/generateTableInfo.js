export default function generateTableInfo(str) {
  const data2 = str;// время  посылки оборудования

  const parsedData = data2.split('<br>');
  let parsedTime = parsedData[0];
  let parsedStatus = '';
  let parsedTerminal = parsedData[parsedData.length - 2];
  let parsedTerminalStatus = '';
  let tableTerminal = '';
  let tableValidators = "<table ><tr style='text-align: center; background-color: white; border: 1px solid #dddddd; text-align: left; padding: 8px;'><th style='text-align: center; background-color: white; border: 1px solid #dddddd; padding: 8px;'>№</th><th style='text-align: center; background-color: white; border: 1px solid #dddddd; padding: 8px;'>C №</th><th style='text-align: center; background-color: white; border: 1px solid #dddddd; padding: 8px;'>Стан</th></tr>";

  let tableAdditional = '<table>';

  let countValidators = 0;

  if (parsedTime.includes('Час')) {
    parsedTime = parsedTime.split(' - ')[1];
    parsedTime = parsedTime.replace(/T/g, ' ').slice(0, -4);
  }

  if (parsedTerminal.includes('uptime')) {
    parsedTerminal = parsedTerminal.replace(/Термінал водія - driverInterface: /g, '').split(', ');

    if (parsedTerminal.length > 2) {
      const row1 = parsedTerminal[0].split('=');
      const row2 = parsedTerminal[1].split('=');
      const row3 = parsedTerminal[2].split('=');

      tableTerminal = `<table><tr style='text-align: center; background-color: white; border: 1px solid #dddddd; text-align: left; padding: 8px;'><td style='text-align: center; background-color: white; border: 1px solid #dddddd; text-align: left; padding: 8px;'>${row1[0]}</td><td style='text-align: center; background-color: white; border: 1px solid #dddddd; text-align: left; padding: 8px;'>${row1[1]}</td></tr><tr style='text-align: center; background-color: white; border: 1px solid #dddddd; text-align: left; padding: 8px;'><td style='text-align: center; background-color: white; border: 1px solid #dddddd; text-align: left; padding: 8px;'>${row2[0]}</td><td style='text-align: center; background-color: white; border: 1px solid #dddddd; text-align: left; padding: 8px;'>${row2[1]}</td></tr><tr style='text-align: center; background-color: white; border: 1px solid #dddddd; text-align: left; padding: 8px;'><td style='text-align: center; background-color: white; border: 1px solid #dddddd; text-align: left; padding: 8px;'>${row3[0]}</td><td style='text-align: center; background-color: white; border: 1px solid #dddddd; text-align: left; padding: 8px;'>${row3[1]}</td></tr></table>`;
    }

    parsedTerminalStatus = "<b>Термінал водія - </b><font color='green'>ОК</font><br>";
  } else {
    parsedTerminalStatus = "<b>Термінал водія - </b><font color='red'>NO</font><br>";
  }

  for (let i = 2; i < parsedData.length; i++) {
    if (parsedData[i].includes('Валідатор')) { parsedData[i] = parsedData[i].replace(/Валідатор - /g, ''); }

    if (parsedData[i].includes('Контролер:')) {
      let value = parsedData[i].replace('\\', '').replace('-', '');
      value = value.split(/:(.+)/)[1].replaceAll('"', '');

      tableAdditional += `<tr style='text-align: center; background-color: white; border: 1px solid #dddddd; text-align: left; padding: 8px;'><td style='text-align: center; background-color: white; border: 1px solid #dddddd; text-align: left; padding: 8px;'>Контроллер:</td><td style='text-align: center; background-color: white; border: 1px solid #dddddd; '>${value}</td></tr>`;
    }

    if (parsedData[i].includes('Час перевірки контролера:')) {
      let value = parsedData[i].replace('\\', '');
      value = value.split(/:(.+)/)[1].replaceAll('"', '');

      tableAdditional += `<tr style='text-align: center; background-color: white; border: 1px solid #dddddd; text-align: left; padding: 8px;'><td style='text-align: center; background-color: white; border: 1px solid #dddddd; text-align: left; padding: 8px;'>Час перевірки контролера:</td><td style='text-align: center; background-color: white; border: 1px solid #dddddd; '>${value}</td></tr>`;
    }

    if (parsedData[i].includes('Час попередньої зміни контролера:')) {
      let value = parsedData[i].replace('\\', '');
      value = value.split(/:(.+)/)[1].replaceAll('"', '');

      tableAdditional += `<tr style='text-align: center; background-color: white; border: 1px solid #dddddd; text-align: left; padding: 8px;'><td style='text-align: center; background-color: white; border: 1px solid #dddddd; text-align: left; padding: 8px;'>Час попередньої зміни контролера:</td><td style='text-align: center; background-color: white; border: 1px solid #dddddd; '>${value}</td></tr>`;
    }

    if (parsedData[i].includes('Причина зміни:') && i < 20) {
      let value = parsedData[i].replace('\\', '');
      value = value.split(/:(.+)/)[1].replaceAll('"', '');

      tableAdditional += `<tr style='text-align: center; background-color: white; border: 1px solid #dddddd; text-align: left; padding: 8px;'><td style='text-align: center; background-color: white; border: 1px solid #dddddd; text-align: left; padding: 8px;'>Причина зміни:</td><td style='text-align: center; background-color: white; border: 1px solid #dddddd; '>${value}</td></tr>`;
    }

    if (parsedData[i].includes('Час перевірки вестибулю:')) {
      let value = parsedData[i].replace('\\', '');
      value = value.split(/:(.+)/)[1].replaceAll('"', '');

      tableAdditional += `<tr style='text-align: center; background-color: white; border: 1px solid #dddddd; text-align: left; padding: 8px;'><td style='text-align: center; background-color: white; border: 1px solid #dddddd; text-align: left; padding: 8px;'>Час перевірки вестибулю:</td><td style='text-align: center; background-color: white; border: 1px solid #dddddd; '>${value}</td></tr>`;
    }

    if (parsedData[i].includes('Час попередньої зміни вестибулю:')) {
      let value = parsedData[i].replace('\\', '');
      value = value.split(/:(.+)/)[1].split('.')[0].replaceAll('"', '');

      tableAdditional += `<tr style='text-align: center; background-color: white; border: 1px solid #dddddd; text-align: left; padding: 8px;'><td style='text-align: center; background-color: white; border: 1px solid #dddddd; text-align: left; padding: 8px;'>Час попередньої зміни вестибулю:</td><td style='text-align: center; background-color: white; border: 1px solid #dddddd; '>${value}</td></tr>`;
    }

    if (parsedData[i].includes('Причина зміни:') && i > 20) {
      let value = parsedData[i].replace('\\', '');
      value = value.split(/:(.+)/)[1].replaceAll('"', '');

      tableAdditional += `<tr style='text-align: center; background-color: white; border: 1px solid #dddddd; text-align: left; padding: 8px;'><td style='text-align: center; background-color: white; border: 1px solid #dddddd; text-align: left; padding: 8px;'>Причина зміни вестибюлю:</td><td style='text-align: center; background-color: white; border: 1px solid #dddddd; '>${value}</td></tr>`;
    }

    if (parsedData[i].includes('Статус -')) {
      parsedStatus = parsedData[i];
    }

    if (parsedData[i]) {
      if (parsedData[i].split('C№=')[1]) {
        const rowV1 = parsedData[i].split('C№=')[1]?.split('_Стан=')[0];
        const rowV2 = parsedData[i].split('C№=')[1]?.split('_Стан=')[1];

        tableValidators += `<tr style='text-align: center; background-color: white; border: 1px solid #dddddd; text-align: left; padding: 8px;'><td style='text-align: center; background-color: white; border: 1px solid #dddddd; '>${i - 1}</td><td style='text-align: center; background-color: white; border: 1px solid #dddddd; '>${rowV1}</td><td style='text-align: center; background-color: white; border: 1px solid #dddddd; '>${rowV2}</td></tr>`;
        countValidators++;
      }
    }
  }

  if (parsedStatus.includes('Статус')) {
    parsedStatus = parsedStatus.split(' - ')[1].includes('undef') ? "<font color='red'>ERROR</font>" : `<font color='green'>${parsedStatus.split(' - ')[1]}</font>`;
  }

  if (countValidators == 0) { tableValidators = ''; }

  return `<center><b>${
    parsedData[1].replace(/РО/g, 'Location ID')
  }<br>Час - </b>${
    parsedTime
  }<br><b>Статус - </b>${
    parsedStatus
  }<br>${
    tableAdditional
  }</table><br>`
        + `<b>Валідатори</b>${
          tableValidators
        }</table><br>`;
}
