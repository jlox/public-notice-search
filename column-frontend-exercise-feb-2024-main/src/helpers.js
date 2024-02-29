  export async function getData(db) {
    return await db.collection('notices').get();
  };