import { useState } from "react";
import styles from "./MenuItem.module.css";
import noPhoto from "../../../assets/without_photo_product.jpg";
import { useCart } from "../../../hooks/useCart";
import { Button } from "../../../components/Button/Button";

export const MenuItem = ({ products }) => {
  const { addItem } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <>
      {products.map((p) => (
        <div className={styles.productItem} key={p.id}>
          <img
            src={p?.image === "no-img.jpg" && p.image.trim() !== "" ? noPhoto : p.image}

            alt={p.name}
            className={styles.productItemImg}
          />
          <h4 className={styles.productItemTitle}>{p.name}</h4>
          <p className={styles.productItemDescription}>{p.description}</p>
          <p className={styles.productItemPrice}>
            <b>${p.price} COP</b>
          </p>
          <Button
            text="+ Agregar al carrito"
            className="btnAdd"
            onClick={(e) => {
              e.stopPropagation();
              addItem(p, 1);
              alert(`Has agregado 1 ${p.name}`);
            }}
          />
        </div>
      ))}
    </>
  );
};
