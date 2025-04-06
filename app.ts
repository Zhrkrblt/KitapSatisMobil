import express from 'express';
import { testConnection } from './routes/test';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Test route'u
app.get('/api/test-connection', testConnection);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 