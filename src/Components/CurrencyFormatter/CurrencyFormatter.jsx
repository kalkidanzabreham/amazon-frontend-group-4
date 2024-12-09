import numeral from "numeral";
const CurrencyFormatter = ({amount})=>{
    const FormattedAmount = numeral(amount).format("$0.00")
    return FormattedAmount
}
export default CurrencyFormatter