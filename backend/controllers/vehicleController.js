let vehicles = [];
let vehicleIdCounter = 1;

exports.list = (req, res) => {
  let result = vehicles;
  const { search, brand, fuel, minPrice, maxPrice } = req.query;
  if (search) {
    result = result.filter(v => v.model.toLowerCase().includes(search.toLowerCase()));
  }
  if (brand) result = result.filter(v => v.brand === brand);
  if (fuel) result = result.filter(v => v.fuel === fuel);
  if (minPrice) result = result.filter(v => v.price >= Number(minPrice));
  if (maxPrice) result = result.filter(v => v.price <= Number(maxPrice));
  res.json(result);
};

exports.getById = (req, res) => {
  const v = vehicles.find(x => x.id === Number(req.params.id));
  if (!v) return res.status(404).json({ message: 'Not found' });
  res.json(v);
};

exports.create = (req, res) => {
  const { brand, model, year, price, fuel, description, image } = req.body;
  const newV = { id: vehicleIdCounter++, brand, model, year, price, fuel, description, image, priceHistory: [] };
  vehicles.push(newV);
  res.status(201).json(newV);
};

exports.update = (req, res) => {
  const v = vehicles.find(x => x.id === Number(req.params.id));
  if (!v) return res.status(404).json({ message: 'Not found' });
  Object.assign(v, req.body);
  res.json(v);
};

exports.remove = (req, res) => {
  vehicles = vehicles.filter(x => x.id !== Number(req.params.id));
  res.json({ message: 'Deleted' });
};