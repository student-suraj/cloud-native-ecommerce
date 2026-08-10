import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import {
    FiArrowLeft,
    FiBox,
    FiSave,
    FiPackage,
    FiMapPin,
    FiTruck,
} from 'react-icons/fi'
import { toast } from 'react-toastify'

import {
    getInventoryByProductId,
    updateInventory,
} from '../services/inventoryService'


function InventoryManagement() {

    const { id } = useParams()

    const navigate = useNavigate()


    const [inventory, setInventory] = useState(null)

    const [loading, setLoading] = useState(true)

    const [saving, setSaving] = useState(false)


    const [form, setForm] = useState({
        quantityAvailable: '',
        reservedQuantity: '',
        reorderLevel: '',
        maximumStockLevel: '',
    })


    useEffect(() => {

        const loadInventory = async () => {

            try {

                setLoading(true)

                const data =
                    await getInventoryByProductId(id)

                setInventory(data)

                setForm({
                    quantityAvailable:
                        data.quantityAvailable ?? '',

                    reservedQuantity:
                        data.reservedQuantity ?? '',

                    reorderLevel:
                        data.reorderLevel ?? '',

                    maximumStockLevel:
                        data.maximumStockLevel ?? '',
                })

            } catch (error) {

                console.error(
                    'Failed to load inventory:',
                    error
                )

                toast.error(
                    error?.response?.data?.message ||
                    'Unable to load inventory'
                )

            } finally {

                setLoading(false)

            }

        }

        loadInventory()

    }, [id])

    const availableQuantity =
        Number(form.quantityAvailable) || 0

    const reorderLevel =
        Number(form.reorderLevel) || 0

    const maximumStockLevel =
        Number(form.maximumStockLevel) || 0
    const handleChange = (event) => {

        const { name, value } = event.target

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }))

    }

    const getStockHealth = () => {

        if (availableQuantity <= 0) {
            return {
                label: 'Out of Stock',
                description: 'No inventory is currently available.',
                className: 'text-red-400',
                background: 'bg-red-500/10',
                border: 'border-red-500/20',
            }
        }

        if (availableQuantity <= reorderLevel) {
            return {
                label: 'Low Stock',
                description: 'Inventory has reached the reorder level.',
                className: 'text-amber-400',
                background: 'bg-amber-500/10',
                border: 'border-amber-500/20',
            }
        }

        if (
            maximumStockLevel > 0 &&
            availableQuantity >= maximumStockLevel
        ) {
            return {
                label: 'Maximum Stock',
                description: 'Inventory has reached the maximum stock level.',
                className: 'text-blue-400',
                background: 'bg-blue-500/10',
                border: 'border-blue-500/20',
            }
        }

        return {
            label: 'Healthy',
            description: 'Inventory level is currently healthy.',
            className: 'text-emerald-400',
            background: 'bg-emerald-500/10',
            border: 'border-emerald-500/20',
        }
    }


    const handleSubmit = async (event) => {

        event.preventDefault()


        try {

            setSaving(true)

            if (
                Number(form.reservedQuantity) >
                Number(form.quantityAvailable)
            ) {

                toast.error(
                    'Reserved quantity cannot exceed available quantity.'
                )

                setSaving(false)

                return
            }


            if (
                Number(form.reorderLevel) >
                Number(form.maximumStockLevel)
            ) {

                toast.error(
                    'Reorder level cannot exceed maximum stock level.'
                )

                setSaving(false)

                return
            }


            const payload = {

                quantityAvailable:
                    Number(form.quantityAvailable),

                reservedQuantity:
                    Number(form.reservedQuantity),

                reorderLevel:
                    Number(form.reorderLevel),

                maximumStockLevel:
                    Number(form.maximumStockLevel),

            }


            console.log(
                'Updating inventory:',
                payload
            )


            const updated =
                await updateInventory(
                    inventory.id,
                    payload
                )


            setInventory(updated)


            toast.success(
                'Inventory updated successfully'
            )

        } catch (error) {

            console.error(
                'Inventory update failed:',
                error
            )

            toast.error(
                error?.response?.data?.message ||
                'Failed to update inventory'
            )

        } finally {

            setSaving(false)

        }

    }


    if (loading) {

        return (

            <div className="flex min-h-[500px] items-center justify-center">

                <div className="text-center">

                    <div className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-zinc-700 border-t-cyan-400" />

                    <p className="mt-5 text-base text-zinc-400">
                        Loading inventory...
                    </p>

                </div>

            </div>

        )

    }


    if (!inventory) {

        return (

            <div className="flex min-h-[500px] items-center justify-center">

                <div className="text-center">

                    <p className="text-lg text-zinc-300">
                        Inventory not found.
                    </p>

                    <button
                        onClick={() => navigate('/products')}
                        className="mt-5 rounded-xl bg-cyan-500 px-6 py-3 text-base font-semibold text-zinc-950"
                    >
                        Back to Products
                    </button>

                </div>

            </div>

        )

    }


    return (

        <div className="mx-auto max-w-6xl space-y-7">


            {/* Header */}

            <div className="flex items-center gap-4">

                <button
                    onClick={() =>
                        navigate(`/products/${id}/details`)
                    }
                    className="rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-zinc-300 transition hover:border-zinc-600 hover:text-white"
                >
                    <FiArrowLeft size={21} />
                </button>


                <div>

                    <p className="text-base font-medium text-cyan-400">
                        Inventory Management
                    </p>

                    <h1 className="mt-1 text-4xl font-bold text-white">
                        Manage Stock
                    </h1>

                </div>

            </div>


            {/* Product information */}

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">


                <div className="flex items-center gap-4">

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400">

                        <FiBox size={26} />

                    </div>


                    <div>

                        <h2 className="text-2xl font-bold text-white">
                            {inventory.productName}
                        </h2>

                        <p className="mt-1 text-base text-zinc-400">
                            SKU: {inventory.sku}
                        </p>

                    </div>

                </div>


                <div className="mt-6 grid gap-4 sm:grid-cols-3">


                    <InfoCard
                        icon={<FiMapPin />}
                        label="Warehouse"
                        value={inventory.warehouseCode}
                    />


                    <InfoCard
                        icon={<FiTruck />}
                        label="Supplier"
                        value={inventory.supplierName}
                    />


                    <InfoCard
                        icon={<FiPackage />}
                        label="Status"
                        value={inventory.status}
                    />


                </div>

            </div>


            {/* Form */}

            <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6"
            >

                <div className="mb-7">

                    <h2 className="text-2xl font-bold text-white">
                        Stock Configuration
                    </h2>

                    <p className="mt-2 text-base text-zinc-400">
                        Update inventory quantities and stock thresholds.
                    </p>

                </div>


                <div className="grid gap-6 md:grid-cols-2">


                    <NumberInput
                        label="Available Quantity"
                        name="quantityAvailable"
                        value={form.quantityAvailable}
                        onChange={handleChange}
                        min="0"
                    />


                    <NumberInput
                        label="Reserved Quantity"
                        name="reservedQuantity"
                        value={form.reservedQuantity}
                        onChange={handleChange}
                        min="0"
                    />


                    <NumberInput
                        label="Reorder Level"
                        name="reorderLevel"
                        value={form.reorderLevel}
                        onChange={handleChange}
                        min="0"
                    />


                    <NumberInput
                        label="Maximum Stock Level"
                        name="maximumStockLevel"
                        value={form.maximumStockLevel}
                        onChange={handleChange}
                        min="0"
                    />

                </div>


                {/* Stock health */}

                <div className="mt-7">

                    {(() => {

                        const health = getStockHealth()

                        return (

                            <div
                                className={`rounded-2xl border ${health.border} ${health.background} p-6`}
                            >

                                <div className="flex items-center justify-between">

                                    <div>

                                        <p className="text-sm font-medium uppercase tracking-wide text-zinc-400">
                                            Stock Health
                                        </p>

                                        <h3
                                            className={`mt-2 text-2xl font-bold ${health.className}`}
                                        >
                                            {health.label}
                                        </h3>

                                        <p className="mt-2 text-base text-zinc-400">
                                            {health.description}
                                        </p>

                                    </div>

                                    <div
                                        className={`h-4 w-4 rounded-full ${health.className.replace(
                                            'text-',
                                            'bg-'
                                        )}`}
                                    />

                                </div>

                            </div>

                        )

                    })()}

                </div>


                <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-base font-semibold text-white">
                                Stock Capacity
                            </p>

                            <p className="mt-1 text-sm text-zinc-400">
                                Available inventory compared with maximum capacity
                            </p>

                        </div>

                        <p className="text-lg font-bold text-white">
                            {availableQuantity} / {maximumStockLevel || '∞'}
                        </p>

                    </div>


                    {maximumStockLevel > 0 && (

                        <div className="mt-5 h-3 overflow-hidden rounded-full bg-zinc-800">

                            <div
                                className="h-full rounded-full bg-cyan-400 transition-all duration-500"
                                style={{
                                    width: `${Math.min(
                                        (availableQuantity / maximumStockLevel) * 100,
                                        100
                                    )}%`,
                                }}
                            />

                        </div>

                    )}

                </div>

                {/* Buttons */}

                <div className="mt-8 flex flex-wrap gap-4">


                    <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 text-base font-bold text-zinc-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
                    >

                        <FiSave size={19} />

                        {saving
                            ? 'Saving...'
                            : 'Save Inventory'}

                    </button>


                    <button
                        type="button"
                        onClick={() =>
                            navigate(`/products/${id}/details`)
                        }
                        className="rounded-xl border border-zinc-800 px-6 py-3 text-base font-semibold text-zinc-300 transition hover:border-zinc-600 hover:text-white"
                    >
                        Cancel
                    </button>


                </div>

            </form>

        </div>

    )

}


function NumberInput({
                         label,
                         name,
                         value,
                         onChange,
                         min,
                     }) {

    return (

        <div>

            <label className="mb-2 block text-base font-medium text-zinc-300">

                {label}

            </label>


            <input
                type="number"
                name={name}
                value={value}
                onChange={onChange}
                min={min}
                required
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-lg text-white outline-none transition placeholder:text-zinc-600 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            />

        </div>

    )

}


function InfoCard({
                      icon,
                      label,
                      value,
                  }) {

    return (

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">

            <div className="flex items-center gap-3">

        <span className="text-cyan-400">
          {icon}
        </span>

                <p className="text-sm font-medium text-zinc-400">
                    {label}
                </p>

            </div>

            <p className="mt-3 text-base font-semibold text-white">
                {value || '—'}
            </p>

        </div>

    )

}


export default InventoryManagement