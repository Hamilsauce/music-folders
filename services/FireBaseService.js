import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/9.6.2/firebase-database.js';
import { firebaseDb} from '../firebase.js'

function writeUserData(userId, name, email, imageUrl) {
  const db = getDatabase();
  set(ref(db, 'users/' + userId), {
    username: name,
    email: email,
    profile_picture: imageUrl
  });
}

export class FireBaseService {
  constructor(db) {
    this.db = db;
    console.log('FireBaseService', this);
  };

  async setData(data, collection = '', uuid = '') {
    set(ref(this.db, `${collection}/${uuid}`), ({ ...data }));
    console.log('madeit !', await set(ref(this.db, `${collection}/${uuid}`), ({ ...data })));
  }
  get() {}

  get prop() { return this._prop };
  set prop(newValue) { this._prop = newValue };
}

{ FireBaseService }