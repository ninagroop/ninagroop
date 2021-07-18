export const filterProducts = (filter, products) => {
  return products.filter(
    item =>
      item?.metadata?.[Object.keys(filter)?.[0]]?.toLowerCase() ===
      Object.values(filter)?.[0]?.toLowerCase()
  )
}
