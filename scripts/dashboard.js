async function add_payment(payment) {
  if (currentUser === null) {
    return;
  }

  var data = new FormData();
  data.append("payload", JSON.stringify(payment));

  return await fetch("php/add_payment.php", {
    method: "POST",
    body: data,
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
}

async function delete_payment(paymentId) {
  var data = new FormData();
  data.append("paymentId", paymentId);

  await fetch("php/delete_payment.php", {
    method: "POST",
    body: data,
  }).catch((error) => {
    console.log(error);
  });
}

async function load_payments() {
  payments = await fetch("php/load_payments.php", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      if (!data.success) {
        console.log(data.message);
      }
      return data.payments;
    })
    .catch((error) => {
      console.log(error);
    });
}

async function pay_payment(paymentId) {
  if (currentUser === null) {
    return;
  }

  var data = new FormData();
  data.append("paymentId", paymentId);

  return await fetch("php/pay_payment.php", {
    method: "POST",
    body: data,
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
}

async function edit_payment(payment) {
  if (currentUser === null) {
    return;
  }

  var data = new FormData();
  data.append("payload", JSON.stringify(payment));

  return await fetch("php/edit_payment.php", {
    method: "POST",
    body: data,
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
}

function createTableRow(payment) {
  const tr = document.createElement("tr");

  // --- Name
  const nameCell = document.createElement("td");
  nameCell.textContent = payment.name;
  tr.appendChild(nameCell);

  const typeCell = document.createElement("td");
  typeCell.textContent = paymentTypes[payment.type];
  tr.appendChild(typeCell);

  const valueCell = document.createElement("td");
  valueCell.textContent = parseFloat(payment.value).toFixed(2);
  tr.appendChild(valueCell);

  const dateCell = document.createElement("td");
  dateCell.textContent = payment.due.replaceAll("-", "/");
  tr.appendChild(dateCell);

  const statusCell = document.createElement("td");
  if (payment.paid === "1") {
    statusCell.innerHTML = `<span style="color: #4BA3C3">Pago</span>`;
  } else {
    statusCell.innerHTML =
      new Date(payment.due) < new Date(new Date().toISOString().split("T")[0])
        ? `<span style="color: var(--error)">Vencido</span>`
        : `<span style="color: #FAA613">Pendente</span>`;
  }
  tr.appendChild(statusCell);

  const controlCell = document.createElement("td");
  controlCell.innerHTML = `
    <button
      class="material-symbols-outlined"
      style="background-color: transparent;
      border: none;
      color: var(--text);"
      onclick="registerPaid(${payment.id})"
    >check</button>  
    <button
      class="material-symbols-outlined"
      style="background-color: transparent;
      border: none;
      color: var(--text);"
      onclick="openEditPaymentForm(${payment.id})"
    >edit</button>
    <button
      class="material-symbols-outlined"
      style="background-color: transparent;
      border: none;
      color: var(--error);"
      onclick="deletePayment(${payment.id})"
    >delete</button>
  `;
  tr.appendChild(controlCell);

  return tr;
}

function updatePayments() {
  load_payments().then(() => {
    if (payments == null) {
      return;
    }

    if (payments.length > 0) {
      createPaymentsTable(payments);
    } else {
      document.getElementById("payments_container").innerHTML = `
        Você não possui nenhuma conta.
        <button onclick="openNewPaymentForm()" class="btn"> Adicionar Conta </button>
      `;
    }
  });
}

function deletePayment(paymentId) {
  delete_payment(paymentId).then(() => {
    updatePayments();
  });
}

function registerPaid(paymentId) {
  pay_payment(paymentId).then(() => {
    updatePayments();
  });
}

function openForm() {
  const overlay = document.getElementById("overlay");
  overlay.style.display = "flex";
}

function openNewPaymentForm() {
  openForm();

  document.getElementById("overlay_header").innerHTML = "Cadastrar Conta";
  const runButton = document.getElementById("overlay_button");
  runButton.onclick = () => registerNewPayment();
  runButton.innerHTML = "Adicionar";
}

function editPayment(paymentId) {
  let name = document.getElementById("payment_name").value;
  const type = document.getElementById("payment_type").value;
  const reference = document.getElementById("payment_reference").value;
  let value = document.getElementById("payment_value").value;
  const due = new Date(document.getElementById("payment_due").value)
    .toISOString()
    .split("T")[0];
  const occurences = document.getElementById("always_checkbox").checked
    ? -1
    : document.getElementById("payment_occurences").value;

  if (name === "") {
    name = "Sem nome";
  }
  if (value === "") {
    value = 0;
  }

  var payment = {
    id: paymentId,
    name: name,
    type: type,
    reference: reference,
    value: value,
    due: due,
    occurences: occurences,
  };

  edit_payment(payment).then(() => {
    updatePayments();
    closeForm();
  })
}

function openEditPaymentForm(paymentId) {
  openForm();

  document.getElementById("overlay_header").innerHTML = "Editar Conta";
  const runButton = document.getElementById("overlay_button");
  runButton.onclick = () => editPayment(paymentId);
  runButton.innerHTML = "Atualizar";

  let editedPayment = payments.filter((payment) => {
    return payment.id == paymentId;
  })[0];

  document.getElementById("payment_name").value = editedPayment.name;
  document.getElementById("payment_reference").value = editedPayment.reference;
  document.getElementById("payment_value").value = editedPayment.value;
  document.getElementById("payment_due").value = editedPayment.due;
  document.getElementById("payment_type").value = editedPayment.type;

  const occurencesContainer = document.getElementById("occurences_container");

  if (editedPayment.type === "single") {
    occurencesContainer.style.display = "none";
  } else {
    occurencesContainer.style.display = "flex";
    occurencesContainer.style.flexDirection = "column";

    if(editPayment.occurences != -1) {
      document.getElementById("always_checkbox").checked = false;
      document.getElementById("quantity_container").style.display = "flex";
      document.getElementById("payment_occurences").value = editedPayment.occurrences;
    }
  }
}

function closeForm() {
  const overlay = document.getElementById("overlay");
  overlay.style.display = "none";

  document.getElementById("payment_name").value = "";
  document.getElementById("payment_reference").value = "";
  document.getElementById("payment_value").value = "";
  document.getElementById("payment_due").value = new Date()
    .toISOString()
    .split("T")[0];
  document.getElementById("payment_type").value = "single";
  document.getElementById("occurences_container").style.display = "none";
  document.getElementById("quantity_container").style.display = "none";
  document.getElementById("always_checkbox").checked = true;
  document.getElementById("payment_occurences").value = 0;
}

function registerNewPayment() {
  // --- Make all validations
  let name = document.getElementById("payment_name").value;
  const type = document.getElementById("payment_type").value;
  const reference = document.getElementById("payment_reference").value;
  let value = document.getElementById("payment_value").value;
  const due = new Date(document.getElementById("payment_due").value)
    .toISOString()
    .split("T")[0];
  const occurences = document.getElementById("always_checkbox").checked
    ? -1
    : document.getElementById("payment_occurences").value;

  if (name === "") {
    name = "Sem nome";
  }
  if (value === "") {
    value = 0;
  }

  var payment = {
    // Fill with all necessary information.
    userId: currentUser.id,
    name: name,
    type: type,
    reference: reference,
    value: value,
    due: due,
    occurences: occurences,
  };

  add_payment(payment).then((response) => {
    updatePayments();
    closeForm();
  });
}

function createPaymentsTable(payments) {
  const container = document.getElementById("payments_container");
  container.innerHTML = `
    <div class="toolbox">
      <span style="margin-right: 10px">Procurar conta:</span>
      <input class="inp" type="text" placeholder="Nome, Tipo, Status">
      <span class="spacer"></span>
      <button class="btn" onclick="openNewPaymentForm()">Adicionar nova Conta</button>
    </div>
    <table class="tbl" id="payment_table">
      <thead class="tbl-head">
        <tr>
          <th>Nome da Conta</th>
          <th>Tipo</th>
          <th>R$</th>
          <th>Data</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody class="tbl-body">
      </tbody>
    </table>
  `;

  const tbody = document.querySelector("#payment_table tbody");
  payments.forEach((payment) => tbody.appendChild(createTableRow(payment)));
}

window.addEventListener("click", (event) => {
  if (event.target == document.getElementById("overlay")) {
    closeForm();
  }
});

document.getElementById("payment_type").addEventListener("change", (event) => {
  const occurencesContainer = document.getElementById("occurences_container");
  if (event.target.value === "single") {
    occurencesContainer.style.display = "none";
  } else {
    occurencesContainer.style.display = "flex";
    occurencesContainer.style.flexDirection = "column";
  }
});

document
  .getElementById("always_checkbox")
  .addEventListener("change", (event) => {
    if (event.target.checked) {
      document.getElementById("quantity_container").style.display = "none";
    } else {
      document.getElementById("quantity_container").style.display = "flex";
    }
  });

// --- ON STARTUP
let payments;
const paymentTypes = {
  single: "Única vez",
  monthly: "Mensal",
  weekly: "Semanal",
};

document.getElementById("payment_due").value = new Date()
  .toISOString()
  .split("T")[0];

load_user().then(() => {
  if (currentUser == null) {
    window.location.href = "register.html";
    return;
  }

  updatePayments();

  displayUsername(currentUser.username);
});
