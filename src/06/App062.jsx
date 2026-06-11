import { useState } from 'react';


const App062 = () => {
    console.log('🟦App062 호출');
    const [num, setNum] = useState(5);
    
    let sample = [
        {id:1, name:"홍길동"},
        {id:2, name:"김성동"},
        {id:3, name:"박지혜"},
        {id:4, name:"나흥부"},
    ];
    // 서버로부터 받은 user(들) 배열 데이터를 '상태' 로 관리한다면..
    const [users, setUsers] = useState(sample);
    
    const download = () => {
        
        // sample.push({id: 5, name: '김정준'});
        // console.log('download()', sample);
        // setUsers(sample);

        // const a = sample.concat({id: 5, name: '김정준'});
        // setUsers(a);

        setUsers([...users, {id: num, name: '김정준'}]);
        console.log('users', users);
        setNum(num + 1);
    };


    return (
        <>
            <button onClick={download}>다운로드</button>  
            {users.map(u => <h3>{u.id}, {u.name}</h3>)}
        </>
    );
};

export default App062;