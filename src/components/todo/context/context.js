import React from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css';

function Pagination(props) {
    // listPerPage,totalCards
    const cardsNum = [];
    for (let index = 1; index <= Math.ceil(props.totalCards/props.listPerPage); index++) {
        cardsNum.push(index)
    }

    return (
        <nav>     
            <ul className="pagination pagination-lg">
           
                {cardsNum.map(number => (
                    <li className="page-item " key={number} >
                        <a href="!#" className='page-link' onClick={() => props.paginate(number)}>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination
