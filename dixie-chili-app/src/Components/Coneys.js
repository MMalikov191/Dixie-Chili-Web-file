const Coneys = num => {
    let total = 0;
    for (let i = 0; i < num; i++){
        total += num;
    }
    return (
        <div>
            <h2>There are {total} coneys in stock</h2>
        </div>
    )
}

export default Coneys;