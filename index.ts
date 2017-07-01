import * as express from 'express';
import { connect, model, Schema, Document } from 'mongoose';
const app = express();
connect('mongodb://mongo/test');

const CatSchema = new Schema({
  name: String
});

const Cat = model('Cat', CatSchema);

const saveKitty = async (name: string): Promise<Document> => {
  const kitty = new Cat({name});
  return kitty.save();
};

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/kitty', async (req, res) => {
  const kitties = await Cat.find();
  res.send(kitties);
});

app.get('/kitty/:kittyname', async (req, res) => {
  const kitty = await saveKitty(req.params.kittyname);
  res.send(kitty);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
