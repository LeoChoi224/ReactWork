/* eslint-disable no-unused-vars */
function App042() {
    let list = [1, 2, 3, 4, 5];
        return (
            <>
                {/* <div>{list[0]}</div> */}
                <div>{list.map(n => (<h4>{n}</h4>))}</div>
                <div>{list.map(n => (<h4>n</h4>))}</div>
                <div>{list.map(n => n)}</div>
            </>
        )
}

export default App042;