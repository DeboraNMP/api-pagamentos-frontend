import stepRegister1 from "../../assets/register1.svg"
import stepRegister2 from "../../assets/register2.svg"
import stepRegister3 from "../../assets/register3.svg"
import "./styleSideBar.css"

interface IProps {
    step: number
}
export default function SideBar({ step }: IProps) {

    let currentImage = stepRegister1

    if (step === 2) {
        currentImage = stepRegister2
    }

    if (step === 3) {
        currentImage = stepRegister3
    }
    return (
        <div className="divUserFormStep3">
            <img className="currentImage" src={currentImage} alt="passo a passo" />
        </div>
    )
}