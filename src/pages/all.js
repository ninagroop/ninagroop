import React, { useContext } from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import StoreGrid from '../components/storegrid'
import { StoreContext } from '../context/store'

const All = () => {
  const [store, updateStore, getStoreArray] = useContext(StoreContext)
  return (
    <Layout>
      <SEO title="All" />
      <StoreGrid products={getStoreArray()} />
    </Layout>
  )
}

export default All
