import React from 'react'
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from 'react-icons/ai'
import { usePoker } from '../../PokerProvider'

const FullScreenButton = () => {

    const {viewFullScreen, fullScreen} = usePoker()

    const handleFullScreen = () => {
        viewFullScreen()
    }

    return (
        <div className='musicButton' onClick={handleFullScreen}>
            {
                fullScreen ? <AiOutlineFullscreenExit /> : <AiOutlineFullscreen />
            }
        </div>
    )
}

export default FullScreenButton