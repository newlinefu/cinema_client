import React from 'react'
import {Tab, Tabs} from 'grommet'
import FilmsContainer from './films_component/FilmsContainer'

export default function FilmsTabs({filmsSearchData, setFilmsSearchData}) {
    return (
        <Tabs
            align={'center'}
            fill
            activeIndex={filmsSearchData.dateTabIndex}
            onActive={(nextIndex) => setFilmsSearchData({
                    ...filmsSearchData,
                    dateTabIndex: nextIndex
                })
            }
        >
            <Tab
                title={'Сегодня'}
                margin={'small'}
            >
                <FilmsContainer/>
            </Tab>
            <Tab
                title={'Завтра'}
                margin={'small'}
            >
                <FilmsContainer/>
            </Tab>
            <Tab
                title={'Все фильмы'}
                margin={'small'}
            >
                <FilmsContainer/>
            </Tab>
        </Tabs>
    )
}