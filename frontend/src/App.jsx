import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'

import MainLayout from './components/layout/MainLayout'

import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import AddProduct from './pages/AddProduct'
import Inventory from './pages/Inventory'
import Recommendations from './pages/Recommendations'
import Monitoring from './pages/Monitoring'
import ChaosLab from './pages/ChaosLab'
import EditProduct from './pages/EditProduct'
import ProductDetails from './pages/ProductDetails'
import InventoryManagement from './pages/InventoryManagement'

function App() {
  return (
      <BrowserRouter>

        <Routes>

          <Route element={<MainLayout />}>

            <Route
                path="/"
                element={
                  <Navigate
                      to="/dashboard"
                      replace
                  />
                }
            />

            <Route
                path="/dashboard"
                element={<Dashboard />}
            />

            <Route
                path="/products"
                element={<Products />}
            />
              <Route path="/products/add" element={<AddProduct />} />

              <Route
                  path="/products/:id/edit"
                  element={<EditProduct />}
              />

            <Route
                path="/products/:id/details"
                element={<ProductDetails />}
            />

            
            <Route
                path="/products/:id/inventory"
                element={<InventoryManagement />}
            />

            <Route
                path="/inventory"
                element={<Inventory />}
            />

            <Route
                path="/recommendations"
                element={<Recommendations />}
            />

            <Route
                path="/monitoring"
                element={<Monitoring />}
            />

            <Route
                path="/chaos-lab"
                element={<ChaosLab />}
            />


          </Route>

        </Routes>

      </BrowserRouter>
  )
}

export default App