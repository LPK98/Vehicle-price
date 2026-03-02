const prisma = require("../lib/prisma");

exports.list = async (req, res) => {
  try {
    const { search, brand, fuel, minPrice, maxPrice } = req.query;

    const where = {};

    if (search) {
      where.OR = [
        { brand: { contains: search, mode: "insensitive" } },
        { model: { contains: search, mode: "insensitive" } },
      ];
    }
    if (brand) where.brand = { equals: brand, mode: "insensitive" };
    if (fuel) where.fuel = { equals: fuel, mode: "insensitive" };
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = Number(minPrice);
      if (maxPrice) where.price.lte = Number(maxPrice);
    }

    const vehicles = await prisma.vehicle.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    res.json(vehicles);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch vehicles", error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: Number(req.params.id) },
    });
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
    res.json(vehicle);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch vehicle", error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { brand, model, year, price, fuel, description, image } = req.body;

    if (!brand || !model || !year || !price) {
      return res
        .status(400)
        .json({ message: "Brand, model, year, and price are required" });
    }
    if (isNaN(Number(year)) || isNaN(Number(price))) {
      return res
        .status(400)
        .json({ message: "Year and price must be numbers" });
    }

    const priceHistory = [
      { date: new Date().toISOString().split("T")[0], price: Number(price) },
    ];

    const vehicle = await prisma.vehicle.create({
      data: {
        brand,
        model,
        year: Number(year),
        price: Number(price),
        fuel: fuel || null,
        description: description || null,
        image: image || null,
        priceHistory,
      },
    });

    res.status(201).json(vehicle);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create vehicle", error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const current = await prisma.vehicle.findUnique({ where: { id } });
    if (!current) return res.status(404).json({ message: "Vehicle not found" });

    const { brand, model, year, price, fuel, description, image } = req.body;

    let priceHistory = Array.isArray(current.priceHistory)
      ? current.priceHistory
      : [];

    if (price && Number(price) !== current.price) {
      priceHistory = [
        ...priceHistory,
        { date: new Date().toISOString().split("T")[0], price: Number(price) },
      ];
    }

    const updated = await prisma.vehicle.update({
      where: { id },
      data: {
        ...(brand && { brand }),
        ...(model && { model }),
        ...(year && { year: Number(year) }),
        ...(price && { price: Number(price) }),
        ...(fuel !== undefined && { fuel }),
        ...(description !== undefined && { description }),
        ...(image !== undefined && { image }),
        priceHistory,
      },
    });

    res.json(updated);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update vehicle", error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const id = Number(req.params.id);
    await prisma.vehicle.delete({ where: { id } });
    res.json({ message: "Vehicle deleted successfully" });
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res
      .status(500)
      .json({ message: "Failed to delete vehicle", error: err.message });
  }
};
