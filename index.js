import "./style.scss";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

const firebaseConfig = {
  databaseURL:
    "https://leads-tracker-app-83c40-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const referenceInDB = ref(database, "leads");

const inputEl = document.querySelector("#input-el");
const inputBtn = document.querySelector("#input-btn");
const ulEl = document.querySelector("#ul-el");
const clearBtn = document.querySelector("#clear-btn");

onValue(referenceInDB, (snapshot) => {
  const snapshotDoesExist = snapshot.exists();
  if (snapshotDoesExist) {
    const snapshotValues = snapshot.val();
    const leads = Object.values(snapshotValues);
    render(leads);
  }
});

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `<li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>`;
  }

  ulEl.innerHTML = listItems;
}

function clear() {
  remove(referenceInDB);
  ulEl.innerHTML = "";
}

clearBtn.addEventListener("dblclick", () => {
  clear();
});

inputBtn.addEventListener("click", () => {
  if (inputEl.value) {
    push(referenceInDB, inputEl.value);
  }
  inputEl.value = "";
});
