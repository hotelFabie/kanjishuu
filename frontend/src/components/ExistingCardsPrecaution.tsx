export default function ExistingCardsPrecaution() {
    return (
        <>
            <p>You already have fetched cards, do you: </p>
            <button>Continue</button>
            <button>Discard and reselect</button>
        </>
    )
}

/*första knappen kommer att göra samma sak som det vi annars tänker oss*/
/*sista knappen kommer att tömma sessionStorage just var vi gör allt detta.*/