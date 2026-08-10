import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
    FiSearch,
    FiPlus,
    FiEdit2,
    FiTrash2,
    FiPackage,
    FiRefreshCw,
    FiChevronLeft,
    FiChevronRight,
} from 'react-icons/fi'

import {
    getProducts,
    deleteProduct,
} from '../services/productService'

function Products() {

    const [products, setProducts] = useState([])

    const [loading, setLoading] = useState(true)

    const [error, setError] = useState('')

    const [search, setSearch] = useState('')

    const [page, setPage] = useState(0)

    const [totalPages, setTotalPages] = useState(0)

    const [totalElements, setTotalElements] = useState(0);
    const navigate = useNavigate()


    const loadProducts = async () => {

        try {

            setLoading(true)
            setError('')

            const data = await getProducts({
                page,
                size: 10,
                sortBy: 'id',
            })

            setProducts(data.content || [])

            setTotalPages(data.totalPages || 0)

            setTotalElements(data.totalElements || 0)

        } catch (err) {

            console.error('Failed to load products:', err)

            setError(
                'Unable to load products. Please check that the API Gateway and Product Service are running.'
            )

        } finally {

            setLoading(false)

        }
    }


    useEffect(() => {

        loadProducts()

    }, [page])


    const filteredProducts = useMemo(() => {

        const searchText = search.toLowerCase().trim()

        if (!searchText) {
            return products
        }

        return products.filter((product) =>
            product.name?.toLowerCase().includes(searchText) ||
            product.sku?.toLowerCase().includes(searchText) ||
            product.brand?.toLowerCase().includes(searchText) ||
            product.category?.toLowerCase().includes(searchText)
        )

    }, [products, search])

    const handleDelete = async (id, name) => {

        const confirmed = window.confirm(
            `Are you sure you want to delete "${name}"?`
        )

        if (!confirmed) {
            return
        }


        try {

            await deleteProduct(id)

            toast.success(
                'Product deleted successfully'
            )

            await loadProducts()

        } catch (error) {

            console.error(
                'Delete product failed:',
                error
            )

            toast.error(
                error?.response?.data?.message ||
                'Unable to delete product'
            )

        }
    }


    return (

        <div className="space-y-8">

            {/* Header */}

            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                <div>

                    <p className="text-sm text-cyan-400">
                        Catalog Management
                    </p>

                    <h1 className="mt-1 text-3xl font-bold tracking-tight text-white">
                        Products
                    </h1>

                    <p className="mt-2 text-sm text-zinc-500">
                        Manage products available in your e-commerce platform.
                    </p>

                </div>


                <button
                    type="button"
                    onClick={() => navigate('/products/add')}
                    className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-cyan-400"
                >
                    <FiPlus size={17} />
                    Add Product
                </button>

            </div>


            {/* Stats */}

            <div className="grid gap-4 sm:grid-cols-3">

                <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5">

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                            <FiPackage />
                        </div>

                        <div>

                            <p className="text-xs uppercase tracking-wider text-zinc-600">
                                Total Products
                            </p>

                            <p className="mt-1 text-2xl font-bold text-white">
                                {totalElements}
                            </p>

                        </div>

                    </div>

                </div>


                <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5">

                    <p className="text-xs uppercase tracking-wider text-zinc-600">
                        Current Page
                    </p>

                    <p className="mt-1 text-2xl font-bold text-white">
                        {page + 1}
                    </p>

                </div>


                <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5">

                    <p className="text-xs uppercase tracking-wider text-zinc-600">
                        Total Pages
                    </p>

                    <p className="mt-1 text-2xl font-bold text-white">
                        {totalPages}
                    </p>

                </div>

            </div>


            {/* Search */}

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4">

                <div className="flex flex-col gap-3 md:flex-row">

                    <div className="relative flex-1">

                        <FiSearch
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by product name, SKU, brand or category..."
                            className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-cyan-500/50"
                        />

                    </div>


                    <button
                        type="button"
                        onClick={loadProducts}
                        className="flex items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-3 text-sm text-zinc-300 transition hover:border-zinc-700 hover:text-white"
                    >

                        <FiRefreshCw size={16} />

                        Refresh

                    </button>

                </div>

            </div>


            {/* Error */}

            {error && (

                <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-400">

                    {error}

                </div>

            )}


            {/* Loading */}

            {loading ? (

                <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-12 text-center">

                    <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-zinc-700 border-t-cyan-400" />

                    <p className="mt-4 text-sm text-zinc-500">
                        Loading products...
                    </p>

                </div>

            ) : (

                /* Product Table */

                <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/80">

                    <div className="overflow-x-auto">

                        <table className="w-full min-w-[850px]">

                            <thead>

                            <tr className="border-b border-zinc-800">

                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-600">
                                    Product
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-600">
                                    SKU
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-600">
                                    Category
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-600">
                                    Price
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-600">
                                    Status
                                </th>

                                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-zinc-600">
                                    Actions
                                </th>

                            </tr>

                            </thead>


                            <tbody>

                            {filteredProducts.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="px-6 py-16 text-center"
                                    >

                                        <FiPackage
                                            size={30}
                                            className="mx-auto text-zinc-700"
                                        />

                                        <p className="mt-3 text-sm text-zinc-500">
                                            No products found
                                        </p>

                                    </td>

                                </tr>

                            ) : (

                                filteredProducts.map((product) => (

                                    <tr
                                        key={product.id}
                                        className="border-b border-zinc-900 transition hover:bg-zinc-900/50"
                                    >

                                        {/* Product */}

                                        <td className="px-6 py-5">

                                            <div>

                                                <p className="font-medium text-white">
                                                    {product.name}
                                                </p>

                                                <p className="mt-1 text-xs text-zinc-600">
                                                    {product.brand}
                                                </p>

                                            </div>

                                        </td>


                                        {/* SKU */}

                                        <td className="px-6 py-5">

                        <span className="rounded-lg bg-zinc-900 px-2.5 py-1 font-mono text-xs text-zinc-400">
                          {product.sku}
                        </span>

                                        </td>


                                        {/* Category */}

                                        <td className="px-6 py-5">

                        <span className="text-sm text-zinc-400">
                          {product.category}
                        </span>

                                        </td>


                                        {/* Price */}

                                        <td className="px-6 py-5">

                        <span className="font-semibold text-white">
                          {product.currency || 'INR'}{' '}
                            {Number(product.price || 0).toLocaleString('en-IN')}
                        </span>

                                        </td>


                                        {/* Status */}

                                        <td className="px-6 py-5">

                        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">

                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                            {product.status || 'ACTIVE'}

                        </span>

                                        </td>


                                        {/* Actions */}

                                        <td className="px-6 py-5">

                                            <div className="flex justify-end gap-2">

                                                <button
                                                    type="button"
                                                    onClick={() => navigate(`/products/${product.id}/edit`)}
                                                    className="rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-800 hover:text-cyan-400"
                                                    title="Edit product"
                                                >
                                                    <FiEdit2 size={16} />
                                                </button>


                                                <button
                                                    onClick={() =>
                                                        navigate(`/products/${id}/inventory`)
                                                    }
                                                    className="rounded-xl border border-purple-500/30 bg-purple-500/10 px-5 py-3 text-base font-semibold text-purple-400 transition hover:bg-purple-500/20"
                                                >
                                                    Manage Inventory
                                                </button>
                                                
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        navigate(`/products/${product.id}/details`)
                                                    }
                                                    className="rounded-lg px-3 py-2 text-xs font-semibold text-cyan-100 transition hover:bg-cyan-500/10"
                                                >
                                                    View Details
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleDelete(product.id, product.name)
                                                    }
                                                    className="rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-800 hover:text-red-400"
                                                    title="Delete product"
                                                >
                                                    <FiTrash2 size={16} />
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            )}

                            </tbody>

                        </table>

                    </div>


                    {/* Pagination */}

                    <div className="flex items-center justify-between border-t border-zinc-800 px-6 py-4">

                        <p className="text-xs text-zinc-600">

                            Page {page + 1} of {Math.max(totalPages, 1)}

                        </p>


                        <div className="flex gap-2">

                            <button
                                type="button"
                                disabled={page === 0}
                                onClick={() => setPage((current) => current - 1)}
                                className="rounded-lg border border-zinc-800 p-2 text-zinc-400 transition hover:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-30"
                            >

                                <FiChevronLeft size={16} />

                            </button>


                            <button
                                type="button"
                                disabled={
                                    totalPages === 0 ||
                                    page >= totalPages - 1
                                }
                                onClick={() => setPage((current) => current + 1)}
                                className="rounded-lg border border-zinc-800 p-2 text-zinc-400 transition hover:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-30"
                            >

                                <FiChevronRight size={16} />

                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    )
}

export default Products