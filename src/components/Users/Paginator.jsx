
import { useState } from "react";
import s from "./Users.module.css"


const Paginator = ({totaItemsCount, pageSize, currentPage, onPageChanged, portionSize=10 }) => {

  let pagesCount = Math.ceil(totaItemsCount / pageSize)

  let pages = [];

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }

  let portionCount = Math.ceil(pagesCount / portionSize);
  let [portionNumber, setPortionNumber] = useState(1);
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;
  // setPortionNumber(2);
  //   alert(portionNumber)
  return <div className={s.paginator}>
    { (portionNumber > 1) &&
    <button onClick={ () => {setPortionNumber(portionNumber-1)}}>PREV</button>
    }

    { pages.filter( p => p >= leftPortionPageNumber && p<=rightPortionPageNumber) 
    .map((p) => {
      return <span className={currentPage === p && s.selectedPage}
        onClick={(e) => { onPageChanged(p) }} 
        key={p}>{p}</span>
    })
    }

    { portionCount > portionNumber &&
    <button onClick={ () => {setPortionNumber(portionNumber+1)}}>Next</button> 
}


    {/* <div>
      {pages.map((p) => {
        return <span className={currentPage === p && s.selectedPage}
          onClick={(e) => { onPageChanged(p) }} >{p}</span>
      })}

    </div> */}

  </div>
}

export default Paginator
