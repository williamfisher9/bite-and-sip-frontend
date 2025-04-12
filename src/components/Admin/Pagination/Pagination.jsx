import { useEffect, useState } from 'react'
import './Pagination.css'

const Pagination = ({paginationData, loadPage, updateSelectedPageSize}) => {
    const [selectedPageSize, setSelectedPageSize] = useState(5);

    const handleSelectedPageSize = (e) => {
        updateSelectedPageSize(e.target.value)
        setSelectedPageSize(e.target.value)
        loadPage(0, e.target.value)
    }

    return <div className="pagination-outer-container">
        <div className='pagination-control' style={paginationData.first ? {color: "gray", cursor: "none"} : null} 
        onClick={() => !paginationData.first && loadPage(paginationData.number-1, selectedPageSize)}><span className="material-symbols-rounded">arrow_back_ios</span> Previous</div>

        <div className='page-numbers'>
            <div className='pagination-page-number-from'>{paginationData.number + 1}</div> of <div className='pagination-page-number-to'>{paginationData.totalPages}</div>
        </div>

        

        <div className='pagination-control' style={paginationData.last ? {color: "gray", cursor: "none"}  : null} 
        onClick={() => !paginationData.last && loadPage(paginationData.number+1, selectedPageSize)}>Next <span className="material-symbols-rounded">arrow_forward_ios</span></div>


        <div className='page-size-control'>
            <div>Size</div>
            <select className='page-size-select' onChange={(e) => handleSelectedPageSize(e)}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="1000">full</option>
            </select>
        </div>


        <div className='pagination-total'>Showing {`${(paginationData.number*paginationData.size + 1)} - ${(paginationData.number*paginationData.size + paginationData.numberOfElements)}`} of {paginationData.totalElements}</div>
    </div>
}

export default Pagination