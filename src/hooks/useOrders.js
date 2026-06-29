import { useState } from 'react'
import * as orderService from '../services/orderService'

export const useOrders = () => {

  const [currentOrder, setCurrentOrder] = useState(null)
  const [tableOrders, setTableOrders] = useState([])
  const [orders, setOrders] = useState([])

  const loadOrders = async () => {
    const data = await orderService.getOrders()
    setOrders(data)
    return data
  }

  
  const loadOrder = async (id) => {
    const data = await orderService.getOrderById(id)
    setCurrentOrder(data)
  }
  
  const createOrder = async (payload) => {
    const data = await orderService.createOrder(payload)
    setCurrentOrder(data)
    return data
  }

  const updateOrder = async (id, payload) => {
    console.log(id, payload )
    const data = await orderService.updateOrder(id, payload)
    setOrders(prev =>
      prev.map(order => order.id === data.id ? data : order)
    )
    return data
  }

  const clearOrder = () => {
    setCurrentOrder(null)
  }

  const loadOrdersByTable = async (tableId) => {
    try {
      const data = await orderService.getOrdersByTable(tableId)
      setTableOrders(data)
    } catch (error) {
      setTableOrders([])
      console.error(error)
    }
  }

  return {
    orders,
    currentOrder,
    tableOrders,
    loadOrders,
    loadOrder,
    createOrder,
    updateOrder,
    clearOrder,
    loadOrdersByTable
  }
}