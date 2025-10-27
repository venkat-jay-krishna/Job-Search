import image from './assets/magnifying-glass.png'
export default function Header(){
    return(
        <header>
            <img src={image} />
            <h1>JobFinder</h1>
        </header>
    )
}