import { Card } from "./Card"
import { productDataList } from '../../../utils/data'
import { SelectCategory } from './SelectCategory'
import { useState } from "react"

const ProductsList = () => {
    const [dataList, setDataList] = useState(productDataList)
    const [searchTerm, setSearchTerm] = useState("")
    const [sortOption, setSortOption] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("")

    const selectCategoryHandle = (e) => {
        const category = e.target.value
        setSelectedCategory(category)
        filterAndSortProducts(category, searchTerm, sortOption)
    }

    const handleSearch = (e) => {
        const searchText = e.target.value.toLowerCase()
        setSearchTerm(searchText)
        filterAndSortProducts(selectedCategory, searchText, sortOption)
    }

    const handleSort = (e) => {
        const selectedSort = e.target.value
        setSortOption(selectedSort)
        filterAndSortProducts(selectedCategory, searchTerm, selectedSort)
    }

    const filterAndSortProducts = (category = "", search = "", sort = "") => {
        let filteredData = [...productDataList]

        // Filter by category if provided
        if (category && category !== '') {
            filteredData = filteredData.filter((product) => product.category.name === category)
        }

        // Filter by search term
        if (search) {
            filteredData = filteredData.filter((product) => 
                product.title.toLowerCase().includes(search)
            )
        }

        // Sort products
        if (sort === "price-low") {
            filteredData.sort((a, b) => a.price - b.price)
        } else if (sort === "price-high") {
            filteredData.sort((a, b) => b.price - a.price)
        } else if (sort === "title-asc") {
            filteredData.sort((a, b) => a.title.localeCompare(b.title))
        } else if (sort === "title-desc") {
            filteredData.sort((a, b) => b.title.localeCompare(a.title))
        }

        setDataList(filteredData)
    }

    return (
        <div className="my-6 container mx-auto">
            <div className="my-3 flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-1/3">
                    <input
                        type="text"
                        placeholder="Search by product title..."
                        className="w-full p-2 border border-gray-300 rounded"
                        onChange={handleSearch}
                        value={searchTerm}
                    />
                </div>
                <div className="w-full sm:w-1/3">
                    <SelectCategory selectHandle={selectCategoryHandle} />
                </div>
                <div className="w-full sm:w-1/3">
                    <select
                        className="w-full p-2 border border-gray-300 rounded"
                        onChange={handleSort}
                        value={sortOption}
                    >
                        <option value="">Sort by</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="title-asc">Title: A-Z</option>
                        <option value="title-desc">Title: Z-A</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {dataList.map((elem, index) => (
                    <Card key={index} data={elem} />
                ))}
            </div>
        </div>
    )
}

export default ProductsList