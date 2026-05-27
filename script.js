let chart;

function addRow() {

  const table = document.getElementById("inputTable");

  const row = table.insertRow();

  row.innerHTML = `
    <td><input value=""></td>
    <td><input type="number" value=""></td>
    <td><input type="number" value=""></td>
  `;
}

function scheduleEDD() {

  const table = document.getElementById("inputTable");

  const rows = Array.from(table.rows).slice(1);

  let jobs = rows.map(row => {

    return {

      name: row.cells[0].querySelector("input").value,

      processingTime: Number(
        row.cells[1].querySelector("input").value
      ),

      dueDate: Number(
        row.cells[2].querySelector("input").value
      )

    };

  });

  jobs = jobs.filter(job =>
    job.name &&
    job.processingTime &&
    job.dueDate
  );

  jobs.sort((a, b) => a.dueDate - b.dueDate);

  let currentTime = 0;

  let totalDelay = 0;

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

  const labels = [];

  const times = [];

  jobs.forEach((job, index) => {

    currentTime += job.processingTime;

    const tardiness =
      Math.max(0, currentTime - job.dueDate);

    totalDelay += tardiness;

    labels.push(job.name);

    times.push(job.processingTime);

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

  document.getElementById(
    "resultTable"
  ).innerHTML = resultHTML;

  document.getElementById(
    "jobCount"
  ).innerText = jobs.length;

  document.getElementById(
    "totalTime"
  ).innerText = currentTime;

  document.getElementById(
    "totalDelay"
  ).innerText = totalDelay;

  renderChart(labels, times);

}

function renderChart(labels, data) {

  const ctx =
    document.getElementById(
      "scheduleChart"
    );

  if (chart) {
    chart.destroy();
  }

  chart = new Chart(ctx, {

    type: "bar",

    data: {

      labels: labels,

      datasets: [{

        label: "加工時間",

        data: data,

        borderRadius: 12,

        backgroundColor: [
          "#3b82f6",
          "#8b5cf6",
          "#06b6d4",
          "#10b981",
          "#f59e0b"
        ]

      }]

    },

    options: {

      responsive: true,

      plugins: {

        legend: {
          labels: {
            color: "white"
          }
        }

      },

      scales: {

        x: {

          ticks: {
            color: "white"
          },

          grid: {
            color: "rgba(255,255,255,0.08)"
          }

        },

        y: {

          ticks: {
            color: "white"
          },

          grid: {
            color: "rgba(255,255,255,0.08)"
          }

        }

      }

    }

  });

}
