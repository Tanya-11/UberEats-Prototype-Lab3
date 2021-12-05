import { useState, useEffect, useContext } from 'react'
import Axios from 'axios'
import { useSelector } from 'react-redux'
import RestCard from '../../common/RestCard'
import './Dashboard.css'
import { gql, useQuery } from '@apollo/client'
import { DASH_SEARCH, GET_FAV } from '../../../GraphQL/queries'
const Dashboard = () => {
    const [restData, setrestData] = useState([])
    const [favRest, setfavRest] = useState(false)
    const customer = useSelector((state) => state.userLogin.user)
    const [deliveryMode, setDeliveryMode] = useState(true)
    const [location, setLocation] = useState('')
    const [searchString, setSearchString] = useState('')
    const [searchData, setSearchData] = useState({
        city: '',
        delivery: false,
        pickUp: false,
        category: '',
        searchTabText: '',
    })
    Axios.defaults.withCredentials = true

    const searchResult = useQuery(DASH_SEARCH, {
        variables: {
            searchTabText: searchData?.searchTabText,
            category: searchData?.category,
            delivery: searchData?.delivery,
            pickUp: searchData?.pickUp,
            city: searchData?.city,
        },
    })
    const favs = useQuery(GET_FAV, {
        variables: { customer: customer },
    })
    useEffect(() => {
        if (!searchResult.loading) {
            console.log(searchResult.data)
        }
        if (!favs.loading) {
            console.log(favs?.data)
            // searchResult.data?.search.map((el) => {
            //     favs.data.customerProfile.fav.map((item) => {
            //         //  console.log(item)
            //         if (el.username === item.restaurant) {
            //             el.isFav = true
            //         }
            //     })
            // })
            setrestData(searchResult.data?.search)
        }
    }, [searchData, searchResult?.loading, favs?.loading])

    const handleChange = (e) => {
        console.log(restData)
        console.log(e.target.name + '' + e.target.value)
        let { name, value } = e.target
        if (name === 'delivery' || name === 'pickUp') {
            value = e.target.value === 'true'
            console.log(typeof value)
        }
        setSearchData((prevSate) => ({
            ...prevSate,
            [name]: value,
        }))
    }

    return (
        <div class="dashboardContent">
            <div class="dashboard-leftContent">
                <div class="mode" onChange={(e) => handleChange(e)}>
                    <label className="dashboard-label">
                        <input
                            className="dashboard-input"
                            type="checkbox"
                            value={!searchData.delivery}
                            name="delivery"
                            // checked={searchData.delivery}
                        />
                        <span className="">Delivery</span>
                    </label>
                    <label className="dashboard-label">
                        <input
                            className="dashboard-input"
                            type="checkbox"
                            value={!searchData.pickUp}
                            name="pickUp"
                            // checked={searchData.pickUp}
                        />
                        Pick Up
                    </label>
                </div>
                <div className="location">
                    <input
                        className="dashboard-input"
                        type="text"
                        name="city"
                        value={searchData.city}
                        onChange={(e) => {
                            handleChange(e)
                            localStorage.setItem('city', e.target.value)
                        }}
                        placeholder="search City"
                    />
                </div>
                <div class="category" onChange={(e) => handleChange(e)}>
                    <label className="dashboard-label">
                        <input
                            className="dashboard-input"
                            type="radio"
                            value="Vegetarian"
                            name="category"
                            checked={searchData.category === 'Vegetarian'}
                        />
                        Vegetarian
                    </label>
                    <label className="dashboard-label">
                        <input
                            className="dashboard-input"
                            type="radio"
                            value="Halal"
                            name="category"
                            checked={searchData.category === 'Halal'}
                        />
                        Halal
                    </label>
                </div>
                <div class="search">
                    <input
                        className="dashboard-input"
                        type="text"
                        name="searchTabText"
                        value={searchData.searchTabText}
                        onChange={(e) => handleChange(e)}
                        placeholder="search Restaurant"
                    />
                </div>
            </div>
            <div class="dashboard-rightContent">
                {restData &&
                    restData.length > 0 &&
                    restData.map((result, i) => <RestCard key={i} data={result}></RestCard>)}
            </div>
        </div>
    )
}

export default Dashboard
