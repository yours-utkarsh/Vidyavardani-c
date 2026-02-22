import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

// import { BuyCourse } from "../../../../Service/Operation/studentFeaturesAPI"
import IconBtn from "../../../common/IconBtn"
// import IconBtn from "../../../Common/IconBtn"

export default function RenderTotalAmount() {
  const { total, cart } = useSelector((state) => state.cart)
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleBuyCourse = () => {
    const courses = cart.map((course) => course._id)
    console.log("this is all courses " , courses)
    // BuyCourse(token, courses, user, navigate, dispatch)
  }

  return (
   
  )
}
