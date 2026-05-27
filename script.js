function addRow() {
  const table = document.getElementById("inputTable");
  const row = table.insertRow();

  row.innerHTML = `
    <td><input placeholder="任務名稱"></td>
    <td><input type="number" placeholder="加工時間"></td>
    <td><input type="number" placeholder="交期"></td>
  `;
}

function scheduleEDD() {
  const table = document.getElementById("inputTable");
  const rows = Array.from(table.rows).slice(1);

  let jobs = rows.map(row => {
    return {
      name: row.cells[0].querySelector("input").value,
      processingTime: Number(row.cells[1].querySelector("input").value),
      dueDate: Number(row.cells[2].querySelector("input").value)
    };
  });

  jobs.sort((a, b) => a.dueDate - b.dueDate);

  let currentTime = 0;
  let resultHTML = `
    <tr>
      <th>排序</th>
      <th>任務</th>
      <th>加工時間</th>
      <th>交期</th>
      <th>完工時間</th>
      <th>延遲時間</th>
    </tr>
  `;

  jobs.forEach((job, index) => {
    currentTime += job.processingTime;
    const tardiness = Math.max(0, currentTime - job.dueDate);

    resultHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${job.name}</td>
        <td>${job.processingTime}</td>
        <td>${job.dueDate}</td>
        <td>${currentTime}</td>
        <td>${tardiness}</td>
      </tr>
    `;
  });

  document.getElementById("resultTable").innerHTML = resultHTML;
}