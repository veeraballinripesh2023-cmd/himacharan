// ============================================================
// algorithms.js — Core logic for Round Robin Visualizer
// ============================================================
// Adds a new process row to the input table
function addRow(pid, arrival, burst, priority) {
const tableBody = document.querySelector("table tbody");
const row = document.createElement("tr");
row.innerHTML = `
<td>${pid}</td>
<td contenteditable="true">${arrival}</td>
<td contenteditable="true">${burst}</td>
<td contenteditable="true">${priority}</td>
`;
tableBody.appendChild(row);
}
// Computes average waiting time, turnaround time, throughput, and CPU utilization
function computeStats(state) {
const completed = state.processes.filter(p => p.remaining <= 0);
if (completed.length === 0)
return { awt: 0, atat: 0, throughput: 0, cpuUtil: 0 };
let totalWT = 0, totalTAT = 0;
completed.forEach(p => {
const turnaround = (p.endTime ?? state.clock) - p.arrival;
const waiting = turnaround - p.burst;
totalWT += waiting;
totalTAT += turnaround;
});
const awt = totalWT / completed.length;
const atat = totalTAT / completed.length;
const throughput = completed.length / state.clock;
const cpuUtil = (state.processes.reduce((s, p) => s + p.burst, 0) / state.clock) * 100;
return { awt, atat, throughput, cpuUtil };
}
// Export for use in app.js
export { addRow, computeStats };
