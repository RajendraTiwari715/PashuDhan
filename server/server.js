import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const storePath = path.join(__dirname, 'data', 'store.json');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const getToday = () => new Date().toISOString().split('T')[0];
const generateTagId = () => `TAG-${Math.floor(1000 + Math.random() * 9000)}`;
const generateAnimalId = () => `ANM-${Math.floor(1000 + Math.random() * 9000)}`;

const readStore = async () => {
  try {
    const text = await fs.readFile(storePath, 'utf-8');
    return JSON.parse(text);
  } catch (error) {
    return { blankTags: [], animals: [] };
  }
};

const writeStore = async (store) => {
  await fs.mkdir(path.dirname(storePath), { recursive: true });
  await fs.writeFile(storePath, JSON.stringify(store, null, 2), 'utf-8');
};

app.get('/api/dashboard/summary', async (req, res) => {
  const store = await readStore();
  const today = getToday();
  const animals = store.animals || [];
  const blankTags = store.blankTags || [];

  const completedToday = animals.filter((animal) => animal.registeredDate === today).length;
  const totalTags = blankTags.length;
  const linkedTagsCount = blankTags.filter((tag) => tag.isLinked).length;
  const unlinkedTagsCount = totalTags - linkedTagsCount;
  const dailyTarget = 15;
  const progressPercent = Math.min(Math.round((completedToday / dailyTarget) * 100), 100);
  const totalIncentiveEarned = completedToday * 50;

  res.json({
    dailyTarget,
    completedToday,
    progressPercent,
    totalTags,
    linkedTagsCount,
    unlinkedTagsCount,
    totalIncentiveEarned,
    monthlyProjection: totalIncentiveEarned * 25,
    recentAnimals: animals.slice(0, 5),
    recentBlankTags: blankTags.slice(0, 5)
  });
});

app.get('/api/blank-tags', async (req, res) => {
  const store = await readStore();
  res.json(store.blankTags || []);
});

app.post('/api/blank-tags', async (req, res) => {
  const { count = 1 } = req.body;
  const store = await readStore();
  store.blankTags = store.blankTags || [];

  const generatedTags = [];
  for (let i = 0; i < count; i += 1) {
    const newTag = {
      tagId: generateTagId(),
      isLinked: false,
      generatedDate: getToday()
    };
    store.blankTags.unshift(newTag);
    generatedTags.push(newTag);
  }

  await writeStore(store);
  res.status(201).json({ generatedTags });
});

app.get('/api/animals', async (req, res) => {
  const store = await readStore();
  res.json(store.animals || []);
});

app.get('/api/animals/:id', async (req, res) => {
  const store = await readStore();
  const animal = (store.animals || []).find((item) => item.id === req.params.id);
  if (!animal) {
    return res.status(404).json({ message: 'Animal not found' });
  }
  return res.json(animal);
});

app.post('/api/animals/register', async (req, res) => {
  const { tagId, breed, owner, photos = [], location } = req.body;
  if (!tagId || !breed || !owner?.name || !owner?.phone) {
    return res.status(400).json({ message: 'tagId, breed, owner.name and owner.phone are required' });
  }

  const store = await readStore();
  store.blankTags = store.blankTags || [];
  store.animals = store.animals || [];

  const blankTag = store.blankTags.find((tag) => tag.tagId === tagId);
  if (!blankTag) {
    return res.status(404).json({ message: 'Blank tag not found' });
  }

  blankTag.isLinked = true;
  const newAnimal = {
    id: generateAnimalId(),
    tagId,
    breed,
    color: req.body.color || 'Unknown',
    ageYears: req.body.ageYears || 0,
    healthStatus: req.body.healthStatus || 'Unknown',
    owner,
    photos,
    registeredDate: getToday(),
    isRegistered: true,
    location: location || null,
    priorViolationsCount: 0,
    activeNotices: []
  };

  store.animals.unshift(newAnimal);
  await writeStore(store);
  res.status(201).json(newAnimal);
});

app.post('/api/blank-tags/:tagId/link', async (req, res) => {
  const { animalId } = req.body;
  const store = await readStore();
  const tag = (store.blankTags || []).find((item) => item.tagId === req.params.tagId);
  if (!tag) {
    return res.status(404).json({ message: 'Blank tag not found' });
  }

  tag.isLinked = true;
  if (animalId) {
    const animal = (store.animals || []).find((item) => item.id === animalId);
    if (animal) {
      animal.tagId = tag.tagId;
    }
  }

  await writeStore(store);
  return res.json(tag);
});

app.get('/api/incentives', async (req, res) => {
  const store = await readStore();
  const today = getToday();
  const completedToday = (store.animals || []).filter((animal) => animal.registeredDate === today).length;
  const totalIncentiveEarned = completedToday * 50;
  res.json({ dailyRate: 50, completedToday, totalIncentiveEarned, monthlyProjection: totalIncentiveEarned * 25 });
});

app.listen(PORT, () => {
  console.log(`PashuDhan backend listening on http://localhost:${PORT}`);
});
