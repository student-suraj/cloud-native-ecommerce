import { useEffect, useState } from "react";
import { Sparkles, Package, ArrowRight } from "lucide-react";
import { getRecommendationsByProduct } from "../services/recommendationService";

function Recommendations({ productId }) {
    const [recommendations, setRecommendations] = useState([]);
    const [fallbackProducts, setFallbackProducts] = useState([]);
    const [isFallback, setIsFallback] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!productId) {
            setRecommendations([]);
            setFallbackProducts([]);
            setIsFallback(false);
            return;
        }

        let cancelled = false;

        const loadRecommendations = async () => {
            setLoading(true);
            setError(null);

            try {
                const response =
                    await getRecommendationsByProduct(productId);

                if (cancelled) return;

                /*
                 * Normal recommendation response:
                 *
                 * {
                 *   content: [...]
                 * }
                 *
                 * Fallback response:
                 *
                 * {
                 *   content: [...products...],
                 *   fallback: true,
                 *   message: "..."
                 * }
                 */

                const data = response?.data ?? response ?? {};

                if (data.fallback === true) {
                    setIsFallback(true);
                    setRecommendations([]);
                    setFallbackProducts(
                        Array.isArray(data.content)
                            ? data.content
                            : []
                    );
                } else {
                    setIsFallback(false);
                    setFallbackProducts([]);
                    setRecommendations(
                        Array.isArray(data.content)
                            ? data.content
                            : []
                    );
                }

            } catch (err) {
                if (cancelled) return;

                console.error(
                    "Failed to load recommendations:",
                    err
                );

                /*
                 * If the gateway does not return the fallback
                 * response and gives a real error, don't crash
                 * the entire product-details page.
                 */
                setRecommendations([]);
                setFallbackProducts([]);
                setIsFallback(false);
                setError(
                    "Recommendations are temporarily unavailable."
                );
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        loadRecommendations();

        return () => {
            cancelled = true;
        };
    }, [productId]);

    /*
     * Loading state
     */
    if (loading) {
        return (
            <section className="mt-8">
                <div className="mb-4">
                    <div className="flex items-center gap-2">
                        <Sparkles
                            size={20}
                            className="text-cyan-400"
                        />

                        <h2 className="text-xl font-semibold text-white">
                            Recommendations
                        </h2>
                    </div>

                    <p className="mt-1 text-sm text-zinc-500">
                        Finding products you may like...
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((item) => (
                        <div
                            key={item}
                            className="h-48 animate-pulse rounded-2xl border border-zinc-800 bg-zinc-900/50"
                        />
                    ))}
                </div>
            </section>
        );
    }

    /*
     * Gateway fallback:
     *
     * Recommendation service is DOWN,
     * but Product Service is still available.
     */
    if (isFallback) {
        return (
            <section className="mt-8">

                <div className="mb-5">
                    <div className="flex items-center gap-2">

                        <Package
                            size={20}
                            className="text-cyan-400"
                        />

                        <h2 className="text-xl font-semibold text-white">
                            You May Also Like
                        </h2>

                    </div>

                    <p className="mt-1 text-sm text-zinc-500">
                        Recommendations are temporarily unavailable.
                        Here are some other products instead.
                    </p>
                </div>

                {fallbackProducts.length > 0 ? (
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {fallbackProducts.map((product) => (
                            <FallbackProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        message="No alternative products are currently available."
                    />
                )}

            </section>
        );
    }

    /*
     * Real recommendation service is working,
     * but there are no recommendations.
     */
    if (!error && recommendations.length === 0) {
        return (
            <section className="mt-8">

                <div className="mb-5">
                    <div className="flex items-center gap-2">

                        <Sparkles
                            size={20}
                            className="text-cyan-400"
                        />

                        <h2 className="text-xl font-semibold text-white">
                            Recommendations
                        </h2>

                    </div>

                    <p className="mt-1 text-sm text-zinc-500">
                        No recommendations available for this product yet.
                    </p>
                </div>

            </section>
        );
    }

    /*
     * Real recommendations
     */
    return (
        <section className="mt-8">

            <div className="mb-5">

                <div className="flex items-center gap-2">

                    <Sparkles
                        size={20}
                        className="text-cyan-400"
                    />

                    <h2 className="text-xl font-semibold text-white">
                        Recommendations
                    </h2>

                </div>

                <p className="mt-1 text-sm text-zinc-500">
                    Products selected based on your current product.
                </p>

            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                {recommendations.map((recommendation) => (
                    <RecommendationCard
                        key={recommendation.id}
                        recommendation={recommendation}
                    />
                ))}

            </div>

        </section>
    );
}


/*
 * ============================================================
 * REAL RECOMMENDATION CARD
 * ============================================================
 */
function RecommendationCard({ recommendation }) {

    const product = recommendation?.recommendedProduct;

    return (
        <div className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/80 transition hover:border-zinc-700 hover:bg-zinc-900">

            <div className="flex h-44 items-center justify-center bg-zinc-900">

                {product?.imageUrl ? (
                    <img
                        src={product.imageUrl}
                        alt={product.name || "Recommended product"}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                ) : (
                    <Package
                        size={42}
                        className="text-zinc-700"
                    />
                )}

            </div>

            <div className="p-5">

                <p className="text-xs uppercase tracking-wider text-cyan-400">
                    {recommendation.recommendationType
                        ?.replaceAll("_", " ") || "Recommended"}
                </p>

                <h3 className="mt-2 text-lg font-semibold text-white">
                    {product?.name ||
                        `Product #${recommendation.recommendedProductId}`}
                </h3>

                <p className="mt-2 text-sm text-zinc-500">
                    Recommendation score:{" "}
                    {recommendation.score ?? "N/A"}
                </p>

                <button
                    type="button"
                    className="mt-4 flex items-center gap-2 text-sm font-medium text-cyan-400 transition hover:text-cyan-300"
                >
                    View Product
                    <ArrowRight size={16} />
                </button>

            </div>

        </div>
    );
}


/*
 * ============================================================
 * FALLBACK PRODUCT CARD
 * ============================================================
 *
 * This is what the user sees when Recommendation Service
 * is DOWN but Product Service is UP.
 */
function FallbackProductCard({ product }) {

    return (
        <div className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/80 transition hover:border-zinc-700 hover:bg-zinc-900">

            <div className="flex h-44 items-center justify-center bg-zinc-900">

                {product?.imageUrl ? (
                    <img
                        src={product.imageUrl}
                        alt={product.name || "Product"}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                ) : (
                    <Package
                        size={42}
                        className="text-zinc-700"
                    />
                )}

            </div>

            <div className="p-5">

                <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                    Alternative Product
                </p>

                <h3 className="mt-2 text-lg font-semibold text-white">
                    {product?.name || "Product"}
                </h3>

                {product?.description && (
                    <p className="mt-2 line-clamp-2 text-sm text-zinc-500">
                        {product.description}
                    </p>
                )}

                {product?.price !== undefined && (
                    <p className="mt-3 text-lg font-semibold text-white">
                        ₹{product.price}
                    </p>
                )}

                <button
                    type="button"
                    className="mt-4 flex items-center gap-2 text-sm font-medium text-cyan-400 transition hover:text-cyan-300"
                >
                    View Product
                    <ArrowRight size={16} />
                </button>

            </div>

        </div>
    );
}


/*
 * ============================================================
 * EMPTY STATE
 * ============================================================
 */
function EmptyState({ message }) {

    return (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-8 text-center">

            <Package
                size={32}
                className="mx-auto text-zinc-700"
            />

            <p className="mt-3 text-sm text-zinc-500">
                {message}
            </p>

        </div>
    );
}

export default Recommendations;