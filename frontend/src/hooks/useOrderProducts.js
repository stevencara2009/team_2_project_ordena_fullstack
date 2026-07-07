import { useState } from 'react'
import * as orderProductService from '../services/orderProductService'

export const useOrderProducts = () => {

  const [orderDetails, setOrderDetails] = useState([])


  const loadOrderDetails = async (orderId) => {
    const data = await orderProductService.getOrderProducts(orderId)
    setOrderDetails(data)
  }


  const addProduct = async (payload) => {
    await orderProductService.addProduct(payload)
  }


  const updateProduct = async (orderId, productId, payload) => {
    await orderProductService.updateProduct(orderId, productId, payload)
  }

  const clearOrderDetails = () => {
    setOrderDetails([])
  }

  const deleteProduct = async (orderId, productId) => {
    await orderProductService.deleteProduct(orderId, productId)
  }


  const deleteAllProducts = async (orderId) => {
    await orderProductService.deleteAllProducts(orderId)
    setOrderDetails([])
  }

  return {
    orderDetails,
    loadOrderDetails,
    addProduct,
    updateProduct,
    clearOrderDetails,
    deleteProduct,
    deleteAllProducts
  }
}