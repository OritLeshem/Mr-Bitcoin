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
  login,
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
  // {
  //   name: "Puki Ben David",
  //   balance: 100,
  //   transactions: [],

  // }
}
_createUsers()
// async function getUsers() {
//   const res = await fetch('https://randomuser.me/api')
//   const { results } = await res.json()

//   // console.log(results)
//   const user1 = {
//     firstName: results[0].name.first,
//     lastName: results[0].name.last,
//     name: results[0].name.first + ' ' + results[0].name.last,
//     email: results[0].email,
//     gender: results[0].gender,
//     picture: results[0].picture.large
//   }

//   console.log(user1)
// }
async function query() {
  let users = await storageService.query(STORAGE_KEY)

  return users
}
async function login(userName) {
  const users = await storageService.query('user')
  const user = users.find(user => user.name === userName)
  if (user) {
    return _saveLoggedinUser(user)
  }
}
async function signup(user) {

  // console.log("sign up userRRRRRRRRRRR", user)
  const users = await storageService.query('user')
  let loggedInAlready = users.find(u => u.name === user.name)
  // console.log('loggedInAlready', loggedInAlready)
  if (loggedInAlready) {
    // console.log("logged in already")
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
  console.log('user transfer service', transfer)
  const user = getLoggedinUser()
  console.log('user transfer service', user.balance, transfer)
  if (!user) throw new Error('Not loggedin')
  user.balance = user.balance - transfer || transfer
  console.log('user transfer service2', user.balance, transfer)
  await update(user)
  console.log('user transfer service3', user.balance, transfer)
  return user
}

async function update(user) {
  await storageService.put('user', user)
  if (getLoggedinUser()._id === user._id) _saveLoggedinUser(user)
  console.log("update user service", user.balance)
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
async function getByName(userName) {
  const user = await storageService.getName('user', userName)
  return user
}


async function changeScore(by) {
  const user = getLoggedinUser()
  if (!user) throw new Error('Not loggedin')
  user.score = user.score + by || by
  await update(user)
  return user.score
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
    imgUrl: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
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