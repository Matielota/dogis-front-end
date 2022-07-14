import React from "react";
import "../css/Paginado.css";


export default function Paginado({dogPage, alldogs, paginado,currentPage}){
    const pageNumbers= []
    

    for(let i=0; i<= Math.ceil(alldogs/dogPage)-1 ; i++){
        pageNumbers.push(i + 1)
    }
    return (
        <nav>
            
            <ul>
                {pageNumbers && pageNumbers.map(number =>(
                    <li className="paginado" key={number}>
                    <button
              className={`botonPaginado ${currentPage === number ? "current-page" : ""}`}
              onClick={() => paginado(number)}>{number}
              </button>
                    </li>
                ))}
                
            </ul>
        </nav>
    )
}