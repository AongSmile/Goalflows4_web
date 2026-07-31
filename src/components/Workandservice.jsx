import React from 'react'
import LayoutWorkservice1 from '../layouts/LayoutWorkservice1'
import LayoutWorkservice2 from '../layouts/LayoutWorkservice2'
import BackgroundStack from '../components/BackgroundStack'

const Workandservice = () => {
    return (
        <div className="relative min-h-screen">

            {/* 🔥 Background ต่อกัน */}
            <BackgroundStack />

            {/* Content */}
            <LayoutWorkservice1 />
            <LayoutWorkservice2 />

        </div>
    )
}

export default Workandservice
