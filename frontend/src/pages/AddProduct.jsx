import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    FiArrowLeft,
    FiCheck,
    FiImage,
    FiPackage,
} from 'react-icons/fi'
import { toast } from 'react-toastify'

import { createProduct } from '../services/productService'


const initialForm = {
    sku: '',
    name: '',
    brand: '',
    category: 'MOBILE',
    description: '',
    price: '',
    currency: 'INR',
    weight: '',
    color: '',
    imageUrl: '',
    status: 'ACTIVE',
}


function AddProduct() {

    const navigate = useNavigate()

    const [form, setForm] = useState(initialForm)

    const [loading, setLoading] = useState(false)

    const [errors, setErrors] = useState({})


    const handleChange = (event) => {

        const { name, value } = event.target

        setForm((current) => ({
            ...current,
            [name]: value,
        }))

        setErrors((current) => ({
            ...current,
            [name]: '',
        }))
    }


    const validate = () => {

        const newErrors = {}


        if (!form.sku.trim()) {
            newErrors.sku = 'SKU is required'
        }


        if (!form.name.trim()) {
            newErrors.name = 'Product name is required'
        }


        if (!form.brand.trim()) {
            newErrors.brand = 'Brand is required'
        }


        if (!form.category) {
            newErrors.category = 'Category is required'
        }


        if (!form.price || Number(form.price) <= 0) {
            newErrors.price = 'Price must be greater than 0'
        }


        if (!form.currency.trim()) {
            newErrors.currency = 'Currency is required'
        }


        if (!form.weight || Number(form.weight) <= 0) {
            newErrors.weight = 'Weight must be greater than 0'
        }


        if (!form.color.trim()) {
            newErrors.color = 'Color is required'
        }


        if (!form.imageUrl.trim()) {
            newErrors.imageUrl = 'Image URL is required'
        }


        if (!form.status) {
            newErrors.status = 'Status is required'
        }


        setErrors(newErrors)

        return Object.keys(newErrors).length === 0
    }


    const handleSubmit = async (event) => {

        event.preventDefault()


        if (!validate()) {
            toast.error('Please fix the highlighted fields')
            return
        }


        try {

            setLoading(true)


            const payload = {
                sku: form.sku.trim(),
                name: form.name.trim(),
                brand: form.brand.trim(),
                category: form.category,
                description: form.description.trim(),
                price: Number(form.price),
                currency: form.currency.trim(),
                weight: Number(form.weight),
                color: form.color.trim(),
                imageUrl: form.imageUrl.trim(),
                status: form.status,
            }


            await createProduct(payload)


            toast.success('Product created successfully')


            navigate('/products')


        } catch (error) {

            console.error('Create product failed:', error)


            const backendMessage =
                error?.response?.data?.message


            if (error?.response?.status === 409) {

                toast.error(
                    backendMessage || 'SKU already exists'
                )

            } else if (error?.response?.status === 400) {

                toast.error(
                    backendMessage || 'Invalid product data'
                )

            } else {

                toast.error(
                    backendMessage ||
                    'Unable to create product. Check your backend services.'
                )

            }

        } finally {

            setLoading(false)

        }
    }


    const inputClass = (field) => `
    mt-2 w-full rounded-xl border
    ${errors[field]
        ? 'border-red-500/60'
        : 'border-zinc-800'}
    bg-zinc-900 px-4 py-3
    text-sm text-white
    outline-none
    transition
    placeholder:text-zinc-600
    focus:border-cyan-500/60
  `


    return (

        <div className="mx-auto max-w-5xl space-y-8">


            {/* Header */}

            <div className="flex items-start gap-4">

                <button
                    type="button"
                    onClick={() => navigate('/products')}
                    className="mt-1 rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-zinc-400 transition hover:border-zinc-700 hover:text-white"
                >

                    <FiArrowLeft size={18} />

                </button>


                <div>

                    <p className="text-sm text-cyan-400">
                        Product Management
                    </p>

                    <h1 className="mt-1 text-3xl font-bold text-white">
                        Add Product
                    </h1>

                    <p className="mt-2 text-sm text-zinc-500">
                        Add a new product to your e-commerce catalog.
                    </p>

                </div>

            </div>


            {/* Form */}

            <form
                onSubmit={handleSubmit}
                className="space-y-6"
            >


                {/* Basic Information */}

                <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6">

                    <div className="mb-6 flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">

                            <FiPackage />

                        </div>

                        <div>

                            <h2 className="font-semibold text-white">
                                Basic Information
                            </h2>

                            <p className="text-xs text-zinc-600">
                                Main product identification details
                            </p>

                        </div>

                    </div>


                    <div className="grid gap-5 md:grid-cols-2">


                        {/* SKU */}

                        <div>

                            <label className="text-sm font-medium text-zinc-300">
                                SKU *
                            </label>

                            <input
                                name="sku"
                                value={form.sku}
                                onChange={handleChange}
                                placeholder="APL-IP16-128"
                                className={inputClass('sku')}
                            />

                            {errors.sku && (
                                <p className="mt-1 text-xs text-red-400">
                                    {errors.sku}
                                </p>
                            )}

                        </div>


                        {/* Name */}

                        <div>

                            <label className="text-sm font-medium text-zinc-300">
                                Product Name *
                            </label>

                            <input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Apple iPhone 16"
                                className={inputClass('name')}
                            />

                            {errors.name && (
                                <p className="mt-1 text-xs text-red-400">
                                    {errors.name}
                                </p>
                            )}

                        </div>


                        {/* Brand */}

                        <div>

                            <label className="text-sm font-medium text-zinc-300">
                                Brand *
                            </label>

                            <input
                                name="brand"
                                value={form.brand}
                                onChange={handleChange}
                                placeholder="Apple"
                                className={inputClass('brand')}
                            />

                            {errors.brand && (
                                <p className="mt-1 text-xs text-red-400">
                                    {errors.brand}
                                </p>
                            )}

                        </div>


                        {/* Category */}

                        <div>

                            <label className="text-sm font-medium text-zinc-300">
                                Category *
                            </label>

                            <select
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                className={inputClass('category')}
                            >

                                <option value="MOBILE">MOBILE</option>
                                <option value="LAPTOP">LAPTOP</option>
                                <option value="TABLET">TABLET</option>
                                <option value="AUDIO">AUDIO</option>
                                <option value="WATCH">WATCH</option>
                                <option value="ACCESSORY">ACCESSORY</option>

                            </select>

                            {errors.category && (
                                <p className="mt-1 text-xs text-red-400">
                                    {errors.category}
                                </p>
                            )}

                        </div>


                        {/* Description */}

                        <div className="md:col-span-2">

                            <label className="text-sm font-medium text-zinc-300">
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                rows="4"
                                placeholder="Describe the product..."
                                className={inputClass('description')}
                            />

                        </div>

                    </div>

                </div>


                {/* Pricing */}

                <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6">

                    <h2 className="mb-6 font-semibold text-white">
                        Pricing & Physical Details
                    </h2>


                    <div className="grid gap-5 md:grid-cols-3">


                        {/* Price */}

                        <div>

                            <label className="text-sm font-medium text-zinc-300">
                                Price *
                            </label>

                            <input
                                type="number"
                                step="0.01"
                                min="0.01"
                                name="price"
                                value={form.price}
                                onChange={handleChange}
                                placeholder="79999"
                                className={inputClass('price')}
                            />

                            {errors.price && (
                                <p className="mt-1 text-xs text-red-400">
                                    {errors.price}
                                </p>
                            )}

                        </div>


                        {/* Currency */}

                        <div>

                            <label className="text-sm font-medium text-zinc-300">
                                Currency *
                            </label>

                            <input
                                name="currency"
                                value={form.currency}
                                onChange={handleChange}
                                placeholder="INR"
                                className={inputClass('currency')}
                            />

                            {errors.currency && (
                                <p className="mt-1 text-xs text-red-400">
                                    {errors.currency}
                                </p>
                            )}

                        </div>


                        {/* Weight */}

                        <div>

                            <label className="text-sm font-medium text-zinc-300">
                                Weight (kg) *
                            </label>

                            <input
                                type="number"
                                step="0.01"
                                min="0.01"
                                name="weight"
                                value={form.weight}
                                onChange={handleChange}
                                placeholder="0.19"
                                className={inputClass('weight')}
                            />

                            {errors.weight && (
                                <p className="mt-1 text-xs text-red-400">
                                    {errors.weight}
                                </p>
                            )}

                        </div>


                        {/* Color */}

                        <div>

                            <label className="text-sm font-medium text-zinc-300">
                                Color *
                            </label>

                            <input
                                name="color"
                                value={form.color}
                                onChange={handleChange}
                                placeholder="Black"
                                className={inputClass('color')}
                            />

                            {errors.color && (
                                <p className="mt-1 text-xs text-red-400">
                                    {errors.color}
                                </p>
                            )}

                        </div>


                        {/* Status */}

                        <div>

                            <label className="text-sm font-medium text-zinc-300">
                                Status *
                            </label>

                            <select
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                                className={inputClass('status')}
                            >

                                <option value="ACTIVE">
                                    ACTIVE
                                </option>

                                <option value="INACTIVE">
                                    INACTIVE
                                </option>

                            </select>

                        </div>

                    </div>

                </div>


                {/* Image */}

                <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6">

                    <div className="mb-6 flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">

                            <FiImage />

                        </div>

                        <div>

                            <h2 className="font-semibold text-white">
                                Product Image
                            </h2>

                            <p className="text-xs text-zinc-600">
                                Provide the image URL for this product
                            </p>

                        </div>

                    </div>


                    <label className="text-sm font-medium text-zinc-300">
                        Image URL *
                    </label>

                    <input
                        name="imageUrl"
                        value={form.imageUrl}
                        onChange={handleChange}
                        placeholder="https://example.com/images/product.jpg"
                        className={inputClass('imageUrl')}
                    />

                    {errors.imageUrl && (
                        <p className="mt-1 text-xs text-red-400">
                            {errors.imageUrl}
                        </p>
                    )}

                </div>


                {/* Buttons */}

                <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">

                    <button
                        type="button"
                        onClick={() => navigate('/products')}
                        className="rounded-xl border border-zinc-800 bg-zinc-950 px-6 py-3 text-sm font-semibold text-zinc-400 transition hover:border-zinc-700 hover:text-white"
                    >

                        Cancel

                    </button>


                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 text-sm font-bold text-zinc-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
                    >

                        {loading ? (

                            <>
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-950/30 border-t-zinc-950" />

                                Creating...

                            </>

                        ) : (

                            <>
                                <FiCheck size={17} />

                                Create Product

                            </>

                        )}

                    </button>

                </div>

            </form>

        </div>
    )
}


export default AddProduct