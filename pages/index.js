
import { useContext} from 'react'
import { Grid} from '@mui/material'
import Layout from '../components/Layout'

import ProductItem from '../components/ProductItem'
import { Store } from '../utils/Store'

export default function Home() {
  
  const {state: {user, productData}} = useContext(Store)
  console.log(user, "user")
  return (
    <Layout>
      {
          <Grid container spacing = {3}>
                {productData.products.map(product => (
                  <Grid item xs = {6} md = {4} key = {product.name}>
                    
                      <ProductItem  product = {product} />
                    
                  </Grid> 
                ))}
          </Grid>
      }
    </Layout>
  )
}
