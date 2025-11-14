// app.js
const feesBtn = document.getElementById('feesBtn');
const feesModal = document.getElementById('feesModal');
const feesContent = document.getElementById('feesContent');
const closeModal = document.getElementById('closeModal');

const API_BASE = './api'; 

// event: open modal and load fees
feesBtn?.addEventListener('click', async (e) => {
  const uni = e.currentTarget.dataset.university || 'sunrise';
  feesContent.innerHTML = '<p>Loading...</p>';
  feesModal.setAttribute('aria-hidden','false');

  try {
    const res = await fetch(`${API_BASE}/fees/${uni}.json`);
    if (!res.ok) throw new Error('Failed to load');
    const data = await res.json();
    renderFees(data);
  } catch (err) {
    feesContent.innerHTML = `<p class="muted">Unable to load fees. Try again later.</p>`;
    console.error(err);
  }
});

closeModal?.addEventListener('click', () => feesModal.setAttribute('aria-hidden','true'));
feesModal.addEventListener('click', (ev) => {
  if (ev.target === feesModal) feesModal.setAttribute('aria-hidden','true');
});

function renderFees(data){
  if(!data || !data.courses) { feesContent.innerHTML = '<p>No data</p>'; return; }
  const rows = data.courses.map(c => {
    return `<div style="padding:.4rem 0;border-bottom:1px solid #eee">
      <strong>${c.name}</strong><div style="color:#555">₹ ${Number(c.minFee).toLocaleString()} — ₹ ${Number(c.maxFee).toLocaleString()}</div>
    </div>`;
  }).join('');
  feesContent.innerHTML = `${rows}`;
}

/* ---------- Lead form handling ---------- */

const leadForm = document.getElementById('leadForm');
const formMsg = document.getElementById('formMsg');

// Replace this with your Pipedream webhook URL
let PIPEDREAM_ENDPOINT = 'https://eou3vduo4hzefha.m.pipedream.net';

// phone validation helper (India 10-digit)
function validIndianPhone(phone) {
  return /^\d{10}$/.test(phone);
}

leadForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  formMsg.style.color = 'green';
  formMsg.textContent = '';

  const form = new FormData(leadForm);
  const payload = {
    name: form.get('name')?.trim(),
    email: form.get('email')?.trim(),
    phone: form.get('phone')?.trim(),
    state: form.get('state'),
    course: form.get('course'),
    intake: form.get('intake'),
    consent: !!form.get('consent')
  };

  // validation
  if (!payload.name || !payload.email || !payload.phone || !payload.state || !payload.course || !payload.intake) {
    formMsg.style.color = 'crimson';
    formMsg.textContent = 'Please fill all required fields.';
    return;
  }
  if (!validIndianPhone(payload.phone)) {
    formMsg.style.color = 'crimson';
    formMsg.textContent = 'Phone must be a 10-digit Indian number.';
    return;
  }
  if (!payload.consent) {
    formMsg.style.color = 'crimson';
    formMsg.textContent = 'Please provide consent to be contacted.';
    return;
  }

  // post to Pipedream endpoint
  try {
    formMsg.style.color = 'black';
    formMsg.textContent = 'Submitting...';

    const res = await fetch(PIPEDREAM_ENDPOINT, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || 'server error');
    }

    leadForm.reset();
    formMsg.style.color = 'green';
    formMsg.textContent = 'Thanks! Your request has been submitted.';
  } catch (err) {
    console.error(err);
    formMsg.style.color = 'crimson';
    formMsg.textContent = 'Submission failed. Please try again later.';
  }
});
