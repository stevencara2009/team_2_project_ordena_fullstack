import { validateBill } from "../schemas/bills.js";

export class BillController {
  constructor({ billModel }) {
    this.billModel = billModel;
  }

  getAll = async (req, res) => {
    const { from, to, payment_method, table_number, client_id  } = req.query;

    const rows = await this.billModel.getAll({
      from,
      to,
      payment_method,
      table_number,
      client_id 
    });

    res.json(rows);
  };

  getById = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const rows = await this.billModel.getById({
      id,
    });
    res.json(rows);
  };

  create = async (req, res) => {
    const result = validateBill(req.body);

    if (!result.success) {
      return res.status(400).json({
        errors: result.error,
      });
    }

    try {
      const created = await this.billModel.create({
        input: result.data,
      });
      res.status(201).json(created);
    } catch (error) {
      const statusByCode = {
        ORDER_NOT_FOUND: 404,
        CLIENT_NOT_FOUND: 404,
        ORDER_NOT_DELIVERABLE: 400,
        EMPTY_ORDER: 400,
      };
      const status = statusByCode[error.code] || 400;
      res.status(status).json({ message: error.message });
    }
  };

  getDetails = async (req, res) => {
    const { id } = req.params;
    const details = await this.billModel.getDetails({ id });

    if (!details) {
      return res.status(404).json({ message: "Bill not found" });
    }

    res.json(details);
  };
}
