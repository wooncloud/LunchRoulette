export interface Restaurant {
  id: number;
  name: string;
}

const DB_NAME = 'LunchRouletteDB';
const STORE_NAME = 'restaurants';

export async function initDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        store.createIndex('name', 'name', { unique: false });
        
        // 초기 데이터 추가
        const initialData = [
          { name: '화로구이' },
          { name: '혜화돈까스' },
          { name: '신전떡볶이' },
          { name: '란궁마라탕' },
          { name: '청원' },
          { name: '순흥골 갈비탕' },
          { name: '순살감자탕' },
          { name: '카오산' },
          { name: '구룡포횟집' },
          { name: '버거킹' },
          { name: '김가네' },
          { name: '고기굽는저녁' },
          { name: '송백식당' },
          { name: '칼국수' },
          { name: '희락돈까스' },
          { name: '3일한우국밥' },
          { name: '미소야' },
          { name: '814식당' }
        ];

        const store2 = request.transaction!.objectStore(STORE_NAME);
        initialData.forEach(item => store2.add(item));
      }
    };
  });
}

export async function getAllRestaurants(): Promise<Restaurant[]> {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}