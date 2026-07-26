import { useState } from 'react'
import * as billService from '../services/billService'

export const useBills = () => {

  const [bills, setBills] = useState([])
  const [selectedBillDetails, setSelectedBillDetails] = useState(null)
  const [loading, setLoading] = useState(false)

  const loadBills = async (filters = {}) => {
    setLoading(true)
    try {
      const data = await billService.getBills(filters)
      setBills(data)
      return data
    } finally {
      setLoading(false)
    }
  }

  const loadBillDetails = async (billId) => {
    setLoading(true)
    try {
      const data = await billService.getBillDetails(billId)
      setSelectedBillDetails(data)
      return data
    } finally {
      setLoading(false)
    }
  }

  const clearSelectedBillDetails = () => {
    setSelectedBillDetails(null)
  }

  const addBill = async (payload) => {
    setLoading(true)
    try {
      const data = await billService.createBill(payload)
      setBills(prev => [data, ...prev])
      return data
    } finally {
      setLoading(false)
    }
  }

  return {
    bills,
    selectedBillDetails,
    loading,
    loadBills,
    loadBillDetails,
    clearSelectedBillDetails,
    addBill
  }
}