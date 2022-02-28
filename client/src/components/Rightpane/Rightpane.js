import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import rightpanecss from './rightpane.module.css'

export default function Rightpane() {
    return (
        <div>
            <div className={rightpanecss.main}>
                <div className={rightpanecss.upperpart}>
                    <div className={rightpanecss.upperpart_left}>Friends Online</div>
                    <div className={rightpanecss.upperpart_right}><SearchIcon/></div>
                </div>
                <div className={rightpanecss.lowerpart}> No Friends Online now</div>
            </div>

        </div>
    )
}
