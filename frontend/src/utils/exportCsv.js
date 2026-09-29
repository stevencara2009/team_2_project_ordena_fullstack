export const exportBillsToCsv = (bills, filename = 'facturas.csv') => {
  if (!bills.length) return

  const headers = [
    'ID', 'Orden', 'Fecha', 'Mesa', 'Mesero', 'Cajero',
    'Cliente', 'Subtotal', 'IVA', 'Total', 'Pago'
  ]

  const rows = bills.map(b => [
    b.id,
    b.order_id,
    new Date(b.date).toLocaleString(),
    b.table_number,
    `${b.waiter_name ?? ''} ${b.waiter_lastname ?? ''}`.trim(),
    `${b.cashier_name ?? ''} ${b.cashier_lastname ?? ''}`.trim(),
    b.client_name ? `${b.client_name} ${b.client_lastname}` : '',
    b.subtotal,
    b.tax,
    b.total,
    b.payment_method,
    b.propina
  ])

  const csvContent = [headers, ...rows]
    .map(row => row.map(field => `"${String(field).replace(/"/g, '""')}"`).join(','))
    .join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', filename)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}