import React, { lazy, Suspense } from 'react'

const LazyRestDishCard = lazy(() => import('./RestDishCard'))

const RestDishCard = (props) => (
    <Suspense fallback={null}>
        <LazyRestDishCard {...props} />
    </Suspense>
)

export default RestDishCard
