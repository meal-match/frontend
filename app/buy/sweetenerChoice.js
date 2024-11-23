import React from 'react'
import Page from '@components/Page'
import SingleItemSelector from '@components/SingleItemSelector'
import { router } from 'expo-router'

const sweetenerChoice = () => {
    const moveForward = (sweetener) => {
        // do something with sweetener
        const something = { sweetener, something } // just to make eslint happy
        router.push('/buy/milkChoice')
    }
    return (
        <Page header="Choose Sweetener">
            <SingleItemSelector
                items={[
                    { name: 'Sugar' },
                    { name: 'Honey' },
                    { name: 'Stevia' },
                    { name: 'Splenda' },
                    { name: 'Equal' },
                    { name: 'Sweet N Low' },
                    { name: 'No Sweetener' }
                ]}
                moveForward={moveForward}
            />
        </Page>
    )
}

export default sweetenerChoice
