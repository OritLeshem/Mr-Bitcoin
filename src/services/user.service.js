import { storageService } from './async-storage.service'
import { utilService } from './util.service'

const STORAGE_KEY = 'user'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const user = {
  name: "Puki Ben David",
  balance: 100,
  transactions: []
}

export const userService = {
  getUser,
  signup,
  query,
  save,
  logout,
  getEmptyUser,
  getLoggedinUser,
  getById,
  transferFunds
}


function getUser() {
  return getLoggedinUser()
}

_createUsers()

async function query() {
  let users = await storageService.query(STORAGE_KEY)
  return users
}

async function signup(user) {
  const users = await storageService.query('user')
  let loggedInAlready = users.find(u => u.name === user.name)
  if (loggedInAlready) {
    return _saveLoggedinUser(user)
  }
  else {
    user.balance = 100
    user._id = _makeId()
    user = await storageService.post('user', user)
    user = { ...user }
    return _saveLoggedinUser(user)
  }
}
async function logout() {
  console.log('logout service')
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

async function transferFunds(transfer) {
  const user = getLoggedinUser()
  if (!user) throw new Error('Not loggedin')
  user.balance = user.balance - transfer || transfer
  await update(user)
  return user
}

async function update(user) {
  await storageService.put('user', user)
  if (getLoggedinUser()._id === user._id) _saveLoggedinUser(user)
  return user
}
function _saveLoggedinUser(user) {
  user = { _id: user._id, name: user.name, balance: user.balance, transactions: user.transactions, imgUrl: user.imgUrl }
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
  return user
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

async function getById(userId) {
  const user = await storageService.get('user', userId)
  return user
}




function getEmptyUser() {
  const user = {
    name: '',
    balance: 100,
    transactions: [{
      "toId": "5a56640243427b8f8445231e",
      "to": "Tanner",
      "at": 2652712571,
      "amount": 2
    }],
  }
  return user
}
async function save(user) {
  let savedUser
  if (user._id) {
    savedUser = await storageService.put(STORAGE_KEY, user)
  } else {
    // Later, owner is set by the backend
    // contact.owner = userService.getLoggedinUser()

    savedUser = signup(user)
    // savedUser = await storageService.post(STORAGE_KEY, user)
  }
  console.log("savedUser service", savedUser)
  return savedUser
}
function _makeId(length = 5) {
  var text = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}
function _createUsers() {
  let users = utilService.loadFromStorage(STORAGE_KEY)
  if (!users || !users.length) {
    users = [
      {
        "_id": "66677",
        "name": "Puki Ben David",
        "balance": 100,
        "transactions": [
          {
            "toId": "5a56640243427b8f8445231e",
            "to": "Tanner",
            "at": 2652712571,
            "amount": 2
          }]
      },
    ]
    utilService.saveToStorage('user', users)
  }
}