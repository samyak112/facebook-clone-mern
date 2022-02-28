import React from 'react'
import Middlebodycss from './middlebody.module.css'
import Newpost  from './New_post/Newpost'
import Friendpost from './Friend_post/Friendpost'

export default function Middlebody() {
    return (
        <div>
            <div className={Middlebodycss.main}>
                <Newpost />
                <Friendpost/>
            </div>
        </div>
    )
}
