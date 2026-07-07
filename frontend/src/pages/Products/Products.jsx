import { useProducts } from "../../hooks/useProducts"; // Importar el hook
import { Button } from '../../components/Button/Button'
import { ProductItem } from './ProductItem/ProductItem'
import { useState } from 'react'
import { Loader } from '../../components/Loader/Loader'
import { ProductFilters } from "./ProductFilters";
import { ProductEditForm } from "./ProductEditForm";
import { ProductCreateModal } from "./ProductCreateModal";
import { ProductDeleteModal } from "./ProductDeleteModal";


export const Products = () => {
  const [productSearch, setProductSearch] = useState("");
  const [openModal, setOpenModal] = useState(false); // Modal para Crear
  const [openDeleteModal, setOpenDeleteModal] = useState(false); // Modal para Eliminar
  const [plateType, setPlateType] = useState("Todos");
  const [editingId, setEditingId] = useState(null);

  const {
    products,
    loading,
    addProduct,
    editProduct,
    removeProduct
  } = useProducts();


  // ESTADO FORMULARIO DETALLE / EDICIÓN (PATCH)
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    category: "",
    price: 0,
    description: "",
    image: ""
  })

  // ESTADO FORMULARIO CREACIÓN (POST)
  const [createFormData, setCreateFormData] = useState({
    name: "",
    category: "",
    price: 0,
    description: "",
    image: ""
  });


  // Combinar filtro de categoría y el de búsqueda por nombre
  const productsFiltered = products.filter((p) => {
    const matchesCategory = plateType === "Todos" || p.category.toLowerCase() === plateType.toLowerCase();
    const matchesSearch = p.name.toLowerCase().includes(productSearch.toLowerCase())
    return matchesCategory && matchesSearch
  })


  // AUTOCOMPLETAR FORMULARIO DE DETALLE/EDICIÓN
  const handleSelectProduct = (selectedProduct) => {
    const id = selectedProduct.id || selectedProduct._id || "";
    setEditingId(id);
    setFormData({
      id: selectedProduct.id || selectedProduct._id || "",
      name: selectedProduct.name || "",
      category: Array.isArray(selectedProduct.category) ? selectedProduct.category[0] : selectedProduct.category || "",
      price: selectedProduct.price || 0,
      description: selectedProduct.description || "",
      image: selectedProduct.image || ""
    })
  }


  // HANDLERS PARA CAPTURAR DATOS INDEPENDIENTES
  const handleChangeEdit = (e) => {
    const { name, value, type, checked } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleChangeCreate = (e) => {
    const { name, value, type, checked } = e.target
    setCreateFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }


  // HANDLER UI POST - CREAR UN PRODUCTO
  const handleCreate = async (e) => {
    e.preventDefault();

    if (!createFormData.name || createFormData.name === "") {
      alert("Digite un nombre de producto")
      return
    }

    if (!createFormData.category || createFormData.category === "") {
      alert("Seleccione un tipo de producto")
      return
    }

    if (!createFormData.price || createFormData.price === 0) {
      alert("Digite un precio")
      return
    }


    try {
      // Sanitizamos el objeto antes de enviarlo
      const data = {
        ...createFormData,
        price: Number(createFormData.price),
        category: [createFormData.category]
      }

      await addProduct(data);
      setOpenModal(false)
      alert(`Se ha creado el producto "${createFormData.name}" con éxito`);

      setCreateFormData({
        name: "",
        category: "",
        price: 0,
        description: "",
        image: ""
      })

      return true;
    } catch (error) {
      console.error(error);
    }
  }



// HANDLER UI PATCH - ACTUALIZAR UN PRODUCTO
const handleUpdate = async (e) => {

  e.preventDefault();
  if (!editingId) return alert("Selecciona un producto de la lista para actualizar");

  try {
    const data = {
      ...formData,
      category: [formData.category],
      price: Number(formData.price),
    };

    await editProduct(editingId, data);

    alert(`Se ha actualizado el producto "${formData.name}" con éxito`);

    // Limpiar el detalle tras eliminar
    setEditingId(null);
    setFormData({
      name: "",
      category: "",
      price: 0,
      description: "",
      image: ""
    })
    return true;
  } catch (error) {
    console.error(error);
  }
};


// HANDLER UI DELETE - ELIMINAR PRODUCTO
const handleDelete = async () => {
  if (!formData.id) return alert("Selecciona un producto de la lista para eliminar");;

  try {
    removeProduct(formData.id)
    alert(`Se ha eliminado el producto "${formData.name}" con éxito`)
    // Limpiar el detalle tras eliminar
    setEditingId(null);
    setFormData({
      name: "",
      category: "",
      price: 0,
      description: "",
      image: ""
    })

    setOpenDeleteModal(false)
  } catch (error) {
    console.error(error);
  }
};




return (
  <div className="background">
    <div className="container">
      <div className="container-form">
        <h1>Productos</h1>

        {/* Filtro */}
        <ProductFilters
          productSearch={productSearch}
          setProductSearch={setProductSearch}
          plateType={plateType}
          setPlateType={setPlateType}
        />

        <div className="container-flex">
          {/* Modulo Platillos*/}
          <div className="module">
            <ProductItem products={productsFiltered} onSelectProduct={handleSelectProduct} />
          </div>

          {/* Modulo Detalle Producto (EDICIÓN / PATCH) */}
          <div className="module">
            <Button className='btnAdd' text='+ Crear producto' type='submit' onClick={() => setOpenModal(true)} />

            <ProductEditForm
              formData={formData}
              handleChangeEdit={handleChangeEdit}
              handleUpdate={handleUpdate}
              setOpenDeleteModal={setOpenDeleteModal}
            />
          </div>
        </div>

        {/* Modal Creación de Producto (POST) */}
        <ProductCreateModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          createFormData={createFormData}
          handleChangeCreate={handleChangeCreate}
          handleCreate={handleCreate}
          setCreateFormData={setCreateFormData}
        />

        {/* Modal de Confirmación de Eliminación */}
        <ProductDeleteModal
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          formData={formData}
          handleDelete={handleDelete}
        />

        {loading && <Loader />}

      </div>
    </div>
  </div>
)
}