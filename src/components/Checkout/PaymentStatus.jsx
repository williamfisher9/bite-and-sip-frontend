import { useEffect } from "react"
import { useParams, useSearchParams } from "react-router-dom"

const PaymentStatus = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        console.log(searchParams.get('redirect_status'))
        searchParams.forEach((value, key) => {
            console.log(value, key)
            if(value == "succeeded"){
                console.log("saving order in the database")
                console.log("clearing the cart")
            }
        })
    })

    if(searchParams.get('redirect_status') == 'succeeded'){
        return <h1>success</h1>
    }

    return <>failed</>
}

export default PaymentStatus