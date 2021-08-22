import { firebaseStore } from '../firebase/index'
import React, { useState, useEffect } from 'react';

function TopScreen() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const searchData = async () => {
      // Firestoreのコレクションを指定してデータ取得。今回は全量を検索
      const res = await firebaseStore.collection('select_list').get();
      if (res.empty) return [];
      const userList = [];
      // DocumentData型にはmapメソッドが定義されていないため、forEachのループでデータを加工
      res.forEach(doc => {
        userList.push(doc.data());
      })
      setData(userList);
    }

    searchData();
    setLoading(false);
  }, []);
  return (
    <div>
      {loading ? (
        <p>
          LOADING.....
        </p>
      ) :
        data.map((d, index) => {
          return <p key={index}> {d.name}</p>
        })}
    </div>
  );
}

export default TopScreen;
