const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());

const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));

const feesData = {
  sunrise: {
    university: 'Sunrise University',
    courses: [
      { name: 'B.Tech - CSE', minFee: 80000, maxFee: 200000 },
      { name: 'MBA', minFee: 90000, maxFee: 250000 },
      { name: 'Design (UG)', minFee: 60000, maxFee: 150000 }
    ]
  },
  metro: {
    university: 'Metro College',
    courses: [
      { name: 'B.Tech - ECE', minFee: 70000, maxFee: 180000 },
      { name: 'BBA', minFee: 50000, maxFee: 120000 },
    ]
  }
};

app.get('/api/fees/:uni', (req, res) => {
  const uni = req.params.uni.toLowerCase();
  if (!feesData[uni]) return res.status(404).json({ error: 'university not found' });
  res.json(feesData[uni]);
});

const leads = [];
app.post('/api/leads', (req, res) => {
  const lead = req.body;
  lead.receivedAt = new Date().toISOString();
  leads.push(lead);
  console.log('New lead:', lead);
  res.json({ status: 'ok', id: leads.length - 1 });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server listening on', PORT));
