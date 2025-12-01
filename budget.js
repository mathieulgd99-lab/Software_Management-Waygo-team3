function saveBudget() {
  const value = parseFloat(document.getElementById("budget-input").value) || 0;
  localStorage.setItem("budget", value);
  updateBudgetDisplay();
}

function addExpense() {
  const name = document.getElementById("expense-name").value.trim();
  const amount = parseFloat(document.getElementById("expense-amount").value);
  if (!name || isNaN(amount) || amount <= 0) {
    alert("Please enter a valid expense name and amount.");
    return;
  }
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  expenses.push({ name, amount });
  localStorage.setItem("expenses", JSON.stringify(expenses));
  document.getElementById("expense-name").value = "";
  document.getElementById("expense-amount").value = "";
  updateBudgetDisplay();
}

function removeExpense(index) {
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  expenses.splice(index, 1);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  updateBudgetDisplay();
}

function getItineraryCost() {
  const itinerary = JSON.parse(localStorage.getItem("itinerary")) || [];
  return itinerary.reduce((sum, id) => {
    const d = destinations.find(x => x.id === id);
    return sum + (d?.cost || 0);
  }, 0);
}

function updateBudgetDisplay() {
  const totalBudget = parseFloat(localStorage.getItem("budget")) || 0;
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  const spent = expenses.reduce((sum, e) => sum + e.amount, 0);
  const travelCost = getItineraryCost();
  const totalUsed = spent + travelCost;
  const remaining = totalBudget - totalUsed;
  const percent = totalBudget > 0 ? Math.min((totalUsed / totalBudget) * 100, 100) : 0;

  const display = document.getElementById("budget-display");
  const bar = document.getElementById("budget-progress");
  const list = document.getElementById("expense-list");

  if (display) {
    display.innerHTML = `
      Budget: $${totalBudget} |
      Expenses: $${spent} |
      Trip estimate: $${travelCost} |
      Remaining: $${remaining >= 0 ? remaining : 0}
    `;
  }
  if (bar) bar.style.width = `${percent}%`;

  if (list) {
    list.innerHTML = "";
    expenses.forEach((e, i) => {
      const li = document.createElement("li");
      li.innerHTML = `<span>${escapeHtml(e.name)} - $${e.amount}</span><button onclick="removeExpense(${i})">✖</button>`;
      list.appendChild(li);
    });
  }
}

function loadBudget() { updateBudgetDisplay(); }
