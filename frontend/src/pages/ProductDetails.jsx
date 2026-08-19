import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Recommendations from './Recommendations'
import {
    FiArrowLeft,
    FiBox,
    FiDatabase,
    FiMapPin,
    FiPackage,
    FiTruck,
    FiUser,
} from 'react-icons/fi'
import { toast } from 'react-toastify'

import { getProductDetails } from '../services/productService'


function ProductDetails() {

    const { id } = useParams()
    const navigate = useNavigate()

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const loadDetails = async () => {

            try {

                setLoading(true)

                const response = await getProductDetails(id)

                setData(response)

            } catch (error) {

                console.error(
                    'Failed to load product details:',
                    error
                )

                toast.error(
                    error?.response?.data?.message ||
                    'Unable to load product details'
                )

            } finally {

                setLoading(false)

            }
        }

        loadDetails()

    }, [id])


    if (loading) {

        return (

            <div className="flex min-h-[500px] items-center justify-center">

                <div className="text-center">

                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-zinc-700 border-t-cyan-400" />

                    <p className="mt-4 text-sm text-zinc-500">
                        Loading product details...
                    </p>

                </div>

            </div>

        )
    }


    if (!data) {

        return (

            <div className="flex min-h-[500px] items-center justify-center">

                <div className="text-center">

                    <p className="text-zinc-400">
                        Product details not found.
                    </p>

                    <button
                        onClick={() => navigate('/products')}
                        className="mt-4 rounded-xl bg-cyan-500 px-5 py-2 text-sm font-semibold text-zinc-950"
                    >
                        Back to Products
                    </button>

                </div>

            </div>

        )
    }


    const product = data.product
    const inventory = data.inventory


    return (

        <div className="mx-auto max-w-6xl space-y-6">

            {/* Header */}

            <div className="flex items-center gap-4">

                <button
                    onClick={() => navigate('/products')}
                    className="rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-zinc-400 transition hover:border-zinc-700 hover:text-white"
                >
                    <FiArrowLeft size={18} />
                </button>

                <div>

                    <p className="text-sm text-cyan-400">
                        Product Management
                    </p>

                    <h1 className="mt-1 text-3xl font-bold text-white">
                        Product Details
                    </h1>

                </div>

            </div>


            {/* Product card */}

            <div className="grid gap-6 lg:grid-cols-3">


                {/* Image */}

                <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">

                    <div className="aspect-square bg-zinc-900">

                        {product.imageUrl ? (

                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="h-full w-full object-cover"
                                onError={(event) => {
                                    event.currentTarget.style.display = 'none'
                                }}
                            />

                        ) : (

                            <div className="flex h-full items-center justify-center text-zinc-700">

                                <FiBox size={70} />

                            </div>

                        )}

                    </div>

                </div>


                {/* Product information */}

                <div className="space-y-6 lg:col-span-2">


                    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">

                        <div className="flex flex-wrap items-start justify-between gap-4">

                            <div>

                                <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400">

                                    {product.category}

                                </span>

                                <h2 className="mt-4 text-3xl font-bold text-white">

                                    {product.name}

                                </h2>

                                <p className="mt-1 text-zinc-500">

                                    {product.brand}

                                </p>

                            </div>


                            <span
                                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                    product.status === 'ACTIVE'
                                        ? 'bg-emerald-500/10 text-emerald-400'
                                        : 'bg-red-500/10 text-red-400'
                                }`}
                            >

                                {product.status}

                            </span>

                        </div>


                        <div className="mt-8">

                            <p className="text-sm text-zinc-500">
                                Price
                            </p>

                            <p className="mt-1 text-3xl font-bold text-white">

                                {product.currency}{' '}

                                {Number(product.price).toLocaleString(
                                    'en-IN'
                                )}

                            </p>

                        </div>


                        <div className="mt-8 grid gap-4 sm:grid-cols-2">

                            <InfoItem
                                label="SKU"
                                value={product.sku}
                            />

                            <InfoItem
                                label="Color"
                                value={product.color}
                            />

                            <InfoItem
                                label="Weight"
                                value={`${product.weight} kg`}
                            />

                            <InfoItem
                                label="Currency"
                                value={product.currency}
                            />

                        </div>


                        {product.description && (

                            <div className="mt-8 border-t border-zinc-800 pt-6">

                                <p className="text-sm text-zinc-500">
                                    Description
                                </p>

                                <p className="mt-2 text-sm leading-7 text-zinc-300">
                                    {product.description}
                                </p>

                            </div>

                        )}

                    </div>


                    {/* Inventory */}

                    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">

                        <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">

                                <FiDatabase />

                            </div>

                            <div>

                                <h2 className="font-semibold text-white">
                                    Inventory Information
                                </h2>

                                <p className="text-xs text-zinc-600">
                                    Data received from Inventory Service
                                </p>

                            </div>

                        </div>


                        {/* Inventory status */}

                        <div className="mt-6 flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">

                            <div className="flex items-center gap-3">

                                <FiPackage className="text-zinc-500" />

                                <span className="text-sm text-zinc-400">
                                    Inventory Status
                                </span>

                            </div>


                            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">

                                {inventory.status}

                            </span>

                        </div>


                        {/* Stock statistics */}

                        <div className="mt-5 grid gap-4 sm:grid-cols-3">

                            <InventoryCard
                                label="Available"
                                value={inventory.quantityAvailable}
                            />

                            <InventoryCard
                                label="Reserved"
                                value={inventory.reservedQuantity}
                            />

                            <InventoryCard
                                label="Reorder Level"
                                value={inventory.reorderLevel}
                            />

                        </div>


                        {/* Warehouse */}

                        <div className="mt-6 grid gap-4 sm:grid-cols-2">

                            <InfoItem
                                icon={<FiMapPin />}
                                label="Warehouse"
                                value={inventory.warehouseCode}
                            />

                            <InfoItem
                                label="Warehouse Zone"
                                value={inventory.warehouseZone}
                            />

                            <InfoItem
                                icon={<FiTruck />}
                                label="Supplier"
                                value={inventory.supplierName}
                            />

                            <InfoItem
                                icon={<FiUser />}
                                label="Supplier Code"
                                value={inventory.supplierCode}
                            />

                        </div>


                        {/* Stock levels */}

                        <div className="mt-6 grid gap-4 sm:grid-cols-2">

                            <InfoItem
                                label="Maximum Stock"
                                value={inventory.maximumStockLevel}
                            />

                            <InfoItem
                                label="Unit Price"
                                value={`${inventory.currency} ${Number(
                                    inventory.unitPrice
                                ).toLocaleString('en-IN')}`}
                            />

                        </div>


                        {inventory.remarks && (

                            <div className="mt-6 rounded-xl bg-zinc-900 p-4">

                                <p className="text-xs text-zinc-600">
                                    Inventory Remarks
                                </p>

                                <p className="mt-2 text-sm text-zinc-300">
                                    {inventory.remarks}
                                </p>

                            </div>

                        )}

                    </div>


                    {/* Recommendations */}

                    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">

                        <Recommendations
                            productId={product.id}
                        />

                    </div>


                    {/* Actions */}

                    <div className="flex flex-wrap gap-3">

                        <button
                            onClick={() =>
                                navigate(`/products/${id}/edit`)
                            }
                            className="rounded-xl bg-cyan-500 px-5 py-3 text-sm font-bold text-zinc-950 transition hover:bg-cyan-400"
                        >
                            Edit Product
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
                            onClick={() => navigate('/products')}
                            className="rounded-xl border border-zinc-800 px-5 py-3 text-sm font-semibold text-zinc-400 transition hover:text-white"
                        >
                            Back
                        </button>

                    </div>

                </div>

            </div>

        </div>

    )
}


function InfoItem({
                      icon,
                      label,
                      value,
                  }) {

    return (

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">

            <div className="flex items-center gap-2">

                {icon && (
                    <span className="text-zinc-500">
                        {icon}
                    </span>
                )}

                <p className="text-xs text-zinc-600">
                    {label}
                </p>

            </div>

            <p className="mt-2 break-words text-sm font-medium text-zinc-200">
                {value ?? '—'}
            </p>

        </div>

    )
}


function InventoryCard({
                           label,
                           value,
                       }) {

    return (

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">

            <p className="text-xs text-zinc-600">
                {label}
            </p>

            <p className="mt-2 text-2xl font-bold text-white">
                {value ?? 0}
            </p>

        </div>

    )
}


export default ProductDetails