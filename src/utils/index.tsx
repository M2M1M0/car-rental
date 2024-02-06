import { MdOutlineStar } from "react-icons/md";
import { MdOutlineStarBorder } from "react-icons/md";

export const ArrayStar = ({ rating }: { rating: number }) => {
     return (
          <div className="flex gap-0">
               {
                    Array.from({ length: 5 }, (_, i) => (
                         <span key={i}>
                              {i < rating
                                   ? <MdOutlineStar />
                                   : <MdOutlineStarBorder />}
                         </span>
                    ))
               }
          </div>
     )
}

// export const FormattedPrice = ({ rating }: { rating: number }) => {
//      return (
//           <>

//           </>
//      )
// }
