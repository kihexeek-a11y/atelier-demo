// ===== 1. Фильтр галереи =====
const filterButtons = document.querySelectorAll(«.filter-btn»);
const cards = document.querySelectorAll(«.card»);

filterButtons.forEach(function (btn) {
  btn.addEventListener(«click», function () {
    filterButtons.forEach(function (b) {
      b.classList.remove(«active»);
    });
    btn.classList.add(«active»);

    const filter = btn.dataset.filter;

    cards.forEach(function (card) {
      if (filter === «all» || card.dataset.category === filter) {
        card.classList.remove(«hidden»);
      } else {
        card.classList.add(«hidden»);
      }
    });
  });
});

// ===== 2. Калькулятор стоимости =====
const itemSelect = document.getElementById(«item»);
const fabricSelect = document.getElementById(«fabric»);
const rushSelect = document.getElementById(«rush»);
const totalEl = document.getElementById(«total»);

function calculate() {
  const price = Number(itemSelect.value);
  const fabric = Number(fabricSelect.value);
  const rush = Number(rushSelect.value);
  const total = Math.round(price * fabric * rush);
  totalEl.textContent = total.toLocaleString(«ru-RU») + « ₽»;
}

itemSelect.addEventListener(«change», calculate);
fabricSelect.addEventListener(«change», calculate);
rushSelect.addEventListener(«change», calculate);
calculate();

// ===== 3. Форма заказа =====
const form = document.getElementById(«order-form»);
const message = document.getElementById(«form-message»);

function showMessage(text, type) {
  message.textContent = text;
  message.className = «form-message « + type;
}

form.addEventListener(«submit», function (event) {
  event.preventDefault();

  const name = form.elements[«name»];
  const contact = form.elements[«contact»];
  const description = form.elements[«description»];
  const required = [name, contact, description];

  let valid = true;

  required.forEach(function (field) {
    if (field.value.trim() === «») {
      field.classList.add(«error»);
      valid = false;
    } else {
      field.classList.remove(«error»);
    }
  });

  if (!valid) {
    showMessage(«Заполните обязательные поля», «fail»);
    return;
  }

  // Демо-режим: данные не отправляются, а выводятся в консоль
  const data = {
    name: name.value.trim(),
    contact: contact.value.trim(),
    description: description.value.trim(),
    height: form.elements[«height»].value,
    chest: form.elements[«chest»].value,
    waist: form.elements[«waist»].value,
    hips: form.elements[«hips»].value,
    estimate: totalEl.textContent
  };
  console.log(«Новая заявка:», data);

  showMessage(«Спасибо, « + data.name + «! Мы свяжемся с вами в ближайшее время.», «success»);
  form.reset();
  calculate();
});

// Убираем красную рамку, когда пользователь начинает печатать
document.querySelectorAll(«input, textarea»).forEach(function (field) {
  field.addEventListener(«input», function () {
    field.classList.remove(«error»);
  });
});