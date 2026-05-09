import { Router } from "express";

const router = Router();

router.get("/api/products", (request, response) => {
  response.send([{ id: 123, prosucts: "Chicken Breats", price: 12.2 }]);
});

export default router;
