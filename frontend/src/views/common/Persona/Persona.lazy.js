import React, { lazy, Suspense } from 'react'

const LazyPersona = lazy(() => import('./Persona'))

const Persona = (props) => (
    <Suspense fallback={null}>
        <LazyPersona {...props} />
    </Suspense>
)

export default Persona
