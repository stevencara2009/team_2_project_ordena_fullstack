import { Router } from "express";
import { OrderProductController } from "../controllers/orderProducts.js";
import { verifyToken, authorizeRoles } from "../middlewares/auth.js";

export const createOrderProductRouter = ({ orderProductModel }) => {
  const router = Router();
  const controller = new OrderProductController({ orderProductModel });

  const staffOnly = [
    verifyToken,
    authorizeRoles("ADMINISTRADOR", "MESERO", "COCINERO", "CAJERO"),
  ];

  router.get("/", ...staffOnly, controller.getAll);
  router.get("/:orderId", ...staffOnly, controller.getByOrder);
  router.post("/", ...staffOnly, controller.create);
  router.patch("/:order_id/:product_id", ...staffOnly, controller.update);
  router.delete("/:order_id/all", ...staffOnly, controller.deleteByOrder);
  router.delete("/:order_id/:product_id", ...staffOnly, controller.delete);

  return router;
};
