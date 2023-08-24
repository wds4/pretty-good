import { useState, useEffect } from 'react';

const HTTPGetRequests = () => {
   const [posts, setPosts] = useState([]);

   useEffect(() => {
      fetch('https://jsonplaceholder.typicode.com/posts')
         .then((res) => res.json())
         .then((data) => {
            console.log(data);
            setPosts(data);
         })
         .catch((err) => {
            console.log(err.message);
         });
   }, []);

   return (
      <>
        <div>{JSON.stringify(posts,null,4)}</div>
      </>
   );
};
export default HTTPGetRequests;
